'use client';

import { PackCardGrid } from '@/components/catalog/packs/pack-card-grid';
import type { Pack } from '@/types/pack';
import { motion, AnimatePresence } from 'motion/react';

interface PackGridProps {
  packs: Pack[];
}

export function PackGrid({ packs }: PackGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <AnimatePresence mode="popLayout">
        {packs.map((pack, index) => (
          <motion.div
            key={pack.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index % 4 * 0.1 }}
          >
            <PackCardGrid pack={pack} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
} 