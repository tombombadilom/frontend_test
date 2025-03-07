import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SortableList } from '../sortable-list';

interface TestItem {
  id: string;
  content: string;
}

describe('SortableList', () => {
  it('affiche les éléments', () => {
    const items = [
      { id: '1', content: 'Item 1', data: { id: '1', content: 'Item 1' } },
      { id: '2', content: 'Item 2', data: { id: '2', content: 'Item 2' } }
    ];

    render(
      <SortableList<TestItem>
        items={items}
        onReorder={() => {}}
        renderItem={(item) => <div>{item.content}</div>}
      />
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
});
