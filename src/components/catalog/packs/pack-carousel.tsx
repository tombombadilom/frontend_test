'use client';

import { PackCardCarousel } from '@/components/catalog/packs/pack-card-carousel';
import type { Pack } from '@/types/pack';
import { motion, AnimatePresence } from 'motion/react';

interface PackCarouselProps {
  packs: Pack[];
  onPrevious?: () => void;
  onNext?: () => void;
}

export function PackCarousel({ packs, onPrevious, onNext }: PackCarouselProps) {
  return (
    <div className="relative group">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={packs[0].id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
        >
          <PackCardCarousel pack={packs[0]} onPrevious={onPrevious} onNext={onNext} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 