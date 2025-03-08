'use client';

import type React from 'react';
import { Suspense } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { DisplayModeSwitcher } from '@/components/catalog/display-mode-switcher';
import { SortSelector } from '@/components/catalog/sort-selector';
import { FilterSkeleton } from '@/components/ui/skeletons/filter-skeleton';
import { CardListSkeleton } from '@/components/ui/skeletons/card-skeleton';
import { Separator } from '@/components/ui/separator';
import { 
  Sidebar,
  SidebarProvider, 
  SidebarInset, 
  SidebarTrigger,
  SidebarContent
} from '@/components/ui/sidebar';
import type { Price } from '@/types/game';

interface FilterOption {
  id: string;
  name: string;
  count: number;
}

interface CatalogLayoutProps {
  title: string;
  filterSidebar: React.ReactNode;
  content: React.ReactNode;
}

export function CatalogLayout({ title, filterSidebar, content }: CatalogLayoutProps) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarContent>
          <div className="sticky top-4">
            <Suspense fallback={<FilterSkeleton />}>
              {filterSidebar}
            </Suspense>
          </div>
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <div className="container mx-auto">
          <header className="flex h-16 shrink-0 items-center gap-2 px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger>
                <SlidersHorizontal className="h-5 w-5" />
              </SidebarTrigger>
              <Separator orientation="vertical" className="h-4" />
              <h1 className="text-2xl font-bold">{title}</h1>
            </div>
            <div className="flex items-center gap-4 ml-auto">
              <SortSelector />
              <DisplayModeSwitcher />
            </div>
          </header>

          <main className="flex-1 p-4">
            <div className="flex-1 min-w-0">
              <Suspense fallback={<CardListSkeleton />}>
                {content}
              </Suspense>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export interface Item {
  id: number;
  name: string;
  description: string;
  price: Price;
  tags?: string[];
  [key: string]: unknown;
}

export function prepareFilterOptions(items: Item[], field: string): FilterOption[] {
  const counts = items.reduce((acc, item) => {
    const value = item[field];
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(counts).map(([value, count]) => ({
    id: value,
    name: value,
    count,
  }));
}

export function prepareTagOptions(items: Item[]): FilterOption[] {
  const counts = items.reduce((acc, item) => {
    if (item.tags) {
      for (const tag of item.tags) {
        acc[tag] = (acc[tag] || 0) + 1;
      }
    }
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(counts).map(([tag, count]) => ({
    id: tag,
    name: tag,
    count: count as number,
  }));
} 