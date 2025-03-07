'use client';
import type React from 'react';
import { motion, MotionConfig } from 'motion/react';
import { cn } from '@/lib/utils';

interface ToolbarDynamicProps {
  children: React.ReactNode;
  isOpen: boolean;
  className?: string;
}

const transition = {
  type: 'spring',
  stiffness: 200,
  damping: 20,
  mass: 0.5,
};

export default function ToolbarDynamic({ children, isOpen, className }: ToolbarDynamicProps) {
  return (
    <MotionConfig transition={transition}>
      <div className={cn('relative', className)}>
        <motion.div
          className="rounded-xl border border-zinc-950/10 bg-background"
          animate={{
            width: isOpen ? '300px' : '40px',
          }}
          initial={{ width: '40px' }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 20,
            mass: 0.5,
          }}
        >
          <div className="p-2">
            {children}
          </div>
        </motion.div>
      </div>
    </MotionConfig>
  );
}
