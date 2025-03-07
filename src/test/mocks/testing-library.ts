import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { render } from '@testing-library/react';
import { ReactElement } from 'react';

function renderWithProviders(ui: ReactElement) {
  return render(
    <BrowserRouter>
      <ThemeProvider>
        {ui}
      </ThemeProvider>
    </BrowserRouter>
  );
}

// Mock de @testing-library/react
vi.mock('@testing-library/react', () => ({
  ...vi.importActual('@testing-library/react'),
  render: (ui: any) => {
    const actual = vi.importActual('@testing-library/react');
    return actual.render(ui);
  },
})); 