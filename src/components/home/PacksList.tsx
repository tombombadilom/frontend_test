'use client';

import { PackCard } from '@/components/catalog/packs/pack-card';
import { usePacks } from '@/hooks/use-packs';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PacksList() {
  const { packs } = usePacks();
  const featuredPacks = packs.filter((pack) => pack.isFeatured).slice(0, 4);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Featured Packs</h2>
        <Button variant="ghost" asChild>
          <Link to="/packs" className="flex items-center gap-2">
            View all packs
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featuredPacks.map((pack) => (
          <PackCard key={pack.id} pack={pack} />
        ))}
      </div>
    </section>
  );
} 