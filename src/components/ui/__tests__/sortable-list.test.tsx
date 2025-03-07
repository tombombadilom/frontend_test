import { render, screen } from '@testing-library/react';
import { SortableList } from '../sortable-list';

describe('SortableList', () => {
  const items = [
    { id: '1', content: 'Item 1' },
    { id: '2', content: 'Item 2' }
  ];

  it('affiche les éléments', () => {
    render(
      <SortableList
        items={items}
        onReorder={() => {}}
        renderItem={(item) => <div>{item.content}</div>}
      />
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('applique la classe CSS', () => {
    render(
      <SortableList
        items={items}
        onReorder={() => {}}
        renderItem={(item) => <div>{item.content}</div>}
        className="test-class"
      />
    );
    const container = screen.getByText('Item 1').closest('div[class*="test-class"]');
    expect(container).toBeInTheDocument();
  });

  it('utilise la fonction de rendu', () => {
    const renderItem = (item: typeof items[0]) => (
      <div data-testid={`item-${item.id}`}>{item.content}</div>
    );
    render(
      <SortableList
        items={items}
        onReorder={() => {}}
        renderItem={renderItem}
      />
    );
    expect(screen.getByTestId('item-1')).toBeInTheDocument();
    expect(screen.getByTestId('item-2')).toBeInTheDocument();
  });
}); 