import { Suspense, lazy } from 'react';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/protected-route';
import { LoadingSpinner } from './components/shared/loading-spinner';
import { AdminLayout } from './layouts/admin-layout';
import { PublicLayout } from './layouts/public-layout';
import { UserLayout } from './layouts/user-layout';

// Lazy-loaded pages
const HomePage = lazy(() => import('./pages/home'));
const CatalogPage = lazy(() => import('./pages/catalog/catalog'));
const GameDetailsPage = lazy(() => import('./pages/catalog/game-details'));
const CartPage = lazy(() => import('./pages/cart/cart'));
const LoginPage = lazy(() => import('./pages/auth/login'));
const RegisterPage = lazy(() => import('./pages/auth/register'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/forgot-password'));
const WishlistPage = lazy(() => import('./pages/user/wishlist'));

// Admin pages
const AdminDashboardPage = lazy(() => import('./pages/admin/dashboard'));
const AdminProductsPage = lazy(() => import('./pages/admin/products'));
const AdminCategoriesPage = lazy(() => import('./pages/admin/categories'));
const AdminOrdersPage = lazy(() => import('./pages/admin/orders'));
const AdminProductsFormPage = lazy(() => import('./pages/admin/game-form'));

// User pages
const UserProfilePage = lazy(() => import('./pages/user/profile'));
const UserOrdersPage = lazy(() => import('./pages/user/orders'));
const UserWishlistPage = lazy(() => import('./pages/user/wishlist'));
const UserSettingsPage = lazy(() => import('./pages/user/settings'));

// Wrapper pour les composants lazy-loaded
const LazyWrapper = ({
  component: Component,
}: { component: React.ComponentType }) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
);

// Configuration des routes pour createBrowserRouter
const routes = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <LazyWrapper component={HomePage} /> },
      { path: 'catalog', element: <LazyWrapper component={CatalogPage} /> },
      {
        path: 'game/:id',
        element: <LazyWrapper component={GameDetailsPage} />,
      },
      { path: 'cart', element: <LazyWrapper component={CartPage} /> },
      { path: 'login', element: <LazyWrapper component={LoginPage} /> },
      { path: 'register', element: <LazyWrapper component={RegisterPage} /> },
      {
        path: 'forgot-password',
        element: <LazyWrapper component={ForgotPasswordPage} />,
      },
      { path: 'wishlist', element: <LazyWrapper component={WishlistPage} /> },
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <LazyWrapper component={AdminDashboardPage} /> },
      {
        path: 'products',
        element: <LazyWrapper component={AdminProductsPage} />,
      },
      {
        path: 'products/new',
        element: <LazyWrapper component={AdminProductsFormPage} />,
      },
      {
        path: 'products/edit/:id',
        element: (
          <LazyWrapper component={() => <AdminProductsFormPage editMode />} />
        ),
      },
      {
        path: 'categories',
        element: <LazyWrapper component={AdminCategoriesPage} />,
      },
      { path: 'orders', element: <LazyWrapper component={AdminOrdersPage} /> },
    ],
  },
  {
    path: '/user',
    element: (
      <ProtectedRoute requiredRole="user">
        <UserLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <LazyWrapper component={UserProfilePage} /> },
      { path: 'orders', element: <LazyWrapper component={UserOrdersPage} /> },
      {
        path: 'wishlist',
        element: <LazyWrapper component={UserWishlistPage} />,
      },
      {
        path: 'settings',
        element: <LazyWrapper component={UserSettingsPage} />,
      },
    ],
  },
];

// Créer le router
export const appRouter = createBrowserRouter(routes, {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  } as const,
});

// App n'a plus besoin de retourner les routes directement
function App() {
  return null; // Ce composant n'est plus utilisé directement
}

export default App;
