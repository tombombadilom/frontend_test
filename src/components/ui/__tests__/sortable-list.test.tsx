import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SortableList } from '../sortable-list';

interface TestItem {
  id: string;
  content: string;
}

describe('SortableList', () => {
  const mockItems: TestItem[] = [
    { id: '1', content: 'Item 1' },
    { id: '2', content: 'Item 2' },
    { id: '3', content: 'Item 3' },
  ];

  const mockOnReorder = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all items', () => {
    render(
      <SortableList
        items={mockItems}
        onReorder={mockOnReorder}
        renderItem={(item) => <div>{item.content}</div>}
      />
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('calls onReorder when items are reordered with mouse', async () => {
    render(
      <SortableList
        items={mockItems}
        onReorder={mockOnReorder}
        renderItem={(item) => <div>{item.content}</div>}
      />
    );

    const item1 = screen.getByText('Item 1').closest('div');
    const item2 = screen.getByText('Item 2').closest('div');

    if (!item1 || !item2) {
      throw new Error('Items not found');
    }

    // Simulate drag and drop
    await userEvent.pointer({ target: item1, keys: '[MouseLeft>]' });
    await userEvent.pointer({ target: item2, keys: '[MouseLeft]' });

    expect(mockOnReorder).toHaveBeenCalledWith([
      { id: '2', content: 'Item 2' },
      { id: '1', content: 'Item 1' },
      { id: '3', content: 'Item 3' },
    ]);
  });

  it('calls onReorder when items are reordered with keyboard', async () => {
    render(
      <SortableList
        items={mockItems}
        onReorder={mockOnReorder}
        renderItem={(item) => <div>{item.content}</div>}
      />
    );

    const item1 = screen.getByText('Item 1').closest('.sortable-list-item');
    if (!item1) {
      throw new Error('Item not found');
    }

    // Focus the first item's handle
    const handle = item1.querySelector('.sortable-list-item-handle');
    if (!handle) {
      throw new Error('Handle not found');
    }

    await userEvent.tab();
    expect(handle).toHaveFocus();

    // Press Space to start dragging
    await userEvent.keyboard('{Space}');
    expect(handle).toHaveAttribute('aria-pressed', 'true');

    // Press Arrow Down to move down
    await userEvent.keyboard('{ArrowDown}');
    expect(handle).toHaveAttribute('aria-pressed', 'true');

    // Press Space to drop
    await userEvent.keyboard('{Space}');
    expect(handle).not.toHaveAttribute('aria-pressed');

    expect(mockOnReorder).toHaveBeenCalledWith([
      { id: '2', content: 'Item 2' },
      { id: '1', content: 'Item 1' },
      { id: '3', content: 'Item 3' },
    ]);
  });

  it('applies custom className', () => {
    render(
      <SortableList
        items={mockItems}
        onReorder={mockOnReorder}
        renderItem={(item) => <div>{item.content}</div>}
        className="custom-class"
      />
    );

    const container = screen.getByText('Item 1').parentElement?.parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('renders items with custom render function', () => {
    render(
      <SortableList
        items={mockItems}
        onReorder={mockOnReorder}
        renderItem={(item) => (
          <div data-testid={`custom-${item.id}`}>{item.content}</div>
        )}
      />
    );

    expect(screen.getByTestId('custom-1')).toBeInTheDocument();
    expect(screen.getByTestId('custom-2')).toBeInTheDocument();
    expect(screen.getByTestId('custom-3')).toBeInTheDocument();
  });

  it('applies correct styles to list items', () => {
    render(
      <SortableList
        items={mockItems}
        onReorder={mockOnReorder}
        renderItem={(item) => <div>{item.content}</div>}
      />
    );

    const items = screen.getAllByText(/Item \d/).map((el) => el.closest('.sortable-list-item'));
    items.forEach((item) => {
      expect(item).toHaveClass('sortable-list-item');
      expect(item?.querySelector('.sortable-list-item-handle')).toBeInTheDocument();
    });
  });

  it('applies correct ARIA attributes to the list container', () => {
    render(
      <SortableList
        items={mockItems}
        onReorder={mockOnReorder}
        renderItem={(item) => <div>{item.content}</div>}
        aria-label="Test List"
      />
    );

    const container = screen.getByText('Item 1').parentElement?.parentElement;
    expect(container).toHaveAttribute('role', 'listbox');
    expect(container).toHaveAttribute('aria-label', 'Test List');
    expect(container).toHaveAttribute('aria-multiselectable', 'false');
  });

  it('handles keyboard navigation between items', async () => {
    render(
      <SortableList
        items={mockItems}
        onReorder={mockOnReorder}
        renderItem={(item) => <div>{item.content}</div>}
      />
    );

    const items = screen.getAllByText(/Item \d/).map((el) => el.closest('.sortable-list-item'));
    if (!items[0] || !items[1]) {
      throw new Error('Items not found');
    }

    const handle1 = items[0].querySelector('.sortable-list-item-handle');
    const handle2 = items[1].querySelector('.sortable-list-item-handle');

    if (!handle1 || !handle2) {
      throw new Error('Handles not found');
    }

    // Focus the first item's handle
    await userEvent.tab();
    expect(handle1).toHaveFocus();

    // Navigate to the second item's handle
    await userEvent.keyboard('{ArrowDown}');
    expect(handle2).toHaveFocus();

    // Navigate back to the first item's handle
    await userEvent.keyboard('{ArrowUp}');
    expect(handle1).toHaveFocus();
  });
}); 