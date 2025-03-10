'use client';

import { PackCardInfinite } from '@/components/catalog/packs/pack-card-infinite';
import type { Pack } from '@/types/pack';
import { motion, AnimatePresence } from 'motion/react';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PackInfiniteScrollProps {
  packs: Pack[];
}

export function PackInfiniteScroll({ packs }: PackInfiniteScrollProps) {
  const { displayedItems, loading, hasMore, loaderRef } = useInfiniteScroll<Pack>({
    items: packs,
    itemsPerPage: 3
  });

  return (
    <div className="relative flex flex-col h-[calc(100dvh-14rem)] -mx-6">
      <div 
        className="flex-1 flex flex-col overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <AnimatePresence mode="popLayout">
          {displayedItems.map((pack, index) => (
            <motion.div
              key={pack.id}
              className="flex-1 min-h-[28%] px-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index % 4 * 0.1 }}
            >
              <PackCardInfinite pack={pack} />
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Loader optimisé pour l'infinite scroll */}
        {hasMore && (
          <div 
            ref={loaderRef}
            className="h-20 flex items-center justify-center px-6"
          >
            <motion.div
              animate={loading ? { 
                rotate: 360,
                scale: [1, 1.2, 1]
              } : { 
                y: [0, 10, 0]
              }}
              transition={{ 
                duration: loading ? 1 : 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              }}
            >
              <ChevronDown className={cn(
                "h-6 w-6",
                loading ? "text-primary animate-spin" : "text-muted-foreground"
              )} />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
} 