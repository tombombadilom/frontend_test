import React from 'react';
import { GameDisplay } from '@/components/catalog/game-display';

export function GamePreview() {
  return (
    <div className="h-[400px] overflow-hidden">
      <GameDisplay />
    </div>
  );
} 