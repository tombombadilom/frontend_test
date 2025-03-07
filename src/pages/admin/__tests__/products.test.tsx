import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AdminProductsPage from '../products';

// Mock des données de jeux
vi.mock('@/data/games.json', () => ({
  default: [
    {
      id: '1',
      title: 'Test Game 1',
      description: 'Description 1',
      price: 59.99,
      discount: 20,
      releaseDate: '2023-01-01',
      developer: 'Developer 1',
      publisher: 'Publisher 1',
      genres: ['Action', 'Adventure'],
      platforms: ['PC', 'PS5'],
      coverImage: 'https://via.placeholder.com/300x400',
      screenshots: [],
      rating: 4.5,
      isFeatured: true,
      isNewRelease: false,
    },
    {
      id: '2',
      title: 'Test Game 2',
      description: 'Description 2',
      price: 49.99,
      discount: 0,
      releaseDate: '2023-02-01',
      developer: 'Developer 2',
      publisher: 'Publisher 2',
      genres: ['RPG'],
      platforms: ['PC', 'XSX'],
      coverImage: 'https://via.placeholder.com/300x400',
      screenshots: [],
      rating: 4.2,
      isFeatured: false,
      isNewRelease: true,
    },
  ],
}));

describe('AdminProductsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(
      <BrowserRouter>
        <AdminProductsPage />
      </BrowserRouter>
    );

    // Vérifier qu'il y a des éléments avec la classe animate-pulse (état de chargement)
    const loadingElements = document.querySelectorAll('.animate-pulse');
    expect(loadingElements.length).toBeGreaterThan(0);
  });

  it('renders products after loading', async () => {
    render(
      <BrowserRouter>
        <AdminProductsPage />
      </BrowserRouter>
    );

    // Attendre que les produits soient chargés
    await waitFor(() => {
      expect(screen.getByText('Test Game 1')).toBeInTheDocument();
    });

    expect(screen.getByText('Test Game 2')).toBeInTheDocument();
  });

  it('filters products by search query', async () => {
    render(
      <BrowserRouter>
        <AdminProductsPage />
      </BrowserRouter>
    );

    // Attendre que les produits soient chargés
    await waitFor(() => {
      expect(screen.getByText('Test Game 1')).toBeInTheDocument();
    });

    // Rechercher un produit
    const searchInput = screen.getByPlaceholderText(/rechercher un produit/i);
    fireEvent.change(searchInput, { target: { value: 'Game 1' } });

    // Vérifier que seul le produit correspondant est affiché
    expect(screen.getByText('Test Game 1')).toBeInTheDocument();
    expect(screen.queryByText('Test Game 2')).not.toBeInTheDocument();
  });

  it('deletes a product', async () => {
    render(
      <BrowserRouter>
        <AdminProductsPage />
      </BrowserRouter>
    );

    // Attendre que les produits soient chargés
    await waitFor(() => {
      expect(screen.getByText('Test Game 1')).toBeInTheDocument();
    });

    // Cliquer sur le bouton de suppression du premier produit
    const deleteButtons = screen.getAllByRole('button', { name: /supprimer/i });
    fireEvent.click(deleteButtons[0]);

    // Vérifier que le produit est supprimé
    expect(screen.queryByText('Test Game 1')).not.toBeInTheDocument();
    expect(screen.getByText('Test Game 2')).toBeInTheDocument();
  });
});
