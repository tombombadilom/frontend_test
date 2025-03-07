export interface GameItem {
  id: number;
  name: string;
  description: string;
  category: number;
  rarity: string;
  price: {
    amount: number;
    currency: string;
  };
  availability: {
    startDate?: string;
    endDate?: string;
    isLimited: boolean;
  };
  preview: {
    imageUrl: string;
    videoUrl?: string;
    modelUrl?: string;
  };
  gameId: number;
  tags: string[];
  metadata: Record<string, unknown>;
  type?: string;
  isFeatured?: boolean;
  isNewRelease?: boolean;
} 