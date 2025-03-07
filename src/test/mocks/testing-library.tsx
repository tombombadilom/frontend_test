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

// Remplacer render par renderWithProviders
vi.mock('@testing-library/react', async () => {
  const actual = await vi.importActual('@testing-library/react');
  return {
    ...actual,
    render: renderWithProviders,
  };
}); 