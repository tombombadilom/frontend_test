import { act } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useCartStore } from '../cart-store';
import type { Game } from '@/types/game';

const mockGame: Game = {
  id: 1,
  gameId: 1,
  title: 'Test Game',
  description: 'A test game',
  price: { amount: 59.99, currency: 'USD', discount: 0 },
  releaseDate: '2023-01-01',
  developer: 'Test Developer',
  publisher: 'Test Publisher',
  genres: ['Action'],
  platforms: ['PC'],
  coverImage: '/test-image.jpg',
  screenshots: [],
  rating: 4.5,
  isNewRelease: false,
};

describe('Cart Store', () => {
  beforeEach(() => {
    // Réinitialiser le store avant chaque test
    act(() => {
      useCartStore.setState({
        items: [],
        totalItems: 0,
        totalPrice: 0,
      });
    });
  });

  it('should add an item to the cart', () => {
    act(() => {
      useCartStore.getState().addItem(mockGame);
    });

    const state = useCartStore.getState();
    expect(state.items.length).toBe(1);
    expect(state.items[0].id).toBe(1);
    expect(state.items[0].quantity).toBe(1);
    expect(state.totalItems).toBe(1);
    expect(state.totalPrice).toBe(59.99);
  });

  it('should increase quantity when adding the same item', () => {
    act(() => {
      const { addItem } = useCartStore.getState();
      addItem(mockGame);
      addItem(mockGame);
    });

    const state = useCartStore.getState();
    expect(state.items.length).toBe(1);
    expect(state.items[0].quantity).toBe(2);
    expect(state.totalItems).toBe(2);
    expect(state.totalPrice).toBe(119.98);
  });

  it('should remove an item from the cart', () => {
    act(() => {
      const { addItem } = useCartStore.getState();
      addItem(mockGame);
    });

    act(() => {
      useCartStore.getState().removeItem(1);
    });

    const state = useCartStore.getState();
    expect(state.items.length).toBe(0);
    expect(state.totalItems).toBe(0);
    expect(state.totalPrice).toBe(0);
  });

  it('should update item quantity', () => {
    act(() => {
      const { addItem } = useCartStore.getState();
      addItem(mockGame);
    });

    act(() => {
      useCartStore.getState().updateQuantity(1, 3);
    });

    const state = useCartStore.getState();
    expect(state.items[0].quantity).toBe(3);
    expect(state.totalItems).toBe(3);
    expect(state.totalPrice).toBe(179.97);
  });

  it('should clear the cart', () => {
    act(() => {
      const { addItem } = useCartStore.getState();
      addItem(mockGame);
      addItem({
        ...mockGame,
        id: 2,
        gameId: 2,
        title: 'Another Game',
      });
    });

    act(() => {
      useCartStore.getState().clearCart();
    });

    const state = useCartStore.getState();
    expect(state.items.length).toBe(0);
    expect(state.totalItems).toBe(0);
    expect(state.totalPrice).toBe(0);
  });

  it('adds item to cart', () => {
    const game: Game = {
      id: 1,
      gameId: 1,
      title: 'Game 1',
      description: 'Test game',
      price: { amount: 10, currency: 'USD', discount: 0 },
      releaseDate: '2023-01-01',
      developer: 'Test Dev',
      publisher: 'Test Pub',
      genres: ['Action'],
      platforms: ['PC'],
      coverImage: '/test.jpg',
      screenshots: [],
      rating: 4.5,
      isNewRelease: false,
    };

    act(() => {
      useCartStore.getState().addItem(game);
    });

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe(1);
  });
});
