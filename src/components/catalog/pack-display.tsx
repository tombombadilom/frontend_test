'use client';

import { useDisplayMode } from '@/store/display-mode-store';
import type { Pack } from '@/types/pack';
import { usePacks } from '@/hooks/use-packs';
import { PackGrid } from '@/components/packs/pack-grid';
import { PackCarousel } from '@/components/packs/pack-carousel';
import { PackInfiniteScroll } from '@/components/packs/pack-infinite-scroll';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { useInView } from 'motion/react';

const ITEMS_PER_PAGE = 8;
const ITEMS_PER_SCROLL = 4;
const SKELETON_KEYS = Array.from({ length: ITEMS_PER_PAGE }, (_, i) => `skeleton-${i}`);
const MAX_VISIBLE_PAGES = 5;

export function PackDisplay() {
  const { packs, isLoading } = usePacks();
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

  if (packs.length === 0) {
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
      const totalPages = Math.ceil(packs.length / ITEMS_PER_PAGE);
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const currentPacks = packs.slice(startIndex, endIndex);

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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {currentPacks.map((pack, index) => (
                <motion.div
                  key={pack.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index % 4 * 0.1 }}
                >
                  <PackGrid packs={[pack]} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
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
        <div className="relative group">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={packs[currentCarouselIndex].id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <PackCarousel 
                packs={[packs[currentCarouselIndex]]}
                onPrevious={() => setCurrentCarouselIndex((prev) => 
                  prev === 0 ? packs.length - 1 : prev - 1
                )}
                onNext={() => setCurrentCarouselIndex((prev) => 
                  prev === packs.length - 1 ? 0 : prev + 1
                )}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      );
    case 'infinite': {
      const _hasMore = displayedItems < packs.length;
      const visiblePacks = packs.slice(0, displayedItems);
      
      return (
        <div className="relative flex flex-col h-[calc(100dvh-14rem)] -mx-6">
          <div 
            className="flex-1 flex flex-col divide-y divide-border overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            <AnimatePresence mode="popLayout">
              {visiblePacks.map((pack, index) => (
                <motion.div
                  key={pack.id}
                  className="flex-1 min-h-[28%] px-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index % 4 * 0.1 }}
                >
                  <PackInfiniteScroll packs={[pack]} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      );
    }
    default:
      return <PackGrid packs={packs} />;
  }
} 