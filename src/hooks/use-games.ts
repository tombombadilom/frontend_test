'use client';

import type { Game } from '@/types/game';
import { useEffect, useState } from 'react';

export function useGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      setIsLoading(true);
      try {
        // Dans une application réelle, cela ferait une requête API
        // Simuler un délai de chargement
        // await new Promise((resolve) => setTimeout(resolve, 1000));

        // Charger les données mockées
        const response = await import('@/data/games.json');
        setGames(response.default);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Une erreur est survenue')
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();
  }, []);

  const featuredGames = games.filter((game) => game.isFeatured).slice(0, 4);
  const newReleases = games.filter((game) => game.isNewRelease).slice(0, 4);

  return {
    games,
    featuredGames,
    newReleases,
    isLoading,
    error,
  };
}
