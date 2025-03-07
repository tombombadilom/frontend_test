import { useState, useEffect } from 'react';
import type { Pack } from '@/types/pack';

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

  useEffect(() => {
    const fetchPacks = async () => {
      try {
        setIsLoading(true);
        const response = await import('@/data/packs.json');
        const fetchedPacks = (response.default.packs || []).map((pack: any) => ({
          ...pack,
          price: {
            amount: pack.price?.amount || 0,
            currency: pack.price?.currency || 'USD',
            discount: pack.price?.discount,
          },
          availability: pack.availability || {
            isLimited: false,
          },
          tags: pack.tags || [],
          metadata: pack.metadata || {},
          isActive: pack.isActive ?? true,
          isFeatured: pack.isFeatured ?? false,
          isNewRelease: pack.isNewRelease ?? false,
        }));
        setPacks(fetchedPacks);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch packs'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPacks();
  }, []);

  const addPack = async (pack: Omit<Pack, 'id'>) => {
    try {
      const newPack: Pack = {
        ...pack,
        id: Math.floor(Date.now() / 1000),
        price: {
          amount: pack.price.amount,
          currency: pack.price.currency,
          discount: pack.price.discount,
        },
        availability: pack.availability || {
          isLimited: false,
        },
        tags: pack.tags || [],
        metadata: pack.metadata || {},
        isActive: pack.isActive ?? true,
        isFeatured: pack.isFeatured ?? false,
        isNewRelease: pack.isNewRelease ?? false,
      };
      setPacks((prev) => [...prev, newPack]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add pack'));
      throw err;
    }
  };

  const updatePack = async (id: number, pack: Partial<Pack>) => {
    try {
      setPacks((prev) =>
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
      setError(err instanceof Error ? err : new Error('Failed to update pack'));
      throw err;
    }
  };

  const deletePack = async (id: number) => {
    try {
      setPacks((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete pack'));
      throw err;
    }
  };

  return {
    packs,
    isLoading,
    error,
    addPack,
    updatePack,
    deletePack,
  };
} 