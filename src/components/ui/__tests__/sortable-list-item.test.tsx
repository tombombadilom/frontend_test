import { render, screen } from '@testing-library/react';
import { SortableListItem } from '../sortable-list-item';

describe('SortableListItem', () => {
  const mockId = '1';
  const mockContent = 'Test Content';

  it('renders with content', () => {
    render(
      <SortableListItem id={mockId}>
        <div>{mockContent}</div>
      </SortableListItem>
    );

    expect(screen.getByText(mockContent)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <SortableListItem id={mockId} className="custom-class">
        <div>{mockContent}</div>
      </SortableListItem>
    );

    const container = screen.getByText(mockContent).closest('div');
    expect(container).toHaveClass('custom-class');
  });

  it('renders with drag handle', () => {
    render(
      <SortableListItem id={mockId}>
        <div>{mockContent}</div>
      </SortableListItem>
    );

    const handle = screen.getByRole('button', { name: /Drag to reorder/i });
    expect(handle).toBeInTheDocument();
  });
}); 