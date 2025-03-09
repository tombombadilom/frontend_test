import type { Game } from '@/types/game';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MigrateFunction } from '@/types/store';

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

const _MAX_HISTORY_ITEMS = 10;

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      recentlyViewed: [],

      addToRecentlyViewed: (game) =>
        set((state) => {
          const newItem = {
            id: game.id,
            title: game.title,
            coverImage: game.coverImage,
            timestamp: Date.now(),
          };

          // Filtrer les doublons et garder les 10 plus récents
          const filteredHistory = state.recentlyViewed
            .filter((item) => item.id !== game.id)
            .slice(0, 9);

          return {
            recentlyViewed: [newItem, ...filteredHistory],
          };
        }),

      clearRecentlyViewed: () => set({ recentlyViewed: [] }),
    }),
    {
      name: 'history-storage',
      version: 1,
      migrate: ((persistedState: unknown, version: number) => {
        if (version === 0) {
          return {
            recentlyViewed: []
          };
        }
        return persistedState as HistoryState;
      }) as MigrateFunction<HistoryState>,
    }
  )
);
