import { act, waitFor } from '@testing-library/react';
import { describe, expect, it, beforeEach } from 'vitest';
import { useFilters } from '../use-filters';
import { useFilterStore } from '@/store/filter-store';
import { renderWithProviders } from '@/test/test-utils';
import type { Game } from '@/types/game';
import React from 'react';

// Mock data
const mockGames: Game[] = [
  {
    id: 1,
    gameId: 1,
    title: 'Action Game',
    description: 'An exciting action game',
    price: { amount: 29.99, currency: 'USD', discount: 0 },
    releaseDate: '2023-01-01',
    developer: 'Test Developer',
    publisher: 'Test Publisher',
    genres: ['action'],
    platforms: ['pc'],
    coverImage: 'https://via.placeholder.com/300x400',
    screenshots: [],
    rating: 4.5,
    isNewRelease: false,
  },
  {
    id: 2,
    gameId: 2,
    title: 'Adventure Game',
    description: 'An epic adventure game',
    price: { amount: 39.99, currency: 'USD', discount: 10 },
    releaseDate: '2023-02-01',
    developer: 'Test Developer',
    publisher: 'Test Publisher',
    genres: ['adventure'],
    platforms: ['pc'],
    coverImage: 'https://via.placeholder.com/300x400',
    screenshots: [],
    rating: 4.0,
    isNewRelease: false,
  },
  {
    id: 3,
    gameId: 3,
    title: 'New RPG Game',
    description: 'A new RPG game',
    price: { amount: 59.99, currency: 'USD', discount: 0 },
    releaseDate: '2024-01-01',
    developer: 'Test Developer',
    publisher: 'Test Publisher',
    genres: ['rpg', 'action'],
    platforms: ['pc'],
    coverImage: 'https://via.placeholder.com/300x400',
    screenshots: [],
    rating: 4.8,
    isNewRelease: true,
  },
];

function TestComponent() {
  const { filteredGames } = useFilters(mockGames);
  return React.createElement('div', { 'data-testid': 'filtered-games' }, JSON.stringify(filteredGames));
}

describe('useFilters hook', () => {
  beforeEach(() => {
    // Réinitialiser le store avant chaque test
    useFilterStore.setState({
      search: '',
      categories: [],
      platforms: [],
      priceRange: [0, 100],
      sortBy: 'newest',
      onlyDiscounted: false,
      onlyNewReleases: false,
      setSearch: (search: string) => useFilterStore.setState({ search }),
      toggleCategory: (category: string) => useFilterStore.setState((state) => ({
        ...state,
        categories: state.categories.includes(category)
          ? state.categories.filter((c) => c !== category)
          : [...state.categories, category],
      })),
      togglePlatform: (platform: string) => useFilterStore.setState((state) => ({
        ...state,
        platforms: state.platforms.includes(platform)
          ? state.platforms.filter((p) => p !== platform)
          : [...state.platforms, platform],
      })),
      setPriceRange: (range: [number, number]) => useFilterStore.setState({ priceRange: range }),
      setSortBy: (sortBy) => useFilterStore.setState({ sortBy }),
      toggleDiscounted: () => useFilterStore.setState((state) => ({ onlyDiscounted: !state.onlyDiscounted })),
      toggleNewReleases: () => useFilterStore.setState((state) => ({ onlyNewReleases: !state.onlyNewReleases })),
      resetFilters: () => useFilterStore.setState({
        search: '',
        categories: [],
        platforms: [],
        priceRange: [0, 100],
        sortBy: 'newest',
        onlyDiscounted: false,
        onlyNewReleases: false,
      }),
    });
  });

  it('should handle basic filtering operations', async () => {
    const { getByTestId } = renderWithProviders(<TestComponent />);

    // Initially, all games should be shown
    const initialGames = JSON.parse(getByTestId('filtered-games').textContent || '[]');
    expect(initialGames).toHaveLength(3);

    // Filter by category
    act(() => {
      useFilterStore.getState().toggleCategory('action');
    });

    // Wait for the filter to be applied
    await waitFor(() => {
      const filteredGames = JSON.parse(getByTestId('filtered-games').textContent || '[]') as Game[];
      expect(filteredGames).toHaveLength(2);
      expect(filteredGames.map((g: Game) => g.id).sort()).toEqual([1, 3]);
    });
  });

  it('should handle price and discount filtering', async () => {
    const { getByTestId } = renderWithProviders(<TestComponent />);

    // Filter by price range
    act(() => {
      useFilterStore.getState().setPriceRange([30, 50]);
    });

    // Wait for the filter to be applied
    await waitFor(() => {
      const filteredGames = JSON.parse(getByTestId('filtered-games').textContent || '[]') as Game[];
      expect(filteredGames).toHaveLength(1);
      expect(filteredGames[0].id).toBe(2);
    });

    // Reset filters
    act(() => {
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

    // Filter by discount
    act(() => {
      useFilterStore.getState().toggleDiscounted();
    });

    // Wait for the filter to be applied
    await waitFor(() => {
      const filteredGames = JSON.parse(getByTestId('filtered-games').textContent || '[]') as Game[];
      expect(filteredGames).toHaveLength(1);
      expect(filteredGames[0].id).toBe(2);
    });
  });

  it('should handle sorting operations', async () => {
    const { getByTestId } = renderWithProviders(<TestComponent />);

    // Sort by price (low to high)
    act(() => {
      useFilterStore.getState().setSortBy('price-asc');
    });

    // Wait for the sort to be applied
    await waitFor(() => {
      const filteredGames = JSON.parse(getByTestId('filtered-games').textContent || '[]') as Game[];
      expect(filteredGames[0].id).toBe(1);
      expect(filteredGames[1].id).toBe(2);
      expect(filteredGames[2].id).toBe(3);
    });

    // Sort by price (high to low)
    act(() => {
      useFilterStore.getState().setSortBy('price-desc');
    });

    // Wait for the sort to be applied
    await waitFor(() => {
      const filteredGames = JSON.parse(getByTestId('filtered-games').textContent || '[]') as Game[];
      expect(filteredGames[0].id).toBe(3);
      expect(filteredGames[1].id).toBe(2);
      expect(filteredGames[2].id).toBe(1);
    });
  });

  it('should handle multiple filters simultaneously', async () => {
    const { getByTestId } = renderWithProviders(<TestComponent />);

    // Apply multiple filters
    act(() => {
      useFilterStore.getState().toggleCategory('rpg');
      useFilterStore.getState().toggleNewReleases();
    });

    // Wait for the filters to be applied
    await waitFor(() => {
      const filteredGames = JSON.parse(getByTestId('filtered-games').textContent || '[]') as Game[];
      expect(filteredGames).toHaveLength(1);
      expect(filteredGames[0].id).toBe(3);
    });
  });

  it('filters games by category', async () => {
    const { getByTestId } = renderWithProviders(<TestComponent />);

    act(() => {
      useFilterStore.getState().toggleCategory('action');
    });

    await waitFor(() => {
      const filteredGames = JSON.parse(getByTestId('filtered-games').textContent || '[]') as Game[];
      expect(filteredGames).toHaveLength(2);
      expect(filteredGames.map((g: Game) => g.id).sort()).toEqual([1, 3]);
    });
  });
});
