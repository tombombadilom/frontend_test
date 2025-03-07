import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { useAuth } from '@/hooks/use-auth';
import type React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'admin';
}

export function ProtectedRoute({
  children,
  requiredRole = 'user',
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // Afficher un spinner pendant la vérification de l'authentification
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
  if (!user) {
    // Stocker l'URL actuelle pour rediriger l'utilisateur après la connexion
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Vérifier si l'utilisateur a le rôle requis
  if (requiredRole === 'admin' && user.role !== 'admin') {
    // Rediriger vers la page d'accueil si l'utilisateur n'a pas les droits d'admin
    return <Navigate to="/" replace />;
  }

  // L'utilisateur est authentifié et a les droits nécessaires
  return <>{children}</>;
}
