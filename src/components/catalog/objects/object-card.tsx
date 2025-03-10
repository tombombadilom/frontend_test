'use client';

import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import type { GameItem } from '@/types/item';
import { formatPrice, cn } from '@/lib/utils';
import { Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { showToast } from '@/lib/toast';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';

interface ObjectCardProps {
  object: GameItem;
  isLoading?: boolean;
}

export function ObjectCard({ object, isLoading = false }: ObjectCardProps) {
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: object.id.toString(),
      name: object.name,
      price: object.price,
      image: object.preview?.imageUrl || '/placeholder.svg',
      type: 'object',
    });
    showToast.success('Added to cart');
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const itemId = object.id.toString();
    if (isInWishlist(itemId, 'object')) {
      removeFromWishlist(itemId, 'object');
      showToast.success('Removed from wishlist');
    } else {
      addToWishlist({
        ...object,
        type: 'object'
      }, 'object');
      showToast.success('Added to wishlist');
    }
  };

  if (isLoading) {
    return (
      <Card className="group flex h-[150px] overflow-hidden border-none">
        <div className="relative h-full w-[150px] shrink-0">
          <Skeleton className="h-full w-full" />
        </div>
        <CardContent className="flex flex-col justify-between p-4 w-full">
          <div>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="mt-2 h-4 w-full" />
            <Skeleton className="mt-1 h-4 w-2/3" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-20" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Link to={`/objects/${object.id}`}>
      <Card className="group flex h-[150px] overflow-hidden border-none transition-all hover:bg-accent/5">
        <div className="relative h-full w-[150px] shrink-0">
          {imageError ? (
            <Skeleton className="h-full w-full" />
          ) : (
            <img
              src={object.preview?.imageUrl || '/placeholder.svg'}
              alt={object.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          )}
        </div>
        <CardContent className="flex flex-col justify-between p-4 w-full">
          <div>
            <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors">
              {object.name}
            </CardTitle>
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {object.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">{formatPrice(object.price)}</p>
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
                    isInWishlist(object.id.toString(), 'object') && "fill-current text-red-500"
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
          </div>
        </CardContent>
      </Card>
    </Link>
  );
} 