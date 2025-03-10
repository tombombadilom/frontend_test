import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { GameCard } from '../game-card';
import { useCartStore } from '@/store/cart-store';
import { useWishlist } from '@/hooks/use-wishlist';
import { useHistoryStore } from '@/store/history-store';
import { showToast } from '@/lib/toast';
import type { Game } from '@/types/game';
import { describe, expect, it, vi } from 'vitest';

// Mock stores and hooks
vi.mock('@/store/cart-store', () => ({
  useCartStore: vi.fn(),
}));

vi.mock('@/hooks/use-wishlist', () => ({
  useWishlist: vi.fn(),
}));

vi.mock('@/store/history-store', () => ({
  useHistoryStore: vi.fn(),
}));

vi.mock('@/lib/toast', () => ({
  showToast: {
    success: vi.fn(),
  },
}));

const mockGame: Game = {
  id: 1,
  gameId: 1,
  title: 'Test Game',
  description: 'Test Description',
  price: {
    amount: 29.99,
    currency: 'EUR',
    discount: 0
  },
  coverImage: 'test-image.jpg',
  screenshots: ['screenshot1.jpg', 'screenshot2.jpg'],
  releaseDate: '2024-01-01',
  developer: 'Test Developer',
  publisher: 'Test Publisher',
  genres: ['Action', 'Adventure'],
  platforms: ['PC', 'PS5'],
  rating: 4.5,
  isFeatured: true,
  isNewRelease: true,
};

describe('GameCard', () => {
  const mockAddItem = vi.fn();
  const mockAddGameToWishlist = vi.fn();
  const mockRemoveItem = vi.fn();
  const mockIsInWishlist = vi.fn();
  const mockAddToRecentlyViewed = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useCartStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) => {
      if (selector) {
        return selector({ addItem: mockAddItem });
      }
      return { addItem: mockAddItem };
    });
    (useWishlist as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      addGameToWishlist: mockAddGameToWishlist,
      removeItem: mockRemoveItem,
      isInWishlist: mockIsInWishlist,
    });
    (useHistoryStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      addToRecentlyViewed: mockAddToRecentlyViewed,
    });
  });

  it('renders game information correctly', () => {
    render(
      <MemoryRouter>
        <GameCard game={mockGame} />
      </MemoryRouter>
    );

    expect(screen.getByText(mockGame.title)).toBeInTheDocument();
    expect(screen.getByText('29,99 €')).toBeInTheDocument();
    expect(screen.getByText('PC')).toBeInTheDocument();
    expect(screen.getByText('PS5')).toBeInTheDocument();
  });

  it('adds game to cart when clicking add to cart button', () => {
    render(
      <MemoryRouter>
        <GameCard game={mockGame} />
      </MemoryRouter>
    );

    const addToCartButton = screen.getByRole('button', {
      name: /ajouter au panier/i,
    });
    fireEvent.click(addToCartButton);

    expect(mockAddItem).toHaveBeenCalledWith(mockGame);
    expect(showToast.success).toHaveBeenCalledWith('Added to cart');
  });

  it('adds game to wishlist when clicking wishlist button', () => {
    mockIsInWishlist.mockReturnValue(false);
    render(
      <MemoryRouter>
        <GameCard game={mockGame} />
      </MemoryRouter>
    );

    const wishlistButton = screen.getByRole('button', { name: /ajouter aux favoris/i });
    fireEvent.click(wishlistButton);

    expect(mockAddGameToWishlist).toHaveBeenCalledWith(mockGame);
    expect(showToast.success).toHaveBeenCalledWith('Added to wishlist');
  });

  it('removes game from wishlist when clicking wishlist button again', () => {
    mockIsInWishlist.mockReturnValue(true);
    render(
      <MemoryRouter>
        <GameCard game={mockGame} />
      </MemoryRouter>
    );

    const wishlistButton = screen.getByRole('button', { name: /retirer des favoris/i });
    fireEvent.click(wishlistButton);

    expect(mockRemoveItem).toHaveBeenCalledWith(mockGame.id);
    expect(showToast.success).toHaveBeenCalledWith('Removed from wishlist');
  });

  it('adds game to recently viewed when clicking game link', () => {
    render(
      <MemoryRouter>
        <GameCard game={mockGame} />
      </MemoryRouter>
    );

    const gameLink = screen.getByRole('link', { name: /test game/i });
    fireEvent.click(gameLink);

    expect(mockAddToRecentlyViewed).toHaveBeenCalledWith(mockGame);
  });

  it('renders game without discount correctly', () => {
    const gameWithoutDiscount = { 
      ...mockGame, 
      price: {
        ...mockGame.price,
        discount: 0
      }
    };

    render(
      <MemoryRouter>
        <GameCard game={gameWithoutDiscount} />
      </MemoryRouter>
    );

    // Check that regular price is displayed
    expect(screen.getByText('29,99 €')).toBeInTheDocument();

    // Check that there is no discount label
    expect(screen.queryByText(/-\d+%/)).not.toBeInTheDocument();
  });
});
