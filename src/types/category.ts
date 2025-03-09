import type { LucideIcon } from 'lucide-react';

export interface GameSubcategory {
  id: number;
  name: string;
  description: string;
  icon: string;
}

export interface GameCategory {
  id: number;
  name: string;
  description: string;
  icon: string;
  image: string;
  subcategories: GameSubcategory[];
}

export interface GameCategoriesData {
  categories: GameCategory[];
}

export interface Subcategory {
  id: number;
  name: string;
  description: string;
  parentCategory: number;
  gameId: string;
  order: number;
  isActive: boolean;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  gameId: string;
  order: number;
  isActive: boolean;
  subcategories: Subcategory[];
} 