import { useMemo } from 'react';
import gamesCategories from '@/data/games-categories.json';
import objectsCategories from '@/data/objects-categories.json';
import packsCategories from '@/data/packs-categories.json';

export type CategoryType = 'games' | 'objects' | 'packs';

interface Category {
  id: number;
  name: string;
  description: string;
  subcategories?: {
    id: number;
    name: string;
    description: string;
  }[];
}

interface UseCategories {
  categories: Category[];
  getCategoryName: (id: number) => string;
  getSubcategoryName: (id: number) => string;
  getAllCategories: () => Category[];
  getAllCategoryNames: () => string[];
}

export function useCategories(type: CategoryType): UseCategories {
  const categoriesData = useMemo(() => {
    switch (type) {
      case 'games':
        return gamesCategories.categories;
      case 'objects':
        return objectsCategories.categories;
      case 'packs':
        return packsCategories.categories;
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

  const getAllCategories = (): Category[] => {
    return categoriesData;
  };

  const getAllCategoryNames = (): string[] => {
    return categoriesData.map(cat => cat.name);
  };

  return {
    categories: categoriesData,
    getCategoryName,
    getSubcategoryName,
    getAllCategories,
    getAllCategoryNames,
  };
} 