'use client';

import { useDisplayMode } from '@/store/display-mode-store';
import type { GameItem } from '@/types/game';
import { useObjects } from '@/hooks/use-objects';
import { ObjectGrid } from '@/components/objects/object-grid';
import { ObjectCarousel } from '@/components/objects/object-carousel';
import { ObjectInfiniteScroll } from '@/components/objects/object-infinite-scroll';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ObjectCard } from '@/components/objects/object-card';

const ITEMS_PER_PAGE = 8;
const ITEMS_PER_SCROLL = 4;

const createSkeletonItem = (index: number): GameItem => ({
  id: index,
  name: '',
  description: '',
  category: '',
  rarity: 'common',
  price: {
    amount: 0,
    currency: 'USD'
  },
  preview: {
    imageUrl: ''
  },
  createdAt: new Date(),
  updatedAt: new Date(),
  isAvailable: true
});

const SKELETON_ITEMS = Array.from({ length: ITEMS_PER_PAGE }, (_, i) => createSkeletonItem(i));
const MAX_VISIBLE_PAGES = 5;

export function ObjectDisplay() {
  const { objects, isLoading } = useObjects();
  const displayMode = useDisplayMode((state) => state.displayMode);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [displayedItems, _setDisplayedItems] = useState(ITEMS_PER_SCROLL);

  if (isLoading) {
    switch (displayMode) {
      case 'grid':
        return (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {SKELETON_ITEMS.map((item) => (
              <ObjectCard key={item.id} object={item} isLoading={true} />
            ))}
          </div>
        );
      case 'carousel':
        return (
          <div className="relative group">
            <ObjectCard object={SKELETON_ITEMS[0]} isLoading={true} />
          </div>
        );
      case 'infinite':
        return (
          <div className="relative flex flex-col h-[calc(100dvh-14rem)] -mx-6">
            <div className="flex-1 flex flex-col divide-y divide-border overflow-y-auto">
              {SKELETON_ITEMS.slice(0, 4).map((item) => (
                <div key={item.id} className="flex-1 min-h-[28%] px-6">
                  <ObjectCard object={item} isLoading={true} />
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {SKELETON_ITEMS.map((item) => (
              <ObjectCard key={item.id} object={item} isLoading={true} />
            ))}
          </div>
        );
    }
  }

  if (objects.length === 0) {
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
      const totalPages = Math.ceil(objects.length / ITEMS_PER_PAGE);
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const currentObjects = objects.slice(startIndex, endIndex);

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
              {currentObjects.map((object, index) => (
                <motion.div
                  key={object.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index % 4 * 0.1 }}
                >
                  <ObjectGrid objects={[object]} />
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
              key={objects[currentCarouselIndex].id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <ObjectCarousel 
                objects={[objects[currentCarouselIndex]]}
                onPrevious={() => setCurrentCarouselIndex((prev) => 
                  prev === 0 ? objects.length - 1 : prev - 1
                )}
                onNext={() => setCurrentCarouselIndex((prev) => 
                  prev === objects.length - 1 ? 0 : prev + 1
                )}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      );
    case 'infinite': {
      const _hasMore = displayedItems < objects.length;
      const visibleObjects = objects.slice(0, displayedItems);
      
      return (
        <div className="relative flex flex-col h-[calc(100dvh-14rem)] -mx-6">
          <div 
            className="flex-1 flex flex-col divide-y divide-border overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            <AnimatePresence mode="popLayout">
              {visibleObjects.map((object, index) => (
                <motion.div
                  key={object.id}
                  className="flex-1 min-h-[28%] px-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index % 4 * 0.1 }}
                >
                  <ObjectInfiniteScroll objects={[object]} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      );
    }
    default:
      return <ObjectGrid objects={objects} />;
  }
} 