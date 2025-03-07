import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import RegisterPage from '../RegisterPage';

// Mock the useAuth hook
vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    register: vi.fn().mockResolvedValue(undefined),
    isLoading: false,
    error: null,
  }),
}));

describe('RegisterPage', () => {
  it('renders the registration form', () => {
    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );

    expect(
      screen.getByRole('heading', { name: /inscription/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/prénom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/confirmer le mot de passe/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /s'inscrire/i })
    ).toBeInTheDocument();
  });

  it('validates form inputs', async () => {
    render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );

    const submitButton = screen.getByRole('button', { name: /s'inscrire/i });

    // Submit without filling fields
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/le nom est requis/i)).toBeInTheDocument();
      expect(screen.getByText(/le prénom est requis/i)).toBeInTheDocument();
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

    // Fill with non-matching passwords
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: 'password123' },
    });

    fireEvent.change(screen.getByLabelText(/confirmer le mot de passe/i), {
      target: { value: 'different' },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/les mots de passe ne correspondent pas/i)
      ).toBeInTheDocument();
    });

    // Fill with valid data
    fireEvent.change(screen.getByLabelText(/nom/i), {
      target: { value: 'Dupont' },
    });

    fireEvent.change(screen.getByLabelText(/prénom/i), {
      target: { value: 'Jean' },
    });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'jean.dupont@example.com' },
    });

    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: 'Password123!' },
    });

    fireEvent.change(screen.getByLabelText(/confirmer le mot de passe/i), {
      target: { value: 'Password123!' },
    });

    fireEvent.click(submitButton);

    // Form should be valid, no validation errors
    await waitFor(() => {
      expect(screen.queryByText(/le nom est requis/i)).not.toBeInTheDocument();
      expect(
        screen.queryByText(/le prénom est requis/i)
      ).not.toBeInTheDocument();
      expect(screen.queryByText(/l'email est requis/i)).not.toBeInTheDocument();
      expect(
        screen.queryByText(/le mot de passe est requis/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/les mots de passe ne correspondent pas/i)
      ).not.toBeInTheDocument();
    });
  });
});
