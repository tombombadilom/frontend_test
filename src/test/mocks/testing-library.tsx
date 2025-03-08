import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { useFilterStore } from '@/store/filter-store';

// Fonction utilitaire pour les tests, gardée pour référence future
function _renderWithProviders(ui: ReactElement) {
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
  render: async (ui: ReactElement) => {
    const actual = await vi.importActual<typeof import('@testing-library/react')>('@testing-library/react');
    return actual.render(ui);
  },
})); 