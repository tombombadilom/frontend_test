import { Draggable } from '@hello-pangea/dnd';
import { cn } from '@/lib/utils';
import type React from 'react';

export interface SortableItem<T> {
  id: string;
  content: string;
  data: T;
}

interface SortableListItemProps<T> {
  item: SortableItem<T>;
  index: number;
  renderItem: (item: T) => React.ReactNode;
  className?: string;
  dragHandleClassName?: string;
  draggableId?: string;
  showDragHandle?: boolean;
}

export function SortableListItem<T>({
  item,
  index,
  renderItem,
  className,
  dragHandleClassName,
  draggableId,
  showDragHandle = true,
}: SortableListItemProps<T>) {
  return (
    <Draggable draggableId={draggableId || item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={cn('flex items-center gap-2 p-2 rounded-md', className)}
        >
          {showDragHandle && (
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
          )}
          <div className="flex-1">{renderItem(item.data)}</div>
        </div>
      )}
    </Draggable>
  );
} 