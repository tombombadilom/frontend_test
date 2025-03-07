import { render, screen } from '@testing-library/react';
import { SortableListItem } from '../sortable-list-item';

describe('SortableListItem', () => {
  it('affiche le contenu', () => {
    render(
      <SortableListItem id="test-1">
        <div>Test Content</div>
      </SortableListItem>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
}); 