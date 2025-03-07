import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { ReactNode } from 'react';
import { useFilterStore } from '@/store/filter-store';

// Reset stores before each test
beforeEach(() => {
  useFilterStore.setState({
    search: '',
    categories: [],
    platforms: [],
    priceRange: [0, 100],
    sortBy: 'newest',
    onlyDiscounted: false,
    onlyNewReleases: false,
  });
});

export function renderWithProviders(ui: React.ReactElement) {
  return render(
    <BrowserRouter>
      <ThemeProvider>
        {ui}
      </ThemeProvider>
    </BrowserRouter>
  );
}

interface TestWrapperProps {
  children: ReactNode;
}

export function TestWrapper({ children }: TestWrapperProps) {
  return (
    <BrowserRouter>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </BrowserRouter>
  );
}

export * from '@testing-library/react'; 