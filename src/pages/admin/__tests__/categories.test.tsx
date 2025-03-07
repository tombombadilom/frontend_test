import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import CategoriesPage from '../categories';
import { useCategories } from '@/hooks/useCategories';
import { vi } from 'vitest';
import { CustomToaster } from '@/components/shared/CustomToaster';

// Mock useCategories hook
vi.mock('@/hooks/useCategories');

// Mock useTheme hook
vi.mock('@/components/theme/ThemeProvider', async () => {
  const actual = await vi.importActual('@/components/theme/ThemeProvider');
  return {
    ...actual,
    useTheme: () => ({
      theme: 'light',
      setTheme: vi.fn(),
    }),
  };
});

// Mock CustomToaster
vi.mock('@/components/shared/CustomToaster', () => ({
  CustomToaster: () => null,
}));

// Mock sonner
vi.mock('sonner', () => ({
  Toaster: () => null,
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
  },
}));

const mockCategories = [
  { id: 1, name: 'Category 1', description: 'Description 1', gameId: 'all', order: 1, isActive: true, subcategories: [] },
  { id: 2, name: 'Category 2', description: 'Description 2', gameId: 'all', order: 2, isActive: true, subcategories: [] },
];

describe('CategoriesPage', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    (useCategories as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      categories: mockCategories,
      isLoading: false,
      error: null,
      addCategory: vi.fn(),
      updateCategory: vi.fn(),
      deleteCategory: vi.fn(),
    });
  });

  it('renders the categories page', async () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <CategoriesPage />
          <CustomToaster />
        </ThemeProvider>
      </BrowserRouter>
    );

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText('Categories')).toBeInTheDocument();
    });

    for (const category of mockCategories) {
      expect(screen.getByText(category.name)).toBeInTheDocument();
      expect(screen.getByText(category.description)).toBeInTheDocument();
    }
  });

  it('adds a new category', async () => {
    const mockAddCategory = vi.fn();
    (useCategories as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      categories: mockCategories,
      isLoading: false,
      error: null,
      addCategory: mockAddCategory,
      updateCategory: vi.fn(),
      deleteCategory: vi.fn(),
    });

    render(
      <BrowserRouter>
        <ThemeProvider>
          <CategoriesPage />
          <CustomToaster />
        </ThemeProvider>
      </BrowserRouter>
    );

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText('Categories')).toBeInTheDocument();
    });

    const addButton = screen.getByRole('button', { name: /add/i });
    await user.click(addButton);

    const nameInput = screen.getByPlaceholderText(/new category/i);
    await user.type(nameInput, 'New Category');

    await user.click(addButton);

    await waitFor(() => {
      expect(mockAddCategory).toHaveBeenCalledWith({
        name: 'New Category',
        description: '',
        gameId: 'all',
        order: mockCategories.length + 1,
        isActive: true,
        subcategories: []
      });
    });
  });

  it('deletes a category', async () => {
    const mockDeleteCategory = vi.fn();
    (useCategories as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      categories: mockCategories,
      isLoading: false,
      error: null,
      addCategory: vi.fn(),
      updateCategory: vi.fn(),
      deleteCategory: mockDeleteCategory,
    });

    render(
      <BrowserRouter>
        <ThemeProvider>
          <CategoriesPage />
          <CustomToaster />
        </ThemeProvider>
      </BrowserRouter>
    );

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText('Categories')).toBeInTheDocument();
    });

    // Wait for the animation to complete and the button to be visible
    await waitFor(() => {
      const deleteButtons = screen.getAllByRole('button', { name: /Delete/i });
      expect(deleteButtons[0]).toBeVisible();
    });

    // Find the delete button within the first category's container
    const firstCategory = screen.getByText('Category 1').closest('div[class*="flex items-center justify-between"]') as HTMLElement;
    const deleteButton = within(firstCategory).getByRole('button', { name: /Delete/i });
    expect(deleteButton).toBeInTheDocument();
    await user.click(deleteButton);

    await waitFor(() => {
      expect(mockDeleteCategory).toHaveBeenCalledWith(mockCategories[0].id);
    });
  });
});
