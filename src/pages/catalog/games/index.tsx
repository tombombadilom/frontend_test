'use client';

import { useGames } from '@/hooks/use-games';
import { GameCard } from '@/components/catalog/games/game-card';
import { motion } from 'motion/react';
import { motionConfig } from '@/config/motion';

export default function GamesPage() {
  const { games, isLoading } = useGames();

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-3xl font-bold mb-8"
        {...motionConfig.sections.header}
      >
        Catalogue des jeux
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <motion.div
              key={`game-skeleton-${Date.now()}-${index}`}
              {...motionConfig.sections.grid.item}
              transition={motionConfig.sections.grid.item.transition(index)}
            >
              <GameCard.Skeleton />
            </motion.div>
          ))
        ) : games.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">Aucun jeu trouvé</p>
          </div>
        ) : (
          games.map((game, index) => (
            <motion.div
              key={game.id}
              {...motionConfig.sections.grid.item}
              transition={motionConfig.sections.grid.item.transition(index)}
            >
              <GameCard game={game} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
} 