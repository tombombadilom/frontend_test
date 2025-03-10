'use client';

import { Button } from '@/components/ui/button';
import { useRecentlyViewed } from '@/hooks/use-recently-viewed';
import { Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export function RecentlyViewed() {
  const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewed();

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border bg-card p-4 shadow-sm"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-lg font-medium">Récemment consultés</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={clearRecentlyViewed}>
          Effacer
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {recentlyViewed.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            className="overflow-hidden rounded-md"
          >
            <Link to={`/game/${item.id}`} className="block">
              <div className="aspect-[3/4] overflow-hidden rounded-md">
                <img
                  src={item.coverImage || '/placeholder.svg'}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <h4 className="mt-2 line-clamp-1 text-sm font-medium">
                {item.title}
              </h4>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
