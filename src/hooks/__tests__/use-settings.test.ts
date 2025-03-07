import { useUserSettingsStore } from '@/store/user-settings-store';
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useSettings } from '../use-settings';
import { TestWrapper } from '@/test/test-utils';
import { mockSettings } from '@/test/mocks/settings';

describe('useSettings hook', () => {
  beforeEach(() => {
    act(() => {
      useUserSettingsStore.setState(mockSettings);
    });
  });

  it('should handle basic settings operations', () => {
    const { result } = renderHook(() => useSettings(), {
      wrapper: TestWrapper,
    });

    // Test initial state
    expect(result.current).toMatchObject({
      language: mockSettings.language,
      currency: mockSettings.currency,
      emailNotifications: mockSettings.emailNotifications,
      pushNotifications: mockSettings.pushNotifications
    });

    // Test language and currency changes
    act(() => {
      result.current.setLanguage('en');
      result.current.setCurrency('USD');
    });

    expect(result.current.language).toBe('en');
    expect(result.current.currency).toBe('USD');
  });

  it('should handle notification settings', () => {
    const { result } = renderHook(() => useSettings(), {
      wrapper: TestWrapper,
    });

    // Test email notifications
    expect(result.current.emailNotifications).toBe(true);
    act(() => {
      result.current.toggleEmailNotifications();
    });
    expect(result.current.emailNotifications).toBe(false);

    // Test push notifications
    expect(result.current.pushNotifications).toBe(false);
    act(() => {
      result.current.togglePushNotifications();
    });
    expect(result.current.pushNotifications).toBe(true);
  });

  it('should handle currency formatting and settings reset', () => {
    const { result } = renderHook(() => useSettings(), {
      wrapper: TestWrapper,
    });

    // Test currency formatting
    expect(result.current.formatCurrency(1000)).toMatch(/1[^\d]*000,00[^\d]*€/);
    
    act(() => {
      result.current.setCurrency('USD');
    });
    expect(result.current.formatCurrency(1000)).toMatch(/1[^\d]*000,00[^\d]*\$US/);

    // Test settings reset
    act(() => {
      result.current.setLanguage('en');
      result.current.setCurrency('USD');
      result.current.toggleEmailNotifications();
      result.current.togglePushNotifications();
      result.current.resetSettings();
    });

    expect(result.current).toMatchObject(mockSettings);
  });
});
