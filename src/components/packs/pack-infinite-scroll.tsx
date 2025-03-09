'use client';

import { PackCard } from '@/components/packs/pack-card';
import type { Pack } from '@/types/pack';
import { motion, AnimatePresence } from 'motion/react';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import { InfiniteScrollLoader } from '@/components/ui/infinite-scroll-loader';

interface PackInfiniteScrollProps {
  packs: Pack[];
}

export function PackInfiniteScroll({ packs }: PackInfiniteScrollProps) {
  const { displayedItems, loading, hasMore, loaderRef } = useInfiniteScroll<Pack>({
    items: packs,
    itemsPerPage: 3
  });

  return (
    <div className="min-h-[500px] max-h-[calc(100dvh-14rem)] overflow-y-auto px-0 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40">
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {displayedItems.map((pack, index) => (
            <motion.div
              key={pack.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index % 3 * 0.1 }}
            >
              <PackCard pack={pack} />
            </motion.div>
          ))}
        </AnimatePresence>
        
        <div ref={loaderRef}>
          <InfiniteScrollLoader
            loading={loading}
            hasMore={hasMore}
            itemsCount={displayedItems.length}
            itemName="packs"
          />
        </div>
      </div>
    </div>
  );
} 