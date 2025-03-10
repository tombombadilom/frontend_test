'use client';

import type React from 'react';
import { Suspense } from 'react';
import { DisplayModeSwitcher } from '@/components/catalog/display-mode-switcher';
import { SortSelector } from '@/components/catalog/sort-selector';
import { FilterSkeleton } from '@/components/ui/skeletons/filter-skeleton';
import { CardListSkeleton } from '@/components/ui/skeletons/card-skeleton';
import { Button } from '@/components/ui/button';
import { useCatalogFilters } from '@/hooks/use-catalog-filters';
import { 
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter
} from '@/components/ui/sidebar';

interface CatalogLayoutProps {
  title: string;
  type: 'games' | 'objects' | 'packs';
  filterSidebar: React.ReactNode;
  content: React.ReactNode;
}

export function CatalogLayout({ title, type, filterSidebar, content }: CatalogLayoutProps) {
  const { resetFilters } = useCatalogFilters(type);

  return (
    <SidebarProvider>
      <Sidebar className="border-none">
        <SidebarHeader className="border-none h-36">
          <h1 className="p-4 text-2xl font-bold">{title}</h1>
        </SidebarHeader>
        <SidebarContent className="sm:bg-background sm:text-foreground">
          <Suspense fallback={<FilterSkeleton />}>
            {filterSidebar}
          </Suspense>
        </SidebarContent>
        <SidebarFooter className="border-none p-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={resetFilters}
          >
            Réinitialiser les filtres
          </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-4 px-4 border-none">
          <SidebarTrigger />
          <div className="flex items-center gap-4 ml-auto">
            <SortSelector type={type} />
            <DisplayModeSwitcher />
          </div>
        </header>
        <main>
          <Suspense fallback={<CardListSkeleton />}>
            {content}
          </Suspense>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
} 