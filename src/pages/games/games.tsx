'use client';

import React, { lazy } from 'react';
import { useGames } from '@/hooks/use-games';
import { useCategories } from '@/hooks/use-categories';
import { CatalogLayout } from '@/components/catalog/catalog-layout';
import { prepareFilterOptions, prepareTagOptions } from '@/components/catalog/utils';
import { SidebarProvider } from '@/components/ui/sidebar';

const FilterSidebarLazy = lazy(() => 
  import('@/components/catalog/filter-sidebar').then(mod => ({ default: mod.FilterSidebar }))
);
const GameDisplayLazy = lazy(() => 
  import('@/components/catalog/game-display').then(mod => ({ default: mod.GameDisplay }))
);

export default function GamesPage() {
  const { games } = useGames();
  const { getAllCategories } = useCategories('games');

  const categories = getAllCategories().map(cat => ({
    id: cat.id.toString(),
    name: cat.name,
    count: games.filter(game => Math.floor(game.category / 100) === cat.id).length
  }));

  const platforms = prepareTagOptions(games);

  const maxPrice = {
    amount: Math.max(...games.map((game) => game.price.amount), 100),
    currency: 'EUR',
    discount: 0,
  };

  const discountedCount = games.filter(game => (game.price.discount || 0) > 0).length;
  const newReleasesCount = games.filter(game => game.isNewRelease).length;

  return (
    <SidebarProvider>
      <CatalogLayout
        title="Jeux"
        filterSidebar={
          <FilterSidebarLazy 
            categories={categories}
            platforms={platforms}
            maxPrice={maxPrice}
            discountedCount={discountedCount}
            newReleasesCount={newReleasesCount}
          />
        }
        content={<GameDisplayLazy />}
      />
    </SidebarProvider>
  );
} 