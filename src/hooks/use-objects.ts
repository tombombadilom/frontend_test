import { useState, useEffect } from 'react';
import type { GameItem } from '@/types/game';
import objectsData from '@/data/objects.json';

const ITEMS_PER_PAGE = 12;

export function useObjects() {
  const [objects, setObjects] = useState<GameItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // Simuler un petit délai pour montrer le loading
    const timer = setTimeout(() => {
      const startIndex = 0;
      const endIndex = page * ITEMS_PER_PAGE;
      const slicedObjects = objectsData.items.slice(startIndex, endIndex);
      
      setObjects(slicedObjects);
      setHasMore(endIndex < objectsData.items.length);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [page]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return {
    objects,
    isLoading,
    hasMore,
    loadMore
  };
} 