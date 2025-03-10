'use client';

import { useDisplayMode } from '@/store/display-mode-store';
import type { GameItem } from '@/types/game';
import { useObjects } from '@/hooks/use-objects';
import { useObjectFilters } from '@/hooks/use-object-filters';
import { ObjectGrid } from '@/components/catalog/objects/object-grid';
import { ObjectCarousel } from '@/components/catalog/objects/object-carousel';
import { ObjectInfiniteScroll } from '@/components/catalog/objects/object-infinite-scroll';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from '@/lib/utils';

const ITEMS_PER_PAGE = 8;
const ITEMS_PER_SCROLL = 4;
const SKELETON_KEYS = Array.from({ length: ITEMS_PER_PAGE }, (_, i) => `skeleton-${i}`);
const MAX_VISIBLE_PAGES = 5;

export function ObjectDisplay() {
  const { objects, isLoading } = useObjects();
  const { filteredObjects } = useObjectFilters(objects);
  const displayMode = useDisplayMode((state) => state.displayMode);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [displayedItems, _setDisplayedItems] = useState(ITEMS_PER_SCROLL);

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

  if (filteredObjects.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border bg-card">
        <p className="text-center text-muted-foreground">
          Aucun objet ne correspond à vos critères de recherche.
        </p>
      </div>
    );
  }

  switch (displayMode) {
    case 'grid': {
      const totalPages = Math.ceil(filteredObjects.length / ITEMS_PER_PAGE);
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const currentObjects = filteredObjects.slice(startIndex, endIndex);

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
          <ObjectGrid objects={currentObjects} />
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
        <ObjectCarousel 
          objects={[filteredObjects[currentCarouselIndex]]}
          onPrevious={() => setCurrentCarouselIndex((prev) => 
            prev === 0 ? filteredObjects.length - 1 : prev - 1
          )}
          onNext={() => setCurrentCarouselIndex((prev) => 
            prev === filteredObjects.length - 1 ? 0 : prev + 1
          )}
        />
      );
    case 'infinite':
      return <ObjectInfiniteScroll objects={filteredObjects.slice(0, displayedItems)} />;
    default:
      return <ObjectGrid objects={filteredObjects} />;
  }
} 