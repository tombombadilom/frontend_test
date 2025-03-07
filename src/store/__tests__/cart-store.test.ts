import { act } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useCartStore } from '../cart-store';

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
      useCartStore.getState().addItem({
        id: '1',
        name: 'Test Game',
        price: 59.99,
        image: '/test-image.jpg',
      });
    });

    const state = useCartStore.getState();
    expect(state.items.length).toBe(1);
    expect(state.items[0].id).toBe('1');
    expect(state.items[0].quantity).toBe(1);
    expect(state.totalItems).toBe(1);
    expect(state.totalPrice).toBe(59.99);
  });

  it('should increase quantity when adding the same item', () => {
    act(() => {
      const { addItem } = useCartStore.getState();
      addItem({
        id: '1',
        name: 'Test Game',
        price: 59.99,
        image: '/test-image.jpg',
      });
      addItem({
        id: '1',
        name: 'Test Game',
        price: 59.99,
        image: '/test-image.jpg',
      });
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
      addItem({
        id: '1',
        name: 'Test Game',
        price: 59.99,
        image: '/test-image.jpg',
      });
    });

    act(() => {
      useCartStore.getState().removeItem('1');
    });

    const state = useCartStore.getState();
    expect(state.items.length).toBe(0);
    expect(state.totalItems).toBe(0);
    expect(state.totalPrice).toBe(0);
  });

  it('should update item quantity', () => {
    act(() => {
      const { addItem } = useCartStore.getState();
      addItem({
        id: '1',
        name: 'Test Game',
        price: 59.99,
        image: '/test-image.jpg',
      });
    });

    act(() => {
      useCartStore.getState().updateQuantity('1', 3);
    });

    const state = useCartStore.getState();
    expect(state.items[0].quantity).toBe(3);
    expect(state.totalItems).toBe(3);
    expect(state.totalPrice).toBe(179.97);
  });

  it('should clear the cart', () => {
    act(() => {
      const { addItem } = useCartStore.getState();
      addItem({
        id: '1',
        name: 'Test Game',
        price: 59.99,
        image: '/test-image.jpg',
      });
      addItem({
        id: '2',
        name: 'Another Game',
        price: 49.99,
        image: '/another-image.jpg',
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
});
