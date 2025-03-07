'use client';

import type React from 'react';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedCard({
  children,
  className,
  delay = 0,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn('rounded-lg border bg-card p-4 shadow-sm', className)}
    >
      {children}
    </motion.div>
  );
}
