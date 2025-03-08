'use client';

import type { ReactNode } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import type { WithId } from '@/types/common';

interface CarouselDisplayProps<T extends WithId> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  getItemKey?: (item: T) => string | number;
  className?: string;
}

export function CarouselDisplay<T extends WithId>({ 
  items, 
  renderItem,
  getItemKey = (item: T) => item.id,
  className 
}: CarouselDisplayProps<T>) {
  return (
    <div className={cn("relative max-w-4xl mx-auto", className)}>
      <Carousel
        opts={{
          align: 'center',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {items.map((item) => {
            const key = getItemKey(item);
            return (
              <CarouselItem key={`item-${key}`} className="basis-full">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`content-${key}`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ 
                      duration: 0.3,
                      type: 'spring',
                      stiffness: 300,
                      damping: 30
                    }}
                    className="p-1"
                  >
                    {renderItem(item)}
                  </motion.div>
                </AnimatePresence>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4">
          <CarouselPrevious className="relative left-0 h-12 w-12 translate-x-0" />
          <CarouselNext className="relative right-0 h-12 w-12 translate-x-0" />
        </div>
      </Carousel>
    </div>
  );
} 