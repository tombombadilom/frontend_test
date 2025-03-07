import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useObjects } from '../useObjects';
import { TestWrapper } from '@/test/test-utils';
import { mockObjects } from '@/test/mocks/objects';

// Mock de l'import dynamique
vi.mock('@/data/objects.json', () => ({
  default: mockObjects,
}));

describe('useObjects hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return loading state initially', () => {
    const { result } = renderHook(() => useObjects(), {
      wrapper: TestWrapper,
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.objects).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should load objects and set loading to false', async () => {
    const { result } = renderHook(() => useObjects({ initialData: mockObjects.items }), {
      wrapper: TestWrapper,
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.objects).toEqual(mockObjects.items);
    expect(result.current.error).toBeNull();
  });

  it('should add a new object', async () => {
    const { result } = renderHook(() => useObjects({ initialData: mockObjects.items }), {
      wrapper: TestWrapper,
    });

    const newObject = {
      name: 'New Item',
      description: 'A new item',
      category: 103,
      rarity: 'common',
      price: {
        amount: 100,
        currency: 'V-Bucks'
      },
      availability: {
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        isLimited: false
      },
      preview: {
        imageUrl: '/images/items/new-item.jpg'
      },
      gameId: 9,
      tags: ['new'],
      metadata: {
        type: 'item',
        isFeatured: false,
        isNewRelease: true
      }
    };

    await act(async () => {
      result.current.addObject(newObject);
    });

    expect(result.current.objects).toHaveLength(3);
    expect(result.current.objects[2].name).toBe('New Item');
    expect(result.current.objects[2].id).toBeGreaterThan(1002);
  });

  it('should update an existing object', async () => {
    const { result } = renderHook(() => useObjects({ initialData: mockObjects.items }), {
      wrapper: TestWrapper,
    });

    await act(async () => {
      result.current.updateObject(1001, {
        name: 'Updated Midas Rex',
        price: {
          amount: 2500,
          currency: 'V-Bucks'
        }
      });
    });

    const updatedObject = result.current.objects.find(o => o.id === 1001);
    expect(updatedObject?.name).toBe('Updated Midas Rex');
    expect(updatedObject?.price.amount).toBe(2500);
  });

  it('should delete an object', async () => {
    const { result } = renderHook(() => useObjects({ initialData: mockObjects.items }), {
      wrapper: TestWrapper,
    });

    await act(async () => {
      result.current.deleteObject(1001);
    });

    expect(result.current.objects).toHaveLength(1);
    expect(result.current.objects[0].id).toBe(1002);
  });

  it('should handle errors during loading', async () => {
    const mockError = new Error('Failed to load objects');
    const { result } = renderHook(() => useObjects({
      loadData: async () => {
        throw mockError;
      }
    }), {
      wrapper: TestWrapper,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe('Failed to load objects');
    });
  });
}); 