import { useAuth } from '@/hooks/useAuth';

export function AdminPage() {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Administration</h1>
      <button type="button" onClick={logout}>Déconnexion</button>
    </div>
  );
} 