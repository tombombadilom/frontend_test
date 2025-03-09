'use client';

import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import type { Pack } from '@/types/pack';
import { formatPrice } from '@/lib/utils';
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
  const { addItem: addToWishlist, removeItem, isInWishlist } = useWishlistStore();

  const handleAddToCart = () => {
    addItem({
      id: pack.id.toString(),
      name: pack.name,
      price: pack.price,
      image: pack.preview?.imageUrl || '/placeholder.svg',
      quantity: 1,
    });
    showToast.success('Ajouté au panier');
  };

  const handleToggleWishlist = () => {
    if (isInWishlist(pack.id.toString())) {
      removeItem(pack.id.toString());
      showToast.success('Retiré des favoris');
    } else {
      addToWishlist(pack);
      showToast.success('Ajouté aux favoris');
    }
  };

  return (
    <Card className="flex h-[150px] overflow-hidden border-none">
      <div className="relative h-full w-[150px] shrink-0">
        <img
          src={pack.preview?.imageUrl || '/placeholder.svg'}
          alt={pack.name}
          className="h-full w-full object-cover"
        />
      </div>
      <CardContent className="flex flex-col justify-between p-4 w-full">
        <div>
          <CardTitle className="line-clamp-1">{pack.name}</CardTitle>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {pack.description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">{formatPrice(pack.price)}</p>
          <Button size="sm" variant="outline">Voir plus</Button>
        </div>
      </CardContent>
    </Card>
  );
} 