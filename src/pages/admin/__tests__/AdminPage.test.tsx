import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { AdminPage } from '../AdminPage';
import { useAuth } from '@/hooks/useAuth';

// Mock du hook useAuth
vi.mock('@/hooks/useAuth');

describe('AdminPage', () => {
  const mockUser = {
    id: '1',
    email: 'admin@example.com',
    role: 'admin',
  };

  const mockUseAuth = {
    user: mockUser,
    logout: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as any).mockReturnValue(mockUseAuth);
  });

  it('affiche le titre de la page', () => {
    render(<AdminPage />);
    expect(screen.getByText('Administration')).toBeInTheDocument();
  });

  it('affiche le bouton de déconnexion', () => {
    render(<AdminPage />);
    expect(screen.getByRole('button', { name: /déconnexion/i })).toBeInTheDocument();
  });

  it('appelle logout lors du clic sur déconnexion', () => {
    render(<AdminPage />);
    screen.getByRole('button', { name: /déconnexion/i }).click();
    expect(mockUseAuth.logout).toHaveBeenCalled();
  });
}); 