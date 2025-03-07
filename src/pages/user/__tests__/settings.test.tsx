import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { useTheme } from '@/components/theme/useTheme';
import { useAuth } from '@/hooks/use-auth';
import SettingsPage from '../settings';
import { vi } from 'vitest';

// Mock the hooks
vi.mock('@/hooks/use-auth');
vi.mock('@/components/theme/useTheme');
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => vi.fn(),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock ThemeProvider
vi.mock('@/components/theme/ThemeProvider', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const _mockNavigate = vi.fn();
const mockUpdateProfile = vi.fn();
const mockUpdatePassword = vi.fn();
const mockSetTheme = vi.fn();

describe('SettingsPage', () => {
  const mockUser = {
    id: '1',
    email: 'test@example.com',
    username: 'testuser',
    role: 'user',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
      user: mockUser,
      updateProfile: mockUpdateProfile,
      updatePassword: mockUpdatePassword,
    });
    (useTheme as ReturnType<typeof vi.fn>).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
    });
  });

  const renderComponent = () => {
    const Wrapper = ({ children }: { children: React.ReactNode }) => {
      const methods = useForm({
        defaultValues: {
          username: mockUser.username,
          email: mockUser.email,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        },
      });

      return (
        <BrowserRouter>
          <ThemeProvider>
            <FormProvider {...methods}>{children}</FormProvider>
          </ThemeProvider>
        </BrowserRouter>
      );
    };

    return render(<SettingsPage />, { wrapper: Wrapper });
  };

  it('renders settings page correctly', () => {
    renderComponent();

    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Security')).toBeInTheDocument();
  });

  it('submits profile form with valid data', async () => {
    renderComponent();

    const usernameInput = screen.getByLabelText('Username');
    const emailInput = screen.getByLabelText('Email');
    const submitButton = screen.getByRole('button', { name: /save changes/i });

    fireEvent.change(usernameInput, { target: { value: 'newusername' } });
    fireEvent.change(emailInput, { target: { value: 'newemail@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockUpdateProfile).toHaveBeenCalledWith({
        username: 'newusername',
        email: 'newemail@example.com',
      });
    });
  });

  it('shows validation errors for invalid profile data', async () => {
    renderComponent();

    const submitButton = screen.getByRole('button', { name: /save changes/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Username must be at least 3 characters')).toBeInTheDocument();
      expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
    });
  });

  it('switches between tabs', () => {
    renderComponent();

    const securityTab = screen.getByRole('tab', { name: /security/i });
    fireEvent.click(securityTab);

    expect(screen.getByText('Change Password')).toBeInTheDocument();
  });

  it('validates password confirmation in security tab', async () => {
    renderComponent();

    // Switch to security tab
    const securityTab = screen.getByRole('tab', { name: /security/i });
    fireEvent.click(securityTab);

    const currentPasswordInput = screen.getByLabelText('Current Password');
    const newPasswordInput = screen.getByLabelText('New Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    const submitButton = screen.getByRole('button', { name: /save changes/i });

    fireEvent.change(currentPasswordInput, { target: { value: 'currentpass' } });
    fireEvent.change(newPasswordInput, { target: { value: 'newpass' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'differentpass' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
    });
  });
});
