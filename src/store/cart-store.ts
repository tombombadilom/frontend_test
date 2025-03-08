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
    (set) => ({
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
          if (existingItem) {
            return {
              ...state,
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
              totalPrice: {
                ...state.totalPrice,
                amount:
                  state.totalPrice.amount +
                  item.price.amount * (1 - (item.price.discount || 0) / 100),
              },
            };
          }
          return {
            ...state,
            items: [...state.items, { ...item, quantity: 1 }],
            totalPrice: {
              ...state.totalPrice,
              amount:
                state.totalPrice.amount +
                item.price.amount * (1 - (item.price.discount || 0) / 100),
            },
          };
        }),

      removeItem: (id) =>
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (!item) return state;

          return {
            ...state,
            items: state.items.filter((i) => i.id !== id),
            totalPrice: {
              ...state.totalPrice,
              amount:
                state.totalPrice.amount -
                item.price.amount *
                  (1 - (item.price.discount || 0) / 100) *
                  item.quantity,
            },
          };
        }),

      updateQuantity: (id, quantity) =>
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (!item) return state;

          const oldTotal =
            item.price.amount *
            (1 - (item.price.discount || 0) / 100) *
            item.quantity;
          const newTotal =
            item.price.amount *
            (1 - (item.price.discount || 0) / 100) *
            quantity;

          return {
            ...state,
            items: state.items.map((i) =>
              i.id === id ? { ...i, quantity } : i
            ),
            totalPrice: {
              ...state.totalPrice,
              amount: state.totalPrice.amount - oldTotal + newTotal,
            },
          };
        }),

      clearCart: () =>
        set({
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
    }
  )
);
