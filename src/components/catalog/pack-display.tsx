'use client';

import { PackCard } from '@/components/packs/pack-card';
import { useDisplayMode } from '@/store/display-mode-store';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Pack } from '@/types/pack';
import { usePacks } from '@/hooks/use-packs';

const SKELETON_KEYS = Array.from({ length: 8 }, (_, i) => `skeleton-${i}`);

// Sous-composant pour l'affichage en grille
function PackGrid({ packs }: { packs: Pack[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {packs.map((pack) => (
        <PackCard key={pack.id} pack={pack} />
      ))}
    </div>
  );
}

// Sous-composant pour l'affichage en carousel
function PackCarousel({ packs }: { packs: Pack[] }) {
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
          {packs.map((pack) => (
            <CarouselItem key={pack.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <PackCard pack={pack} />
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
function PackInfiniteScroll({ packs }: { packs: Pack[] }) {
  const [isInView, setIsInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const setupObserver = useCallback(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting);
        },
        { threshold: 0.1 }
      );

      if (triggerRef.current) {
        observerRef.current.observe(triggerRef.current);
      }
    }
  }, []);

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
      {packs.map((pack, index) => (
        <motion.div
          key={pack.id}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <PackCard pack={pack} />
        </motion.div>
      ))}
      <div ref={triggerRef} className="h-10" />
    </div>
  );
}

// Composant principal
export function PackDisplay() {
  const { packs, isLoading } = usePacks();
  const displayMode = useDisplayMode((state) => state.displayMode);

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
    case 'grid':
      return <PackGrid packs={packs} />;
    case 'carousel':
      return <PackCarousel packs={packs} />;
    case 'infinite':
      return <PackInfiniteScroll packs={packs} />;
    default:
      return <PackGrid packs={packs} />;
  }
} 