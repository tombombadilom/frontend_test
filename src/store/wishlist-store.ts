import { toast } from 'sonner';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Game } from '@/types/game';

export interface WishlistItem {
  id: string;
  gameId: string;
  addedAt: string;
  game: Game;
}

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
          const existingItem = state.items.find((i) => i.gameId === game.gameId);
          if (existingItem) return state;

          const newItem: WishlistItem = {
            id: Math.random().toString(36).substring(7),
            gameId: game.gameId.toString(),
            addedAt: new Date().toISOString(),
            game,
          };

          return {
            ...state,
            items: [...state.items, newItem],
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          ...state,
          items: state.items.filter((item) => item.id !== id),
        })),

      isInWishlist: (id) => {
        return get().items.some((item) => item.id === id);
      },

      clearWishlist: () =>
        set({
          items: [],
        }),
    }),
    {
      name: 'game-shop-wishlist',
    }
  )
);
