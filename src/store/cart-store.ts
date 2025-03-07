import { create } from 'zustand';
import type { Game } from '@/types/game';

interface CartItem extends Game {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: Game) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,

  addItem: (item) => {
    const items = get().items;
    const existingItem = items.find((i) => i.id === item.id);

    if (existingItem) {
      const newItems = items.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
      set({
        items: newItems,
        totalItems: get().totalItems + 1,
        totalPrice: newItems.reduce((total, item) => {
          const finalPrice = item.price.amount * (1 - (item.price.discount || 0) / 100);
          return total + finalPrice * item.quantity;
        }, 0),
      });
    } else {
      const newItems = [...items, { ...item, quantity: 1 }];
      set({
        items: newItems,
        totalItems: get().totalItems + 1,
        totalPrice: newItems.reduce((total, item) => {
          const finalPrice = item.price.amount * (1 - (item.price.discount || 0) / 100);
          return total + finalPrice * item.quantity;
        }, 0),
      });
    }
  },

  removeItem: (id) => {
    const items = get().items;
    const itemToRemove = items.find((i) => i.id === id);
    if (itemToRemove) {
      const newItems = items.filter((item) => item.id !== id);
      set({
        items: newItems,
        totalItems: get().totalItems - itemToRemove.quantity,
        totalPrice: newItems.reduce((total, item) => {
          const finalPrice = item.price.amount * (1 - (item.price.discount || 0) / 100);
          return total + finalPrice * item.quantity;
        }, 0),
      });
    }
  },

  updateQuantity: (id, quantity) => {
    const items = get().items;
    const itemToUpdate = items.find((i) => i.id === id);
    if (itemToUpdate) {
      const quantityDiff = quantity - itemToUpdate.quantity;
      const newItems = items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      set({
        items: newItems,
        totalItems: get().totalItems + quantityDiff,
        totalPrice: newItems.reduce((total, item) => {
          const finalPrice = item.price.amount * (1 - (item.price.discount || 0) / 100);
          return total + finalPrice * item.quantity;
        }, 0),
      });
    }
  },

  clearCart: () => {
    set({ items: [], totalItems: 0, totalPrice: 0 });
  },
}));
