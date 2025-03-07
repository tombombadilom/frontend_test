import { useState, useEffect } from 'react';
import type { GameItem } from '@/types/item';

interface ObjectMetadata {
  battlePassTier?: number;
  season?: string;
  animationDuration?: number;
  baseAttack?: number;
  subStat?: string;
  subStatValue?: number;
  duration?: number;
  dailyPrimogems?: number;
  restrictions?: string[];
  type?: string;
  isFeatured?: boolean;
  isNewRelease?: boolean;
}

interface Object {
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
    startDate: string;
    endDate: string;
    isLimited: boolean;
  };
  preview: {
    imageUrl: string;
    videoUrl?: string;
    modelUrl?: string;
  };
  gameId: number;
  tags: string[];
  metadata: ObjectMetadata;
  type: string;
  isFeatured: boolean;
  isNewRelease: boolean;
}

interface UseObjectsReturn {
  objects: GameItem[];
  isLoading: boolean;
  error: string | null;
  addObject: (object: Omit<GameItem, 'id'>) => void;
  updateObject: (id: number, object: Partial<GameItem>) => void;
  deleteObject: (id: number) => void;
}

interface UseObjectsOptions {
  initialData?: GameItem[];
  loadData?: () => Promise<GameItem[]>;
}

export function useObjects(options: UseObjectsOptions = {}): UseObjectsReturn {
  const { initialData, loadData } = options;
  const [objects, setObjects] = useState<GameItem[]>(initialData || []);
  const [isLoading, setIsLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadObjects = async () => {
      if (initialData) {
        setIsLoading(false);
        return;
      }

      try {
        const data = loadData || (async () => {
          const response = await import('@/data/objects.json');
          return response.default.items.map(item => {
            const metadata = item.metadata as Record<string, unknown>;
            const type = metadata.type as string | undefined;
            const isFeatured = metadata.isFeatured as boolean | undefined;
            const isNewRelease = metadata.isNewRelease as boolean | undefined;

            return {
              ...item,
              type: type || 'item',
              isFeatured: isFeatured || false,
              isNewRelease: isNewRelease || false,
              availability: {
                startDate: item.availability?.startDate || new Date().toISOString(),
                endDate: item.availability?.endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                isLimited: item.availability?.isLimited || false,
              },
            };
          });
        });

        const loadedObjects = await data();
        setObjects(loadedObjects);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load objects');
      } finally {
        setIsLoading(false);
      }
    };

    loadObjects();
  }, [initialData, loadData]);

  const addObject = (object: Omit<GameItem, 'id'>) => {
    const newObject = {
      ...object,
      id: Math.max(...objects.map(o => o.id), 0) + 1,
    };
    setObjects([...objects, newObject]);
  };

  const updateObject = (id: number, object: Partial<GameItem>) => {
    setObjects(objects.map(o => o.id === id ? { ...o, ...object } : o));
  };

  const deleteObject = (id: number) => {
    setObjects(objects.filter(o => o.id !== id));
  };

  return {
    objects,
    isLoading,
    error,
    addObject,
    updateObject,
    deleteObject,
  };
} 