import type { Price } from './game';

export interface Pack {
  id: number;
  name: string;
  description: string;
  price: {
    amount: number;
    currency: string;
    discount?: number;
  };
  availability: {
    startDate: string;
    endDate?: string;
    isLimited?: boolean;
  };
  tags: string[];
  metadata: Record<string, unknown>;
  isActive: boolean;
  isFeatured: boolean;
  isNewRelease: boolean;
  type?: string;
  gameId: number;
  items: number[];
  preview?: {
    imageUrl: string;
    videoUrl?: string;
  };
} 