import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { AdminPage } from '../AdminPage';
import { useAuth } from '@/hooks/useAuth';

// Mock du hook useAuth
vi.mock('@/hooks/useAuth');

type MockedFunction<T extends (...args: any[]) => any> = jest.MockedFunction<T>;

describe('AdminPage', () => {
  const mockUser = {
    id: '1',
    email: 'admin@example.com',
    role: 'admin',
  };

  const mockUseAuth = {
    user: mockUser,
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
    isLoading: false,
    error: null,
    isAuthenticated: true
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as MockedFunction<typeof useAuth>).mockReturnValue(mockUseAuth);
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