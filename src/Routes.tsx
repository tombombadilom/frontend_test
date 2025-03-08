import { Loader2 } from 'lucide-react';
import type React from 'react';
import { Suspense, lazy } from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthGuard } from './components/auth/AuthGuard';
import { DefaultLayout } from './components/layout/DefaultLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// Pages publiques
const HomePage = lazy(() => import('./pages/home'));
const GamesPage = lazy(() => import('./pages/games/games'));
const GamePage = lazy(() => import('./pages/games/game'));
const ObjectsPage = lazy(() => import('./pages/objects/objects'));
const ObjectPage = lazy(() => import('./pages/objects/object'));
const PacksPage = lazy(() => import('./pages/packs/packs'));
const PackPage = lazy(() => import('./pages/packs/pack'));
const LoginPage = lazy(() => import('./pages/auth/login'));
const RegisterPage = lazy(() => import('./pages/auth/register'));

// Pages utilisateur (MyUser)
const DashboardPage = lazy(() => import('./pages/dashboard/index'));
const SettingsPage = lazy(() => import('./pages/settings/index'));
const UserProfilePage = lazy(() => import('./pages/user/profile'));
const UserOrdersPage = lazy(() => import('./pages/user/orders'));
const UserWishlistPage = lazy(() => import('./pages/user/wishlist'));

// Pages admin
const AdminDashboardPage = lazy(() => import('./pages/admin/dashboard'));
const AdminSettingsPage = lazy(() => import('./pages/admin/settings/index'));
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
    ],
  },
];

// Routes utilisateur
const userRoutes = {
  path: '/user',
  element: (
    <AuthGuard requireAuth>
      <DefaultLayout>
        <Outlet />
      </DefaultLayout>
    </AuthGuard>
  ),
  children: [
    { index: true, element: <UserProfilePage /> },
    { path: 'dashboard', element: <DashboardPage /> },
    { path: 'orders', element: <UserOrdersPage /> },
    { path: 'wishlist', element: <UserWishlistPage /> },
    { path: 'settings', element: <SettingsPage /> },
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
