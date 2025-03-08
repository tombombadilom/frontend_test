'use client';

import type { Game } from '@/types/game';
import { useEffect, useState } from 'react';

const SIMULATED_DELAY = 1000; // 1 seconde de délai

interface RawGame {
  id: number;
  name: string;
  description: string;
  price?: {
    amount: number;
    currency: string;
    discount?: number;
  };
  availability?: {
    startDate: string;
    endDate?: string;
    isLimited?: boolean;
  };
  tags?: string[];
  metadata?: Record<string, unknown>;
  isActive?: boolean;
  isFeatured?: boolean;
  isNewRelease?: boolean;
}

export function useGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setIsLoading(true);
        const response = await import('@/data/games.json');
        // Simuler un délai de chargement
        await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
        
        if (!response.default.games) {
          throw new Error('Format de données invalide');
        }
        
        const games = response.default.games.map((game: RawGame) => ({
          ...game,
          price: game.price || {
            amount: 0,
            currency: 'USD',
          },
          availability: {
            startDate: game.availability?.startDate || new Date().toISOString(),
            endDate: game.availability?.endDate,
            isLimited: game.availability?.isLimited || false,
          },
          tags: game.tags || [],
          metadata: game.metadata || {},
          isActive: game.isActive ?? true,
          isFeatured: game.isFeatured ?? false,
          isNewRelease: game.isNewRelease ?? false,
        })) as Game[];
        setGames(games);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch games'));
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
