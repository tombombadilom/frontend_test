'use client';

import type React from 'react';
import { useState } from 'react';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import type { Game } from '@/types/game';
import { formatPrice } from '@/lib/utils';
import { useHistoryStore } from '@/store/history-store';
import { Heart, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { showToast } from '@/lib/toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const [_imageLoading, setImageLoading] = useState(true);
  const [_imageError, setImageError] = useState(false);
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
    <Link to={`/games/${game.id}`} onClick={handleGameClick}>
      <Card className="group flex flex-col sm:flex-row h-full sm:h-[150px] overflow-hidden border-none transition-all hover:bg-accent/5">
        <div className="relative h-[200px] sm:h-full sm:w-[150px] w-full shrink-0">
          <img
            src={game.coverImage}
            alt={game.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
            onLoad={() => setImageLoading(false)}
          />
        </div>
        <CardContent className="flex flex-col justify-between p-4 w-full">
          <div>
            <h3 className="line-clamp-2 text-lg font-semibold group-hover:text-primary transition-colors">
              {game.title}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
              {game.description}
            </p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm font-semibold">{formatPrice(game.price)}</p>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 hover:bg-background/80"
                onClick={handleToggleWishlist}
              >
                <Heart
                  className={cn(
                    "h-5 w-5 transition-colors",
                    isInWishlist(game.id.toString()) && "fill-current text-red-500"
                  )}
                />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 hover:bg-background/80"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
