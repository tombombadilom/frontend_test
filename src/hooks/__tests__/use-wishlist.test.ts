import { useWishlistStore } from '@/store/wishlist-store';
import { act, renderHook } from '@testing-library/react';
import { toast } from 'sonner';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useWishlist } from '../use-wishlist';
import { TestWrapper } from '@/test/test-utils';
import { mockWishlistItems } from '@/test/mocks/wishlist';

// Mock de Sonner toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockGame = {
  id: 1,
  title: 'Test Game',
  description: 'Description',
  price: 59.99,
  discount: 0,
  releaseDate: '2023-01-01',
  developer: 'Dev',
  publisher: 'Pub',
  genres: ['Action'],
  platforms: ['PC'],
  coverImage: '/img.jpg',
  screenshots: [],
  rating: 4.5,
  isFeatured: true,
  isNewRelease: true,
  gameId: 1
};

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
    expect(result.current.items[0]).toMatchObject({
      id: 1,
      name: 'Test Game'
    });
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
      result.current.addItem(mockWishlistItems[0]);
      result.current.addItem(mockWishlistItems[0]);
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
      result.current.addItem(mockWishlistItems[0]);
      result.current.addItem(mockWishlistItems[1]);
      result.current.clearWishlist();
    });

    expect(result.current.items).toHaveLength(0);
    expect(toast.success).toHaveBeenCalledWith('Liste de favoris vidée');
  });
});
