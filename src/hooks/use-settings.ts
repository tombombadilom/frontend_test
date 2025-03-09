'use client';

import { useUserSettingsStore } from '@/store/user-settings-store';
import { useMemo } from 'react';

export function useSettings() {
  const settings = useUserSettingsStore();
  const formatCurrency = useMemo(() => new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }), []);

  return useMemo(() => ({
    ...settings,
    formatCurrency,
  }), [
    settings,
    formatCurrency
  ]);
}
