import { useState, useEffect, useCallback } from 'react';
import type { Pack } from '@/types/pack';

interface RawPack {
  id?: number;
  name?: string;
  description?: string;
  price?: {
    amount?: number;
    currency?: string;
    discount?: number;
  };
  availability?: {
    startDate?: string;
    endDate?: string;
    isLimited?: boolean;
  };
  tags?: string[];
  metadata?: Record<string, unknown>;
  isActive?: boolean;
  isFeatured?: boolean;
  isNewRelease?: boolean;
  type?: string;
  gameId?: number;
  items?: number[];
  preview?: {
    imageUrl?: string;
    videoUrl?: string;
  };
}

interface UsePacksReturn {
  packs: Pack[];
  isLoading: boolean;
  error: Error | null;
  addPack: (pack: Omit<Pack, 'id'>) => Promise<void>;
  updatePack: (id: number, pack: Partial<Pack>) => Promise<void>;
  deletePack: (id: number) => Promise<void>;
}

export function usePacks(): UsePacksReturn {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPacks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await import('@/data/packs.json');
      const rawPacks = response.default.packs || [];
      const fetchedPacks = rawPacks.map((rawPack: RawPack) => ({
        id: rawPack.id || 0,
        name: rawPack.name || '',
        description: rawPack.description || '',
        price: {
          amount: rawPack.price?.amount || 0,
          currency: rawPack.price?.currency || 'USD',
          discount: rawPack.price?.discount,
        },
        availability: {
          startDate: rawPack.availability?.startDate || new Date().toISOString(),
          endDate: rawPack.availability?.endDate,
          isLimited: rawPack.availability?.isLimited || false,
        },
        tags: rawPack.tags || [],
        metadata: rawPack.metadata || {},
        isActive: rawPack.isActive || false,
        isFeatured: rawPack.isFeatured || false,
        isNewRelease: rawPack.isNewRelease || false,
        type: rawPack.type || 'standard',
        gameId: rawPack.gameId || 0,
        items: rawPack.items || [],
        preview: rawPack.preview || { imageUrl: '' }
      })) as Pack[];
      setPacks(fetchedPacks);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch packs'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPacks();
  }, [fetchPacks]);

  const addPack = useCallback(async (pack: Omit<Pack, 'id'>) => {
    try {
      const newPack: Pack = {
        ...pack,
        id: Math.floor(Date.now() / 1000),
        price: {
          amount: pack.price.amount,
          currency: pack.price.currency,
          discount: pack.price.discount,
        },
        availability: {
          startDate: pack.availability?.startDate || new Date().toISOString(),
          endDate: pack.availability?.endDate,
          isLimited: pack.availability?.isLimited || false,
        },
        tags: pack.tags || [],
        metadata: pack.metadata || {},
        isActive: pack.isActive ?? true,
        isFeatured: pack.isFeatured ?? false,
        isNewRelease: pack.isNewRelease ?? false,
      };
      setPacks(prev => [...prev, newPack]);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to add pack');
      setError(error);
      throw error;
    }
  }, []);

  const updatePack = useCallback(async (id: number, pack: Partial<Pack>) => {
    try {
      setPacks(prev =>
        prev.map((p) => {
          if (p.id === id) {
            return {
              ...p,
              ...pack,
              price: pack.price
                ? {
                    amount: pack.price.amount,
                    currency: pack.price.currency,
                    discount: pack.price.discount,
                  }
                : p.price,
              availability: pack.availability || p.availability,
              tags: pack.tags || p.tags,
              metadata: pack.metadata || p.metadata,
              isActive: pack.isActive ?? p.isActive,
              isFeatured: pack.isFeatured ?? p.isFeatured,
              isNewRelease: pack.isNewRelease ?? p.isNewRelease,
            };
          }
          return p;
        })
      );
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update pack');
      setError(error);
      throw error;
    }
  }, []);

  const deletePack = useCallback(async (id: number) => {
    try {
      setPacks(prev => prev.filter((p) => p.id !== id));
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to delete pack');
      setError(error);
      throw error;
    }
  }, []);

  return {
    packs,
    isLoading,
    error,
    addPack,
    updatePack,
    deletePack,
  };
} 