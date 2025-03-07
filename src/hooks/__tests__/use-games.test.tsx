import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useGames } from '../use-games';
import { TestWrapper } from '@/test/test-utils';
import { mockGames } from '@/test/mocks/games';

// Mock de l'import dynamique
vi.mock('@/data/games.json', () => ({
  default: mockGames,
}));

describe('useGames hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return loading state initially', () => {
    const { result } = renderHook(() => useGames(), {
      wrapper: TestWrapper,
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.games).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should load games and set loading to false', async () => {
    const { result } = renderHook(() => useGames(), {
      wrapper: TestWrapper,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.games).toEqual(mockGames);
    }, { timeout: 1000 });
  });

  it('should filter featured and new release games', async () => {
    const { result } = renderHook(() => useGames(), {
      wrapper: TestWrapper,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.featuredGames).toHaveLength(1);
      expect(result.current.newReleases).toHaveLength(1);
    }, { timeout: 1000 });
  });
});
