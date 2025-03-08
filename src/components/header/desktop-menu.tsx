'use client';
import { memo, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSettings } from '@/hooks/use-settings';
import { cn } from '@/lib/utils';
import { navigation } from '@/config/navigation';

const DesktopMenu = memo(function DesktopMenu() {
  const { language } = useSettings();
  const location = useLocation();
  // const { user } = useAuth(); // Commenté car inutilisé pour l'instant

  const menuItems = useMemo(() => navigation.public, []);

  return (
    <nav className="flex items-center space-x-1">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const label = language === 'fr' ? item.labelFr : item.labelEn;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
              location.pathname === item.path
                ? 'bg-accent text-accent-foreground'
                : 'text-foreground/60'
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
});

export default DesktopMenu; 