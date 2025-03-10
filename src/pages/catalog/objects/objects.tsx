'use client';

import React, { lazy, Suspense } from 'react';
import { useObjects } from '@/hooks/use-objects';
import { useCategories } from '@/hooks/use-categories';
import { CatalogLayout } from '@/components/catalog/catalog-layout';
import { Skeleton } from '@/components/ui/skeleton';
import { ErrorBoundary } from '@/components/ui/error-boundary';

const ObjectFilterSidebarLazy = lazy(() => 
  import('@/components/catalog/objects/object-filter-sidebar').then(mod => ({ default: mod.ObjectFilterSidebar }))
);
const ObjectDisplayLazy = lazy(() => 
  import('@/components/catalog/objects/object-display').then(mod => ({ default: mod.ObjectDisplay }))
);

// Skeleton component for the filter sidebar
const FilterSidebarSkeleton = () => {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="space-y-2">
          {Array.from({ length: 5 }, (_, i) => (
            <Skeleton key={`game-filter-skeleton-${i + 1}`} className="h-8 w-full" />
          ))}
        </div>
      </div>
      <div>
        <Skeleton className="h-6 w-24 mb-4" />
        <div className="space-y-2">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={`category-filter-skeleton-${i + 1}`} className="h-8 w-full" />
          ))}
        </div>
      </div>
      <div>
        <Skeleton className="h-6 w-28 mb-4" />
        <div className="space-y-2">
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={`rarity-filter-skeleton-${i + 1}`} className="h-8 w-full" />
          ))}
        </div>
      </div>
      <div>
        <Skeleton className="h-6 w-28 mb-4" />
        <div className="space-y-2">
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={`platform-filter-skeleton-${i + 1}`} className="h-8 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function ObjectsPage() {
  const { objects } = useObjects();
  const { getAllCategories } = useCategories('objects');

  // Récupérer les jeux disponibles
  const games = [...new Set(objects.map(obj => obj.gameId))]
    .map(gameId => ({
      id: gameId.toString(),
      name: getAllCategories().find(cat => cat.id === gameId)?.name || 'Unknown Game',
      count: objects.filter(obj => obj.gameId === gameId).length
    }))
    .filter(game => game.count > 0);

  // Récupérer les catégories d'objets
  const categories = getAllCategories()
    .map(cat => ({
      id: cat.id.toString(),
      name: cat.name,
      count: objects.filter(obj => Math.floor(obj.category / 100) === cat.id).length
    }))
    .filter(cat => cat.count > 0);

  // Récupérer les raretés disponibles
  const rarities = [...new Set(objects.map(obj => obj.rarity))]
    .map(rarity => ({
      id: rarity,
      name: rarity.charAt(0).toUpperCase() + rarity.slice(1),
      count: objects.filter(obj => obj.rarity === rarity).length
    }))
    .filter(rarity => rarity.count > 0);

  // Récupérer les plateformes disponibles
  const platforms = objects.reduce((acc, obj) => {
    for (const tag of obj.tags) {
      const existing = acc.find(p => p.id === tag);
      if (existing) {
        existing.count++;
      } else {
        acc.push({
          id: tag,
          name: tag.charAt(0).toUpperCase() + tag.slice(1),
          count: 1
        });
      }
    }
    return acc;
  }, [] as Array<{ id: string; name: string; count: number }>);

  const maxPrice = {
    amount: Math.max(...objects.map((obj) => obj.price.amount), 100),
    currency: 'EUR'
  };

  const discountedCount = objects.filter(obj => (obj.price.discount || 0) > 0).length;
  const newReleasesCount = objects.filter(obj => {
    const startDate = new Date(obj.availability.startDate || '');
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return startDate >= oneMonthAgo;
  }).length;

  return (
    <ErrorBoundary>
      <CatalogLayout
        title="Objets"
        type="objects"
        filterSidebar={
          <Suspense fallback={<FilterSidebarSkeleton />}>
            <ObjectFilterSidebarLazy 
              games={games}
              categories={categories}
              rarities={rarities}
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
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={`object-grid-skeleton-${index + 1}`} className="h-[300px] rounded-lg" />
              ))}
            </div>
          }>
            <ObjectDisplayLazy />
          </Suspense>
        }
      />
    </ErrorBoundary>
  );
} 