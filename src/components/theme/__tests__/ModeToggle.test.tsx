import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModeToggle } from '../ModeToggle';
import { useTheme } from '../ThemeProvider';
import { vi } from 'vitest';

// Mock the useTheme hook
vi.mock('../ThemeProvider');

describe('ModeToggle', () => {
  const mockSetTheme = vi.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    (useTheme as ReturnType<typeof vi.fn>).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme,
    });
  });

  it('renders the toggle button', () => {
    render(<ModeToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('toggles from light to dark theme when clicked', async () => {
    render(<ModeToggle />);
    const toggleButton = screen.getByRole('button');
    await user.click(toggleButton);
    const darkMenuItem = await screen.findByText('Dark');
    await user.click(darkMenuItem);
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('toggles from dark to light theme when clicked', async () => {
    (useTheme as ReturnType<typeof vi.fn>).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme,
    });
    render(<ModeToggle />);
    const toggleButton = screen.getByRole('button');
    await user.click(toggleButton);
    const lightMenuItem = await screen.findByText('Light');
    await user.click(lightMenuItem);
    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('toggles from system to light theme when clicked', async () => {
    (useTheme as ReturnType<typeof vi.fn>).mockReturnValue({
      theme: 'system',
      setTheme: mockSetTheme,
    });
    render(<ModeToggle />);
    const toggleButton = screen.getByRole('button');
    await user.click(toggleButton);
    const lightMenuItem = await screen.findByText('Light');
    await user.click(lightMenuItem);
    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });
});
