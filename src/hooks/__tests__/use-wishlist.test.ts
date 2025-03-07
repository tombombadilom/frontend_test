import { useWishlistStore } from '@/store/wishlist-store';
import { act, renderHook } from '@testing-library/react';
import { toast } from 'sonner';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useWishlist } from '../use-wishlist';
import { TestWrapper } from '@/test/test-utils';
import type { Game } from '@/types/game';

// Mock de Sonner toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock game avec le type correct
const mockGame: Game = {
  id: 1,
  gameId: 1,
  title: 'Test Game',
  description: 'Description',
  price: {
    amount: 59.99,
    currency: 'USD',
    discount: 0
  },
  releaseDate: '2023-01-01',
  developer: 'Dev',
  publisher: 'Pub',
  genres: ['Action'],
  platforms: ['PC'],
  coverImage: '/img.jpg',
  screenshots: [],
  rating: 4.5,
  isFeatured: true,
  isNewRelease: true
};

// Mock wishlist items
const mockWishlistItems = [
  {
    id: 1,
    name: 'Test Game',
    price: 59.99,
    image: '/img.jpg'
  },
  {
    id: 2,
    name: 'Another Game',
    price: 49.99,
    image: '/img2.jpg'
  }
];

describe('useWishlist hook', () => {
  beforeEach(() => {
    act(() => {
      useWishlistStore.setState({ items: [] });
    });
    vi.clearAllMocks();
  });

  it('should handle adding and removing items', () => {
    const { result } = renderHook(() => useWishlist(), {
      wrapper: TestWrapper,
    });

    // Test adding a game
    act(() => {
      result.current.addGameToWishlist(mockGame);
    });
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toEqual(mockGame);
    expect(toast.success).toHaveBeenCalledWith('Test Game ajouté aux favoris');

    // Test removing the game
    act(() => {
      result.current.removeItem(1);
    });
    expect(result.current.items).toHaveLength(0);
    expect(toast.success).toHaveBeenCalledWith('Produit retiré des favoris');
  });

  it('should handle duplicate items and wishlist state', () => {
    const { result } = renderHook(() => useWishlist(), {
      wrapper: TestWrapper,
    });

    // Test adding duplicate items
    act(() => {
      result.current.addGameToWishlist(mockGame);
      result.current.addGameToWishlist(mockGame);
    });
    expect(result.current.items).toHaveLength(1);
    expect(toast.error).toHaveBeenCalledWith('Ce produit est déjà dans vos favoris');

    // Test checking item presence
    expect(result.current.isInWishlist(1)).toBe(true);
    expect(result.current.isInWishlist(2)).toBe(false);
  });

  it('should handle wishlist clearing', () => {
    const { result } = renderHook(() => useWishlist(), {
      wrapper: TestWrapper,
    });

    act(() => {
      result.current.addGameToWishlist(mockGame);
      const secondGame: Game = {
        ...mockGame,
        id: 2,
        gameId: 2,
        title: 'Another Game'
      };
      result.current.addGameToWishlist(secondGame);
      result.current.clearWishlist();
    });

    expect(result.current.items).toHaveLength(0);
    expect(toast.success).toHaveBeenCalledWith('Liste de favoris vidée');
  });
});
