'use client';

import type React from 'react';

import { useWishlist } from '@/hooks/use-wishlist';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';
import { useHistoryStore } from '@/store/history-store';
import { Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { showToast } from '@/lib/toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

import type { Game } from '@/types/game';

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { addGameToWishlist, isInWishlist, removeItem } = useWishlist();
  const { addToRecentlyViewed } = useHistoryStore();

  const handleAddToCart = () => {
    addItem(game);
    showToast.success('Added to cart');
  };

  const handleAddToWishlist = () => {
    if (isInWishlist(game.id)) {
      removeItem(game.id);
      showToast.success('Removed from wishlist');
    } else {
      addGameToWishlist(game);
      showToast.success('Added to wishlist');
    }
  };

  const handleGameClick = () => {
    // Ajouter aux récemment consultés lors du clic
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
      <Link to={`/game/${game.id}`} className="block" onClick={handleGameClick}>
        <div className="game-card game-card-hover overflow-hidden">
          {(game.price.discount ?? 0) > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-2 top-2 z-10 rounded-md bg-game-accent px-2 py-1 text-xs font-bold text-black"
            >
              -{game.price.discount}%
            </motion.div>
          )}

          <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-md">
            <motion.img
              src={game.coverImage || '/placeholder.svg'}
              alt={game.title}
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black/50"
            >
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="rounded-md bg-primary px-3 py-1 text-sm font-medium text-white"
              >
                Voir détails
              </motion.span>
            </motion.div>
          </div>

          <div className="space-y-2">
            <h3 className="line-clamp-1 text-base font-bold transition-colors group-hover:text-primary">
              {game.title}
            </h3>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {(game.price.discount ?? 0) > 0 ? (
                  <>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm font-bold"
                    >
                      {formatPrice(game.price)}
                    </motion.span>
                    <span className="text-xs text-muted-foreground line-through">
                      {formatPrice({...game.price, discount: 0})}
                    </span>
                  </>
                ) : (
                  <span className="text-sm font-bold">
                    {formatPrice(game.price)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                    isInWishlist(game.id)
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-primary'
                  }`}
                  onClick={handleAddToWishlist}
                >
                  <Heart
                    className={`h-4 w-4 ${isInWishlist(game.id) ? 'fill-current' : ''}`}
                  />
                  <span className="sr-only">
                    {isInWishlist(game.id)
                      ? 'Retirer des favoris'
                      : 'Ajouter aux favoris'}
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-primary hover:text-white"
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
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
