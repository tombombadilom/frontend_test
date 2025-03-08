import { useEffect } from 'react';
import type React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../stores/auth';

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
  const { isAuthenticated, isLoading, user } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (requireAuth && !isAuthenticated) {
      navigate('/login');
    } else if (!requireAuth && isAuthenticated) {
      navigate('/dashboard');
    } else if (requireAdmin && (!user || user.role !== 'admin')) {
      navigate('/');
    }
  }, [isAuthenticated, isLoading, navigate, requireAuth, requireAdmin, user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
