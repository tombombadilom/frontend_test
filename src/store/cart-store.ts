import { create } from 'zustand';
import type { Game } from '@/types/game';

interface CartItem extends Game {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Game) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => {
    const items = get().items;
    const existingItem = items.find((i) => i.id === item.id);

    if (existingItem) {
      set({
        items: items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({ items: [...items, { ...item, quantity: 1 }] });
    }
  },
  removeItem: (id) => {
    set({ items: get().items.filter((item) => item.id !== id) });
  },
  updateQuantity: (id, quantity) => {
    set({
      items: get().items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    });
  },
  clearCart: () => {
    set({ items: [] });
  },
  get totalPrice() {
    return get().items.reduce((total, item) => {
      const finalPrice = item.price.amount * (1 - (item.price.discount || 0) / 100);
      return total + finalPrice * item.quantity;
    }, 0);
  },
}));
