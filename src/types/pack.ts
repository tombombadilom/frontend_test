export interface Pack {
  id: number;
  name: string;
  description: string;
  items: number[];
  price: {
    amount: number;
    currency: string;
    discount?: number;
  };
  availability?: {
    startDate?: string;
    endDate?: string;
    isLimited: boolean;
  };
  type: string;
  gameId: number;
  tags: string[];
  metadata?: Record<string, unknown>;
  isActive?: boolean;
  isFeatured?: boolean;
  isNewRelease?: boolean;
} 