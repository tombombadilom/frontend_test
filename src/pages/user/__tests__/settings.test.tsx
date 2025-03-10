import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import SettingsPage from '../settings';
import { vi } from 'vitest';
import { describe, expect, it } from 'vitest';

vi.mock('@/components/theme/ThemeProvider', () => ({
  useTheme: () => ({ theme: 'light', setTheme: vi.fn() })
}));

vi.mock('@/hooks/use-settings', () => ({
  useSettings: () => ({
    user: { id: '1', email: 'test@example.com', name: 'Test User' },
    updateProfile: vi.fn(),
    updatePassword: vi.fn()
  })
}));

vi.mock('@/contexts/auth-context', () => ({
  useAuthContext: () => ({
    user: { id: '1', email: 'test@example.com', name: 'Test User' },
    isAuthenticated: true,
    login: vi.fn(),
    logout: vi.fn(),
    register: vi.fn()
  })
}));

describe('SettingsPage', () => {
  const renderPage = () => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => {
      const methods = useForm();
      return (
        <BrowserRouter>
          <FormProvider {...methods}>
            {children}
          </FormProvider>
        </BrowserRouter>
      );
    };

    return render(<SettingsPage />, { wrapper: Wrapper });
  };

  it('affiche le titre', () => {
    renderPage();
    expect(screen.getByText('Paramètres')).toBeInTheDocument();
  });
});
