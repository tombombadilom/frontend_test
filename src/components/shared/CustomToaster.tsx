'use client';

import { useTheme } from '@/components/theme/ThemeProvider';
import { Toaster as SonnerToaster, type ToasterProps } from 'sonner';
import { memo } from 'react';

/**
 * CustomToaster - Un composant wrapper qui utilise notre hook useTheme personnalisé
 * tout en préservant le composant Toaster original de sonner
 */
export const CustomToaster = memo(function CustomToaster(props: ToasterProps) {
  const { theme } = useTheme();

  return (
    <SonnerToaster
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-medium',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-medium',
        },
      }}
      {...props}
    />
  );
});
