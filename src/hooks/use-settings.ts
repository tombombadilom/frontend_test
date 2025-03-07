'use client';

import { useUserSettingsStore } from '@/store/user-settings-store';
import { useCallback } from 'react';

export function useSettings() {
  const settings = useUserSettingsStore();

  const formatCurrency = useCallback(
    (amount: number) => {
      return new Intl.NumberFormat(settings.language, {
        style: 'currency',
        currency: settings.currency,
      }).format(amount);
    },
    [settings.language, settings.currency]
  );

  return {
    ...settings,
    formatCurrency,
  };
}
