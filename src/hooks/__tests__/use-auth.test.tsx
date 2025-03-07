import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useAuth } from '../use-auth';
import { TestWrapper } from '@/test/test-utils';

describe('useAuth hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return initial state', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: TestWrapper,
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('should login user successfully', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: TestWrapper,
    });

    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });

    expect(result.current.user).toBeTruthy();
    expect(localStorage.getItem('user')).toBeTruthy();
  });

  it('should set admin role for admin emails', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: TestWrapper,
    });

    await act(async () => {
      await result.current.login('admin@example.com', 'password');
    });

    expect(result.current.user?.role).toBe('admin');
  });

  it('should logout user', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: TestWrapper,
    });

    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });
});
