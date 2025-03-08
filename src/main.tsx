import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { CustomToaster } from '@/components/shared/CustomToaster';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import App from './App';
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
        <App />
        <CustomToaster position="top-right" />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
