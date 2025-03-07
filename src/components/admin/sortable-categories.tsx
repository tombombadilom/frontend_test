'use client';

import { Button } from '@/components/ui/button';
import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Category {
  id: string;
  name: string;
  slug: string;
  order: number;
}

interface SortableItemProps {
  id: string;
  category: Category;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

function SortableItem({ id, category, onEdit, onDelete }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between rounded-md border bg-card p-3 ${isDragging ? 'shadow-lg' : ''}`}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="cursor-grab touch-none text-muted-foreground hover:text-foreground"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-5 w-5" />
          <span className="sr-only">Déplacer</span>
        </button>
        <div>
          <div className="font-medium">{category.name}</div>
          <div className="text-sm text-muted-foreground">{category.slug}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => onEdit(category.id)}>
          Modifier
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onDelete(category.id)}>
          Supprimer
        </Button>
      </div>
    </div>
  );
}

export function SortableCategories() {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Action', slug: 'action', order: 0 },
    { id: '2', name: 'Aventure', slug: 'aventure', order: 1 },
    { id: '3', name: 'RPG', slug: 'rpg', order: 2 },
    { id: '4', name: 'Stratégie', slug: 'strategie', order: 3 },
    { id: '5', name: 'Sport', slug: 'sport', order: 4 },
    { id: '6', name: 'Simulation', slug: 'simulation', order: 5 },
    { id: '7', name: 'FPS', slug: 'fps', order: 6 },
    { id: '8', name: 'Indie', slug: 'indie', order: 7 },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setCategories((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex);

        // Mettre à jour l'ordre
        return newItems.map((item, index) => ({
          ...item,
          order: index,
        }));
      });

      toast.success('Ordre des catégories mis à jour');
    }
  };

  const handleEdit = (id: string) => {
    // Dans une application réelle, cela ouvrirait un modal d'édition
    toast.info(`Édition de la catégorie ${id}`);
  };

  const handleDelete = (id: string) => {
    // Dans une application réelle, cela afficherait une confirmation
    setCategories(categories.filter((category) => category.id !== id));
    toast.success('Catégorie supprimée');
  };

  const saveOrder = () => {
    // Dans une application réelle, cela enverrait les données à l'API
    toast.success('Ordre des catégories enregistré');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Catégories</h2>
        <Button onClick={saveOrder}>Enregistrer l'ordre</Button>
      </div>

      <p className="text-muted-foreground">
        Faites glisser les catégories pour modifier leur ordre d'affichage.
      </p>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={categories.map((category) => category.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {categories.map((category) => (
              <SortableItem
                key={category.id}
                id={category.id}
                category={category}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
