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
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Game } from '@/types/game';
import { useGames } from '@/hooks/use-games';
import { useFilters } from '@/hooks/use-filters';

const SKELETON_KEYS = Array.from({ length: 8 }, (_, i) => `skeleton-${i}`);

// Sous-composant pour l'affichage en grille
function GameGrid({ games }: { games: Game[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}

// Sous-composant pour l'affichage en carousel
function GameCarousel({ games }: { games: Game[] }) {
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
}

// Sous-composant pour l'affichage en défilement infini
function GameInfiniteScroll({ games }: { games: Game[] }) {
  const [isInView, setIsInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const setupObserver = useCallback(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting);
        },
        { threshold: 0.1 }
      );

      if (triggerRef.current) {
        observerRef.current.observe(triggerRef.current);
      }
    }
  }, []);

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
      <div ref={triggerRef} className="h-10" />
    </div>
  );
}

// Composant principal
export function GameDisplay() {
  const { games } = useGames();
  const { filteredGames } = useFilters(games);
  const displayMode = useDisplayMode((state) => state.displayMode);

  if (!games) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {SKELETON_KEYS.map((key) => (
          <div
            key={key}
            className="h-[300px] animate-pulse rounded-lg bg-muted"
          />
        ))}
      </div>
    );
  }

  if (filteredGames.length === 0) {
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
      return <GameGrid games={filteredGames} />;
    case 'carousel':
      return <GameCarousel games={filteredGames} />;
    case 'infinite':
      return <GameInfiniteScroll games={filteredGames} />;
    default:
      return <GameGrid games={filteredGames} />;
  }
} 