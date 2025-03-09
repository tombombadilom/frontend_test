import type React from 'react';
import { Header } from './header';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen w-screen max-w-[99vw] bg-background overflow-x-hidden">
      <Header />
      <main className="w-full max-w-full">
        <div className="container mx-auto py-8 px-0">
          {children}
        </div>
      </main>
    </div>
  );
}
