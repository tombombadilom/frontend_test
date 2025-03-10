import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { GameItem } from "@/types/item";
import { formatPrice } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { showToast } from "@/lib/toast";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from 'motion/react';
import { Tilt } from '@/components/motion-primitives/tilt';
import { Spotlight } from '@/components/motion-primitives/spotlight';
import { motionConfig } from '@/config/motion';

interface HomeObjectCardProps {
  object: GameItem;
}

export function HomeObjectCard({ object }: HomeObjectCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();

  console.log('Rendering HomeObjectCard with object:', object);

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
    console.log('Toggle wishlist for object:', { itemId, object });
    
    if (isInWishlist(itemId, 'object')) {
      console.log('Removing object from wishlist:', itemId);
      removeFromWishlist(itemId, 'object');
      showToast.success('Removed from wishlist');
    } else {
      console.log('Adding object to wishlist:', object);
      addToWishlist({
        ...object,
        type: 'object'
      }, 'object');
      showToast.success('Added to wishlist');
    }
  };

  return (
    <Link to={`/objects/${object.id}`}>
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
              {isLoading && (
                <Skeleton className="h-full w-full absolute inset-0" />
              )}
              <img
                src={object.preview.imageUrl}
                alt={object.name}
                className="h-full w-full object-cover"
                onLoad={() => setIsLoading(false)}
                loading="lazy"
                crossOrigin="anonymous"
              />
            </motion.div>
            <CardContent className="p-4">
              <h3 className="line-clamp-1 text-lg font-semibold group-hover:text-primary">
                {object.name}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                {object.description}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <div className="flex items-center justify-between w-full">
                <span className="text-lg font-bold">{formatPrice(object.price)}</span>
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
                        isInWishlist(object.id.toString(), 'object') && "fill-current text-red-500"
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