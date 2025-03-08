import type * as React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';

interface SortableListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  id: string;
  disabled?: boolean;
}

export function SortableListItem({ id, disabled, className, children, ...props }: SortableListItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });

  return (
    <li
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={cn(
        'flex items-center gap-2 rounded-lg border bg-card p-4 text-card-foreground shadow-sm',
        isDragging && 'opacity-50',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...attributes}
      {...listeners}
      {...props}
    >
      {children}
    </li>
  );
} 