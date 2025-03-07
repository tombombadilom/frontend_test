import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';
import { vi } from 'vitest';
import ProductsFormPage from '../products-form';
import { BrowserRouter } from 'react-router-dom';

// Mock Sonner toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock useNavigate
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => vi.fn(),
}));

describe('ProductsFormPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the form with all required fields', () => {
    render(
      <BrowserRouter>
        <ProductsFormPage />
      </BrowserRouter>
    );

    // Check headings
    expect(screen.getByText('Add a product')).toBeInTheDocument();
    expect(screen.getByText('Add a new product to the catalog')).toBeInTheDocument();
    expect(screen.getByText('General information')).toBeInTheDocument();

    // Check form fields
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/release date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/developer/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/publisher/i)).toBeInTheDocument();
  });

  it('allows adding and removing genres', async () => {
    render(
      <BrowserRouter>
        <ProductsFormPage />
      </BrowserRouter>
    );

    // Add a genre
    const genreInput = screen.getByLabelText(/genres/i);
    await userEvent.type(genreInput, 'Action{enter}');

    // Check that the genre was added
    expect(screen.getByText('Action')).toBeInTheDocument();

    // Remove the genre
    fireEvent.click(screen.getByRole('button', { name: /remove action/i }));

    // Check that the genre was removed
    expect(screen.queryByText('Action')).not.toBeInTheDocument();
  });

  it('allows adding and removing platforms', async () => {
    render(
      <BrowserRouter>
        <ProductsFormPage />
      </BrowserRouter>
    );

    // Add a platform
    const platformInput = screen.getByLabelText(/platforms/i);
    await userEvent.type(platformInput, 'PC{enter}');

    // Check that the platform was added
    expect(screen.getByText('PC')).toBeInTheDocument();

    // Remove the platform
    fireEvent.click(screen.getByRole('button', { name: /remove pc/i }));

    // Check that the platform was removed
    expect(screen.queryByText('PC')).not.toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    render(
      <BrowserRouter>
        <ProductsFormPage />
      </BrowserRouter>
    );

    // Fill in the form with valid data
    await userEvent.type(screen.getByLabelText(/title/i), 'Test Game');
    await userEvent.type(screen.getByLabelText(/release date/i), '2024-01-01');
    await userEvent.type(screen.getByLabelText(/description/i), 'A test game description');
    await userEvent.type(screen.getByLabelText(/developer/i), 'Test Developer');
    await userEvent.type(screen.getByLabelText(/publisher/i), 'Test Publisher');

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /create product/i });
    await userEvent.click(submitButton);

    // Check that the success toast is shown
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Product created successfully');
    });
  });
});
