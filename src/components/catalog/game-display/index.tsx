'use client';

import { useDisplayMode } from '@/store/display-mode-store';
import { GameGrid } from './game-grid';
import { GameCarousel } from './game-carousel';
import { GameInfiniteScroll } from './game-infinite-scroll';
import type { Game } from '@/types/game';

interface GameDisplayProps {
  games: Game[];
  isLoading: boolean;
}

export function GameDisplay({ games, isLoading }: GameDisplayProps) {
  const { displayMode } = useDisplayMode();

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
      return <GameGrid games={games} />;
    case 'carousel':
      return <GameCarousel games={games} />;
    case 'infinite':
      return <GameInfiniteScroll games={games} />;
    default:
      return null;
  }
} 