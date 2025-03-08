'use client';

import { ObjectCard } from '@/components/objects/object-card';
import { useDisplayMode } from '@/store/display-mode-store';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { motion } from 'motion/react';
import { useCallback, useEffect, useRef } from 'react';
import type { GameItem } from '@/types/game';
import { useObjects } from '@/hooks/use-objects';

// Sous-composant pour l'affichage en grille
function ObjectGrid({ objects }: { objects: GameItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {objects.map((object) => (
        <ObjectCard key={object.id} object={object} />
      ))}
    </div>
  );
}

// Sous-composant pour l'affichage en carousel
function ObjectCarousel({ objects }: { objects: GameItem[] }) {
  return (
    <div className="relative">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {objects.map((object) => (
            <CarouselItem key={object.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <ObjectCard object={object} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

// Sous-composant pour l'affichage en défilement infini
function ObjectInfiniteScroll({ objects, onLoadMore }: { objects: GameItem[]; onLoadMore: () => void }) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const setupObserver = useCallback(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            onLoadMore();
          }
        },
        { threshold: 0.1 }
      );

      if (triggerRef.current) {
        observerRef.current.observe(triggerRef.current);
      }
    }
  }, [onLoadMore]);

  useEffect(() => {
    setupObserver();

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [setupObserver]);

  return (
    <div className="space-y-6">
      {objects.map((object, index) => (
        <motion.div
          key={object.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <ObjectCard object={object} />
        </motion.div>
      ))}
      <div ref={triggerRef} className="h-10" />
    </div>
  );
}

export function ObjectDisplay() {
  const { objects, isLoading, loadMore } = useObjects();
  const { displayMode } = useDisplayMode();

  if (isLoading && objects.length === 0) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={`skeleton-${Date.now()}-${index}`} className="h-[300px] animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    );
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
    case 'grid':
      return <ObjectGrid objects={objects} />;
    case 'carousel':
      return <ObjectCarousel objects={objects} />;
    case 'infinite':
      return <ObjectInfiniteScroll objects={objects} onLoadMore={loadMore} />;
    default:
      return null;
  }
} 