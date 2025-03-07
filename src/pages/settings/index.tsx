import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import type React from 'react';
import { useSettings } from '../../hooks/useSettings';
import { APIKeyForm } from './components/APIKeyForm';
import { ProfileForm } from './components/ProfileForm';
import { SecurityForm } from './components/SecurityForm';

const SettingsPage: React.FC = () => {
  const {
    profileSettings,
    apiKeys,
    securitySettings,
    loading,
    error,
    updateProfileSettings,
    addAPIKey,
    deleteAPIKey,
    updateSecuritySettings,
  } = useSettings();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          {profileSettings && (
            <ProfileForm
              initialData={profileSettings}
              onSubmit={updateProfileSettings}
            />
          )}
        </TabsContent>
        <TabsContent value="api-keys">
          <APIKeyForm
            apiKeys={apiKeys}
            onAdd={addAPIKey}
            onDelete={deleteAPIKey}
          />
        </TabsContent>
        <TabsContent value="security">
          {securitySettings && (
            <SecurityForm
              initialData={securitySettings}
              onSubmit={updateSecuritySettings}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
