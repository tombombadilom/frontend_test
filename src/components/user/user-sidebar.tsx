import { cn } from '@/lib/utils';
import { Heart, Settings, ShoppingBag, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface UserSidebarProps {
  className?: string;
}

export function UserSidebar({ className }: UserSidebarProps) {
  const location = useLocation();
  const pathname = location.pathname;

  const links = [
    {
      href: '/user',
      label: 'Profil',
      icon: User,
    },
    {
      href: '/user/orders',
      label: 'Commandes',
      icon: ShoppingBag,
    },
    {
      href: '/user/wishlist',
      label: 'Liste de souhaits',
      icon: Heart,
    },
    {
      href: '/user/settings',
      label: 'Paramètres',
      icon: Settings,
    },
  ];

  return (
    <aside className={cn('space-y-4 rounded-lg border bg-card p-4', className)}>
      <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
        Mon compte
      </h2>
      <nav className="space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
              pathname === link.href
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
