import { Loader2 } from 'lucide-react';
import React, { Suspense } from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthGuard } from './components/auth/AuthGuard';
import { Layout } from './components/layout/Layout';

const LoginPage = React.lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/auth/RegisterPage'));
const DashboardPage = React.lazy(() => import('./pages/dashboard/index'));
const SettingsPage = React.lazy(() => import('./pages/settings/index'));

const LoadingFallback = () => (
  <div className="flex justify-center items-center h-full">
    <Loader2 className="animate-spin" />
  </div>
);

const router = createBrowserRouter(
  [
    {
      path: '/login',
      element: (
        <AuthGuard requireAuth={false}>
          <Suspense fallback={<LoadingFallback />}>
            <LoginPage />
          </Suspense>
        </AuthGuard>
      ),
    },
    {
      path: '/register',
      element: (
        <AuthGuard requireAuth={false}>
          <Suspense fallback={<LoadingFallback />}>
            <RegisterPage />
          </Suspense>
        </AuthGuard>
      ),
    },
    {
      path: '/',
      element: (
        <AuthGuard>
          <Layout>
            <Suspense fallback={<LoadingFallback />}>
              <Outlet />
            </Suspense>
          </Layout>
        </AuthGuard>
      ),
      children: [
        { index: true, element: <DashboardPage /> },
        { path: 'dashboard', element: <DashboardPage /> },
        { path: 'settings', element: <SettingsPage /> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    } as const,
  }
);

const Routes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
