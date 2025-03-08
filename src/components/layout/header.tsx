'use client';

import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme/ThemeProvider';
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
  Heart,
  ShoppingCart,
  Package,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { memo, useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CustomSearch from '../shared/custom-search';
import DesktopMenu from '@/components/header/desktop-menu';
import ActionButtons from '@/components/header/action-buttons';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/hooks/use-auth';
import type { User as AuthUser } from '@/hooks/use-auth';
import { navigation } from '@/config/navigation';

const UserAvatar = memo(({ user }: { user: AuthUser }) => {
  const initials = useMemo(() => 
    user.name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
  , [user.name]);

  return (
    <Avatar className="h-8 w-8">
      <AvatarImage 
        src={user.avatar} 
        alt={user.name}
        className="object-cover"
      />
      <AvatarFallback delayMs={600}>
        {initials}
      </AvatarFallback>
    </Avatar>
  );
});

UserAvatar.displayName = 'UserAvatar';

export const Header = memo(function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language } = useSettings();
  const location = useLocation();
  const lastScrollY = useRef(0);
  const { user, logout } = useAuth();

  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    let ticking = false;
    let rafId: number;

    const handleScroll = () => {
      if (!ticking) {
        rafId = window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
            setIsScrolled(currentScrollY > 10);
            lastScrollY.current = currentScrollY;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  useEffect(() => {
    closeMenu();
  }, [closeMenu]);

  const menuItems = useMemo(() => [
    ...navigation.public,
    ...(user ? navigation.user : []),
    ...(user?.role === 'admin' ? navigation.admin : []),
  ], [user]);

  const headerClasses = useMemo(() => 
    cn(
      'sticky top-0 z-50 border-b backdrop-blur-md transition-all duration-300',
      isScrolled ? 'bg-background/90 shadow-sm' : 'bg-background/80'
    )
  , [isScrolled]);

  return (
    <header className={headerClasses}>
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
            <CustomSearch />
          </div>
          <div className="md:hidden">
            <CustomSearch />
          </div>
          {!user ? (
            <div className="hidden md:block">
              <ActionButtons />
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <UserAvatar user={user} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {navigation.user.map((item) => (
                    <DropdownMenuItem key={item.path} asChild>
                      <Link to={item.path} className="flex items-center">
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{language === 'fr' ? item.labelFr : item.labelEn}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                {user.role === 'admin' && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      {navigation.admin.map((item) => (
                        <DropdownMenuItem key={item.path} asChild>
                          <Link to={item.path} className="flex items-center">
                            <item.icon className="mr-2 h-4 w-4" />
                            <span>{language === 'fr' ? item.labelFr : item.labelEn}</span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600"
                  onClick={logout}
                >
                  {language === 'fr' ? 'Se déconnecter' : 'Logout'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t bg-background md:hidden"
          >
            <nav className="container mx-auto space-y-1 p-4">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const label = language === 'fr' ? item.labelFr : item.labelEn;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                      location.pathname === item.path
                        ? 'bg-accent text-accent-foreground'
                        : 'text-foreground/60'
                    )}
                    onClick={closeMenu}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
});
