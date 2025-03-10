import type { GameItem } from '@/types/game';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MigrateFunction } from '@/types/store';

interface ObjectHistoryState {
  recentlyViewed: {
    id: number;
    name: string;
    preview: {
      imageUrl: string;
    };
    timestamp: number;
  }[];
  addToRecentlyViewed: (object: GameItem) => void;
  clearRecentlyViewed: () => void;
}

const _MAX_HISTORY_ITEMS = 10;

export const useObjectHistoryStore = create<ObjectHistoryState>()(
  persist(
    (set) => ({
      recentlyViewed: [],

      addToRecentlyViewed: (object) =>
        set((state) => {
          const newItem = {
            id: object.id,
            name: object.name,
            preview: object.preview,
            timestamp: Date.now(),
          };

          // Filtrer les doublons et garder les 10 plus récents
          const filteredHistory = state.recentlyViewed
            .filter((item) => item.id !== object.id)
            .slice(0, 9);

          return {
            recentlyViewed: [newItem, ...filteredHistory],
          };
        }),

      clearRecentlyViewed: () => set({ recentlyViewed: [] }),
    }),
    {
      name: 'object-history-storage',
      version: 1,
      migrate: ((persistedState: unknown, version: number) => {
        if (version === 0) {
          return {
            recentlyViewed: []
          };
        }
        return persistedState as ObjectHistoryState;
      }) as MigrateFunction<ObjectHistoryState>,
    }
  )
); 