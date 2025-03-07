import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import PackFormPage from '../pack-form';
import { usePacks } from '@/hooks/usePacks';
import userEvent from '@testing-library/user-event';

// Mock des modules
vi.mock('@/lib/toast', () => ({
  showToast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('@/data/packs.json', () => ({
  default: {
    packs: [
      {
        id: 1,
        name: 'Test Pack',
        description: 'A test pack description',
        items: [1, 2],
        price: {
          amount: 19.99,
          currency: 'USD',
          discount: 10,
        },
        availability: {
          startDate: '2024-01-01T00:00:00Z',
          endDate: '2024-12-31T23:59:59Z',
          isLimited: true,
        },
        type: 'bundle',
        gameId: 1,
        tags: ['bundle', 'premium'],
        metadata: {},
        isActive: true,
        isFeatured: true,
        isNewRelease: true,
      },
    ],
  },
}));

vi.mock('@/hooks/use-packs', () => ({
  usePacks: () => ({
    packs: [],
    isLoading: false,
    error: null,
    addPack: vi.fn(),
    updatePack: vi.fn(),
    deletePack: vi.fn(),
  }),
}));

const mockPack = {
  id: 1,
  title: 'Test Pack',
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
  items: [],
  tags: [],
};

describe('PackFormPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (usePacks as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      packs: [mockPack],
      isLoading: false,
      error: null,
      addPack: vi.fn(),
      updatePack: vi.fn(),
      deletePack: vi.fn(),
    });
  });

  const renderComponent = (props = {}) => {
    return render(
      <BrowserRouter>
        <ThemeProvider>
          <PackFormPage {...props} />
        </ThemeProvider>
      </BrowserRouter>
    );
  };

  it('renders the create form correctly', () => {
    renderComponent();

    expect(screen.getByText('Ajouter un pack')).toBeInTheDocument();
    expect(screen.getByText('Ajoutez un nouveau pack au catalogue')).toBeInTheDocument();
    expect(screen.getByText('General information')).toBeInTheDocument();
  });

  it('renders the edit form correctly with existing data', async () => {
    renderComponent({ editMode: true });

    await waitFor(() => {
      expect(screen.getByText('Modifier un pack')).toBeInTheDocument();
      expect(screen.getByText('Modifiez les informations du pack')).toBeInTheDocument();
    });
  });

  it('allows adding and removing items', async () => {
    renderComponent();

    const itemInput = screen.getByLabelText(/éléments/i);
    await userEvent.type(itemInput, 'Item 1{enter}');

    expect(screen.getByText('Item 1')).toBeInTheDocument();

    const removeButton = screen.getByRole('button', { name: /supprimer/i });
    await userEvent.click(removeButton);

    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
  });

  it('allows adding and removing tags', async () => {
    renderComponent();

    const tagInput = screen.getByLabelText(/étiquettes/i);
    await userEvent.type(tagInput, 'Action{enter}');

    expect(screen.getByText('Action')).toBeInTheDocument();

    const removeButton = screen.getByRole('button', { name: /supprimer/i });
    await userEvent.click(removeButton);

    expect(screen.queryByText('Action')).not.toBeInTheDocument();
  });

  it('validates required fields on submit', async () => {
    renderComponent();

    const submitButton = screen.getByRole('button', { name: /enregistrer/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Le nom doit contenir au moins 3 caractères')).toBeInTheDocument();
      expect(screen.getByText('La description doit contenir au moins 10 caractères')).toBeInTheDocument();
    });
  });
}); 