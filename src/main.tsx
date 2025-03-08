import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { CustomToaster } from '@/components/shared/CustomToaster';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import App from './App';
import './index.css';
import { useUserSettingsStore } from '@/store/user-settings-store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

function StoreProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Hydrate all stores
    useUserSettingsStore.persist.rehydrate();
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return children;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <StoreProvider>
      <ThemeProvider>
        <App />
        <CustomToaster position="top-right" />
      </ThemeProvider>
    </StoreProvider>
  </QueryClientProvider>
);
