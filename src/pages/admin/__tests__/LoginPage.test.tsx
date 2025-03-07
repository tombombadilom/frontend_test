import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import LoginPage from '../LoginPage';

// Mock the useAuth hook
vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    login: vi.fn().mockResolvedValue(undefined),
    isLoading: false,
    error: null,
  }),
}));

describe('LoginPage', () => {
  it('renders the login form', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    expect(
      screen.getByRole('heading', { name: /connexion/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /se connecter/i })
    ).toBeInTheDocument();
  });

  it('validates form inputs', async () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    const submitButton = screen.getByRole('button', { name: /se connecter/i });

    // Submit without filling fields
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/l'email est requis/i)).toBeInTheDocument();
      expect(
        screen.getByText(/le mot de passe est requis/i)
      ).toBeInTheDocument();
    });

    // Fill with invalid email
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'invalidemail' },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email invalide/i)).toBeInTheDocument();
    });

    // Fill with valid data
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(submitButton);

    // Form should be valid, no validation errors
    await waitFor(() => {
      expect(screen.queryByText(/l'email est requis/i)).not.toBeInTheDocument();
      expect(
        screen.queryByText(/le mot de passe est requis/i)
      ).not.toBeInTheDocument();
    });
  });
});
