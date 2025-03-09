'use client';

import { useCartStore } from '@/store/cart-store';
import { useObjectWishlistStore } from '@/store/object-wishlist-store';
import { useCategories } from '@/hooks/use-categories';
import type { GameItem } from '@/types/game';
import { formatPrice } from '@/lib/utils';
import { Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { showToast } from '@/lib/toast';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ObjectCardProps {
  object: GameItem;
}

export function ObjectCard({ object }: ObjectCardProps) {
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, removeItem, isInWishlist } = useObjectWishlistStore();
  const { getCategoryName } = useCategories('objects');

  const handleAddToCart = () => {
    addItem({
      id: object.id.toString(),
      name: object.name,
      price: object.price,
      image: object.preview.imageUrl || '/placeholder.svg',
      quantity: 1,
    });
    showToast.success('Ajouté au panier');
  };

  const handleToggleWishlist = () => {
    if (isInWishlist(object.id.toString())) {
      removeItem(object.id.toString());
      showToast.success('Retiré des favoris');
    } else {
      addToWishlist(object);
      showToast.success('Ajouté aux favoris');
    }
  };

  return (
    <Card className="flex h-[150px] overflow-hidden border-none">
      <div className="relative h-full w-[150px] shrink-0">
        <img
          src={object.preview.imageUrl || '/placeholder.svg'}
          alt={object.name}
          className="h-full w-full object-cover"
        />
      </div>
      <CardContent className="flex flex-col justify-between p-4 w-full">
        <div>
          <CardTitle className="line-clamp-1">{object.name}</CardTitle>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {object.description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">{formatPrice(object.price)}</p>
          <Button size="sm" variant="outline">Voir plus</Button>
        </div>
      </CardContent>
    </Card>
  );
} 