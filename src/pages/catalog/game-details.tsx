import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Game } from '@/types/game';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface GameDetailsProps {
  id?: number;
}

const GameDetailsPage = ({ id: propId }: GameDetailsProps) => {
  const { id: urlId } = useParams<{ id: string }>();
  const gameId = propId || (urlId ? Number.parseInt(urlId, 10) : undefined);

  const [game, setGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);
  const [isInCart, setIsInCart] = useState<boolean>(false);

  useEffect(() => {
    const fetchGameDetails = async () => {
      if (!gameId) return;

      setIsLoading(true);
      try {
        // Dans une application réelle, cela ferait une requête API
        const response = await import('@/data/games.json');
        const games = response.default as Game[];
        const foundGame = games.find((g) => g.id === gameId);

        if (!foundGame) {
          throw new Error('Jeu non trouvé');
        }

        setGame(foundGame);
        setActiveImage(foundGame.coverImage);

        // Simuler la vérification du panier et de la wishlist
        setIsInWishlist(Math.random() > 0.5);
        setIsInCart(Math.random() > 0.7);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Une erreur est survenue')
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchGameDetails();
  }, [gameId]);

  const toggleWishlist = () => {
    setIsInWishlist((prev) => !prev);
    // Dans une application réelle, cela enverrait une requête API
  };

  const toggleCart = () => {
    setIsInCart((prev) => !prev);
    // Dans une application réelle, cela enverrait une requête API
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="h-[400px] bg-muted rounded mb-4" />
              <div className="flex gap-2 mb-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-20 w-20 bg-muted rounded" />
                ))}
              </div>
            </div>
            <div>
              <div className="h-6 bg-muted rounded w-1/2 mb-4" />
              <div className="h-4 bg-muted rounded w-full mb-2" />
              <div className="h-4 bg-muted rounded w-2/3 mb-6" />
              <div className="h-10 bg-muted rounded mb-4" />
              <div className="h-10 bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">
            {error ? error.message : 'Jeu non trouvé'}
          </h2>
          <Button variant="outline">Retour au catalogue</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">{game.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Colonne gauche - Images */}
        <div className="md:col-span-2">
          <div className="rounded-lg overflow-hidden mb-4 bg-card">
            <img
              src={activeImage}
              alt={game.title}
              className="w-full h-[400px] object-cover object-center"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              type="button"
              className={`cursor-pointer rounded-md overflow-hidden border-2 ${activeImage === game.coverImage ? 'border-primary' : 'border-transparent'}`}
              onClick={() => setActiveImage(game.coverImage)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveImage(game.coverImage);
                }
              }}
            >
              <img
                src={game.coverImage}
                alt="Cover"
                className="w-20 h-20 object-cover"
              />
            </button>

            {game.screenshots.map((screenshot, index) => (
              <button
                type="button"
                key={`screenshot-${index}-${screenshot}`}
                className={`cursor-pointer rounded-md overflow-hidden border-2 ${activeImage === screenshot ? 'border-primary' : 'border-transparent'}`}
                onClick={() => setActiveImage(screenshot)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActiveImage(screenshot);
                  }
                }}
              >
                <img
                  src={screenshot}
                  alt={`Screenshot ${index + 1}`}
                  className="w-20 h-20 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Colonne droite - Informations */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            {game.genres.map((genre) => (
              <Badge key={genre} variant="secondary">
                {genre}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-2 mb-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((starPosition) => (
                <Star
                  key={`star-position-${starPosition}`}
                  className={`h-5 w-5 ${starPosition <= Math.round(game.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {game.rating.toFixed(1)}/5
            </span>
          </div>

          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-2">
              Développeur: {game.developer}
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Éditeur: {game.publisher}
            </p>
            <p className="text-sm text-muted-foreground">
              Date de sortie: {new Date(game.releaseDate).toLocaleDateString()}
            </p>
          </div>

          <div className="mb-6">
            <div className="flex items-baseline mb-2">
              {game.discount > 0 ? (
                <>
                  <span className="line-through text-muted-foreground mr-2">
                    {game.price.toFixed(2)} €
                  </span>
                  <span className="text-2xl font-bold text-green-600">
                    {(game.price * (1 - game.discount / 100)).toFixed(2)} €
                  </span>
                  <Badge variant="destructive" className="ml-2">
                    -{game.discount}%
                  </Badge>
                </>
              ) : (
                <span className="text-2xl font-bold">
                  {game.price.toFixed(2)} €
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              className="w-full"
              onClick={toggleCart}
              variant={isInCart ? 'secondary' : 'default'}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {isInCart ? 'Retirer du panier' : 'Ajouter au panier'}
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={toggleWishlist}
            >
              <Heart
                className={`mr-2 h-4 w-4 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`}
              />
              {isInWishlist ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      <Tabs defaultValue="description" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="requirements">Configuration requise</TabsTrigger>
          <TabsTrigger value="reviews">Avis</TabsTrigger>
        </TabsList>

        <TabsContent value="description">
          <Card>
            <CardContent className="pt-6">
              <p>{game.description}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requirements">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">
                Configuration minimale
              </h3>
              <p>
                Les informations sur la configuration requise seront ajoutées
                prochainement.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card>
            <CardContent className="pt-6">
              <p>Les avis des joueurs seront disponibles prochainement.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GameDetailsPage;
