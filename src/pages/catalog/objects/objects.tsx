'use client';

import React, { lazy } from 'react';
import { useObjects } from '@/hooks/use-objects';
import { useCategories } from '@/hooks/use-categories';
import { CatalogLayout } from '@/components/catalog/catalog-layout';
import { prepareFilterOptions, prepareTagOptions } from '@/components/catalog/utils';

const FilterSidebarLazy = lazy(() => 
  import('@/components/catalog/filter-sidebar').then(mod => ({ default: mod.FilterSidebar }))
);
const ObjectDisplayLazy = lazy(() => 
  import('@/components/catalog/object-display').then(mod => ({ default: mod.ObjectDisplay }))
);

export default function ObjectsPage() {
  const { objects } = useObjects();
  const { getAllCategories } = useCategories('objects');

  const categories = getAllCategories().map(cat => ({
    id: cat.id.toString(),
    name: cat.name,
    count: objects.filter(obj => Math.floor(obj.category / 100) === cat.id).length
  }));

  const platforms = prepareTagOptions(objects);

  const maxPrice = {
    amount: Math.max(...objects.map((object) => object.price.amount), 100),
    currency: 'EUR',
    discount: 0,
  };

  const discountedCount = objects.filter(obj => (obj.price.discount || 0) > 0).length;
  const newReleasesCount = objects.filter(obj => obj.isNewRelease).length;

  return (
    <CatalogLayout
      title="Objects"
      filterSidebar={
        <FilterSidebarLazy 
          categories={categories}
          platforms={platforms}
          maxPrice={maxPrice}
          discountedCount={discountedCount}
          newReleasesCount={newReleasesCount}
        />
      }
      content={<ObjectDisplayLazy />}
    />
  );
} 