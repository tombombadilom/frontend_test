export interface Price {
  amount: number;
  currency: string;
  discount?: number;
}

export interface Game {
  id: number;
  gameId: number;
  title: string;
  description: string;
  price: Price;
  releaseDate: string;
  developer: string;
  publisher: string;
  genres: string[];
  platforms: string[];
  coverImage: string;
  screenshots: string[];
  rating: number;
  isFeatured?: boolean;
  isNewRelease?: boolean;
}

export interface GameItem {
  id: number;
  name: string;
  description: string;
  category: number;
  rarity: string;
  price: Price;
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
  tags: string[];
  metadata?: Record<string, unknown>;
}
