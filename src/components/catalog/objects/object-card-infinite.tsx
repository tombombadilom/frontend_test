import type React from 'react';
import { useState } from 'react';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import type { GameItem } from '@/types/game';
import { formatPrice } from '@/lib/utils';
import { useObjectHistoryStore } from '@/store/object-history-store';
import { Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { showToast } from '@/lib/toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ObjectCardInfiniteProps {
  object: GameItem;
}

export function ObjectCardInfinite({ object }: ObjectCardInfiniteProps) {
  const [_imageLoading, setImageLoading] = useState(true);
  const [_imageError, setImageError] = useState(false);
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, removeItem, isInWishlist } = useWishlistStore();
  const { addToRecentlyViewed } = useObjectHistoryStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: object.id.toString(),
      name: object.name,
      price: object.price,
      image: object.preview?.imageUrl || '/placeholder.svg',
      quantity: 1,
    });
    showToast.success('Added to cart');
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(object.id.toString())) {
      removeItem(object.id.toString());
      showToast.success('Removed from wishlist');
    } else {
      addToWishlist(object);
      showToast.success('Added to wishlist');
    }
  };

  const handleObjectClick = () => {
    addToRecentlyViewed(object);
  };

  return (
    <Link to={`/objects/${object.id}`} onClick={handleObjectClick} className="block h-full w-full py-2">
      <Card className="grid grid-cols-[60%_1fr] h-full w-full overflow-hidden border-none transition-all hover:bg-accent/5">
        <div className="relative h-full">
          <img
            src={object.preview?.imageUrl || '/placeholder.svg'}
            alt={object.name}
            className="absolute inset-0 h-full w-full object-cover"
            onError={() => setImageError(true)}
            onLoad={() => setImageLoading(false)}
          />
        </div>
        <CardContent className="flex flex-col justify-between w-full p-4">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-semibold line-clamp-1 flex-1">{object.name}</h3>
              <div className="flex gap-2 shrink-0">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={handleToggleWishlist}
                >
                  <Heart
                    className={cn(
                      "h-5 w-5",
                      isInWishlist(object.id.toString()) && "fill-current text-red-500"
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
            <p className="text-sm text-muted-foreground line-clamp-2">
              {object.description}
            </p>
            <p className="text-lg font-semibold">{formatPrice(object.price)}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
} 