import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Price, Game } from '@/types/game';

export interface CartItem {
  id: string;
  name: string;
  price: Game['price'];
  image: string;
  quantity: number;
}

const calculateDiscountedPrice = (price: Price, quantity = 1) => {
  const discountMultiplier = 1 - (price.discount || 0) / 100;
  return price.amount * discountMultiplier * quantity;
};

const calculateTotalPrice = (items: CartItem[]): Price => {
  const totalAmount = items.reduce(
    (total, item) => total + calculateDiscountedPrice(item.price, item.quantity),
    0
  );

  return {
    amount: totalAmount,
    currency: items[0]?.price.currency || 'EUR',
    discount: 0,
  };
};

const calculateTotalItems = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: Price;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, _get) => ({
      items: [],
      totalItems: 0,
      totalPrice: {
        amount: 0,
        currency: 'EUR',
        discount: 0,
      },

      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          const newItems = existingItem
            ? state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              )
            : [...state.items, { ...item, quantity: 1 }];

          return {
            items: newItems,
            totalItems: calculateTotalItems(newItems),
            totalPrice: calculateTotalPrice(newItems),
          };
        }),

      removeItem: (id) =>
        set((state) => {
          const newItems = state.items.filter((i) => i.id !== id);
          
          return {
            items: newItems,
            totalItems: calculateTotalItems(newItems),
            totalPrice: calculateTotalPrice(newItems),
          };
        }),

      updateQuantity: (id, quantity) =>
        set((state) => {
          if (quantity < 1) {
            const newItems = state.items.filter((i) => i.id !== id);
            return {
              items: newItems,
              totalItems: calculateTotalItems(newItems),
              totalPrice: calculateTotalPrice(newItems),
            };
          }

          const newItems = state.items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          );

          return {
            items: newItems,
            totalItems: calculateTotalItems(newItems),
            totalPrice: calculateTotalPrice(newItems),
          };
        }),

      clearCart: () => set({
        items: [],
        totalItems: 0,
        totalPrice: {
          amount: 0,
          currency: 'EUR',
          discount: 0,
        },
      }),
    }),
    {
      name: 'game-shop-cart',
      version: 1,
      migrate: (persistedState: unknown, version: number) => {
        if (version === 0) {
          return {
            items: [],
            totalItems: 0,
            totalPrice: {
              amount: 0,
              currency: 'EUR',
              discount: 0,
            }
          };
        }
        return persistedState as CartState;
      }
    }
  )
);
