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