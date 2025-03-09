'use client';

import type React from 'react';
import { useState } from 'react';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import type { Game } from '@/types/game';
import { formatPrice } from '@/lib/utils';
import { useHistoryStore } from '@/store/history-store';
import { Heart, ShoppingCart, ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { showToast } from '@/lib/toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
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
    <Card className="flex h-[150px] overflow-hidden border-none">
      <div className="relative h-full w-[150px] shrink-0">
        <img
          src={game.coverImage}
          alt={game.title}
          className="h-full w-full object-cover"
        />
      </div>
      <CardContent className="flex flex-col justify-between p-4 w-full">
        <div>
          <CardTitle className="line-clamp-1">{game.title}</CardTitle>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {game.description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">{formatPrice(game.price)}</p>
          <Button size="sm" variant="outline">Voir plus</Button>
        </div>
      </CardContent>
    </Card>
  );
}
