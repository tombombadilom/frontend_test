'use client';

import type React from 'react';
import { useState } from 'react';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import type { Game } from '@/types/game';
import { formatPrice } from '@/lib/utils';
import { useHistoryStore } from '@/store/history-store';
import { Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { showToast } from '@/lib/toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface GameCardGridProps {
  game: Game;
}

export function GameCardGrid({ game }: GameCardGridProps) {
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
      <Card className="overflow-hidden border-none transition-all hover:bg-accent/5">
        <div className="relative aspect-[16/9]">
          <img
            src={game.coverImage}
            alt={game.title}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
            onLoad={() => setImageLoading(false)}
          />
        </div>
        <CardContent className="p-4">
          <h3 className="line-clamp-1 text-lg font-semibold">{game.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {game.description}
          </p>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 pt-0">
          <p className="text-sm font-semibold">{formatPrice(game.price)}</p>
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={handleToggleWishlist}
            >
              <Heart
                className={cn(
                  "h-5 w-5",
                  isInWishlist(game.id.toString()) && "fill-current text-red-500"
                )}
              />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
} 