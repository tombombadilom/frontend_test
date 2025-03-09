'use client';

const _ITEMS_PER_VIEW = 1; // Nombre d'items affichés à la fois dans le carrousel

import { ObjectCard } from '@/components/objects/object-card';
import type { GameItem } from '@/types/game';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface ObjectCarouselProps {
  objects: GameItem[];
}

export function ObjectCarousel({ objects }: ObjectCarouselProps) {
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
          {objects.map((object) => (
            <CarouselItem key={object.id} className="basis-full">
              <div className="p-1">
                <ObjectCard object={object} />
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