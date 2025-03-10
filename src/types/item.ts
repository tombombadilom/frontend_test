import type { Price } from './game';

export interface ItemPreview {
  imageUrl: string;
  videoUrl?: string;
  modelUrl?: string;
}

export interface ItemAvailability {
  startDate?: string;
  endDate?: string;
  isLimited: boolean;
}

export interface GameItem {
  id: number;
  name: string;
  description: string;
  category: number;
  rarity: string;
  price: Price;
  availability: ItemAvailability;
  preview: ItemPreview;
  gameId: number;
  tags: string[];
  metadata?: Record<string, unknown>;
  type?: string;
  isFeatured?: boolean;
  isNewRelease?: boolean;
} 