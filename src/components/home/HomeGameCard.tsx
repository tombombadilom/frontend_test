import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Game } from "@/types/game";
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

interface HomeGameCardProps {
  game: Game;
}

export function HomeGameCard({ game }: HomeGameCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, removeItem, isInWishlist } = useWishlistStore();

  console.log('Game data:', game);
  console.log('Rendering HomeGameCard');

  // Vérification basique pour s'assurer que game existe
  if (!game) {
    console.error('No game data provided to HomeGameCard');
    return null;
  }

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
    showToast.success("Ajouté au panier");
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(game.id.toString())) {
      removeItem(game.id.toString());
      showToast.success("Retiré des favoris");
    } else {
      addToWishlist(game);
      showToast.success("Ajouté aux favoris");
    }
  };

  return (
    <Link to={`/games/${game.id}`}>
      <motion.div
        initial={motionConfig.transitions.entry.initial}
        animate={motionConfig.transitions.entry.animate}
        transition={motionConfig.transitions.entry.transition}
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
              whileHover={{ scale: motionConfig.transitions.hover.scale }}
              transition={{ duration: motionConfig.transitions.hover.duration }}
            >
              {isLoading && (
                <Skeleton className="h-full w-full absolute inset-0" />
              )}
              <img
                src={game.coverImage}
                alt={game.title}
                className="h-full w-full object-cover"
                onLoad={() => setIsLoading(false)}
                loading="lazy"
                crossOrigin="anonymous"
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
                    whileHover={{ scale: motionConfig.buttons.hover.scale }}
                    whileTap={{ scale: motionConfig.buttons.tap.scale }}
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
                    whileHover={{ scale: motionConfig.buttons.hover.scale }}
                    whileTap={{ scale: motionConfig.buttons.tap.scale }}
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