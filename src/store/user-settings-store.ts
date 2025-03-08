import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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

const initialState = {
  language: 'fr',
  currency: 'EUR',
  emailNotifications: true,
  pushNotifications: false,
  showRecentlyViewed: true,
  showRecommendations: true,
};

export const useUserSettingsStore = create<UserSettings>()(
  persist(
    (set) => ({
      ...initialState,

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

      resetSettings: () => set(initialState),
    }),
    {
      name: 'user-settings',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        language: state.language,
        currency: state.currency,
        emailNotifications: state.emailNotifications,
        pushNotifications: state.pushNotifications,
        showRecentlyViewed: state.showRecentlyViewed,
        showRecommendations: state.showRecommendations,
      }),
    }
  )
);
