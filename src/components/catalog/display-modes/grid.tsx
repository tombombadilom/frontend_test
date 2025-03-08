'use client';

import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import type { WithId } from '@/types/common';

interface GridDisplayProps<T extends WithId> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  getItemKey?: (item: T) => string | number;
  className?: string;
}

export function GridDisplay<T extends WithId>({
  items,
  renderItem,
  getItemKey = (item: T) => item.id,
  className,
}: GridDisplayProps<T>) {
  return (
    <div className={cn(
      "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
      className
    )}>
      {items.map((item) => (
        <motion.div
          key={getItemKey(item)}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.3,
            type: 'spring',
            stiffness: 300,
            damping: 30
          }}
        >
          {renderItem(item)}
        </motion.div>
      ))}
    </div>
  );
} 