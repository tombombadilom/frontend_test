import type { Price } from './game';

// Type for unique numeric ID
type UniqueId = number & { readonly brand: unique symbol };

export interface PackPreview {
  imageUrl: string;
  videoUrl?: string | null;
}

export interface PackAvailability {
  startDate: string;
  endDate: string;
}

export interface Pack {
  id: number;
  name: string;
  description: string;
  price: Price;
  coverImage: string;
  items: string[];
  isActive: boolean;
  type: 'starter' | 'collector' | 'ultimate';
  gameId: number;
  tags: string[];
  isFeatured?: boolean;
  availability: PackAvailability;
}

// Helper function to create a unique ID
export function createUniqueId(n: number): UniqueId {
  return n as UniqueId;
} 