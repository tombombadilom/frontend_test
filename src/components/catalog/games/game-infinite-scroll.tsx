'use client';

import { GameCard } from '@/components/catalog/games/game-card';
import type { Game } from '@/types/game';
import { motion, AnimatePresence } from 'motion/react';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import { InfiniteScrollLoader } from '@/components/ui/infinite-scroll-loader';

interface GameInfiniteScrollProps {
  games: Game[];
}

export function GameInfiniteScroll({ games }: GameInfiniteScrollProps) {
  const { displayedItems, loading, hasMore, loaderRef } = useInfiniteScroll<Game>({
    items: games,
    itemsPerPage: 3
  });

  return (
    <div className="min-h-[500px] max-h-[calc(100dvh-14rem)] overflow-y-auto px-0 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40">
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {displayedItems.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index % 3 * 0.1 }}
            >
              <GameCard game={game} />
            </motion.div>
          ))}
        </AnimatePresence>
        
        <div ref={loaderRef}>
          <InfiniteScrollLoader
            loading={loading}
            hasMore={hasMore}
            itemsCount={displayedItems.length}
            itemName="jeux"
          />
        </div>
      </div>
    </div>
  );
} 