import { useState, useEffect, useCallback } from 'react';
import type { Pack } from '@/types/pack';
import packsData from '@/data/packs.json';

type RawPack = Pack;

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
    const loadPacks = async () => {
      try {
        setIsLoading(true);
        // Simuler un délai de chargement
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (!packsData.packs) {
          throw new Error('Format de données invalide');
        }
        
        const loadedPacks = packsData.packs.map((pack: RawPack) => ({
          ...pack,
          price: {
            amount: pack.price.amount,
            currency: pack.price.currency,
            discount: pack.price.discount ?? 0,
          },
          availability: pack.availability ?? {
            startDate: new Date().toISOString(),
            isLimited: false,
          },
          tags: pack.tags ?? [],
          metadata: pack.metadata ?? {},
          type: pack.type ?? 'standard',
        }));
        
        setPacks(loadedPacks);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load packs'));
      } finally {
        setIsLoading(false);
      }
    };

    loadPacks();
  }, []);

  const addPack = useCallback(async (pack: Omit<Pack, 'id'>) => {
    try {
      const newPack: Pack = {
        ...pack,
        id: Math.floor(Date.now() / 1000),
        price: {
          amount: pack.price.amount,
          currency: pack.price.currency,
          discount: pack.price.discount ?? 0,
        },
        availability: pack.availability ?? {
          startDate: new Date().toISOString(),
          isLimited: false,
        },
        tags: pack.tags ?? [],
        metadata: pack.metadata ?? {},
        type: pack.type ?? 'standard',
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
              price: pack.price ?? p.price,
              availability: pack.availability ?? p.availability,
              tags: pack.tags ?? p.tags,
              metadata: pack.metadata ?? p.metadata,
              type: pack.type ?? p.type,
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