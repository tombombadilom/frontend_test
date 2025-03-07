'use client';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { useSettings } from '@/hooks/use-settings';
import { cn } from '@/lib/utils';

export default function DesktopMenu() {
  const { language } = useSettings();
  const location = useLocation();

  const navItems = [
    { path: '/', label: language === 'fr' ? 'Accueil' : 'Home' },
    { path: '/catalog', label: language === 'fr' ? 'Catalogue' : 'Catalog' },
    { path: '/new-releases', label: language === 'fr' ? 'Nouveautés' : 'New Releases' },
    { path: '/promotions', label: language === 'fr' ? 'Promotions' : 'Deals' },
  ];

  return (
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
  );
} 