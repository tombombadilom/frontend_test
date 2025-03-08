'use client';

import { GameCard } from '@/components/games/game-card';
import { useGames } from '@/hooks/use-games';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function GamesList() {
  const { games } = useGames();
  const featuredGames = games.filter((game) => game.isFeatured).slice(0, 4);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Featured Games</h2>
        <Button variant="ghost" asChild>
          <Link to="/games" className="flex items-center gap-2">
            View all games
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featuredGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  );
} 