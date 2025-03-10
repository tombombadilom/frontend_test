import { toast } from 'sonner';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Game, GameItem } from '@/types/game';
import type { Pack } from '@/types/pack';
import type { MigrateFunction } from '@/types/store';

type Product = Game | Pack | GameItem;

export interface WishlistItem {
  id: string;
  productId: string;
  addedAt: string;
  product: Product;
}

const generateId = () => Math.random().toString(36).substring(7);

const createWishlistItem = (product: Product): WishlistItem => ({
  id: generateId(),
  productId: product.id.toString(),
  addedAt: new Date().toISOString(),
  product,
});

export interface WishlistState {
  items: WishlistItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.productId === product.id.toString()
          );
          
          if (existingItem) {
            return state;
          }

          return {
            items: [...state.items, createWishlistItem(product)],
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      isInWishlist: (id) => get().items.some((item) => item.productId === id),

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'game-shop-wishlist',
      version: 2,
      migrate: ((persistedState: unknown, version: number) => {
        if (version === 0 || version === 1) {
          return {
            items: []
          };
        }
        return persistedState as WishlistState;
      }) as MigrateFunction<WishlistState>,
    }
  )
);
