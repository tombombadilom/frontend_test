import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import ObjectFormPage from '../object-form';
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

// Mock objects.json
vi.mock('@/data/objects.json', () => ({
  default: {
    items: [
      {
        id: 1,
        name: 'Test Object',
        description: 'Test Description',
        price: {
          amount: 29.99,
          currency: 'USD',
        },
        category: 1,
        type: 'Weapon',
        rarity: 'Common',
        availability: {
          isLimited: false,
          startDate: '2024-01-01',
          endDate: '2024-12-31',
        },
        preview: {
          imageUrl: 'test.jpg',
          videoUrl: 'test.mp4',
          modelUrl: 'test.glb',
        },
        tags: ['Test'],
        isFeatured: false,
        isNewRelease: true,
      },
    ],
  },
}));

describe('ObjectFormPage', () => {
  const renderComponent = (props = {}) => {
    return render(<ObjectFormPage {...props} />);
  };

  it('renders the create form correctly', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('Ajouter un objet')).toBeInTheDocument();
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Description')).toBeInTheDocument();
      expect(screen.getByLabelText('Price')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /create object/i })).toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it('validates required fields', async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /create object/i })).toBeInTheDocument();
    }, { timeout: 1000 });

    const submitButton = screen.getByRole('button', { name: /create object/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Name must be at least 3 characters')).toBeInTheDocument();
      expect(screen.getByText('Description must be at least 10 characters')).toBeInTheDocument();
      expect(screen.getByText('Price must be greater than 0')).toBeInTheDocument();
    }, { timeout: 1000 });
  });
}); 