import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SortableList } from '../sortable-list';

interface TestItem {
  id: string;
  title: string;
}

describe('SortableList', () => {
  it('renders items', () => {
    render(
      <SortableList<TestItem>
        items={[
          { id: '1', content: 'Item 1', data: { id: '1', title: 'Item 1' } },
          { id: '2', content: 'Item 2', data: { id: '2', title: 'Item 2' } },
        ]}
        onReorder={() => {}}
        renderItem={(data) => <div>{data.title}</div>}
      />
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('renders with custom droppableId', () => {
    render(
      <SortableList<TestItem>
        items={[
          { id: '1', content: 'Item 1', data: { id: '1', title: 'Item 1' } },
          { id: '2', content: 'Item 2', data: { id: '2', title: 'Item 2' } },
        ]}
        onReorder={() => {}}
        renderItem={(data) => <div>{data.title}</div>}
        droppableId="custom-id"
      />
    );

    const droppable = screen.getByRole('list', { hidden: true });
    expect(droppable).toHaveAttribute('data-rbd-droppable-id', 'custom-id');
  });
});
