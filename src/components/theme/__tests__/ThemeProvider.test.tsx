import { ThemeProvider, useTheme } from '@/components/theme/ThemeProvider';
import { act, render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Test component that uses the useTheme hook
const TestComponent = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <div data-testid="theme-value">{theme}</div>
      <button type="button" onClick={() => setTheme('dark')}>Set Dark</button>
      <button type="button" onClick={() => setTheme('light')}>Set Light</button>
      <button type="button" onClick={() => setTheme('system')}>Set System</button>
    </div>
  );
};

interface LocalStorageMock {
  store: Record<string, string>;
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
  clear: () => void;
}

// Mock localStorage
const localStorageMock: LocalStorageMock = {
  store: {} as Record<string, string>,
  getItem: vi.fn((key: string) => localStorageMock.store[key] || null),
  setItem: vi.fn((key: string, value: string) => {
    localStorageMock.store[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete localStorageMock.store[key];
  }),
  clear: vi.fn(() => {
    localStorageMock.store = {};
  }),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock matchMedia
const mockMediaQuery = {
  matches: false,
  media: '(prefers-color-scheme: dark)',
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
};

Object.defineProperty(window, 'matchMedia', {
  value: vi.fn().mockImplementation(query => ({
    ...mockMediaQuery,
    media: query,
  })),
});

describe('ThemeProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.store = {};
    mockMediaQuery.matches = false;
    document.documentElement.classList.remove('dark', 'light');
  });

  it('renders children with default theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-value')).toBeInTheDocument();
    expect(document.documentElement).toHaveClass('light');
  });

  it('applies dark theme when specified', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <TestComponent />
      </ThemeProvider>
    );

    expect(document.documentElement).toHaveClass('dark');
  });

  it('persists theme in localStorage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Simulate theme change
    act(() => {
      fireEvent.click(screen.getByText('Set Dark'));
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith('ui-theme', 'dark');
    expect(localStorageMock.store['ui-theme']).toBe('dark');
    expect(document.documentElement).toHaveClass('dark');
  });

  it('uses the saved theme from localStorage if available', () => {
    localStorageMock.store['ui-theme'] = 'dark';

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(document.documentElement).toHaveClass('dark');
  });

  it('responds to system theme changes', () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Set theme to system
    act(() => {
      fireEvent.click(screen.getByText('Set System'));
    });

    // Simulate system theme change to dark
    act(() => {
      mockMediaQuery.matches = true;
      mediaQuery.dispatchEvent(new Event('change'));
    });

    expect(document.documentElement).toHaveClass('dark');

    // Simulate system theme change to light
    act(() => {
      mockMediaQuery.matches = false;
      mediaQuery.dispatchEvent(new Event('change'));
    });

    expect(document.documentElement).toHaveClass('light');
  });
});
