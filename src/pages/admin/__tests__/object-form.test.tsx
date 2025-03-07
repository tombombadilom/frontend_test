import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import ObjectFormPage from '../object-form';
import { useObjects } from '@/hooks/useObjects';
import { userEvent } from '@testing-library/user-event';

// Mock des modules
vi.mock('@/lib/toast', () => ({
  showToast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('@/data/objects.json', () => ({
  default: {
    items: [
      {
        id: 1001,
        name: 'Test Object',
        description: 'A test object description',
        category: 101,
        rarity: 'legendary',
        price: {
          amount: 2000,
          currency: 'V-Bucks',
        },
        availability: {
          startDate: '2024-01-01T00:00:00Z',
          endDate: '2024-12-31T23:59:59Z',
          isLimited: true,
        },
        preview: {
          imageUrl: '/images/items/test-object.jpg',
          videoUrl: '/videos/items/test-object.mp4',
          modelUrl: '/models/items/test-object.glb',
        },
        gameId: 9,
        tags: ['test', 'legendary'],
        metadata: {
          testData: 'value',
        },
        type: 'weapon',
        isFeatured: true,
        isNewRelease: true,
      },
    ],
  },
}));

vi.mock('@/hooks/useObjects', () => ({
  useObjects: vi.fn(),
}));

const mockObject = {
  id: 1,
  title: 'Test Object',
  description: 'Test Description',
  price: {
    amount: 10,
    currency: 'EUR',
    discount: 0,
  },
  releaseDate: '2024-01-01',
  developer: 'Test Developer',
  publisher: 'Test Publisher',
  genres: ['Action'],
  platforms: ['PC'],
  coverImage: 'https://via.placeholder.com/300x400',
  screenshots: [],
  rating: 4.5,
  isFeatured: false,
  isNewRelease: false,
  gameId: 1,
};

describe('ObjectFormPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useObjects as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      objects: [mockObject],
      isLoading: false,
      error: null,
      addObject: vi.fn(),
      updateObject: vi.fn(),
      deleteObject: vi.fn(),
    });
  });

  const renderComponent = (props = {}) => {
    return render(
      <BrowserRouter>
        <ThemeProvider>
          <ObjectFormPage {...props} />
        </ThemeProvider>
      </BrowserRouter>
    );
  };

  it('renders the create form correctly', () => {
    renderComponent();

    expect(screen.getByText('Add a product')).toBeInTheDocument();
    expect(screen.getByText('Add a new product to the catalog')).toBeInTheDocument();
    expect(screen.getByText('General information')).toBeInTheDocument();
  });

  it('renders the edit form correctly with existing data', async () => {
    renderComponent({ editMode: true });

    await waitFor(() => {
      expect(screen.getByText('Modifier le Jeu')).toBeInTheDocument();
      expect(screen.getByText('Modifiez les informations du Jeu')).toBeInTheDocument();
    });
  });

  it('allows adding and removing tags', async () => {
    renderComponent();

    const tagInput = screen.getByLabelText(/tags/i);
    await userEvent.type(tagInput, 'Action{enter}');

    expect(screen.getByText('Action')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /remove action/i }));
    expect(screen.queryByText('Action')).not.toBeInTheDocument();
  });

  it('validates required fields on submit', async () => {
    renderComponent();

    const submitButton = screen.getByRole('button', { name: /create product/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Title must be at least 3 characters')).toBeInTheDocument();
      expect(screen.getByText('Description must be at least 10 characters')).toBeInTheDocument();
      expect(screen.getByText('Release date is required')).toBeInTheDocument();
    });
  });

  it('handles availability dates correctly', async () => {
    renderComponent();

    const startDateInput = screen.getByLabelText(/start date/i);
    const endDateInput = screen.getByLabelText(/end date/i);

    await userEvent.type(startDateInput, '2024-01-01');
    await userEvent.type(endDateInput, '2024-12-31');

    expect(startDateInput).toHaveValue('2024-01-01');
    expect(endDateInput).toHaveValue('2024-12-31');
  });
}); 