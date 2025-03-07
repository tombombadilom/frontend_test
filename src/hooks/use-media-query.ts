'use client';

import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // Définir l'état initial
    setMatches(media.matches);

    // Définir un callback pour gérer les changements
    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // Écouter les changements
    media.addEventListener('change', listener);

    // Nettoyer
    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
}
