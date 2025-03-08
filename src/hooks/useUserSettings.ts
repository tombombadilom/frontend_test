import { useState } from 'react';

interface UserProfile {
  name: string;
  email: string;
}

interface UserSecurity {
  twoFactorEnabled: boolean;
}

export function useUserSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Simulated data for the test
  const [profileSettings] = useState<UserProfile>({
    name: "John Doe",
    email: "john@example.com"
  });
  
  const [securitySettings] = useState<UserSecurity>({
    twoFactorEnabled: false
  });
  
  const [apiKeys] = useState<string[]>([
    "test-key-1",
    "test-key-2"
  ]);

  const updateProfileSettings = async (data: UserProfile) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Profile updated:', data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSecuritySettings = async (data: UserSecurity) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Security settings updated:', data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const addAPIKey = async (key: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('API key added:', key);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAPIKey = async (key: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('API key deleted:', key);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    profileSettings,
    securitySettings,
    apiKeys,
    isLoading,
    error,
    updateProfileSettings,
    updateSecuritySettings,
    addAPIKey,
    deleteAPIKey,
  };
} 