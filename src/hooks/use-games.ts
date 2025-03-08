'use client';

import type { Game } from '@/types/game';
import { useEffect, useState } from 'react';
import gamesData from '@/data/games.json';

const SIMULATED_DELAY = 1000; // 1 seconde de délai

type RawGame = Game;

export function useGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadGames = async () => {
      try {
        setIsLoading(true);
        // Simuler un délai de chargement
        await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
        
        if (!gamesData.games) {
          throw new Error('Format de données invalide');
        }
        
        const loadedGames = gamesData.games.map((game: RawGame) => ({
          ...game,
          price: {
            amount: game.price.amount,
            currency: game.price.currency,
            discount: game.price.discount ?? 0,
          },
          isFeatured: game.isFeatured ?? false,
          isNewRelease: game.isNewRelease ?? false,
        }));
        
        setGames(loadedGames);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load games'));
      } finally {
        setIsLoading(false);
      }
    };

    loadGames();
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
