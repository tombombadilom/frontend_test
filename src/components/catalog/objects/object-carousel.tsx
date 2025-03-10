'use client';

import { ObjectCardCarousel } from '@/components/catalog/objects/object-card-carousel';
import type { GameItem } from '@/types/game';
import { motion, AnimatePresence } from 'motion/react';

interface ObjectCarouselProps {
  objects: GameItem[];
  onPrevious?: () => void;
  onNext?: () => void;
}

export function ObjectCarousel({ objects, onPrevious, onNext }: ObjectCarouselProps) {
  return (
    <div className="relative group">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={objects[0].id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
        >
          <ObjectCardCarousel object={objects[0]} onPrevious={onPrevious} onNext={onNext} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 