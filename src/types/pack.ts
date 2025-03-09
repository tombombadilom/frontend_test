import type { Price } from './game';

export interface PackPreview {
  imageUrl: string;
  videoUrl?: string | null;
}

export interface PackAvailability {
  startDate?: string;
  endDate?: string;
  isLimited?: boolean;
}

export interface Pack {
  id: number;
  name: string;
  description: string;
  price: Price;
  gameId: number;
  items: number[];
  isActive?: boolean;
  isFeatured?: boolean;
  type?: string;
  tags?: string[];
  availability?: PackAvailability;
  preview: PackPreview;
  metadata?: Record<string, unknown>;
} 