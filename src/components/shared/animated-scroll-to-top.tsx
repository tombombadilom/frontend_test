'use client';

import { cn } from '@/lib/utils';
import { ArrowUp } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface AnimatedScrollToTopProps {
  className?: string;
  threshold?: number;
}

export function AnimatedScrollToTop({
  className,
  threshold = 300,
}: AnimatedScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const toggleVisibility = useCallback(() => {
    const currentScrollY = window.scrollY;
    const shouldBeVisible = currentScrollY > threshold;

    // Ne mettre à jour que si la visibilité change et si on a défilé suffisamment
    if (shouldBeVisible !== isVisible && Math.abs(currentScrollY - lastScrollY.current) > 50) {
      setIsVisible(shouldBeVisible);
      lastScrollY.current = currentScrollY;
    }
  }, [threshold, isVisible]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      if (!ticking) {
        window.requestAnimationFrame(() => {
          scrollTimeout.current = setTimeout(() => {
            toggleVisibility();
            ticking = false;
          }, 100); // Debounce de 100ms
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [toggleVisibility]);

  const scrollToTop = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const scrollStep = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 0) {
        window.requestAnimationFrame(() => {
          window.scrollTo(0, currentScroll - Math.max(currentScroll / 8, 10));
          scrollStep();
        });
      }
    };

    scrollStep();
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className={cn(
            'fixed bottom-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md',
            className
          )}
          aria-label="Retour en haut"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
