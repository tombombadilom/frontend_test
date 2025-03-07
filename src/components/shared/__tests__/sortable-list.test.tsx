import { render, screen, fireEvent } from '@testing-library/react';
import type React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { SortableList, type SortableItem } from '../sortable-list';

interface DroppableProvidedProps {
  innerRef: (element: HTMLElement | null) => void;
  droppableProps: Record<string, unknown>;
  placeholder: React.ReactNode;
}

interface DraggableProvidedProps {
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: Record<string, unknown>;
  dragHandleProps: Record<string, unknown>;
}

// Mock de @hello-pangea/dnd
vi.mock('@hello-pangea/dnd', () => ({
  DragDropContext: ({ children }: { children: React.ReactNode }) => children,
  Droppable: ({ children, droppableId }: { children: (provided: DroppableProvidedProps) => React.ReactNode; droppableId?: string }) =>
    children({
      innerRef: (element: HTMLElement | null) => {
        if (element) {
          element.setAttribute('data-rbd-droppable-id', droppableId || 'droppable-list');
        }
      },
      droppableProps: { 'data-rbd-droppable-id': droppableId || 'droppable-list' },
      placeholder: null,
    }),
  Draggable: ({ children, draggableId }: { children: (provided: DraggableProvidedProps) => React.ReactNode; draggableId?: string }) =>
    children({
      innerRef: (element: HTMLElement | null) => {
        if (element) {
          element.setAttribute('data-rbd-draggable-id', draggableId || 'draggable-item');
        }
      },
      draggableProps: { 'data-rbd-draggable-id': draggableId || 'draggable-item' },
      dragHandleProps: {},
    }),
}));

interface TestItem {
  id: string;
  title: string;
  description: string;
}

const mockItems: SortableItem<TestItem>[] = [
  {
    id: '1',
    content: 'Item 1',
    data: { id: '1', title: 'Item 1', description: 'Description 1' }
  },
  {
    id: '2',
    content: 'Item 2',
    data: { id: '2', title: 'Item 2', description: 'Description 2' }
  },
  {
    id: '3',
    content: 'Item 3',
    data: { id: '3', title: 'Item 3', description: 'Description 3' }
  }
];

describe('SortableList', () => {
  const mockOnReorder = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all items correctly', () => {
    render(
      <SortableList
        items={mockItems}
        onReorder={mockOnReorder}
        renderItem={(item) => (
          <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        )}
      />
    );

    mockItems.forEach((item) => {
      if (item.data) {
        expect(screen.getByText(item.data.title)).toBeInTheDocument();
        expect(screen.getByText(item.data.description)).toBeInTheDocument();
      }
    });
  });

  it('applies custom class names correctly', () => {
    const { container } = render(
      <SortableList
        items={mockItems}
        onReorder={mockOnReorder}
        renderItem={(item) => <div className="item-content">{item.title}</div>}
        className="custom-list"
        itemClassName="custom-item"
        _dragHandleClassName="custom-handle"
      />
    );

    expect(container.firstChild).toHaveClass('custom-list');
    const customItems = container.querySelectorAll('.custom-item');
    expect(customItems.length).toBe(mockItems.length);
  });

  it('simulates drag and drop events correctly', () => {
    const { container } = render(
      <SortableList
        items={mockItems}
        onReorder={mockOnReorder}
        renderItem={(item) => <div className="item-content">{item.title}</div>}
      />
    );

    const item1 = container.querySelector('[data-rbd-draggable-id="1"]');
    const item2 = container.querySelector('[data-rbd-draggable-id="2"]');

    // Simuler le début du drag
    const dragStartEvent = {
      draggableId: '1',
      type: 'DEFAULT',
      source: { index: 0, droppableId: 'droppable-list' },
      reason: 'DROP',
      mode: 'FLUID',
    };
    fireEvent.dragStart(item1!, dragStartEvent);

    // Simuler la mise à jour du drag
    const dragUpdateEvent = {
      draggableId: '1',
      type: 'DEFAULT',
      source: { index: 0, droppableId: 'droppable-list' },
      destination: { index: 1, droppableId: 'droppable-list' },
      reason: 'DROP',
      mode: 'FLUID',
    };
    fireEvent.dragOver(item2!, dragUpdateEvent);

    // Simuler la fin du drag
    const dragEndEvent = {
      draggableId: '1',
      type: 'DEFAULT',
      source: { index: 0, droppableId: 'droppable-list' },
      destination: { index: 1, droppableId: 'droppable-list' },
      reason: 'DROP',
      mode: 'FLUID',
    };
    fireEvent.drop(item2!, dragEndEvent);

    expect(mockOnReorder).toHaveBeenCalled();
  });

  it('renders with custom droppableId', () => {
    const { container } = render(
      <SortableList
        items={mockItems}
        onReorder={mockOnReorder}
        renderItem={(item) => <div className="item-content">{item.title}</div>}
        droppableId="custom-droppable"
      />
    );

    const droppable = container.querySelector('[data-rbd-droppable-id]');
    expect(droppable).toHaveAttribute('data-rbd-droppable-id', 'custom-droppable');
  });

  it('renders with custom animation duration', () => {
    const { container } = render(
      <SortableList
        items={mockItems}
        onReorder={mockOnReorder}
        renderItem={(item) => <div className="item-content">{item.title}</div>}
        animationDuration={500}
      />
    );

    const animatedItems = container.querySelectorAll('.custom-item');
    animatedItems.forEach((item) => {
      expect(item).toHaveStyle({ '--animation-duration': '500ms' });
    });
  });

  it('renders with custom drag scale', () => {
    const { container } = render(
      <SortableList
        items={mockItems}
        onReorder={mockOnReorder}
        renderItem={(item) => <div className="item-content">{item.title}</div>}
        dragScale={1.2}
      />
    );

    const scaledItems = container.querySelectorAll('.custom-item');
    scaledItems.forEach((item) => {
      expect(item).toHaveStyle({ '--drag-scale': '1.2' });
    });
  });

  it('renders with drag shadow', () => {
    const { container } = render(
      <SortableList
        items={mockItems}
        onReorder={mockOnReorder}
        renderItem={(item) => <div className="item-content">{item.title}</div>}
        dragShadow
      />
    );

    const shadowedItems = container.querySelectorAll('.custom-item');
    shadowedItems.forEach((item) => {
      expect(item).toHaveClass('shadow-lg');
    });
  });

  it('renders without drag shadow when disabled', () => {
    const { container } = render(
      <SortableList
        items={mockItems}
        onReorder={mockOnReorder}
        renderItem={(item) => <div>{item.title}</div>}
        dragShadow={false}
      />
    );

    const unshadowedItems = container.querySelectorAll('div[class*="rounded-md"]');
    unshadowedItems.forEach((item) => {
      expect(item).not.toHaveClass('shadow-lg');
    });
  });
});
