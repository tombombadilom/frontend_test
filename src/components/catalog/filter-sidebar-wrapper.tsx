'use client';

import React, { Suspense, lazy } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { FilterSkeleton } from '@/components/ui/skeletons/filter-skeleton';
import type { FilterSidebar } from '@/components/catalog/filter-sidebar';

const FilterSidebarLazy = lazy(() => 
  import('@/components/catalog/filter-sidebar').then(mod => ({ default: mod.FilterSidebar }))
);

interface FilterSidebarWrapperProps {
  categories: string[];
  platforms: string[];
  maxPrice: {
    amount: number;
    currency: string;
    discount: number;
  };
}

export function FilterSidebarWrapper({ categories, platforms, maxPrice }: FilterSidebarWrapperProps) {
  return (
    <Sidebar className="w-[280px]">
      <SidebarHeader>
        <div className="px-4 py-2">
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Suspense fallback={<FilterSkeleton />}>
          <FilterSidebarLazy 
            categories={categories}
            platforms={platforms}
            maxPrice={maxPrice}
          />
        </Suspense>
      </SidebarContent>
    </Sidebar>
  );
} 