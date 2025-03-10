import { Loader2 } from 'lucide-react';
import type React from 'react';
import { Suspense, lazy } from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthGuard } from './components/auth/AuthGuard';
import { DefaultLayout } from './components/layout/DefaultLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { UserLayout } from './layouts/user-layout';

// Pages publiques
const HomePage = lazy(() => import('./pages/home'));
const GamesPage = lazy(() => import('./pages/catalog/games/games'));
const GamePage = lazy(() => import('./pages/catalog/games/game'));
const ObjectsPage = lazy(() => import('./pages/catalog/objects/objects'));
const ObjectPage = lazy(() => import('./pages/catalog/objects/object'));
const PacksPage = lazy(() => import('./pages/catalog/packs/packs'));
const PackPage = lazy(() => import('./pages/catalog/packs/pack'));
const LoginPage = lazy(() => import('./pages/auth/login'));
const RegisterPage = lazy(() => import('./pages/auth/register'));
const WishlistPage = lazy(() => import('./pages/wishlist'));
const CartPage = lazy(() => import('./pages/cart'));

// Pages utilisateur
const UserProfilePage = lazy(() => import('./pages/user/profile').then(module => ({ default: module.default })));
const UserSettingsPage = lazy(() => import('./pages/user/settings').then(module => ({ default: module.default })));
const UserOrdersPage = lazy(() => import('./pages/user/orders').then(module => ({ default: module.default })));
const UserWishlistPage = lazy(() => import('./pages/user/wishlist').then(module => ({ default: module.default })));

// Pages admin
const AdminDashboardPage = lazy(() => import('./pages/admin/dashboard'));
const AdminSettingsPage = lazy(() => import('./pages/admin/settings'));
const AdminGamesPage = lazy(() => import('./pages/admin/games'));
const AdminPacksPage = lazy(() => import('./pages/admin/packs'));
const AdminObjectsPage = lazy(() => import('./pages/admin/objects'));

const LoadingFallback = () => (
  <div className="flex justify-center items-center h-full">
    <Loader2 className="animate-spin" />
  </div>
);

// Routes publiques
const publicRoutes = [
  {
    path: '/login',
    element: (
      <AuthGuard requireAuth={false}>
        <LoginPage />
      </AuthGuard>
    ),
  },
  {
    path: '/register',
    element: (
      <AuthGuard requireAuth={false}>
        <RegisterPage />
      </AuthGuard>
    ),
  },
  {
    path: '/',
    element: (
      <DefaultLayout>
        <Outlet />
      </DefaultLayout>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: 'games', element: <GamesPage /> },
      { path: 'games/:id', element: <GamePage /> },
      { path: 'packs', element: <PacksPage /> },
      { path: 'packs/:id', element: <PackPage /> },
      { path: 'objects', element: <ObjectsPage /> },
      { path: 'objects/:id', element: <ObjectPage /> },
      { path: 'wishlist', element: <WishlistPage /> },
      { path: 'cart', element: <CartPage /> },
    ],
  },
];

// Routes utilisateur
const userRoutes = {
  path: '/user',
  element: (
    <AuthGuard requireAuth>
      <UserLayout>
        <Outlet />
      </UserLayout>
    </AuthGuard>
  ),
  children: [
    { index: true, element: <UserProfilePage /> },
    { path: 'settings', element: <UserSettingsPage /> },
    { path: 'orders', element: <UserOrdersPage /> },
    { path: 'wishlist', element: <UserWishlistPage /> },
  ],
};

// Routes admin
const adminRoutes = {
  path: '/admin',
  element: (
    <AuthGuard requireAuth requireAdmin>
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    </AuthGuard>
  ),
  children: [
    { index: true, element: <AdminDashboardPage /> },
    { path: 'settings', element: <AdminSettingsPage /> },
    { path: 'games', element: <AdminGamesPage /> },
    { path: 'games/new', element: <AdminGamesPage isNew /> },
    { path: 'games/:id', element: <AdminGamesPage isEdit /> },
    { path: 'packs', element: <AdminPacksPage /> },
    { path: 'packs/new', element: <AdminPacksPage isNew /> },
    { path: 'packs/:id', element: <AdminPacksPage isEdit /> },
    { path: 'objects', element: <AdminObjectsPage /> },
    { path: 'objects/new', element: <AdminObjectsPage isNew /> },
    { path: 'objects/:id', element: <AdminObjectsPage isEdit /> },
  ],
};

// Combinaison de toutes les routes
const router = createBrowserRouter(
  [...publicRoutes, userRoutes, adminRoutes],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    } as const,
  }
);

const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default AppRouter;
