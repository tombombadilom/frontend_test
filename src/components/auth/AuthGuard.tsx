import { useEffect } from 'react';
import type React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  _requireAdmin?: boolean;
}

export function AuthGuard({ 
  children, 
  requireAuth = true,
  _requireAdmin = false 
}: AuthGuardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAdminLoginRoute = location.pathname === '/admin/login';

  useEffect(() => {
    // Ne pas rediriger sur la page de login admin
    if (isAdminLoginRoute) {
      return;
    }

    // Si on essaie d'accéder à une route admin
    if (isAdminRoute) {
      // Si l'utilisateur n'est pas connecté ou n'est pas admin
      if (!isAuthenticated || user?.role !== 'admin') {
        navigate('/admin/login', { 
          replace: true,
          state: { from: location.pathname }
        });
        return;
      }
    }
    // Pour les routes non-admin qui nécessitent une authentification
    else if (requireAuth && !isAuthenticated) {
      navigate('/login', { 
        replace: true,
        state: { from: location.pathname }
      });
      return;
    }
    // Si l'utilisateur est connecté en tant qu'admin et essaie d'accéder aux pages utilisateur
    else if (user?.role === 'admin' && location.pathname.startsWith('/user')) {
      navigate('/admin', { replace: true });
      return;
    }

  }, [isAuthenticated, navigate, requireAuth, user, location, isAdminRoute, isAdminLoginRoute]);

  return <>{children}</>;
}
