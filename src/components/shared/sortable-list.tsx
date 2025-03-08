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
  dragHandleClassName?: string;
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
  dragHandleClassName,
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
            className={cn('rounded-md border border-border bg-card p-3', itemClassName)}
          >
            {renderItem(item.data as T)}
          </motion.div>
        ))}
      </div>
    );
  }

  const handleDragStart = (result: DragResult) => {
    setDraggingId(result.draggableId as ID);
  };

  const handleDragEnd = (result: DragResult) => {
    setDraggingId(null);

    if (!result.destination) return;

    const reorderedItems = [...items];
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    onReorder(reorderedItems);
  };

  return (
    <DragDropContext
      onDragStart={handleDragStart}
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
                      <div
                        {...provided.dragHandleProps}
                        className={cn(
                          'cursor-grab active:cursor-grabbing p-1 rounded hover:bg-accent',
                          dragHandleClassName
                        )}
                        aria-label="Drag to reorder"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 18 18"
                          fill="currentColor"
                          className="h-4 w-4 text-muted-foreground"
                          role="img"
                          aria-labelledby="dragHandleTitle"
                        >
                          <title id="dragHandleTitle">Drag handle</title>
                          <circle cx="9" cy="5" r="1" />
                          <circle cx="9" cy="12" r="1" />
                          <circle cx="9" cy="19" r="1" />
                        </svg>
                      </div>
                      <div className="flex-1">{renderItem(item.data as T)}</div>
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
