import { useEffect } from 'react';
import type React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
}

export function AuthGuard({ 
  children, 
  requireAuth = true,
  requireAdmin = false 
}: AuthGuardProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAuthenticated = !!user;

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      navigate('/login', { replace: true });
    } else if (!requireAuth && isAuthenticated) {
      navigate('/', { replace: true });
    } else if (requireAdmin && (!user || user.role !== 'admin')) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate, requireAuth, requireAdmin, user]);

  return <>{children}</>;
}
