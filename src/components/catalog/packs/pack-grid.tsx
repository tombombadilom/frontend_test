'use client';

import { PackCard } from '@/components/packs/pack-card';
import type { Pack } from '@/types/pack';

interface PackGridProps {
  packs: Pack[];
}

export function PackGrid({ packs }: PackGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {packs.map((pack) => (
        <PackCard key={pack.id} pack={pack} />
      ))}
    </div>
  );
} 