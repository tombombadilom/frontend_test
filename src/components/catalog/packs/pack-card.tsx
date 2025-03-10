'use client';

import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import type { Pack } from '@/types/pack';
import { formatPrice, cn } from '@/lib/utils';
import { Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { showToast } from '@/lib/toast';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PackCardProps {
  pack: Pack;
}

export function PackCard({ pack }: PackCardProps) {
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Empêcher la navigation
    addItem({
      id: pack.id.toString(),
      name: pack.name,
      price: pack.price,
      image: pack.preview?.imageUrl || '/placeholder.svg',
      quantity: 1,
      type: 'pack',
    });
    showToast.success('Added to cart');
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); // Empêcher la navigation
    if (isInWishlist(pack.id.toString(), 'pack')) {
      removeFromWishlist(pack.id.toString(), 'pack');
      showToast.success('Retiré des favoris');
    } else {
      addToWishlist(pack, 'pack');
      showToast.success('Ajouté aux favoris');
    }
  };

  return (
    <Link to={`/packs/${pack.id}`}>
      <Card className="group flex h-[150px] overflow-hidden border-none transition-all hover:bg-accent/5">
        <div className="relative h-full w-[150px] shrink-0">
          <img
            src={pack.preview?.imageUrl || '/placeholder.svg'}
            alt={pack.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="flex flex-col justify-between p-4 w-full">
          <div>
            <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors">
              {pack.name}
            </CardTitle>
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {pack.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">{formatPrice(pack.price)}</p>
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
                    isInWishlist(pack.id.toString(), 'pack') && "fill-current text-red-500"
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