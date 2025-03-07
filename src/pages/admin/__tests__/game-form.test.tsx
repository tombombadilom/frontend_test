import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import GameFormPage from '../game-form';
import { showToast } from '@/lib/toast';

// Mock showToast
vi.mock('@/lib/toast', () => ({
  showToast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
  useParams: () => ({}),
}));

// Mock games.json
vi.mock('@/data/games.json', () => ({
  default: {
    games: [
      {
        id: 1,
        title: 'Test Game',
        description: 'Test Description',
        price: 29.99,
        discount: 0,
        developer: 'Test Developer',
        publisher: 'Test Publisher',
        releaseDate: '2023-01-01',
        genres: ['Action', 'Adventure'],
        platforms: ['PC', 'PlayStation'],
        isFeatured: false,
        isNewRelease: true,
      },
    ],
  },
}));

describe('GameFormPage', () => {
  const renderComponent = (props = {}) => {
    return render(<GameFormPage {...props} />);
  };

  it('renders the create form correctly', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Ajouter un Jeu')).toBeInTheDocument();
      expect(screen.getByLabelText('Title')).toBeInTheDocument();
      expect(screen.getByLabelText('Description')).toBeInTheDocument();
      expect(screen.getByLabelText('Price')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Create Jeu' })).toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it('validates required fields', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Create Jeu' })).toBeInTheDocument();
    }, { timeout: 1000 });

    const submitButton = screen.getByRole('button', { name: 'Create Jeu' });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Title must be at least 3 characters')).toBeInTheDocument();
      expect(screen.getByText('Description must be at least 10 characters')).toBeInTheDocument();
      expect(screen.getByText('Price must be greater than 0')).toBeInTheDocument();
    }, { timeout: 1000 });
  });
}); 