import { API_URL } from '@/lib/constants';
import { toast } from 'sonner';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { MigrateFunction } from '@/types/store';

interface User {
  email: string;
  name?: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, _get) => ({
      user: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Échec de la connexion');
          }

          const user = await response.json();
          set({ user, isLoading: false, isAuthenticated: true });
          toast.success('Connexion réussie');
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'Échec de la connexion';
          set({ error: message, isLoading: false });
          toast.error(message);
          throw error;
        }
      },

      register: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        const promise = fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ email, password }),
        });

        toast.promise(promise, {
          loading: 'Création du compte...',
          success: (response) => {
            if (!response.ok) throw new Error("Échec de l'inscription");
            return 'Compte créé avec succès';
          },
          error: (err) => {
            const message =
              err instanceof Error
                ? err.message
                : "Échec de l'inscription - Vérifiez que le serveur est accessible";
            set({ error: message, isLoading: false });
            return message;
          },
        });

        try {
          const response = await promise;
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Échec de l'inscription");
          }

          const user = await response.json();
          set({ user, isLoading: false, isAuthenticated: true });
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : "Échec de l'inscription - Vérifiez que le serveur est accessible";
          set({ error: message, isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
          });

          if (!response.ok) {
            throw new Error('Échec de la déconnexion');
          }

          set({ user: null, isLoading: false, isAuthenticated: false });
          toast.success('Déconnexion réussie');
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'Échec de la déconnexion';
          set({ error: message, isLoading: false });
          toast.error(message);
          throw error;
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      version: 1,
      migrate: ((persistedState: unknown, version: number) => {
        if (version === 0) {
          return {
            user: null,
            isLoading: false,
            error: null,
            isAuthenticated: false
          };
        }
        return persistedState as AuthState;
      }) as MigrateFunction<AuthState>,
    }
  )
);

// Pour la compatibilité avec le code existant
export const useAuth = useAuthStore;
