'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';
import type { Game } from '@/types/game';
import { v4 as uuidv4 } from 'uuid';

export default function GamesPage() {
  const [games, _setGames] = useState<Game[]>([]);
  const [isLoading, _setIsLoading] = useState(true);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Games</h1>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map(() => (
            <Card key={uuidv4()} className="animate-pulse">
              <div className="aspect-[16/9] bg-muted rounded-t-lg" />
              <CardHeader>
                <div className="h-4 w-2/3 bg-muted rounded" />
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-4/5 bg-muted rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : games.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucun jeu trouvé</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game) => (
            <Card key={game.id}>
              <img
                src={game.coverImage}
                alt={game.title}
                className="aspect-[16/9] object-cover rounded-t-lg"
              />
              <CardHeader>
                <CardTitle>{game.title}</CardTitle>
                <CardDescription>{game.genres.join(', ')}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <span className="text-lg font-bold">
                  {formatPrice(game.price)}
                </span>
                <Button>Ajouter au panier</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 