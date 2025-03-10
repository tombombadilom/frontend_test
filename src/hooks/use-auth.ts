'use client';

import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuthContext } from '@/contexts/auth-context';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
  language: 'fr' | 'en';
  theme: 'light' | 'dark';
  preferences: {
    saveHistory: boolean;
    autoPlayVideos: boolean;
    enableSounds: boolean;
    showRecommendations: boolean;
    enableBetaFeatures: boolean;
  };
  notifications: {
    email: boolean;
    push: boolean;
    promotions: boolean;
    updates: boolean;
    newsletter: boolean;
    loginAlerts: boolean;
  };
  privacy: {
    showEmail: boolean;
    showProfile: boolean;
    showActivity: boolean;
  };
  security: {
    twoFactor: boolean;
    sessionTimeout: string;
  };
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends LoginCredentials {
  name: string;
}

export function useAuth() {
  const { user, setUser, updateUser } = useAuthContext();
  const navigate = useNavigate();

  const login = useCallback(async (email: string, password: string) => {
    try {
      if (!email || !email.includes('@') || !password || password.length < 6) {
        throw new Error('Identifiants invalides');
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        role: email.includes('admin') ? 'admin' : 'user',
        language: 'fr',
        theme: 'light',
        preferences: {
          saveHistory: true,
          autoPlayVideos: false,
          enableSounds: true,
          showRecommendations: true,
          enableBetaFeatures: false,
        },
        notifications: {
          email: true,
          push: true,
          promotions: true,
          updates: true,
          newsletter: true,
          loginAlerts: true,
        },
        privacy: {
          showEmail: true,
          showProfile: true,
          showActivity: true,
        },
        security: {
          twoFactor: false,
          sessionTimeout: '15 minutes',
        },
      };

      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      navigate(mockUser.role === 'admin' ? '/admin' : '/');

      return { success: true };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erreur lors de la connexion';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, [setUser, navigate]);

  const register = useCallback(async (data: RegisterData) => {
    try {
      if (
        !data.email ||
        !data.email.includes('@') ||
        !data.password ||
        data.password.length < 6
      ) {
        throw new Error("Données d'inscription invalides");
      }

      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockUser: User = {
        id: Date.now().toString(),
        email: data.email,
        name: data.name || data.email.split('@')[0],
        role: 'user',
        language: 'fr',
        theme: 'light',
        preferences: {
          saveHistory: true,
          autoPlayVideos: false,
          enableSounds: true,
          showRecommendations: true,
          enableBetaFeatures: false,
        },
        notifications: {
          email: true,
          push: true,
          promotions: true,
          updates: true,
          newsletter: true,
          loginAlerts: true,
        },
        privacy: {
          showEmail: true,
          showProfile: true,
          showActivity: true,
        },
        security: {
          twoFactor: false,
          sessionTimeout: '15 minutes',
        },
      };

      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      navigate('/');

      return { success: true };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erreur lors de l'inscription";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, [setUser, navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
    toast.success('Vous avez été déconnecté avec succès');
  }, [setUser, navigate]);

  const updateProfile = useCallback(
    async (data: { name: string; email: string }) => {
      try {
        if (!user) {
          return { success: false, error: 'User not found' };
        }

        updateUser({
          name: data.name,
          email: data.email,
        });

        return { success: true };
      } catch (error) {
        console.error('Error updating profile:', error);
        return { success: false, error: 'Failed to update profile' };
      }
    },
    [user, updateUser]
  );

  const updatePassword = useCallback(
    async (_data: { currentPassword: string; newPassword: string }) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return { success: true };
      } catch (error) {
        console.error('Error updating password:', error);
        return { success: false, error: 'Failed to update password' };
      }
    },
    []
  );

  const updateSettings = useCallback(
    async (settings: Omit<User, 'id' | 'email' | 'name' | 'role'>) => {
      try {
        if (!user) {
          return { success: false, error: 'User not found' };
        }

        const updatedUser = {
          ...user,
          ...settings
        };

        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);

        return { success: true };
      } catch (error) {
        console.error('Error updating settings:', error);
        return { success: false, error: 'Failed to update settings' };
      }
    },
    [user, setUser]
  );

  return useMemo(() => ({
    user,
    login,
    register,
    logout,
    updateProfile,
    updatePassword,
    updateSettings,
  }), [user, login, register, logout, updateProfile, updatePassword, updateSettings]);
}
