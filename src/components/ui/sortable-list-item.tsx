import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';

interface SortableListItemProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  dragHandleLabel?: string;
}

export function SortableListItem({
  id,
  children,
  className,
  disabled = false,
  dragHandleLabel = 'Drag to reorder',
}: SortableListItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'sortable-list-item',
        isDragging && 'sortable-list-item-dragging',
        disabled && 'sortable-list-item-disabled',
        className
      )}
      {...attributes}
    >
      <div
        className="sortable-list-item-handle"
        {...listeners}
        aria-label={dragHandleLabel}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="9" cy="5" r="1" />
          <circle cx="9" cy="12" r="1" />
          <circle cx="9" cy="19" r="1" />
          <circle cx="15" cy="5" r="1" />
          <circle cx="15" cy="12" r="1" />
          <circle cx="15" cy="19" r="1" />
        </svg>
      </div>
      {children}
    </div>
  );
} 