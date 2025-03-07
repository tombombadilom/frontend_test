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
