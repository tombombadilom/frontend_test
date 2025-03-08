'use client';

import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import type { Pack } from '@/types/pack';
import { formatPrice } from '@/lib/utils';
import { Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { showToast } from '@/lib/toast';

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link to={`/pack/${pack.id}`} className="block">
        <div className="pack-card pack-card-hover overflow-hidden">
          {(pack.price.discount ?? 0) > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-2 top-2 z-10 rounded-md bg-game-accent px-2 py-1 text-xs font-bold text-black"
            >
              -{pack.price.discount}%
            </motion.div>
          )}

          <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-md">
            <motion.img
              src={pack.preview?.imageUrl || '/placeholder.svg'}
              alt={pack.name}
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black/50"
            >
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="rounded-md bg-primary px-3 py-1 text-sm font-medium text-white"
              >
                Voir détails
              </motion.span>
            </motion.div>
          </div>

          <div className="space-y-2">
            <h3 className="line-clamp-1 text-base font-bold transition-colors group-hover:text-primary">
              {pack.name}
            </h3>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {pack.price.discount ? (
                  <div className="flex items-center gap-2">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-lg font-bold text-primary"
                    >
                      {formatPrice({
                        ...pack.price,
                        amount:
                          pack.price.amount *
                          (1 - (pack.price.discount || 0) / 100),
                      })}
                    </motion.span>
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(pack.price)}
                    </span>
                  </div>
                ) : (
                  <span className="text-lg font-bold text-primary">
                    {formatPrice(pack.price)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                    isInWishlist(pack.id.toString())
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-primary'
                  }`}
                  onClick={handleToggleWishlist}
                >
                  <Heart
                    className={`h-4 w-4 ${isInWishlist(pack.id.toString()) ? 'fill-current' : ''}`}
                  />
                  <span className="sr-only">
                    {isInWishlist(pack.id.toString())
                      ? 'Retirer des favoris'
                      : 'Ajouter aux favoris'}
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-primary hover:text-white"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span className="sr-only">Ajouter au panier</span>
                </motion.button>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {pack.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-sm bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
} 