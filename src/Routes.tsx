import { Loader2 } from 'lucide-react';
import type React from 'react';
import { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// Pages publiques
const HomePage = lazy(() => import('./pages/home'));

const LoadingSpinner = () => (
  <div className="flex h-[50vh] items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

// Routes simplifiées
const routes = [
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <HomePage />
      </Suspense>
    ),
  },
];

const router = createBrowserRouter(routes);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
