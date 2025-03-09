'use client';

import { ObjectCard } from '@/components/objects/object-card';
import type { GameItem } from '@/types/game';

interface ObjectGridProps {
  objects: GameItem[];
}

export function ObjectGrid({ objects }: ObjectGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {objects.map((object) => (
        <ObjectCard key={object.id} object={object} />
      ))}
    </div>
  );
} 