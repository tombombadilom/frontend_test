import { useEffect } from 'react';
import type React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../stores/auth';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (requireAuth && !isAuthenticated) {
      navigate('/login');
    } else if (!requireAuth && isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, isLoading, navigate, requireAuth]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
