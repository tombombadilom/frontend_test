import { useState, useEffect } from 'react';
import categoriesData from '@/data/categories.json';
import type { Category } from '@/types/category';

export interface Subcategory {
  id: number;
  name: string;
  description: string;
  parentCategory: number;
  gameId: number;
  order: number;
  isActive: boolean;
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 500));
      // Convertir les gameId "all" en 0 pour représenter "tous les jeux"
      const categoriesWithNumericGameId = categoriesData.categories.map(category => ({
        ...category,
        gameId: 'all',
        subcategories: category.subcategories.map(subcategory => ({
          ...subcategory,
          gameId: 'all'
        }))
      }));
      setCategories(categoriesWithNumericGameId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  async function addCategory(category: Omit<Category, 'id'>) {
    try {
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 500));
      const newCategory: Category = {
        ...category,
        id: Math.floor(Math.random() * 1000),
      };
      setCategories((prev) => [...prev, newCategory]);
      return newCategory;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  }

  async function updateCategory(id: number, updates: Partial<Category>) {
    try {
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 500));
      setCategories((prev) =>
        prev.map((cat) => (cat.id === id ? { ...cat, ...updates } : cat))
      );
      return { id, ...updates } as Category;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  }

  async function deleteCategory(id: number) {
    try {
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 500));
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  }

  async function reorderCategories(orderedIds: number[]) {
    try {
      // Simuler un délai réseau
      await new Promise(resolve => setTimeout(resolve, 500));
      setCategories((prev) =>
        [...prev].sort((a, b) => {
          const aIndex = orderedIds.indexOf(a.id);
          const bIndex = orderedIds.indexOf(b.id);
          return aIndex - bIndex;
        })
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    }
  }

  return {
    categories,
    isLoading,
    error,
    addCategory,
    updateCategory,
    deleteCategory,
    reorderCategories,
  };
} 