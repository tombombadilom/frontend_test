'use client';

import type React from 'react';
import { useState } from 'react';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import type { Game } from '@/types/game';
import { formatPrice } from '@/lib/utils';
import { useHistoryStore } from '@/store/history-store';
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { showToast } from '@/lib/toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface GameCardCarouselProps {
  game: Game;
  onPrevious?: () => void;
  onNext?: () => void;
}

export function GameCardCarousel({ game, onPrevious, onNext }: GameCardCarouselProps) {
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
      <Card className="group relative aspect-[16/9] overflow-hidden border-none">
        <img
          src={game.coverImage}
          alt={game.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setImageError(true)}
          onLoad={() => setImageLoading(false)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 flex flex-col justify-end">
          <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
          <p className="line-clamp-2 text-sm text-white/80 mb-4">
            {game.description}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-white">{formatPrice(game.price)}</p>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="secondary"
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
                variant="secondary"
                className="h-8 w-8"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        {/* Navigation arrows */}
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 transition-opacity group-hover:opacity-100">
          {onPrevious && (
            <Button
              variant="secondary"
              size="icon"
              className="h-10 w-10 rounded-full bg-black/50 hover:bg-black/70"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onPrevious();
              }}
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </Button>
          )}
          {onNext && (
            <Button
              variant="secondary"
              size="icon"
              className="h-10 w-10 rounded-full bg-black/50 hover:bg-black/70"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onNext();
              }}
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </Button>
          )}
        </div>
      </Card>
    </Link>
  );
} 