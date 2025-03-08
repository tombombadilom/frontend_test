import type React from 'react';
import { Header } from './header';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useLocation } from 'react-router-dom';
import { navigation } from '@/config/navigation';
import { Link } from 'react-router-dom';
import { useSettings } from '@/hooks/use-settings';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const { language } = useSettings();

  const adminNavItems = navigation.admin;
  const sectionTitle = language === 'fr' ? 'Administration' : 'Admin Dashboard';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden md:flex h-[calc(100vh-4rem)] w-64 flex-col border-r">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">{sectionTitle}</h2>
          </div>
          <nav className="flex-1 space-y-1 p-4">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const label = language === 'fr' ? item.labelFr : item.labelEn;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Mobile sidebar */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="md:hidden fixed left-4 top-20"
              size="icon"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">{sectionTitle}</h2>
            </div>
            <nav className="flex-1 space-y-1 p-4">
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                const label = language === 'fr' ? item.labelFr : item.labelEn;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Main content */}
        <main className="flex-1 p-8">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 