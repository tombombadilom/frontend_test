'use client';

import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/theme-context';
import { useSettings } from '@/hooks/use-settings';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';
import {
  Menu,
  X,
  Home,
  BookOpen,
  Sparkles,
  Tag,
  Sun,
  Moon,
  User,
  Heart,
  ShoppingCart,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchToolbar from '@/components/header/search-toolbar';
import DesktopMenu from '@/components/header/desktop-menu';
import ActionButtons from '@/components/header/action-buttons';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language } = useSettings();
  const location = useLocation();
  const totalItems = useCartStore((state) => state.totalItems);
  const wishlistItems = useWishlistStore((state) => state.items);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [closeMenu]);

  const navItems = [
    { path: '/', label: language === 'fr' ? 'Accueil' : 'Home', icon: Home },
    { path: '/catalog', label: language === 'fr' ? 'Catalogue' : 'Catalog', icon: BookOpen },
    { path: '/new-releases', label: language === 'fr' ? 'Nouveautés' : 'New Releases', icon: Sparkles },
    { path: '/promotions', label: language === 'fr' ? 'Promotions' : 'Deals', icon: Tag },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b backdrop-blur-md transition-all duration-300',
        isScrolled ? 'bg-background/90 shadow-sm' : 'bg-background/80'
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-2 sm:px-4">
        <div className="flex items-center space-x-2">
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

          <Link
            to="/"
            className="flex items-center space-x-2"
            onClick={closeMenu}
          >
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-lg sm:text-xl font-heading font-bold"
            >
              GameShop
            </motion.span>
          </Link>

          <div className="hidden md:block">
            <DesktopMenu />
          </div>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-4">
          <div className="hidden md:block">
            <SearchToolbar />
          </div>
          <div className="md:hidden">
            <SearchToolbar />
          </div>
          <div className="hidden md:block">
            <ActionButtons />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay avec blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-sm md:hidden"
              onClick={closeMenu}
            />
            
            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-y-0 left-0 top-16 z-[101] w-72 border-r bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl shadow-lg md:hidden"
            >
              <div className="h-full bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl px-4 py-4">
                <nav className="flex flex-col space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={cn(
                          'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-zinc-100',
                          location.pathname === item.path && 'bg-zinc-100 text-primary'
                        )}
                        onClick={closeMenu}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-4 space-y-1 border-t pt-4">
                  <Button
                    variant="ghost"
                    className="w-full justify-start space-x-3 px-3 py-2 text-sm"
                    onClick={() => {
                      setTheme(theme === 'dark' ? 'light' : 'dark');
                      closeMenu();
                    }}
                  >
                    {theme === 'dark' ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                    <span>{theme === 'dark' ? 'Mode clair' : 'Mode sombre'}</span>
                  </Button>

                  <Link to="/wishlist" className="block" onClick={closeMenu}>
                    <Button variant="ghost" className="w-full justify-start space-x-3 px-3 py-2 text-sm">
                      <Heart className="h-5 w-5" />
                      <span>{language === 'fr' ? 'Liste de souhaits' : 'Wishlist'}</span>
                      {wishlistItems.length > 0 && (
                        <span className="ml-auto rounded-full bg-game-accent px-2 py-0.5 text-xs font-medium text-black">
                          {wishlistItems.length}
                        </span>
                      )}
                    </Button>
                  </Link>

                  <Link to="/cart" className="block" onClick={closeMenu}>
                    <Button variant="ghost" className="w-full justify-start space-x-3 px-3 py-2 text-sm">
                      <ShoppingCart className="h-5 w-5" />
                      <span>{language === 'fr' ? 'Panier' : 'Cart'}</span>
                      {totalItems > 0 && (
                        <span className="ml-auto rounded-full bg-game-primary px-2 py-0.5 text-xs font-medium text-white">
                          {totalItems}
                        </span>
                      )}
                    </Button>
                  </Link>

                  <Link to="/login" className="block" onClick={closeMenu}>
                    <Button variant="default" className="w-full justify-start space-x-3 px-3 py-2 text-sm">
                      <User className="h-5 w-5" />
                      <span>{language === 'fr' ? 'Connexion' : 'Login'}</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
