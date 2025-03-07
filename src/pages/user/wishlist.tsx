import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { Game } from '@/types/game';
import { useEffect, useState } from 'react';

interface WishlistItem {
  id: string;
  gameId: string;
  addedAt: string;
  game: Game;
}

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simuler le chargement des données de la wishlist
    const fetchWishlist = async () => {
      setIsLoading(true);
      try {
        // Simuler un délai de chargement
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Dans une application réelle, cela ferait une requête API
        // Pour l'instant, on utilise des données mockées
        const response = await import('@/data/games.json');
        const games = response.default as Game[];

        // Créer des éléments de wishlist à partir des jeux
        const mockWishlistItems: WishlistItem[] = games
          .slice(0, 5)
          .map((game) => ({
            id: `wishlist-${game.id}`,
            gameId: game.id,
            addedAt: new Date().toISOString(),
            game,
          }));

        setWishlistItems(mockWishlistItems);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Une erreur est survenue')
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = (itemId: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  if (isLoading) {
    return <div>Chargement de votre liste de souhaits...</div>;
  }

  if (error) {
    return <div>Erreur: {error.message}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Ma liste de souhaits</h1>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">
            Votre liste de souhaits est vide
          </p>
          <Button className="mt-4" variant="outline">
            Parcourir le catalogue
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <img
                  src={item.game.coverImage}
                  alt={item.game.title}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-xl mb-2">
                  {item.game.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground mb-2">
                  {item.game.developer} • {item.game.genres.join(', ')}
                </p>
                <p className="font-bold">
                  {item.game.discount > 0 ? (
                    <>
                      <span className="line-through text-muted-foreground mr-2">
                        {item.game.price.toFixed(2)} €
                      </span>
                      <span className="text-green-600">
                        {(
                          item.game.price *
                          (1 - item.game.discount / 100)
                        ).toFixed(2)}{' '}
                        €
                      </span>
                    </>
                  ) : (
                    <span>{item.game.price.toFixed(2)} €</span>
                  )}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between p-4 pt-0">
                <Button variant="outline" size="sm">
                  Voir
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  Retirer
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
