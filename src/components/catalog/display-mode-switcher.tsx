'use client';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useDisplayMode } from '@/store/display-mode-store';
import { Grid, List, SlidersHorizontal } from 'lucide-react';
import { motion } from 'motion/react';

type DisplayMode = 'grid' | 'carousel' | 'infinite';

export function DisplayModeSwitcher() {
  const { displayMode, setDisplayMode } = useDisplayMode();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2"
    >
      <ToggleGroup
        type="single"
        value={displayMode}
        onValueChange={(value: DisplayMode | '') => value && setDisplayMode(value)}
        className="h-8"
      >
        <ToggleGroupItem value="grid" aria-label="Vue grille">
          <Grid className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="carousel" aria-label="Vue carrousel">
          <SlidersHorizontal className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="infinite" aria-label="Vue liste infinie">
          <List className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </motion.div>
  );
} 