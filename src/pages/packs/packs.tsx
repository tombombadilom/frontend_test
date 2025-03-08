'use client';

import React, { lazy } from 'react';
import { usePacks } from '@/hooks/use-packs';
import { useCategories } from '@/hooks/use-categories';
import { CatalogLayout, prepareFilterOptions, prepareTagOptions } from '@/components/catalog/catalog-layout';

const FilterSidebarLazy = lazy(() => 
  import('@/components/catalog/filter-sidebar').then(mod => ({ default: mod.FilterSidebar }))
);
const PackDisplayLazy = lazy(() => 
  import('@/components/catalog/pack-display').then(mod => ({ default: mod.PackDisplay }))
);

export default function PacksPage() {
  const { packs } = usePacks();
  const { getAllCategories } = useCategories('packs');

  const categories = getAllCategories().map(cat => ({
    id: cat.id.toString(),
    name: cat.name,
    count: packs.filter(pack => Math.floor(pack.category / 100) === cat.id).length
  }));

  const platforms = prepareTagOptions(packs);

  const maxPrice = {
    amount: Math.max(...packs.map((pack) => pack.price.amount), 100),
    currency: 'EUR',
    discount: 0,
  };

  const discountedCount = packs.filter(pack => (pack.price.discount || 0) > 0).length;
  const newReleasesCount = packs.filter(pack => pack.isNewRelease).length;

  return (
    <CatalogLayout
      title="Packs"
      filterSidebar={
        <FilterSidebarLazy 
          categories={categories}
          platforms={platforms}
          maxPrice={maxPrice}
          discountedCount={discountedCount}
          newReleasesCount={newReleasesCount}
        />
      }
      content={<PackDisplayLazy />}
    />
  );
} 