'use client';

import React, { lazy, Suspense, useMemo } from 'react';
import { usePacks } from '@/hooks/use-packs';
import { useCategories } from '@/hooks/use-categories';
import { CatalogLayout } from '@/components/catalog/catalog-layout';
import { Skeleton } from '@/components/ui/skeleton';
import packsData from '@/data/packs.json';
import type { Pack } from '@/types/pack';

const PackFilterSidebarLazy = lazy(() => 
  import('@/components/catalog/pack-filter-sidebar').then(mod => ({ default: mod.PackFilterSidebar }))
);
const PackDisplayLazy = lazy(() => 
  import('@/components/catalog/pack-display').then(mod => ({ default: mod.PackDisplay }))
);

// Skeleton component for the filter sidebar
const _FilterSidebarSkeleton = () => {
  // Générer des IDs uniques pour les skeletons
  const gameSkeletons = Array.from({ length: 5 }, (_, i) => `game-skeleton-${i}`);
  const typeSkeletons = Array.from({ length: 3 }, (_, i) => `type-skeleton-${i}`);

  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="space-y-2">
          {gameSkeletons.map(id => (
            <Skeleton key={id} className="h-8 w-full" />
          ))}
        </div>
      </div>
      <div>
        <Skeleton className="h-6 w-24 mb-4" />
        <div className="space-y-2">
          {typeSkeletons.map(id => (
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

export default function PacksPage() {
  const { getAllCategories } = useCategories('packs');
  const { packs, isLoading } = usePacks();

  // Get unique games and their counts
  const games = packs.reduce((acc: { id: string; name: string; count: number }[], pack: Pack) => {
    const gameId = pack.gameId.toString();
    const existingGame = acc.find(g => g.id === gameId);
    
    if (existingGame) {
      existingGame.count++;
    } else {
      acc.push({
        id: gameId,
        name: getAllCategories().find(cat => cat.id === pack.gameId)?.name || 'Unknown Game',
        count: 1
      });
    }
    
    return acc;
  }, []);

  // Get unique types and their counts
  const types = packs.reduce((acc: { id: string; name: string; count: number }[], pack: Pack) => {
    const existingType = acc.find(t => t.id === pack.type);
    
    if (existingType) {
      existingType.count++;
    } else {
      acc.push({
        id: pack.type,
        name: pack.type.charAt(0).toUpperCase() + pack.type.slice(1),
        count: 1
      });
    }
    
    return acc;
  }, []);

  // Get unique platforms from tags
  const platforms = packs.reduce((acc: { id: string; name: string; count: number }[], pack: Pack) => {
    for (const tag of pack.tags) {
      const existingPlatform = acc.find(p => p.id === tag);
      
      if (existingPlatform) {
        existingPlatform.count++;
      } else {
        acc.push({
          id: tag,
          name: tag.charAt(0).toUpperCase() + tag.slice(1),
          count: 1
        });
      }
    }
    
    return acc;
  }, []);

  // Get max price
  const maxPrice = {
    amount: Math.max(...packs.map(pack => pack.price.amount)),
    currency: 'EUR'
  };

  // Count discounted and new releases
  const discountedCount = packs.filter(pack => (pack.price.discount || 0) > 0).length;
  const newReleasesCount = packs.filter(pack => {
    const startDate = new Date(pack.availability.startDate);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return startDate >= oneMonthAgo;
  }).length;

  // Générer des IDs uniques pour les skeletons de packs
  const packSkeletons = Array.from({ length: 8 }, (_, i) => `pack-skeleton-${i}`);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      <PackFilterSidebarLazy
        games={games}
        types={types}
        platforms={platforms}
        maxPrice={maxPrice}
        discountedCount={discountedCount}
        newReleasesCount={newReleasesCount}
      />
      <div className="flex-1">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {packSkeletons.map(id => (
              <Skeleton key={id} className="h-[300px] rounded-lg" />
            ))}
          </div>
        ) : (
          <PackDisplayLazy />
        )}
      </div>
    </div>
  );
} 