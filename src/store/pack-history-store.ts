import type { Pack } from '@/types/pack';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MigrateFunction } from '@/types/store';

interface PackHistoryState {
  recentlyViewed: {
    id: number;
    name: string;
    coverImage: string;
    timestamp: number;
  }[];
  addToRecentlyViewed: (pack: Pack) => void;
  clearRecentlyViewed: () => void;
}

const _MAX_HISTORY_ITEMS = 10;

export const usePackHistoryStore = create<PackHistoryState>()(
  persist(
    (set) => ({
      recentlyViewed: [],

      addToRecentlyViewed: (pack) =>
        set((state) => {
          const newItem = {
            id: pack.id,
            name: pack.name,
            coverImage: pack.coverImage,
            timestamp: Date.now(),
          };

          // Filtrer les doublons et garder les 10 plus récents
          const filteredHistory = state.recentlyViewed
            .filter((item) => item.id !== pack.id)
            .slice(0, 9);

          return {
            recentlyViewed: [newItem, ...filteredHistory],
          };
        }),

      clearRecentlyViewed: () => set({ recentlyViewed: [] }),
    }),
    {
      name: 'pack-history-storage',
      version: 1,
      migrate: ((persistedState: unknown, version: number) => {
        if (version === 0) {
          return {
            recentlyViewed: []
          };
        }
        return persistedState as PackHistoryState;
      }) as MigrateFunction<PackHistoryState>,
    }
  )
); 