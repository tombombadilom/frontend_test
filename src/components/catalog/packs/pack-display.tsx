'use client';

import { useDisplayMode } from '@/store/display-mode-store';
import type { Pack } from '@/types/pack';
import { usePacks } from '@/hooks/use-packs';
import { usePackFilterStore } from '@/store/filter-store';
import { PackGrid } from '@/components/catalog/packs/pack-grid';
import { PackCarousel } from '@/components/catalog/packs/pack-carousel';
import { PackInfiniteScroll } from '@/components/catalog/packs/pack-infinite-scroll';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 8;
const ITEMS_PER_SCROLL = 4;
const SKELETON_KEYS = Array.from({ length: ITEMS_PER_PAGE }, (_, i) => `skeleton-${i}`);
const MAX_VISIBLE_PAGES = 5;

export function PackDisplay() {
  const { packs, isLoading } = usePacks();
  const filters = usePackFilterStore();
  const displayMode = useDisplayMode((state) => state.displayMode);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCarouselIndex, _setCurrentCarouselIndex] = useState(0);
  const [displayedItems, _setDisplayedItems] = useState(ITEMS_PER_SCROLL);

  // Filter packs based on current filters
  const filteredPacks = packs?.filter((pack) => {
    const matchesSearch = pack.name.toLowerCase().includes(filters.search.toLowerCase());
    const matchesPlatform = filters.platforms.length === 0 || pack.tags.some(tag => filters.platforms.includes(tag));
    const matchesPrice = (!filters.priceRange[0] || pack.price.amount >= filters.priceRange[0]) && 
                        (!filters.priceRange[1] || pack.price.amount <= filters.priceRange[1]);
    const matchesGames = filters.games.length === 0 || filters.games.includes(pack.gameId.toString());
    const matchesTypes = filters.types.length === 0 || filters.types.includes(pack.type);
    const matchesDiscounted = !filters.onlyDiscounted || (pack.price.discount ?? 0) > 0;
    const matchesNewReleases = !filters.onlyNewReleases || pack.isFeatured;

    return matchesSearch && matchesPlatform && matchesPrice && matchesGames && 
           matchesTypes && matchesDiscounted && matchesNewReleases;
  }) ?? [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {SKELETON_KEYS.map((key) => (
          <div
            key={key}
            className="h-[300px] animate-pulse rounded-lg bg-muted"
          />
        ))}
      </div>
    );
  }

  if (filteredPacks.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border bg-card">
        <p className="text-center text-muted-foreground">
          Aucun pack ne correspond à vos critères de recherche.
        </p>
      </div>
    );
  }

  switch (displayMode) {
    case 'grid': {
      const totalPages = Math.ceil(filteredPacks.length / ITEMS_PER_PAGE);
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const currentPacks = filteredPacks.slice(startIndex, endIndex);

      // Calculate visible page numbers
      let pageNumbers = [];
      if (totalPages <= MAX_VISIBLE_PAGES) {
        pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
      } else {
        if (currentPage <= 3) {
          pageNumbers = [1, 2, 3, 4, 'ellipsis', totalPages];
        } else if (currentPage >= totalPages - 2) {
          pageNumbers = [1, 'ellipsis', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        } else {
          pageNumbers = [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages];
        }
      }

      return (
        <div className="space-y-6">
          <PackGrid packs={currentPacks} />
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </PaginationItem>
                
                {pageNumbers.map((pageNumber) => (
                  <PaginationItem key={typeof pageNumber === 'number' ? pageNumber : `ellipsis-${pageNumber}`}>
                    {pageNumber === 'ellipsis' ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        onClick={() => setCurrentPage(pageNumber as number)}
                        isActive={currentPage === pageNumber}
                      >
                        {pageNumber}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      );
    }
    case 'carousel':
      return (
        <PackCarousel 
          packs={[filteredPacks[currentCarouselIndex]]}
          onPrevious={() => _setCurrentCarouselIndex((prev) => 
            prev === 0 ? filteredPacks.length - 1 : prev - 1
          )}
          onNext={() => _setCurrentCarouselIndex((prev) => 
            prev === filteredPacks.length - 1 ? 0 : prev + 1
          )}
        />
      );
    case 'infinite':
      return <PackInfiniteScroll packs={filteredPacks.slice(0, displayedItems)} />;
    default:
      return <PackGrid packs={filteredPacks} />;
  }
} 