'use client';

import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/theme-context';
import { useSettings } from '@/hooks/use-settings';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import {
  Heart,
  Menu,
  Moon,
  Search,
  ShoppingCart,
  Sun,
  User,
  X,
} from 'lucide-react';
import { motion } from 'motion/react';
import { AnimatePresence } from 'motion/react';
import { useEffect, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const { language } = useSettings();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const totalItems = useCartStore((state) => state.totalItems);
  const wishlistItems = useWishlistStore((state) => state.items);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Fermer le menu lors du changement de page
    closeMenu();
  }, [closeMenu]);

  const navItems = [
    { path: '/', label: language === 'fr' ? 'Accueil' : 'Home' },
    { path: '/catalog', label: language === 'fr' ? 'Catalogue' : 'Catalog' },
    {
      path: '/new-releases',
      label: language === 'fr' ? 'Nouveautés' : 'New Releases',
    },
    { path: '/promotions', label: language === 'fr' ? 'Promotions' : 'Deals' },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b backdrop-blur-md transition-all duration-300',
        isScrolled ? 'bg-background/90 shadow-sm' : 'bg-background/80'
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link
            to="/"
            className="mr-6 flex items-center space-x-2"
            onClick={closeMenu}
          >
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-heading font-bold"
            >
              GameShop
            </motion.span>
          </Link>

          <nav className="hidden md:flex md:items-center md:space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'relative text-sm font-medium transition-colors hover:text-primary',
                  location.pathname === item.path && 'text-primary'
                )}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/wishlist" className="relative">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Wishlist</span>
              </Button>
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
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </Button>
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
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/login">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </Link>
          </motion.div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-16 z-50 border-b bg-background md:hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'text-sm font-medium transition-colors hover:text-primary',
                      location.pathname === item.path && 'text-primary'
                    )}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={toggleTheme}
                  >
                    {theme === 'dark' ? (
                      <Sun className="mr-2 h-4 w-4" />
                    ) : (
                      <Moon className="mr-2 h-4 w-4" />
                    )}
                    {theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
                  </Button>
                </div>
                <div className="pt-2">
                  <Link to="/login" onClick={closeMenu}>
                    <Button variant="default" size="sm" className="w-full">
                      <User className="mr-2 h-4 w-4" />
                      Connexion
                    </Button>
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
