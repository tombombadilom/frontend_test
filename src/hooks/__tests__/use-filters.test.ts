import { useFilterStore } from '@/store/filter-store';
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useFilters } from '../use-filters';
import { TestWrapper } from '@/test/test-utils';
import { mockGames } from '@/test/mocks/games';

describe('useFilters hook', () => {
  beforeEach(() => {
    // Réinitialiser le store avant chaque test
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
  });

  it('should handle basic filtering operations', () => {
    const { result } = renderHook(() => useFilters(mockGames), {
      wrapper: TestWrapper,
    });

    // Test initial state
    expect(result.current.filteredGames.length).toBe(3);

    // Test search filter
    act(() => {
      useFilterStore.getState().setSearch('Featured');
    });
    expect(result.current.filteredGames.length).toBe(1);
    expect(result.current.filteredGames[0].id).toBe(1);

    // Test category filter
    act(() => {
      useFilterStore.getState().toggleCategory('Action');
    });
    expect(result.current.filteredGames.length).toBe(1);
    expect(result.current.filteredGames[0].id).toBe(1);

    // Test platform filter
    act(() => {
      useFilterStore.getState().togglePlatform('PC');
    });
    expect(result.current.filteredGames.length).toBe(1);
    expect(result.current.filteredGames[0].id).toBe(1);
  });

  it('should handle price and discount filtering', () => {
    const { result } = renderHook(() => useFilters(mockGames), {
      wrapper: TestWrapper,
    });

    // Test price range filter
    act(() => {
      useFilterStore.getState().setPriceRange([0, 45]);
    });
    expect(result.current.filteredGames.length).toBe(1);
    expect(result.current.filteredGames[0].id).toBe(3);

    // Test discount filter
    act(() => {
      useFilterStore.getState().toggleDiscounted();
    });
    expect(result.current.filteredGames.length).toBe(1);
    expect(result.current.filteredGames[0].id).toBe(3);
  });

  it('should handle new releases filtering', () => {
    act(() => {
      useFilterStore.getState().toggleNewReleases();
    });

    const { result } = renderHook(() => useFilters(mockGames), {
      wrapper: TestWrapper,
    });
    expect(result.current.filteredGames.length).toBe(1);
    expect(result.current.filteredGames[0].id).toBe(2);
  });

  it('should handle sorting operations', () => {
    const { result } = renderHook(() => useFilters(mockGames), {
      wrapper: TestWrapper,
    });

    // Test price sorting
    act(() => {
      useFilterStore.getState().setSortBy('price-asc');
    });
    expect(result.current.filteredGames.map(g => g.id)).toEqual([3, 1, 2]);

    // Test name sorting
    act(() => {
      useFilterStore.getState().setSortBy('name-asc');
    });
    expect(result.current.filteredGames.map(g => g.title)).toEqual([
      'Featured Game',
      'New Release Game',
      'Regular Game'
    ]);
  });

  it('should handle multiple filters simultaneously', () => {
    act(() => {
      useFilterStore.getState().setSearch('Game');
      useFilterStore.getState().toggleCategory('Strategy');
      useFilterStore.getState().setPriceRange([0, 50]);
      useFilterStore.getState().toggleDiscounted();
    });

    const { result } = renderHook(() => useFilters(mockGames), {
      wrapper: TestWrapper,
    });
    expect(result.current.filteredGames.length).toBe(1);
    expect(result.current.filteredGames[0].id).toBe(3);
  });
});
