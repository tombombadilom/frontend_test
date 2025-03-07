import { screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterPage from '../register';
import { useAuth } from '@/hooks/use-auth';
import { vi } from 'vitest';
import { renderWithProviders } from '@/test/test-utils';

// Mock the hooks
vi.mock('@/hooks/use-auth', () => ({
  useAuth: vi.fn(() => ({
    register: vi.fn(),
    user: null,
  })),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
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

describe('RegisterPage', () => {
  const mockRegister = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
      register: mockRegister,
      user: null,
    });
  });

  const renderComponent = () => {
    return renderWithProviders(<RegisterPage />);
  };

  it('renders the registration form', () => {
    renderComponent();

    expect(screen.getByText('Create an account')).toBeInTheDocument();
    expect(screen.getByText('Enter your information to create an account')).toBeInTheDocument();
    expect(screen.getByLabelText('Full name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /I accept the terms of service/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create account/i })).toBeInTheDocument();
    expect(screen.getByText('Already have an account?')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('shows validation errors for invalid data', async () => {
    renderComponent();

    const submitButton = screen.getByRole('button', { name: /Create account/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Name must be at least 2 characters')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
      expect(screen.getByText('You must accept the terms of service')).toBeInTheDocument();
    });
  });

  it('submits the form with valid data', async () => {
    renderComponent();

    const nameInput = screen.getByLabelText('Full name');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm password');
    const acceptTermsCheckbox = screen.getByRole('checkbox', { name: /I accept the terms of service/i });
    const submitButton = screen.getByRole('button', { name: /Create account/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password123' } });
    fireEvent.click(acceptTermsCheckbox);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password123',
      });
    });
  });

  it('toggles password visibility', () => {
    renderComponent();

    const passwordInput = screen.getByLabelText('Password');
    const toggleButtons = screen.getAllByRole('button', { name: /Show password/i });
    const toggleButton = toggleButtons[0];

    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
