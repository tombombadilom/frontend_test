'use client';
import type React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { User, Heart, ShoppingCart, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/theme/ThemeProvider';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import { IconButton } from '@/components/ui/icon-button';

const badgeVariants = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  exit: { scale: 0 }
};

const CountBadge = ({ count, className }: { count: number; className?: string }) => (
  <AnimatePresence>
    {count > 0 && (
      <motion.span
        variants={badgeVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={`absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium bg-primary text-primary-foreground ${className}`}
      >
        {count}
      </motion.span>
    )}
  </AnimatePresence>
);

export default function ActionButtons() {
  const { theme, setTheme } = useTheme();
  const { items } = useCartStore();
  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);
  const { games, objects, packs } = useWishlistStore();
  const wishlistCount = games.length + objects.length + packs.length;

  return (
    <div className='flex items-center space-x-2'>
      <IconButton
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        ariaLabel='Toggle theme'
      >
        {theme === 'dark' ? (
          <Sun className='h-5 w-5' />
        ) : (
          <Moon className='h-5 w-5' />
        )}
      </IconButton>

      <Link to="/wishlist" className="relative cursor-pointer">
        <IconButton ariaLabel='Wishlist'>
          <Heart className='h-5 w-5' />
          <CountBadge count={wishlistCount} />
        </IconButton>
      </Link>

      <Link to="/cart" className="relative cursor-pointer">
        <IconButton ariaLabel='Cart'>
          <ShoppingCart className='h-5 w-5' />
          <CountBadge count={cartItemsCount} />
        </IconButton>
      </Link>

      <Link to="/login" className="cursor-pointer">
        <IconButton ariaLabel='Account'>
          <User className='h-5 w-5' />
        </IconButton>
      </Link>
    </div>
  );
} 