'use client';

const ITEMS_PER_VIEW = 1; // Nombre d'items affichés à la fois dans le carrousel

import { GameCard } from '@/components/games/game-card';
import type { Game } from '@/types/game';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface GameCarouselProps {
  games: Game[];
}

export function GameCarousel({ games }: GameCarouselProps) {
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
          {games.map((game) => (
            <CarouselItem key={game.id} className="basis-full">
              <div className="p-1">
                <GameCard game={game} />
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