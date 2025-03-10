import type React from 'react';
import { useState } from 'react';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import type { Pack } from '@/types/pack';
import { formatPrice } from '@/lib/utils';
import { usePackHistoryStore } from '@/store/pack-history-store';
import { Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { showToast } from '@/lib/toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface PackCardInfiniteProps {
  pack: Pack;
}

export function PackCardInfinite({ pack }: PackCardInfiniteProps) {
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
    <Link to={`/packs/${pack.id}`} onClick={handlePackClick} className="block h-full w-full py-2">
      <Card className="grid grid-cols-[60%_1fr] h-full w-full overflow-hidden border-none transition-all hover:bg-accent/5">
        <div className="relative h-full">
          <img
            src={pack.coverImage || '/placeholder.svg'}
            alt={pack.name}
            className="absolute inset-0 h-full w-full object-cover"
            onError={() => setImageError(true)}
            onLoad={() => setImageLoading(false)}
          />
        </div>
        <CardContent className="flex flex-col justify-between w-full p-4">
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-semibold line-clamp-1 flex-1">{pack.name}</h3>
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
                      isInWishlist(pack.id.toString()) && "fill-current text-red-500"
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
              {pack.description}
            </p>
            <p className="text-lg font-semibold">{formatPrice(pack.price)}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
} 