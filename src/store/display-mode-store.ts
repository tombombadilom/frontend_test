import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type DisplayMode = 'grid' | 'carousel' | 'infinite';

interface DisplayModeState {
  displayMode: DisplayMode;
  setDisplayMode: (mode: DisplayMode) => void;
}

export const useDisplayMode = create<DisplayModeState>()(
  persist(
    (set) => ({
      displayMode: 'grid',
      setDisplayMode: (mode) => set({ displayMode: mode }),
    }),
    {
      name: 'display-mode-storage',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return {
            displayMode: 'grid'
          };
        }
        return persistedState as DisplayModeState;
      }
    }
  )
); 