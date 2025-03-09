'use client';

const _ITEMS_PER_VIEW = 1; // Nombre d'items affichés à la fois dans le carrousel

import { PackCard } from '@/components/packs/pack-card';
import type { Pack } from '@/types/pack';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface PackCarouselProps {
  packs: Pack[];
}

export function PackCarousel({ packs }: PackCarouselProps) {
  return (
    <div className="relative h-[calc(100dvh-12rem)] overflow-hidden px-0">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {packs.map((pack) => (
            <CarouselItem key={pack.id} className="basis-full">
              <div className="p-1">
                <PackCard pack={pack} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-white" />
        <CarouselNext className="text-white" />
      </Carousel>
    </div>
  );
} 