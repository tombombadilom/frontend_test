import { useMemo } from 'react';
import gamesCategories from '@/data/games-categories.json';
import objectsCategories from '@/data/objects-categories.json';
import packsCategories from '@/data/packs-categories.json';
import type { GameCategory, GameCategoriesData } from '@/types/category';

export type CategoryType = 'games' | 'objects' | 'packs';

interface UseCategories {
  categories: GameCategory[];
  getCategoryName: (id: number) => string;
  getSubcategoryName: (id: number) => string;
  getCategoryIcon: (id: number) => string;
  getAllCategories: () => GameCategory[];
  getAllCategoryNames: () => string[];
}

export function useCategories(type: CategoryType): UseCategories {
  const categoriesData = useMemo(() => {
    switch (type) {
      case 'games':
        return (gamesCategories as GameCategoriesData).categories;
      case 'objects':
        return (objectsCategories as GameCategoriesData).categories;
      case 'packs':
        return (packsCategories as GameCategoriesData).categories;
      default:
        return [];
    }
  }, [type]);

  const getCategoryName = (id: number): string => {
    const category = categoriesData.find(cat => cat.id === Math.floor(id / 100));
    return category?.name || `Catégorie ${id}`;
  };

  const getSubcategoryName = (id: number): string => {
    const category = categoriesData.find(cat => cat.id === Math.floor(id / 100));
    const subcategory = category?.subcategories?.find(sub => sub.id === id);
    return subcategory?.name || `Sous-catégorie ${id}`;
  };

  const getCategoryIcon = (id: number): string => {
    const category = categoriesData.find(cat => cat.id === Math.floor(id / 100));
    return category?.icon || 'Category';
  };

  const getAllCategories = (): GameCategory[] => {
    return categoriesData;
  };

  const getAllCategoryNames = (): string[] => {
    return categoriesData.map(cat => cat.name);
  };

  return {
    categories: categoriesData,
    getCategoryName,
    getSubcategoryName,
    getCategoryIcon,
    getAllCategories,
    getAllCategoryNames,
  };
} 