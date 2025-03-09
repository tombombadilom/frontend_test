import { useState, useEffect, useRef, useCallback } from 'react';

interface UseInfiniteScrollOptions<T> {
  items: T[];
  itemsPerPage?: number;
  delay?: number;
}

interface UseInfiniteScrollReturn<T> {
  displayedItems: T[];
  loading: boolean;
  hasMore: boolean;
  loaderRef: React.RefObject<HTMLDivElement>;
}

export function useInfiniteScroll<T>({
  items,
  itemsPerPage = 12,
  delay = 500
}: UseInfiniteScrollOptions<T>): UseInfiniteScrollReturn<T> {
  const [displayedItems, setDisplayedItems] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Initialisation avec la première page
  useEffect(() => {
    setDisplayedItems(items.slice(0, itemsPerPage) as T[]);
    setHasMore(items.length > itemsPerPage);
    setPage(1);
  }, [items, itemsPerPage]);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    const nextPage = page + 1;
    const start = (nextPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    
    setTimeout(() => {
      const newItems = items.slice(start, end) as T[];
      setDisplayedItems(prev => [...prev, ...newItems]);
      setPage(nextPage);
      setHasMore(end < items.length);
      setLoading(false);
    }, delay);
  }, [items, loading, hasMore, page, itemsPerPage, delay]);

  useEffect(() => {
    if (!loaderRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(loaderRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMore]);

  return {
    displayedItems,
    loading,
    hasMore,
    loaderRef
  };
} 