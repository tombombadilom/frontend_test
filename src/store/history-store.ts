import type { Game } from '@/types/game';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface HistoryState {
  recentlyViewed: {
    id: number;
    title: string;
    coverImage: string;
    timestamp: number;
  }[];
  addToRecentlyViewed: (game: Game) => void;
  clearRecentlyViewed: () => void;
}

const MAX_HISTORY_ITEMS = 10;

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      recentlyViewed: [],

      addToRecentlyViewed: (game) =>
        set((state) => {
          // Filtrer les entrées existantes pour éviter les doublons
          const filtered = state.recentlyViewed.filter(
            (item) => item.id !== game.id
          );

          // Ajouter le nouveau jeu au début
          const updated = [
            {
              id: game.id,
              title: game.title,
              coverImage: game.coverImage,
              timestamp: Date.now(),
            },
            ...filtered,
          ].slice(0, MAX_HISTORY_ITEMS); // Limiter à MAX_HISTORY_ITEMS

          return { recentlyViewed: updated };
        }),

      clearRecentlyViewed: () => set({ recentlyViewed: [] }),
    }),
    {
      name: 'game-shop-history',
    }
  )
);
