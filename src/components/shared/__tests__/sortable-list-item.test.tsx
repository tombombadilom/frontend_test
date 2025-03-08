import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SortableListItem } from '../sortable-list-item';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { vi } from 'vitest';
import type { SortableItem } from '../sortable-list-item';
import type { ReactNode } from 'react';

interface TestItem {
  id: string;
  name: string;
}

const _mockItem = {
  id: '1',
  content: 'Item 1',
  data: { id: '1', name: 'Item 1' }
};

describe('SortableListItem', () => {
  const _mockOnDragStart = vi.fn();
  const _mockOnDragEnd = vi.fn();
  const _mockOnDragOver = vi.fn();
  const _mockOnDrop = vi.fn();

  const testContent = 'Test Item';
  const _mockItem: SortableItem<TestItem> = {
    id: '1',
    content: testContent,
    data: { id: '1', name: 'Test Item' }
  };

  const renderItem = (item: TestItem) => item.name;

  it('renders with content', () => {
    const mockContent = 'Test Content';
    render(
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="test">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <SortableListItem<TestItem>
                item={{ id: '1', content: mockContent, data: { id: '1', name: mockContent } }}
                index={0}
                renderItem={(data) => <div>{data.name}</div>}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );

    expect(screen.getByText(mockContent)).toBeInTheDocument();
  });

  it('renders with drag handle', () => {
    const mockContent = 'Test Content';
    render(
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="test">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <SortableListItem<TestItem>
                item={{ id: '1', content: mockContent, data: { id: '1', name: mockContent } }}
                index={0}
                renderItem={(data) => <div>{data.name}</div>}
                showDragHandle
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );

    expect(screen.getByLabelText('Drag to reorder')).toBeInTheDocument();
  });

  it('renders correctly', () => {
    render(
      <SortableListItem<TestItem>
        index={0}
        item={_mockItem}
        renderItem={renderItem}
      />
    );

    expect(screen.getByText(_mockItem.data.name)).toBeInTheDocument();
  });
}); 