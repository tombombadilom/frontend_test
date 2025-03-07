// Types pour les tests
export interface MotionProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

export interface DndProvided {
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: Record<string, unknown>;
  dragHandleProps?: Record<string, unknown>;
  placeholder?: React.ReactNode;
}
