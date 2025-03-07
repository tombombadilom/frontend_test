import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ForgotPasswordPage from '../forgot-password';
import { useAuth } from '@/hooks/use-auth';
import { vi } from 'vitest';
import { renderWithProviders } from '@/test/test-utils';

// Mock useAuth hook
vi.mock('@/hooks/use-auth', () => ({
  useAuth: vi.fn(),
}));

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
      <a href={to}>{children}</a>
    ),
  };
});

// Mock ThemeProvider with theme context
vi.mock('@/components/theme/ThemeProvider', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
  useTheme: () => ({
    theme: 'light',
    setTheme: vi.fn(),
  }),
}));

// Mock CustomToaster
vi.mock('@/components/ui/custom-toaster', () => ({
  CustomToaster: () => null,
}));

describe('ForgotPasswordPage', () => {
  const mockForgotPassword = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
      forgotPassword: mockForgotPassword,
      user: null,
    });
  });

  const renderComponent = () => {
    return renderWithProviders(<ForgotPasswordPage />);
  };

  it('renders the forgot password form', () => {
    renderComponent();

    expect(screen.getByText('Mot de passe oublié')).toBeInTheDocument();
    expect(screen.getByText('Entrez votre adresse email pour recevoir les instructions de réinitialisation')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send instructions/i })).toBeInTheDocument();
    expect(screen.getByText('Back to login')).toBeInTheDocument();
  });

  it('shows validation error for invalid email', async () => {
    renderComponent();

    const emailInput = screen.getByLabelText('Email');
    await userEvent.type(emailInput, 'invalid-email');
    await userEvent.click(screen.getByRole('button', { name: /Send instructions/i }));

    await waitFor(() => {
      expect(screen.getByText('Veuillez entrer une adresse email valide')).toBeInTheDocument();
    });
  });

  it('submits the form with valid email', async () => {
    renderComponent();

    const emailInput = screen.getByLabelText('Email');
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.click(screen.getByRole('button', { name: /Send instructions/i }));

    expect(mockForgotPassword).toHaveBeenCalledWith('test@example.com');
  });
});
