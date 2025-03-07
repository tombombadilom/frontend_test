import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SortableListItem } from '../sortable-list-item';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';

interface TestItem {
  id: string;
  title: string;
}

const mockItem = {
  id: '1',
  content: 'Item 1',
  data: { id: '1', title: 'Item 1' }
};

describe('SortableListItem', () => {
  it('renders with content', () => {
    const mockContent = 'Test Content';
    render(
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="test">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <SortableListItem<TestItem>
                item={{ id: '1', content: mockContent, data: { id: '1', title: mockContent } }}
                index={0}
                renderItem={(data) => <div>{data.title}</div>}
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
                item={{ id: '1', content: mockContent, data: { id: '1', title: mockContent } }}
                index={0}
                renderItem={(data) => <div>{data.title}</div>}
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
}); 