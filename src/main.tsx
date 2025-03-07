import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { CustomToaster } from '@/components/shared/CustomToaster';
import { appRouter } from './App';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={appRouter} />
        <CustomToaster position="top-right" />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
