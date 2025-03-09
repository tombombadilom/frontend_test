'use client';

import { useDisplayMode } from '@/store/display-mode-store';
import type { Pack } from '@/types/pack';
import { usePacks } from '@/hooks/use-packs';
import { PackGrid } from '@/components/packs/pack-grid';
import { PackCarousel } from '@/components/packs/pack-carousel';
import { PackInfiniteScroll } from '@/components/packs/pack-infinite-scroll';

const SKELETON_KEYS = Array.from({ length: 8 }, (_, i) => `skeleton-${i}`);

export function PackDisplay() {
  const { packs, isLoading } = usePacks();
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

  if (packs.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border bg-card">
        <p className="text-center text-muted-foreground">
          Aucun pack ne correspond à vos critères de recherche.
        </p>
      </div>
    );
  }

  switch (displayMode) {
    case 'grid':
      return <PackGrid packs={packs} />;
    case 'carousel':
      return <PackCarousel packs={packs} />;
    case 'infinite':
      return <PackInfiniteScroll packs={packs} />;
    default:
      return <PackGrid packs={packs} />;
  }
} 