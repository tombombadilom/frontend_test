import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import type { Game } from '@/types/game';
import { Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatPrice } from '@/lib/utils';

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();

  const handleAddToCart = (game: Game) => {
    addToCart({
      id: game.id.toString(),
      name: game.title,
      price: game.price,
      image: game.coverImage,
      quantity: 1,
    });
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <Heart className="h-12 w-12 text-muted-foreground" />
        <h2 className="text-lg font-semibold">Votre liste de souhaits est vide</h2>
        <p className="text-sm text-muted-foreground">
          Ajoutez des jeux à votre liste de souhaits pour les retrouver facilement
          plus tard.
        </p>
        <Link
          to="/catalog"
          className="mt-4 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Parcourir le catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold">Ma liste de souhaits</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-lg border bg-background p-2"
          >
            <Link
              to={`/catalog/${item.game.id}`}
              className="block aspect-[3/4] overflow-hidden rounded-md"
            >
              <img
                src={item.game.coverImage}
                alt={item.game.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
            </Link>

            <div className="relative mt-4">
              <div className="flex items-center justify-between">
                <Link
                  to={`/catalog/${item.game.id}`}
                  className="text-lg font-semibold hover:underline"
                >
                  {item.game.title}
                </Link>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="rounded-full p-2 hover:bg-muted"
                >
                  <Heart className="h-4 w-4 fill-current" />
                  <span className="sr-only">Retirer des favoris</span>
                </button>
              </div>

              <div className="mt-2 text-sm text-muted-foreground">
                {item.game.developer}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  {item.game.price.discount ? (
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">
                        {formatPrice({
                          ...item.game.price,
                          amount:
                            item.game.price.amount *
                            (1 - (item.game.price.discount || 0) / 100),
                        })}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(item.game.price)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-lg font-bold text-primary">
                      {formatPrice(item.game.price)}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleAddToCart(item.game)}
                  className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
