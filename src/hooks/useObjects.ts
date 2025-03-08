import { useState, useEffect, useCallback } from 'react';
import type { GameItem } from '@/types/item';
import objectsData from '@/data/objects.json';

type RawGameItem = GameItem;

export function useObjects(loadData?: () => Promise<GameItem[]>) {
  const [objects, setObjects] = useState<GameItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchObjects = useCallback(async () => {
    try {
      setIsLoading(true);
      
      const data = loadData || (async () => {
        if (!objectsData.items) {
          throw new Error('Format de données invalide');
        }
        
        const loadedObjects = objectsData.items.map((item: RawGameItem) => ({
          ...item,
          metadata: item.metadata ?? {},
        }));
        return loadedObjects;
      });

      const loadedObjects = await data();
      setObjects(loadedObjects);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load objects');
    } finally {
      setIsLoading(false);
    }
  }, [loadData]);

  useEffect(() => {
    fetchObjects();
  }, [fetchObjects]);

  return {
    objects,
    isLoading,
    error,
  };
} 