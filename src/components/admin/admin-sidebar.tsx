'use client';

import type React from 'react';

import { cn } from '@/lib/utils';
import {
  BarChart3,
  ChevronDown,
  ChevronRight,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  Tag,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarItemProps {
  icon: React.ElementType;
  title: string;
  href: string;
  isActive?: boolean;
}

function SidebarItem({ icon: Icon, title, href, isActive }: SidebarItemProps) {
  return (
    <Link
      to={href}
      className={cn(
        'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
        isActive
          ? 'bg-accent text-accent-foreground'
          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{title}</span>
    </Link>
  );
}

interface SidebarGroupProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function SidebarGroup({
  title,
  children,
  defaultOpen = false,
}: SidebarGroupProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="space-y-1">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>
      {isOpen && <div className="ml-4 space-y-1">{children}</div>}
    </div>
  );
}

export function AdminSidebar() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r bg-background md:flex">
      <div className="flex h-16 items-center border-b px-6">
        <Link to="/admin" className="flex items-center gap-2 font-bold">
          <span className="text-xl font-heading">GameShop Admin</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          <div className="space-y-1">
            <SidebarItem
              icon={BarChart3}
              title="Tableau de bord"
              href="/admin"
              isActive={pathname === '/admin'}
            />
            <SidebarItem
              icon={Package}
              title="Produits"
              href="/admin/products"
              isActive={pathname === '/admin/products'}
            />
            <SidebarItem
              icon={Tag}
              title="Catégories"
              href="/admin/categories"
              isActive={pathname === '/admin/categories'}
            />
            <SidebarItem
              icon={ShoppingCart}
              title="Commandes"
              href="/admin/orders"
              isActive={pathname === '/admin/orders'}
            />
            <SidebarItem
              icon={Users}
              title="Utilisateurs"
              href="/admin/users"
              isActive={pathname === '/admin/users'}
            />
          </div>

          <SidebarGroup title="Configuration" defaultOpen={true}>
            <SidebarItem
              icon={Settings}
              title="Paramètres"
              href="/admin/settings"
              isActive={pathname === '/admin/settings'}
            />
          </SidebarGroup>
        </div>
      </nav>
      <div className="border-t p-4">
        <Link
          to="/logout"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <LogOut className="h-4 w-4" />
          <span>Déconnexion</span>
        </Link>
      </div>
    </aside>
  );
}
