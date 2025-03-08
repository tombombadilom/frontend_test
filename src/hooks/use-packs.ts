import { useState, useEffect } from 'react';
import type { Pack } from '@/types/pack';
import packsData from '@/data/packs.json';

const ITEMS_PER_PAGE = 12;

export function usePacks() {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // Simuler un petit délai pour montrer le loading
    const timer = setTimeout(() => {
      const startIndex = 0;
      const endIndex = page * ITEMS_PER_PAGE;
      const slicedPacks = packsData.packs.slice(startIndex, endIndex);
      
      setPacks(slicedPacks);
      setHasMore(endIndex < packsData.packs.length);
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
    packs,
    isLoading,
    hasMore,
    loadMore
  };
} 