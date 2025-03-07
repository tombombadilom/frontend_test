import { api } from '@/lib/api';
import { ROUTES, STORAGE_KEYS } from '@/lib/constants';
import { useAuthStore } from '@/stores/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const authStore = useAuthStore();

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);

      // Store auth data
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));

      // Update auth store
      await authStore.login(credentials.email, credentials.password);

      // Redirect to dashboard
      navigate(ROUTES.DASHBOARD);

      return response;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to login';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post<AuthResponse>('/auth/register', data);

      // Store auth data
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));

      // Update auth store
      await authStore.register(data.email, data.password);

      // Redirect to dashboard
      navigate(ROUTES.DASHBOARD);

      return response;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to register';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Clear local storage
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);

    // Clear auth store
    authStore.logout();

    // Redirect to login
    navigate(ROUTES.LOGIN);
  };

  return {
    login,
    register,
    logout,
    isLoading,
    error,
    isAuthenticated: authStore.isAuthenticated,
  };
}
