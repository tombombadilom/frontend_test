import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: {
    amount: number;
    currency: string;
  };
  image: string;
  quantity: number;
  type: 'game' | 'object' | 'pack';
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

const calculateTotalItems = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          
          if (existingItem) {
            const newItems = state.items.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            );
            return {
              items: newItems,
              totalItems: calculateTotalItems(newItems),
            };
          }

          const newItems = [...state.items, { ...item, quantity: 1 }];
          return {
            items: newItems,
            totalItems: calculateTotalItems(newItems),
          };
        }),

      removeFromCart: (id) =>
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== id);
          return {
            items: newItems,
            totalItems: calculateTotalItems(newItems),
          };
        }),

      updateQuantity: (id, quantity) =>
        set((state) => {
          const newItems = state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(0, quantity) }
              : item
          );
          return {
            items: newItems,
            totalItems: calculateTotalItems(newItems),
          };
        }),

      clearCart: () => set({ items: [], totalItems: 0 }),

      getTotalPrice: () => {
        const state = get();
        return state.items.reduce(
          (total, item) => total + item.price.amount * item.quantity,
          0
        );
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
