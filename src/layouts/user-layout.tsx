import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { PageTransition } from '@/components/shared/page-transition';
import { UserSidebar } from '@/components/user/user-sidebar';
import { Outlet } from 'react-router-dom';
import type { ReactNode } from 'react';

interface UserLayoutProps {
  children: ReactNode;
}

export function UserLayout({ children }: UserLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="container mx-auto flex flex-1 flex-col gap-6 px-4 py-6 md:flex-row">
        <UserSidebar className="w-full md:w-64" />
        <main className="flex-1">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
      </div>
      <Footer />
    </div>
  );
}
