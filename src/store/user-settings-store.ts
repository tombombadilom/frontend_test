import { create } from 'zustand';

export interface UserSettings {
  language: string;
  currency: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  showRecentlyViewed: boolean;
  showRecommendations: boolean;

  // Actions
  setLanguage: (language: string) => void;
  setCurrency: (currency: string) => void;
  toggleEmailNotifications: () => void;
  togglePushNotifications: () => void;
  toggleRecentlyViewed: () => void;
  toggleRecommendations: () => void;
  resetSettings: () => void;
}

export const useUserSettingsStore = create<UserSettings>()((set) => ({
  language: 'fr',
  currency: 'EUR',
  emailNotifications: true,
  pushNotifications: false,
  showRecentlyViewed: true,
  showRecommendations: true,

  setLanguage: (language) => set({ language }),
  setCurrency: (currency) => set({ currency }),

  toggleEmailNotifications: () =>
    set((state) => ({ emailNotifications: !state.emailNotifications })),

  togglePushNotifications: () =>
    set((state) => ({ pushNotifications: !state.pushNotifications })),

  toggleRecentlyViewed: () =>
    set((state) => ({ showRecentlyViewed: !state.showRecentlyViewed })),

  toggleRecommendations: () =>
    set((state) => ({ showRecommendations: !state.showRecommendations })),

  resetSettings: () =>
    set({
      language: 'fr',
      currency: 'EUR',
      emailNotifications: true,
      pushNotifications: false,
      showRecentlyViewed: true,
      showRecommendations: true,
    }),
}));
