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
    }
  )
); 