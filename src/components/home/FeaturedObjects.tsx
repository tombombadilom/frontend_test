'use client';

import { ObjectCard } from '@/components/catalog/objects/object-card';
import { useObjects } from '@/hooks/use-objects';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import type { GameItem } from '@/types/game';
import { HomeObjectCard } from './HomeObjectCard';

export function FeaturedObjects() {
  const { objects, isLoading } = useObjects();
  const featuredObjects = objects
    .filter((object) => object.metadata?.isFeatured)
    .slice(0, 4);

  return (
    <section className="game-section bg-muted/30">
      <div className="game-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center justify-between"
        >
          <h2 className="text-2xl font-bold md:text-3xl">Objets à la une</h2>
          <Link
            to="/objects"
            className="text-sm font-medium text-primary hover:underline"
          >
            Voir tout
          </Link>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`featured-objects-skeleton-${Date.now()}-${index}`}
                className="h-[300px] animate-pulse rounded-lg bg-muted"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {featuredObjects.map((object, index) => (
              <motion.div
                key={object.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <HomeObjectCard object={object} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
} 