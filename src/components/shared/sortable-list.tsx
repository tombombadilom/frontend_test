'use client';

import type React from 'react';

import { cn } from '@/lib/utils';
import {
  DragDropContext,
  Draggable,
  Droppable,
} from '@hello-pangea/dnd';
import type {
  DraggableProvided,
  DraggableStateSnapshot,
  DroppableProvided,
} from '@hello-pangea/dnd';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

export interface SortableItem<T = Record<string, unknown>, ID extends string | number = string> {
  id: ID;
  content: React.ReactNode;
  data?: T;
}

interface SortableListProps<T extends { id: ID }, ID extends string | number = string> {
  items: SortableItem<T, ID>[];
  onReorder: (items: SortableItem<T, ID>[]) => void;
  renderItem: (item: T) => React.ReactNode;
  className?: string;
  itemClassName?: string;
  _dragHandleClassName?: string;
  droppableId?: string;
  animationDuration?: number;
  dragScale?: number;
  dragShadow?: boolean;
}

interface DragResult {
  draggableId: string;
  type: string;
  source: {
    index: number;
    droppableId: string;
  };
  reason: string;
  mode: string;
  destination?: {
    droppableId: string;
    index: number;
  };
  combine?: unknown;
}

export function SortableList<T extends { id: ID }, ID extends string | number = string>({
  items,
  onReorder,
  renderItem,
  className,
  itemClassName,
  _dragHandleClassName,
  droppableId = 'droppable-list',
  animationDuration = 0.2,
  dragScale = 1.02,
  dragShadow = true,
}: SortableListProps<T, ID>) {
  const [enabled, setEnabled] = useState(false);
  const [_draggingId, setDraggingId] = useState<ID | null>(null);

  // Activer le drag and drop uniquement côté client
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return (
      <div className={cn('space-y-2', className)}>
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: animationDuration }}
            className="rounded-md border border-border bg-card p-3"
          >
            {renderItem(item.data as T)}
          </motion.div>
        ))}
      </div>
    );
  }

  const handleDragStart = (result: DragResult) => {
    setDraggingId(result.draggableId as ID);
    const item = items.find((i) => i.id === result.draggableId);
    if (item && onReorder) {
      onReorder([item]);
    }
  };

  const handleDragUpdate = (result: DragResult) => {
    const item = items.find((i) => i.id === result.draggableId);
    if (item && onReorder) {
      onReorder([item]);
    }
  };

  const handleDragEnd = (result: DragResult) => {
    setDraggingId(null);
    const item = items.find((i) => i.id === result.draggableId);
    if (item && onReorder) {
      onReorder([item]);
    }

    if (!result.destination) return;

    const reorderedItems = [...items];
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    onReorder(reorderedItems);
  };

  return (
    <DragDropContext
      onDragStart={handleDragStart}
      onDragUpdate={handleDragUpdate}
      onDragEnd={handleDragEnd}
    >
      <Droppable droppableId={droppableId}>
        {(provided: DroppableProvided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={cn('space-y-2', className)}
          >
            <AnimatePresence>
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                  {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                    <motion.div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: snapshot.isDragging ? dragScale : 1,
                        transition: {
                          duration: animationDuration,
                          scale: { duration: 0.1 },
                        },
                      }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: animationDuration }}
                      className={cn(
                        'rounded-md border border-border bg-card p-3 transition-all',
                        snapshot.isDragging && dragShadow && 'shadow-lg border-primary/50 z-10',
                        itemClassName
                      )}
                      style={{
                        ...provided.draggableProps.style,
                        transform: snapshot.isDragging
                          ? provided.draggableProps.style?.transform
                          : 'none',
                      }}
                    >
                      {renderItem(item.data as T)}
                    </motion.div>
                  )}
                </Draggable>
              ))}
            </AnimatePresence>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
