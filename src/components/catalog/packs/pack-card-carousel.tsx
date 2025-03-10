'use client';

import type React from 'react';
import { useState } from 'react';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import type { Pack } from '@/types/pack';
import { formatPrice } from '@/lib/utils';
import { usePackHistoryStore } from '@/store/pack-history-store';
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { showToast } from '@/lib/toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface PackCardCarouselProps {
  pack: Pack;
  onPrevious?: () => void;
  onNext?: () => void;
}

export function PackCardCarousel({ pack, onPrevious, onNext }: PackCardCarouselProps) {
  const [_imageLoading, setImageLoading] = useState(true);
  const [_imageError, setImageError] = useState(false);
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, removeItem, isInWishlist } = useWishlistStore();
  const { addToRecentlyViewed } = usePackHistoryStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: pack.id.toString(),
      name: pack.name,
      price: pack.price,
      image: pack.coverImage || '/placeholder.svg',
      quantity: 1,
    });
    showToast.success('Added to cart');
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(pack.id.toString())) {
      removeItem(pack.id.toString());
      showToast.success('Removed from wishlist');
    } else {
      addToWishlist(pack);
      showToast.success('Added to wishlist');
    }
  };

  const handlePackClick = () => {
    addToRecentlyViewed(pack);
  };

  return (
    <Link to={`/packs/${pack.id}`} onClick={handlePackClick}>
      <Card className="group relative aspect-[16/9] overflow-hidden border-none">
        <img
          src={pack.coverImage || '/placeholder.svg'}
          alt={pack.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setImageError(true)}
          onLoad={() => setImageLoading(false)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 flex flex-col justify-end">
          <h3 className="text-xl font-bold text-white mb-2">{pack.name}</h3>
          <p className="line-clamp-2 text-sm text-white/80 mb-4">
            {pack.description}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-white">{formatPrice(pack.price)}</p>
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
                    isInWishlist(pack.id.toString()) && "fill-current text-red-500"
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