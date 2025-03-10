import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import PackFormPage from '../pack-form';
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

// Mock packs.json
vi.mock('@/data/packs.json', () => ({
  default: {
    packs: [
      {
        id: 1,
        name: 'Test Pack',
        description: 'Test Description',
        price: {
          amount: 49.99,
          currency: 'USD',
        },
        discount: 10,
        type: 'bundle',
        gameId: 1,
        availability: {
          isLimited: false,
          startDate: '2024-01-01',
          endDate: '2024-12-31',
        },
        items: [1, 2, 3],
        tags: ['Test'],
        isFeatured: false,
        isNewRelease: true,
      },
    ],
  },
}));

describe('PackFormPage', () => {
  const renderComponent = (props = {}) => {
    return render(<PackFormPage {...props} />);
  };

  it('renders the create form correctly', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Ajouter un pack')).toBeInTheDocument();
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Description')).toBeInTheDocument();
      expect(screen.getByLabelText('Price')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /create pack/i })).toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it('validates required fields', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /create pack/i })).toBeInTheDocument();
    }, { timeout: 1000 });

    const submitButton = screen.getByRole('button', { name: /create pack/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Le nom doit contenir au moins 3 caractères')).toBeInTheDocument();
      expect(screen.getByText('La description doit contenir au moins 10 caractères')).toBeInTheDocument();
      expect(screen.getByText('Le prix doit être supérieur à 0')).toBeInTheDocument();
    }, { timeout: 1000 });
  });
}); 