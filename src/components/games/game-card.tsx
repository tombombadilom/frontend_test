'use client';

import type React from 'react';
import { useState } from 'react';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import type { Game } from '@/types/game';
import { formatPrice } from '@/lib/utils';
import { useHistoryStore } from '@/store/history-store';
import { Heart, ShoppingCart, ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { showToast } from '@/lib/toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, removeItem, isInWishlist } = useWishlistStore();
  const { addToRecentlyViewed } = useHistoryStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: game.id.toString(),
      name: game.title,
      price: game.price,
      image: game.coverImage,
      quantity: 1,
    });
    showToast.success('Added to cart');
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(game.id.toString())) {
      removeItem(game.id.toString());
      showToast.success('Removed from wishlist');
    } else {
      addToWishlist(game);
      showToast.success('Added to wishlist');
    }
  };

  const handleGameClick = () => {
    addToRecentlyViewed(game);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link to={`/games/${game.id}`} className="block" onClick={handleGameClick}>
        <Card className="game-card overflow-hidden border-0 bg-transparent">
          <CardHeader className="relative p-0">
            {(game.price.discount ?? 0) > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-2 top-2 z-10 rounded-md bg-destructive px-2 py-1 text-xs font-bold text-destructive-foreground"
              >
                -{game.price.discount}%
              </motion.div>
            )}

            <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
              {imageLoading && (
                <Skeleton className="absolute inset-0 h-full w-full" />
              )}
              {!imageError ? (
                <motion.img
                  src={game.coverImage}
                  alt={game.title}
                  className="h-full w-full object-cover"
                  onLoad={() => setImageLoading(false)}
                  onError={() => {
                    setImageLoading(false);
                    setImageError(true);
                  }}
                  style={{ opacity: imageLoading ? 0 : 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted">
                  <ImageIcon className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-black/50"
              >
                <motion.span
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="rounded-md bg-primary px-3 py-1 text-sm font-medium text-primary-foreground"
                >
                  Voir détails
                </motion.span>
              </motion.div>
            </div>
          </CardHeader>

          <CardContent className="space-y-2 p-4">
            <h3 className="line-clamp-1 text-base font-bold transition-colors group-hover:text-primary">
              {game.title}
            </h3>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {game.price.discount ? (
                  <div className="flex items-center gap-2">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-lg font-bold text-primary"
                    >
                      {formatPrice({
                        ...game.price,
                        amount:
                          game.price.amount *
                          (1 - (game.price.discount || 0) / 100),
                      })}
                    </motion.span>
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(game.price)}
                    </span>
                  </div>
                ) : (
                  <span className="text-lg font-bold text-primary">
                    {formatPrice(game.price)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                    isInWishlist(game.id.toString())
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-primary'
                  }`}
                  onClick={handleToggleWishlist}
                >
                  <Heart
                    className={`h-4 w-4 ${isInWishlist(game.id.toString()) ? 'fill-current' : ''}`}
                  />
                  <span className="sr-only">
                    {isInWishlist(game.id.toString())
                      ? 'Retirer des favoris'
                      : 'Ajouter aux favoris'}
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span className="sr-only">Ajouter au panier</span>
                </motion.button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-1"
            >
              {game.platforms.map((platform) => (
                <span
                  key={platform}
                  className="rounded-sm bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground"
                >
                  {platform}
                </span>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
