'use client';

import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeProvider, useTheme } from '../theme-context';

// Mock pour localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Composant de test pour accéder au contexte
function TestComponent() {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <div data-testid="theme-value">{theme}</div>
      <button type="button" onClick={() => setTheme('dark')}>Set Dark</button>
      <button type="button" onClick={() => setTheme('light')}>Set Light</button>
      <button type="button" onClick={() => setTheme('system')}>Set System</button>
    </div>
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
    document.documentElement.classList.remove('light', 'dark');
  });

  it('should use default theme when no localStorage value', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-value').textContent).toBe('system');
  });

  it('should use theme from localStorage', () => {
    localStorageMock.getItem.mockReturnValueOnce('dark');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-value').textContent).toBe('dark');
  });

  it('should change theme when setTheme is called', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Set Dark'));

    expect(screen.getByTestId('theme-value').textContent).toBe('dark');
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'game-shop-theme',
      'dark'
    );
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should apply system theme when theme is system', () => {
    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn().mockImplementation((query) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Set System'));

    expect(screen.getByTestId('theme-value').textContent).toBe('system');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
