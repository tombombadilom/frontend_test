import { Loader2 } from 'lucide-react';
import type React from 'react';
import { Suspense, lazy } from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthGuard } from './components/auth/AuthGuard';
import { DefaultLayout } from './components/layout/DefaultLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { UserLayout } from './layouts/user-layout';
import type { ReactNode } from 'react';

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

// Pages admin
const AdminDashboardPage = lazy(() => import('./pages/admin/dashboard'));
const AdminSettingsPage = lazy(() => import('./pages/admin/settings'));
const AdminGamesPage = lazy(() => import('./pages/admin/games'));
const AdminPacksPage = lazy(() => import('./pages/admin/packs'));
const AdminObjectsPage = lazy(() => import('./pages/admin/objects'));
const AdminCategoriesPage = lazy(() => import('./pages/admin/categories'));
const AdminGameCategoriesPage = lazy(() => import('./pages/admin/game-categories'));
const AdminObjectCategoriesPage = lazy(() => import('./pages/admin/object-categories'));
const AdminPackCategoriesPage = lazy(() => import('./pages/admin/pack-categories'));
const AdminLoginPage = lazy(() => import('./pages/admin/login'));

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
    path: '/admin/login',
    element: (
      <AuthGuard requireAuth={false}>
        <AdminLoginPage />
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
    { path: 'orders', element: <UserOrdersPage /> },
    { path: 'settings', element: <UserSettingsPage /> },
    { path: 'wishlist', element: <WishlistPage /> },
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
    { path: 'games/edit/:id', element: <AdminGamesPage isEdit /> },
    { path: 'packs', element: <AdminPacksPage /> },
    { path: 'packs/new', element: <AdminPacksPage isNew /> },
    { path: 'packs/edit/:id', element: <AdminPacksPage isEdit /> },
    { path: 'objects', element: <AdminObjectsPage /> },
    { path: 'objects/new', element: <AdminObjectsPage isNew /> },
    { path: 'objects/edit/:id', element: <AdminObjectsPage isEdit /> },
    { path: 'categories', element: <AdminCategoriesPage /> },
    { path: 'categories/new', element: <AdminCategoriesPage isNew /> },
    { path: 'categories/edit/:id', element: <AdminCategoriesPage isEdit /> },
    { path: 'game-categories', element: <AdminGameCategoriesPage /> },
    { path: 'game-categories/new', element: <AdminGameCategoriesPage isNew /> },
    { path: 'game-categories/edit/:id', element: <AdminGameCategoriesPage isEdit /> },
    { path: 'object-categories', element: <AdminObjectCategoriesPage /> },
    { path: 'object-categories/new', element: <AdminObjectCategoriesPage isNew /> },
    { path: 'object-categories/edit/:id', element: <AdminObjectCategoriesPage isEdit /> },
    { path: 'pack-categories', element: <AdminPackCategoriesPage /> },
    { path: 'pack-categories/new', element: <AdminPackCategoriesPage isNew /> },
    { path: 'pack-categories/edit/:id', element: <AdminPackCategoriesPage isEdit /> },
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
