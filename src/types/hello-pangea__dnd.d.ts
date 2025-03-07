declare module '@hello-pangea/dnd' {
  import type { ReactNode } from 'react';

  export interface DraggableProvided {
    draggableProps: {
      style?: React.CSSProperties;
      [key: string]: unknown;
    };
    dragHandleProps?: {
      [key: string]: unknown;
    };
    innerRef: (element: HTMLElement | null) => void;
  }

  export interface DraggableStateSnapshot {
    isDragging: boolean;
    [key: string]: unknown;
  }

  export interface DroppableProvided {
    innerRef: (element: HTMLElement | null) => void;
    droppableProps: {
      [key: string]: unknown;
    };
    placeholder?: ReactNode;
  }

  export interface DragResult {
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

  export interface DragDropContextProps {
    onDragEnd: (result: DragResult) => void;
    onDragStart?: (result: DragResult) => void;
    onDragUpdate?: (result: DragResult) => void;
    children: ReactNode;
  }

  export interface DroppableProps {
    droppableId: string;
    children: (provided: DroppableProvided) => ReactNode;
  }

  export interface DraggableProps {
    draggableId: string;
    index: number;
    children: (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => ReactNode;
  }

  export const DragDropContext: React.FC<DragDropContextProps>;
  export const Droppable: React.FC<DroppableProps>;
  export const Draggable: React.FC<DraggableProps>;
} 