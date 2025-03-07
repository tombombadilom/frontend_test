'use client';

import { useHistoryStore } from '@/store/history-store';
import { useUserSettingsStore } from '@/store/user-settings-store';
import { useMemo } from 'react';

export function useRecentlyViewed() {
  const { recentlyViewed, addToRecentlyViewed, clearRecentlyViewed } =
    useHistoryStore();
  const { showRecentlyViewed } = useUserSettingsStore();

  const visibleRecentlyViewed = useMemo(() => {
    if (!showRecentlyViewed) return [];
    return recentlyViewed;
  }, [recentlyViewed, showRecentlyViewed]);

  return {
    recentlyViewed: visibleRecentlyViewed,
    addToRecentlyViewed,
    clearRecentlyViewed,
    showRecentlyViewed,
  };
}
