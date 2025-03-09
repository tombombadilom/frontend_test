'use client';

import { useDisplayMode } from '@/store/display-mode-store';
import type { Game } from '@/types/game';
import { useGames } from '@/hooks/use-games';
import { useFilters } from '@/hooks/use-filters';
import { GameCardGrid } from '@/components/games/game-card/game-card-grid';
import { GameCardCarousel } from '@/components/games/game-card/game-card-carousel';
import { GameCardInfinite } from '@/components/games/game-card/game-card-infinite';
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
import { useInView } from 'motion/react';
import { cn } from '@/lib/utils';

const ITEMS_PER_PAGE = 8;
const ITEMS_PER_SCROLL = 4;
const SKELETON_KEYS = Array.from({ length: ITEMS_PER_PAGE }, (_, i) => `skeleton-${i}`);
const MAX_VISIBLE_PAGES = 5;

export function GameDisplay() {
  const { games } = useGames();
  const { filteredGames } = useFilters(games);
  const displayMode = useDisplayMode((state) => state.displayMode);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [displayedItems, setDisplayedItems] = useState(ITEMS_PER_SCROLL);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Utilisation optimisée de l'Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && displayMode === 'infinite' && !isLoading) {
          setIsLoading(true);
          // Simulation d'un délai de chargement pour l'effet visuel
          setTimeout(() => {
            setDisplayedItems(prev => {
              const newValue = Math.min(prev + ITEMS_PER_SCROLL, filteredGames.length);
              if (newValue === prev) {
                observer.disconnect(); // Déconnexion si plus d'items à charger
              }
              return newValue;
            });
            setIsLoading(false);
          }, 500);
        }
      },
      {
        root: null, // Utilise le viewport comme racine
        rootMargin: '100px', // Déclenche 100px avant d'atteindre le loader
        threshold: 0.1 // Déclenche quand 10% du loader est visible
      }
    );

    if (loaderRef.current && displayMode === 'infinite') {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [displayMode, filteredGames.length, isLoading]);

  // Reset displayed items when display mode changes
  useEffect(() => {
    setDisplayedItems(ITEMS_PER_SCROLL);
    setIsLoading(false);
  }, []);

  if (!games) {
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

  if (filteredGames.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border bg-card">
        <p className="text-center text-muted-foreground">
          Aucun jeu ne correspond à vos critères de recherche.
        </p>
      </div>
    );
  }

  switch (displayMode) {
    case 'grid': {
      const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const currentGames = filteredGames.slice(startIndex, endIndex);

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
              {currentGames.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index % 4 * 0.1 }}
                >
                  <GameCardGrid game={game} />
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
              key={filteredGames[currentCarouselIndex].id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <GameCardCarousel 
                game={filteredGames[currentCarouselIndex]} 
                onPrevious={() => setCurrentCarouselIndex((prev) => 
                  prev === 0 ? filteredGames.length - 1 : prev - 1
                )}
                onNext={() => setCurrentCarouselIndex((prev) => 
                  prev === filteredGames.length - 1 ? 0 : prev + 1
                )}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      );
    case 'infinite': {
      const hasMore = displayedItems < filteredGames.length;
      const visibleGames = filteredGames.slice(0, displayedItems);
      
      return (
        <div className="relative flex flex-col h-[calc(100dvh-14rem)] -mx-6">
          <div 
            className="flex-1 flex flex-col divide-y divide-border overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            <AnimatePresence mode="popLayout">
              {visibleGames.map((game, index) => (
                <motion.div
                  key={game.id}
                  className="flex-1 min-h-[28%] px-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index % 4 * 0.1 }}
                >
                  <GameCardInfinite game={game} />
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Loader optimisé pour l'infinite scroll */}
            {hasMore && (
              <div 
                ref={loaderRef}
                className="h-20 flex items-center justify-center px-6"
              >
                <motion.div
                  animate={isLoading ? { 
                    rotate: 360,
                    scale: [1, 1.2, 1]
                  } : { 
                    y: [0, 10, 0]
                  }}
                  transition={{ 
                    duration: isLoading ? 1 : 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut"
                  }}
                >
                  <ChevronDown className={cn(
                    "h-6 w-6",
                    isLoading ? "text-primary animate-spin" : "text-muted-foreground"
                  )} />
                </motion.div>
              </div>
            )}
          </div>
        </div>
      );
    }
    default:
      return null;
  }
} 