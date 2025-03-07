'use client';
import type React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { User, Heart, ShoppingCart, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/theme-context';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';

function IconButton({
  children,
  onClick,
  disabled,
  ariaLabel,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
}) {
  return (
    <button
      className={`relative flex h-9 w-9 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 cursor-pointer ${className}`}
      type='button'
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

export default function ActionButtons() {
  const { theme, setTheme } = useTheme();
  const totalItems = useCartStore((state) => state.totalItems);
  const wishlistItems = useWishlistStore((state) => state.items);

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
          <AnimatePresence>
            {wishlistItems.length > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-game-accent text-xs font-medium text-black"
              >
                {wishlistItems.length}
              </motion.span>
            )}
          </AnimatePresence>
        </IconButton>
      </Link>
      <Link to="/cart" className="relative cursor-pointer">
        <IconButton ariaLabel='Cart'>
          <ShoppingCart className='h-5 w-5' />
          <AnimatePresence>
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-game-primary text-xs font-medium text-white"
              >
                {totalItems}
              </motion.span>
            )}
          </AnimatePresence>
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