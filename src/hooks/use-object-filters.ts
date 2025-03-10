'use client';

import { useMemo } from 'react';
import { useObjectFilterStore } from '@/store/filter-store';
import type { GameItem } from '@/types/game';

// Fonctions utilitaires pures extraites pour éviter les recréations inutiles
const filterBySearch = (objects: GameItem[], search: string) =>
  search
    ? objects.filter((object) =>
        object.name.toLowerCase().includes(search.toLowerCase())
      )
    : objects;

const filterByGames = (objects: GameItem[], games: string[]) =>
  games.length > 0
    ? objects.filter((object) => games.includes(object.gameId.toString()))
    : objects;

const filterByCategories = (objects: GameItem[], categories: string[]) =>
  categories.length > 0
    ? objects.filter((object) =>
        categories.includes(object.category.toString())
      )
    : objects;

const filterByRarities = (objects: GameItem[], rarities: string[]) =>
  rarities.length > 0
    ? objects.filter((object) => rarities.includes(object.rarity))
    : objects;

const filterByPlatforms = (objects: GameItem[], platforms: string[]) =>
  platforms.length > 0
    ? objects.filter((object) =>
        object.tags.some((tag) => platforms.includes(tag.toLowerCase()))
      )
    : objects;

const filterByPrice = (objects: GameItem[], min: number, max: number) =>
  objects.filter((object) => {
    const finalPrice = object.price.amount * (1 - (object.price.discount || 0) / 100);
    return finalPrice >= min && finalPrice <= max;
  });

const filterByDiscounted = (objects: GameItem[]) =>
  objects.filter((object) => (object.price.discount || 0) > 0);

const filterByNewReleases = (objects: GameItem[]) => {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  
  return objects.filter((object) => {
    if (!object.availability?.startDate) return false;
    const startDate = new Date(object.availability.startDate);
    return startDate >= oneMonthAgo;
  });
};

const sortObjects = (objects: GameItem[], sortBy: string) => {
  const sortedObjects = [...objects];
  
  sortedObjects.sort((a, b) => {
    switch (sortBy) {
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
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'newest':
        if (!a.availability?.startDate || !b.availability?.startDate) return 0;
        return (
          new Date(b.availability.startDate).getTime() -
          new Date(a.availability.startDate).getTime()
        );
      default:
        return 0;
    }
  });

  return sortedObjects;
};

export function useObjectFilters(objects: GameItem[]) {
  const filters = useObjectFilterStore();

  // Utilisation de useMemo uniquement pour la chaîne complète de filtrage
  const filteredObjects = useMemo(() => {
    let filtered = [...objects];

    // Application séquentielle des filtres
    filtered = filterBySearch(filtered, filters.search);
    filtered = filterByGames(filtered, filters.games);
    filtered = filterByCategories(filtered, filters.categories);
    filtered = filterByRarities(filtered, filters.rarities);
    filtered = filterByPlatforms(filtered, filters.platforms);
    filtered = filterByPrice(filtered, filters.priceRange[0], filters.priceRange[1]);
    
    if (filters.onlyDiscounted) {
      filtered = filterByDiscounted(filtered);
    }
    
    if (filters.onlyNewReleases) {
      filtered = filterByNewReleases(filtered);
    }

    // Tri final
    return sortObjects(filtered, filters.sortBy);
  }, [
    objects,
    filters.search,
    filters.games,
    filters.categories,
    filters.rarities,
    filters.platforms,
    filters.priceRange,
    filters.onlyDiscounted,
    filters.onlyNewReleases,
    filters.sortBy,
  ]);

  return {
    filters,
    filteredObjects,
  };
} 