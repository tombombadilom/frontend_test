'use client';

import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  language: 'fr' | 'en';
  theme: 'light' | 'dark';
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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Dans une application réelle, cela ferait une requête API
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
          // Vérifier la validité du token (si applicable)
          // Dans une application réelle, vous feriez une requête API pour valider le token
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error(
          "Erreur lors de la vérification de l'authentification:",
          error
        );
        setError("Erreur lors de la vérification de l'authentification");
        // Supprimer les données utilisateur en cas d'erreur
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Validation des entrées
      if (!email || !email.includes('@') || !password || password.length < 6) {
        throw new Error('Identifiants invalides');
      }

      // Dans une application réelle, cela ferait une requête API
      // Simuler une vérification d'authentification
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simuler un utilisateur
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        role: email.includes('admin') ? 'admin' : 'user',
        language: 'fr',
        theme: 'light',
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

      // Stocker l'utilisateur dans localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);

      return { success: true };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Erreur lors de la connexion';
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Validation des entrées
      if (
        !data.email ||
        !data.email.includes('@') ||
        !data.password ||
        data.password.length < 6
      ) {
        throw new Error("Données d'inscription invalides");
      }

      // Dans une application réelle, cela ferait une requête API
      // Simuler une inscription
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simuler un utilisateur créé
      const mockUser: User = {
        id: Date.now().toString(),
        email: data.email,
        name: data.name || data.email.split('@')[0],
        role: 'user',
        language: 'fr',
        theme: 'light',
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

      // Stocker l'utilisateur dans localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);

      return { success: true };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erreur lors de l'inscription";
      setError(errorMessage);
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
    toast.success('Vous avez été déconnecté avec succès');
  }, [navigate]);

  const updateProfile = useCallback(
    async (data: { name: string; email: string }) => {
      try {
        setIsLoading(true);
        setError(null);

        if (!user) {
          return { success: false, error: 'User not found' };
        }

        // In a real app, this would make an API request
        const updatedUser: User = {
          ...user,
          name: data.name,
          email: data.email,
        };

        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);

        return { success: true };
      } catch (error) {
        console.error('Error updating profile:', error);
        return { success: false, error: 'Failed to update profile' };
      } finally {
        setIsLoading(false);
      }
    },
    [user]
  );

  const updatePassword = useCallback(
    async (_data: { currentPassword: string; newPassword: string }) => {
      try {
        setIsLoading(true);
        setError(null);

        // In a real app, this would make an API request
        // For now, we'll just simulate a successful update
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return { success: true };
      } catch (error) {
        console.error('Error updating password:', error);
        return { success: false, error: 'Failed to update password' };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile,
    updatePassword,
  };
}
