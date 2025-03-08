'use client';

import { useUserSettingsStore } from '@/store/user-settings-store';
import { useCallback, useMemo } from 'react';

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

  return useMemo(() => ({
    ...settings,
    formatCurrency,
  }), [
    settings.language,
    settings.currency,
    settings.emailNotifications,
    settings.pushNotifications,
    settings.showRecentlyViewed,
    settings.showRecommendations,
    formatCurrency
  ]);
}
