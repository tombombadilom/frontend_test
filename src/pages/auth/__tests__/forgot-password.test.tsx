import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import ForgotPasswordPage from '../forgot-password';
import { showToast } from '@/lib/toast';

// Mock showToast
vi.mock('@/lib/toast', () => ({
  showToast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock useAuth
vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    forgotPassword: vi.fn().mockResolvedValue({}),
  }),
}));

// Mock react-router-dom
vi.mock('react-router-dom', () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

// Mock ThemeProvider
vi.mock('@/components/theme-provider', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
}));

// Mock CustomToaster
vi.mock('@/components/ui/toaster', () => ({
  CustomToaster: () => <div data-testid="toaster" />,
}));

describe('ForgotPasswordPage', () => {
  it('renders the form correctly', async () => {
    render(<ForgotPasswordPage />);

    await waitFor(() => {
      expect(screen.getByText('Mot de passe oublié')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Send instructions' })).toBeInTheDocument();
      expect(screen.getByText('Back to login')).toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it('submits the form with a valid email', async () => {
    render(<ForgotPasswordPage />);

    await waitFor(() => {
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
    }, { timeout: 1000 });

    const emailInput = screen.getByLabelText('Email');
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'test@example.com');
    
    const submitButton = screen.getByRole('button', { name: 'Send instructions' });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(showToast.success).toHaveBeenCalledWith('Instructions of reset sent to test@example.com');
    }, { timeout: 1000 });
  });
});
