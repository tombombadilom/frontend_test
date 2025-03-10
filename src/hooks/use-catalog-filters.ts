'use client';

import { useGameFilterStore, useObjectFilterStore, usePackFilterStore } from '@/store/filter-store';

type CatalogType = 'games' | 'objects' | 'packs';

export function useCatalogFilters(type: CatalogType) {
  switch (type) {
    case 'games':
      return useGameFilterStore();
    case 'objects':
      return useObjectFilterStore();
    case 'packs':
      return usePackFilterStore();
    default:
      throw new Error(`Invalid catalog type: ${type}`);
  }
} 