'use client';

import { useFilterStore } from '@/store/filter-store';
import type { Game } from '@/types/game';
import { useMemo } from 'react';

export function useFilters(games: Game[]) {
  const filters = useFilterStore();

  const filteredGames = useMemo(() => {
    let filtered = [...games];

    // Filtre par recherche
    if (filters.search) {
      filtered = filtered.filter((game) =>
        game.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Filtre par catégories
    if (filters.categories.length > 0) {
      filtered = filtered.filter((game) =>
        game.genres.some((genre) =>
          filters.categories.includes(genre.toLowerCase())
        )
      );
    }

    // Filtre par plateformes
    if (filters.platforms.length > 0) {
      filtered = filtered.filter((game) =>
        game.platforms.some((platform) =>
          filters.platforms.includes(platform.toLowerCase())
        )
      );
    }

    // Filtre par prix
    const [min, max] = filters.priceRange;
    filtered = filtered.filter((game) => {
      const finalPrice = game.price.amount * (1 - (game.price.discount || 0) / 100);
      return finalPrice >= min && finalPrice <= max;
    });

    // Filtre par promotions
    if (filters.onlyDiscounted) {
      filtered = filtered.filter((game) => game.price.discount > 0);
    }

    // Filtre par nouveautés
    if (filters.onlyNewReleases) {
      filtered = filtered.filter((game) => game.isNewRelease);
    }

    // Tri
    return filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return (
            a.price.amount * (1 - (a.price.discount || 0) / 100) -
            b.price.amount * (1 - (b.price.discount || 0) / 100)
          );
        case 'price-desc':
          return (
            b.price.amount * (1 - (b.price.discount || 0) / 100) -
            a.price.amount * (1 - (a.price.discount || 0) / 100)
          );
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'rating-desc':
          return b.rating - a.rating;
        case 'newest':
          return (
            new Date(b.releaseDate).getTime() -
            new Date(a.releaseDate).getTime()
          );
        default:
          return 0;
      }
    });
  }, [
    games,
    filters.search,
    filters.categories,
    filters.platforms,
    filters.priceRange,
    filters.onlyDiscounted,
    filters.onlyNewReleases,
    filters.sortBy,
  ]);

  return {
    filters,
    filteredGames,
  };
}
