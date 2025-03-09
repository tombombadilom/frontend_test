import type { Price } from './game';

// Type for unique numeric ID
type UniqueId = number & { readonly brand: unique symbol };

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
  id: UniqueId;
  name: string;
  description: string;
  price: {
    amount: number;
    currency: string;
    discount?: number;
  };
  category: number;
  items: string[];
  isActive: boolean;
  type: string;
  gameId: number;
  tags: string[];
  isFeatured?: boolean;
  isNewRelease?: boolean;
  availability: {
    startDate: string;
    endDate: string;
  };
  preview: PackPreview;
  metadata?: Record<string, unknown>;
}

// Helper function to create a unique ID
export function createUniqueId(n: number): UniqueId {
  return n as UniqueId;
} 