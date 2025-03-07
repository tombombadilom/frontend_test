import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { AnimatedScrollToTop } from '@/components/shared/animated-scroll-to-top';
import { PageTransition } from '@/components/shared/page-transition';
import { Outlet } from 'react-router-dom';

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <AnimatedScrollToTop />
    </div>
  );
}
