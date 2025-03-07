'use client';

import { GameCard } from '@/components/games/game-card';
import { useDisplayMode } from '@/store/display-mode-store';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import type { Game } from '@/types/game';

interface ProductDisplayProps {
  games: Game[];
  isLoading: boolean;
}

export function ProductDisplay({ games, isLoading }: ProductDisplayProps) {
  const { displayMode } = useDisplayMode();
  const [isInView, setIsInView] = useState(false);

  // Effet pour le mode infinite scroll
  useEffect(() => {
    if (displayMode === 'infinite') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting);
        },
        { threshold: 0.1 }
      );

      const target = document.getElementById('infinite-scroll-trigger');
      if (target) {
        observer.observe(target);
      }

      return () => observer.disconnect();
    }
  }, [displayMode]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={`skeleton-${Date.now()}-${index}`} className="h-[300px] animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border bg-card">
        <p className="text-center text-muted-foreground">
          Aucun jeu ne correspond à vos critères de recherche.
        </p>
      </div>
    );
  }

  switch (displayMode) {
    case 'grid':
      return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      );

    case 'carousel':
      return (
        <div className="relative">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {games.map((game) => (
                <CarouselItem key={game.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <GameCard game={game} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      );

    case 'infinite':
      return (
        <div className="space-y-6">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <GameCard game={game} />
            </motion.div>
          ))}
          <div id="infinite-scroll-trigger" className="h-10" />
        </div>
      );

    default:
      return null;
  }
} 