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
import { motion } from 'motion/react';
import { Tilt } from '@/components/motion-primitives/tilt';
import { Spotlight } from '@/components/motion-primitives/spotlight';
import { motionConfig } from '@/config/motion';

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
      <motion.div
        {...motionConfig.cards.container}
      >
        <Tilt 
          className="group relative w-full" 
          rotationFactor={motionConfig.tilt.rotationFactor}
          springOptions={motionConfig.tilt.springOptions}
        >
          <Spotlight
            className="z-10 from-game-primary/40 via-game-primary/20 to-transparent blur-3xl"
            size={400}
            springOptions={{
              stiffness: 20,
              damping: 10
            }}
          />
          <Card className="h-full overflow-hidden transition-all hover:shadow-lg border-none">
            <motion.div 
              className="relative aspect-[16/9] overflow-hidden"
              whileHover={motionConfig.cards.image.hover}
              transition={motionConfig.cards.image.transition}
            >
              <img
                src={game.coverImage}
                alt={game.title}
                className="h-full w-full object-cover"
                onError={() => setImageError(true)}
                onLoad={() => setImageLoading(false)}
              />
            </motion.div>
            <CardContent className="p-4">
              <h3 className="line-clamp-1 text-lg font-semibold group-hover:text-primary">
                {game.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                {game.description}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <div className="flex items-center justify-between w-full">
                <span className="text-lg font-bold">{formatPrice(game.price)}</span>
                <div className="flex gap-2">
                  <motion.div 
                    className="cursor-pointer" 
                    whileHover={motionConfig.buttons.hover}
                    whileTap={motionConfig.buttons.tap}
                  >
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 rounded-full opacity-90 hover:opacity-100"
                      onClick={handleToggleWishlist}
                    >
                      <Heart className={cn(
                        "h-4 w-4",
                        isInWishlist(game.id.toString()) && "fill-current text-red-500"
                      )} />
                    </Button>
                  </motion.div>
                  <motion.div 
                    className="cursor-pointer" 
                    whileHover={motionConfig.buttons.hover}
                    whileTap={motionConfig.buttons.tap}
                  >
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 rounded-full opacity-90 hover:opacity-100"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </Tilt>
      </motion.div>
    </Link>
  );
} 