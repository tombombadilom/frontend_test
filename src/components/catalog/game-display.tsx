'use client';

import { useDisplayMode } from '@/store/display-mode-store';
import type { Game } from '@/types/game';
import { useGames } from '@/hooks/use-games';
import { useFilters } from '@/hooks/use-filters';
import { GameGrid } from '@/components/games/game-grid';
import { GameCarousel } from '@/components/games/game-carousel';
import { GameInfiniteScroll } from '@/components/games/game-infinite-scroll';

const SKELETON_KEYS = Array.from({ length: 8 }, (_, i) => `skeleton-${i}`);

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