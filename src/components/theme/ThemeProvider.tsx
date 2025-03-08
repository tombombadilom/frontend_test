'use client';

import { createContext, useContext, useEffect, useMemo } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
    }
  )
);

const ThemeContext = createContext<ThemeState | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
}: ThemeProviderProps) {
  const store = useMemo(() => useThemeStore.getState(), []);

  useEffect(() => {
    const root = window.document.documentElement;
    
    const applyTheme = (theme: Theme) => {
      const prevTheme = root.classList.contains('dark') ? 'dark' : 'light';
      
      // Ajouter la classe de transition avant le changement
      root.classList.add('changing-theme');
      
      // Appliquer le nouveau thème
      root.classList.remove('light', 'dark');
      
      const newTheme = theme === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : theme;
      
      root.classList.add(newTheme);
      
      // Retirer la classe de transition après l'animation
      setTimeout(() => {
        root.classList.remove('changing-theme');
      }, 300);
    };

    // Appliquer le thème initial
    applyTheme(store.theme);

    // Écouter les changements de thème système
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (store.theme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    
    // Écouter les changements de thème dans le store
    const unsubscribe = useThemeStore.subscribe(
      (state) => {
        if (state.theme !== store.theme) {
          applyTheme(state.theme);
        }
      }
    );

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      unsubscribe();
    };
  }, [store.theme]);

  return (
    <ThemeContext.Provider value={store}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
