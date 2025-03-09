'use client';

import React, { lazy, Suspense } from 'react';
import { useGames } from '@/hooks/use-games';
import { useCategories } from '@/hooks/use-categories';
import { CatalogLayout } from '@/components/catalog/catalog-layout';
import { prepareFilterOptions, prepareTagOptions } from '@/components/catalog/utils';
import { Skeleton } from '@/components/ui/skeleton';

const GameFilterSidebarLazy = lazy(() => 
  import('@/components/catalog/game-filter-sidebar').then(mod => ({ default: mod.GameFilterSidebar }))
);
const GameDisplayLazy = lazy(() => 
  import('@/components/catalog/game-display').then(mod => ({ default: mod.GameDisplay }))
);

// Skeleton component for the filter sidebar
const FilterSidebarSkeleton = () => {
  // Générer des IDs uniques pour les skeletons
  const categorySkeletons = Array.from({ length: 5 }, (_, i) => `category-skeleton-${i}`);
  const platformSkeletons = Array.from({ length: 3 }, (_, i) => `platform-skeleton-${i}`);

  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="space-y-2">
          {categorySkeletons.map(id => (
            <Skeleton key={id} className="h-8 w-full" />
          ))}
        </div>
      </div>
      <div>
        <Skeleton className="h-6 w-28 mb-4" />
        <div className="space-y-2">
          {platformSkeletons.map(id => (
            <Skeleton key={id} className="h-8 w-full" />
          ))}
        </div>
      </div>
      <div>
        <Skeleton className="h-6 w-28 mb-4" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
};

export default function GamesPage() {
  const { games } = useGames();
  const { getAllCategories } = useCategories('games');

  const categories = getAllCategories()
    .map(cat => ({
      id: cat.id.toString(),
      name: cat.name,
      count: games.filter(game => game.genres.includes(cat.name)).length
    }))
    .filter(cat => cat.count > 0);

  const platforms = games
    .reduce((acc, game) => {
      for (const platform of game.platforms) {
        const existing = acc.find(p => p.id === platform);
        if (existing) {
          existing.count++;
        } else {
          acc.push({ id: platform, name: platform, count: 1 });
        }
      }
      return acc;
    }, [] as Array<{ id: string; name: string; count: number }>)
    .filter(platform => platform.count > 0);

  const maxPrice = {
    amount: Math.max(...games.map((game) => game.price.amount), 100),
    currency: 'EUR'
  };

  const discountedCount = games.filter(game => (game.price.discount || 0) > 0).length;
  const newReleasesCount = games.filter(game => game.isNewRelease).length;

  // Générer des IDs uniques pour les skeletons de jeux
  const gameSkeletons = Array.from({ length: 8 }, (_, i) => `game-skeleton-${i}`);

  return (
    <CatalogLayout
      title="Jeux"
      filterSidebar={
        <Suspense fallback={<FilterSidebarSkeleton />}>
          <GameFilterSidebarLazy 
            categories={categories}
            platforms={platforms}
            maxPrice={maxPrice}
            discountedCount={discountedCount}
            newReleasesCount={newReleasesCount}
          />
        </Suspense>
      }
      content={
        <Suspense fallback={
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {gameSkeletons.map(id => (
              <Skeleton key={id} className="h-[300px] rounded-lg" />
            ))}
          </div>
        }>
          <GameDisplayLazy />
        </Suspense>
      }
    />
  );
} 