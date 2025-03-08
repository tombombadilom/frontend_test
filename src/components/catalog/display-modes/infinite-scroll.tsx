'use client';

import { motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type { WithId } from '@/types/common';

interface InfiniteScrollDisplayProps<T extends WithId> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  loadMore: () => Promise<void>;
  hasMore: boolean;
  isLoading: boolean;
  getItemKey?: (item: T) => string | number;
  className?: string;
}

export function InfiniteScrollDisplay<T extends WithId>({
  items,
  renderItem,
  loadMore,
  hasMore,
  isLoading,
  getItemKey = (item: T) => item.id,
  className,
}: InfiniteScrollDisplayProps<T>) {
  const [isInView, setIsInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const setupObserver = useCallback(() => {
    if (!observerRef.current && hasMore) {
      observerRef.current = new IntersectionObserver(
        async ([entry]) => {
          if (entry.isIntersecting && !isLoading) {
            setIsInView(true);
            await loadMore();
          }
        },
        { threshold: 0.1 }
      );

      if (triggerRef.current) {
        observerRef.current.observe(triggerRef.current);
      }
    }
  }, [hasMore, isLoading, loadMore]);

  useEffect(() => {
    setupObserver();

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [setupObserver]);

  return (
    <div className={cn("space-y-6", className)}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => {
          const key = getItemKey(item);
          return (
            <motion.div
              key={`item-${key}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.3,
                type: 'spring',
                stiffness: 300,
                damping: 30
              }}
            >
              {renderItem(item)}
            </motion.div>
          );
        })}
      </div>
      
      {hasMore && (
        <div ref={triggerRef} className="flex h-20 items-center justify-center">
          {isLoading && (
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          )}
        </div>
      )}
    </div>
  );
} 