export interface Price {
  amount: number;
  currency: string;
  discount?: number;
}

export interface CatalogItem {
  id: number;
  name: string;
  description: string;
  category: number;
  price: Price;
  tags: string[];
  isNewRelease?: boolean;
  isFeatured?: boolean;
}

export interface Game extends CatalogItem {
  releaseDate: string;
  developer: string;
  publisher: string;
  genres: string[];
  platforms: string[];
  coverImage: string;
  screenshots: string[];
  rating: number;
}

export interface GameItem extends CatalogItem {
  rarity: string;
  availability: {
    isLimited: boolean;
    startDate?: string;
    endDate?: string;
  };
  preview: {
    imageUrl: string;
    videoUrl?: string;
    modelUrl?: string;
  };
  gameId: number;
  metadata?: Record<string, unknown>;
}

export interface Pack extends CatalogItem {
  type: string;
  items: number[];
  preview: {
    imageUrl: string;
    videoUrl?: string;
  };
  availability?: {
    startDate?: string;
    endDate?: string;
    isLimited?: boolean;
  };
  metadata?: Record<string, unknown>;
} 