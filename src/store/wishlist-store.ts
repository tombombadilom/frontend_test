import { toast } from 'sonner';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Game } from '@/types/game';
import type { MigrateFunction } from '@/types/store';

export interface WishlistItem {
  id: string;
  gameId: string;
  addedAt: string;
  game: Game;
}

const generateId = () => Math.random().toString(36).substring(7);

const createWishlistItem = (game: Game): WishlistItem => ({
  id: generateId(),
  gameId: game.gameId.toString(),
  addedAt: new Date().toISOString(),
  game,
});

export interface WishlistState {
  items: WishlistItem[];
  addItem: (game: Game) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (game) =>
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.gameId === game.gameId.toString()
          );
          
          if (existingItem) {
            return state;
          }

          return {
            items: [...state.items, createWishlistItem(game)],
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      isInWishlist: (id) => get().items.some((item) => item.id === id),

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'game-shop-wishlist',
      version: 1,
      migrate: ((persistedState: unknown, version: number) => {
        if (version === 0) {
          return {
            items: []
          };
        }
        return persistedState as WishlistState;
      }) as MigrateFunction<WishlistState>,
    }
  )
);
