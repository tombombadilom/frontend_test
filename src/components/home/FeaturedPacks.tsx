'use client';

import { PackCard } from '@/components/packs/pack-card';
import { usePacks } from '@/hooks/use-packs';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export function FeaturedPacks() {
  const { packs, isLoading } = usePacks();
  const featuredPacks = packs.filter((pack) => pack.isFeatured).slice(0, 4);

  return (
    <section className="game-section">
      <div className="game-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center justify-between"
        >
          <h2 className="text-2xl font-bold md:text-3xl">Packs à la une</h2>
          <Link
            to="/packs"
            className="text-sm font-medium text-primary hover:underline"
          >
            Voir tout
          </Link>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`featured-packs-skeleton-${Date.now()}-${index}`}
                className="h-[300px] animate-pulse rounded-lg bg-muted"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {featuredPacks.map((pack, index) => (
              <motion.div
                key={pack.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PackCard pack={pack} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
} 