'use client';

import { ObjectCardGrid } from '@/components/catalog/objects/object-card-grid';
import type { GameItem } from '@/types/game';
import { motion, AnimatePresence } from 'motion/react';

interface ObjectGridProps {
  objects: GameItem[];
}

export function ObjectGrid({ objects }: ObjectGridProps) {
  return (
    <div className="container mx-auto space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {objects.map((object, index) => (
            <motion.div
              key={object.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index % 4 * 0.1 }}
            >
              <ObjectCardGrid object={object} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
} 