import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import GameFormPage from '../game-form';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { useGames } from '@/hooks/use-games';
import userEvent from '@testing-library/user-event';

// Mock des modules
vi.mock('@/lib/toast', () => ({
  showToast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('@/data/games.json', () => ({
  default: [
    {
      id: 1,
      gameId: 1,
      title: 'Test Game',
      description: 'A test game description',
      price: 59.99,
      discount: 0,
      releaseDate: '2024-01-01',
      developer: 'Test Developer',
      publisher: 'Test Publisher',
      genres: ['Action', 'Adventure'],
      platforms: ['PC', 'PS5'],
      coverImage: 'test-image.jpg',
      screenshots: ['screenshot1.jpg'],
      rating: 4.5,
      isFeatured: true,
      isNewRelease: true,
    },
  ],
}));

vi.mock('@/hooks/use-games', () => ({
  useGames: vi.fn(),
}));

const _mockGame = {
  id: 1,
  gameId: 1,
  title: 'Test Game',
  description: 'A test game description',
  price: 59.99,
  discount: 0,
  releaseDate: '2024-01-01',
  developer: 'Test Developer',
  publisher: 'Test Publisher',
  genres: ['Action', 'Adventure'],
  platforms: ['PC', 'PS5'],
  coverImage: 'test-image.jpg',
  screenshots: ['screenshot1.jpg'],
  rating: 4.5,
  isFeatured: true,
  isNewRelease: true,
};

describe('GameFormPage', () => {
  const mockAddGame = vi.fn();
  const mockUpdateGame = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useGames as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      games: [
        {
          id: 1,
          title: 'Test Game',
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
        },
      ],
      isLoading: false,
      error: null,
      addGame: mockAddGame,
      updateGame: mockUpdateGame,
      deleteGame: vi.fn(),
    });
  });

  const renderComponent = (gameId?: string) => {
    return render(
      <BrowserRouter>
        <ThemeProvider>
          <GameFormPage editMode={!!gameId} />
        </ThemeProvider>
      </BrowserRouter>
    );
  };

  it('renders the create form correctly', () => {
    render(<GameFormPage />);

    expect(screen.getByText('Add a game')).toBeInTheDocument();
    expect(screen.getByText('Add a new game to the catalog')).toBeInTheDocument();
    expect(screen.getByText('General information')).toBeInTheDocument();
  });

  it('renders the edit form correctly', async () => {
    render(<GameFormPage editMode />);

    await waitFor(() => {
      expect(screen.getByText('Modifier le Jeu')).toBeInTheDocument();
      expect(screen.getByText('Modifiez les informations du Jeu')).toBeInTheDocument();
    });
  });

  it('shows validation errors for invalid data', async () => {
    render(<GameFormPage />);

    const submitButton = screen.getByRole('button', { name: /create game/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Title must be at least 3 characters')).toBeInTheDocument();
      expect(screen.getByText('Description must be at least 10 characters')).toBeInTheDocument();
      expect(screen.getByText('Release date is required')).toBeInTheDocument();
    });
  });

  it('submits the form with valid data', async () => {
    render(<GameFormPage />);

    // Fill in the form with valid data
    await userEvent.type(screen.getByLabelText(/title/i), 'New Game');
    await userEvent.type(screen.getByLabelText(/description/i), 'This is a new game description');
    await userEvent.type(screen.getByLabelText(/release date/i), '2024-01-01');
    await userEvent.type(screen.getByLabelText(/developer/i), 'Test Developer');
    await userEvent.type(screen.getByLabelText(/publisher/i), 'Test Publisher');

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /create game/i });
    await userEvent.click(submitButton);

    // Wait for the form submission
    await waitFor(() => {
      expect(mockAddGame).toHaveBeenCalledWith(expect.objectContaining({
        title: 'New Game',
        description: 'This is a new game description',
        releaseDate: '2024-01-01',
        developer: 'Test Developer',
        publisher: 'Test Publisher',
      }));
    });
  });

  it('allows adding and removing genres', async () => {
    renderComponent();

    const genreInput = screen.getByPlaceholderText('Add a genre');
    const addGenreButton = screen.getByRole('button', { name: /Add genre/i });

    fireEvent.change(genreInput, { target: { value: 'Action' } });
    fireEvent.click(addGenreButton);

    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Remove Action/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Remove Action/i }));
    expect(screen.queryByText('Action')).not.toBeInTheDocument();
  });

  it('allows adding and removing platforms', async () => {
    renderComponent();

    const platformInput = screen.getByPlaceholderText('Add a platform');
    const addPlatformButton = screen.getByRole('button', { name: /Add platform/i });

    fireEvent.change(platformInput, { target: { value: 'PC' } });
    fireEvent.click(addPlatformButton);

    expect(screen.getByText('PC')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Remove PC/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Remove PC/i }));
    expect(screen.queryByText('PC')).not.toBeInTheDocument();
  });
}); 