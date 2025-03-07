import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableListItem } from './sortable-list-item';
import { cn } from '@/lib/utils';

interface SortableListProps<T> {
  items: T[];
  onReorder: (items: T[]) => void;
  renderItem: (item: T) => React.ReactNode;
  className?: string;
  'aria-label'?: string;
  disabled?: boolean;
  dragHandleLabel?: string;
}

export function SortableList<T extends { id: string }>({
  items,
  onReorder,
  renderItem,
  className,
  'aria-label': ariaLabel = 'Sortable list',
  disabled = false,
  dragHandleLabel = 'Drag to reorder',
}: SortableListProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      onReorder(arrayMove(items, oldIndex, newIndex));
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          className={cn('sortable-list', className)}
          role="listbox"
          aria-label={ariaLabel}
          aria-multiselectable="false"
          aria-disabled={disabled}
        >
          {items.map((item) => (
            <SortableListItem
              key={item.id}
              id={item.id}
              disabled={disabled}
              dragHandleLabel={dragHandleLabel}
            >
              {renderItem(item)}
            </SortableListItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
} 