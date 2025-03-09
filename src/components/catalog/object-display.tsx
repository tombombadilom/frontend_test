'use client';

import { useDisplayMode } from '@/store/display-mode-store';
import type { GameItem } from '@/types/game';
import { useObjects } from '@/hooks/use-objects';
import { ObjectGrid } from '@/components/objects/object-grid';
import { ObjectCarousel } from '@/components/objects/object-carousel';
import { ObjectInfiniteScroll } from '@/components/objects/object-infinite-scroll';

const SKELETON_KEYS = Array.from({ length: 8 }, (_, i) => `skeleton-${i}`);

export function ObjectDisplay() {
  const { objects, isLoading } = useObjects();
  const displayMode = useDisplayMode((state) => state.displayMode);

  if (isLoading) {
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

  if (objects.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border bg-card">
        <p className="text-center text-muted-foreground">
          Aucun objet ne correspond à vos critères de recherche.
        </p>
      </div>
    );
  }

  switch (displayMode) {
    case 'grid':
      return <ObjectGrid objects={objects} />;
    case 'carousel':
      return <ObjectCarousel objects={objects} />;
    case 'infinite':
      return <ObjectInfiniteScroll objects={objects} />;
    default:
      return <ObjectGrid objects={objects} />;
  }
} 