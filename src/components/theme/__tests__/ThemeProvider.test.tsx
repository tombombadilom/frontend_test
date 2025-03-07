import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../ThemeProvider';
import { vi } from 'vitest';

describe('ThemeProvider', () => {
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn()
  };

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    localStorageMock.getItem.mockReset();
    localStorageMock.setItem.mockReset();
    document.documentElement.classList.remove('dark', 'light');
  });

  it('affiche le contenu', () => {
    render(
      <ThemeProvider>
        <div>Test Content</div>
      </ThemeProvider>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applique le thème clair par défaut', () => {
    localStorageMock.getItem.mockReturnValue(null);
    render(
      <ThemeProvider>
        <div>Test Content</div>
      </ThemeProvider>
    );
    expect(document.documentElement).toHaveClass('light');
  });

  it('applique le thème sombre', () => {
    localStorageMock.getItem.mockReturnValue('dark');
    render(
      <ThemeProvider>
        <div>Test Content</div>
      </ThemeProvider>
    );
    expect(document.documentElement).toHaveClass('dark');
  });
});
