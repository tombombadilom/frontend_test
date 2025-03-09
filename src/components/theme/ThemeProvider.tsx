'use client';

import { useEffect, useState } from 'react';
import { useThemeStore } from '@/store/themeStore';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    
    const applyTheme = (theme: 'light' | 'dark' | 'system') => {
      const _prevTheme = root.classList.contains('dark') ? 'dark' : 'light';
      
      // Ajouter la classe de transition avant le changement
      root.classList.add('transitioning-theme');
      
      root.classList.remove('light', 'dark');
      
      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
      } else {
        root.classList.add(theme);
      }
      
      // Retirer la classe de transition après l'animation
      setTimeout(() => {
        root.classList.remove('transitioning-theme');
      }, 200);
    };

    applyTheme(theme);
  }, [theme]);

  if (!mounted) {
    return null;
  }

  return children;
}

export { useThemeStore as useTheme };
