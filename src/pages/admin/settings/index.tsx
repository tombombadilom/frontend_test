import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import type React from 'react';
import { useAdminSettings } from '../../../hooks/useAdminSettings';
import APIKeyForm from '../../settings/components/APIKeyForm';
import { ProfileForm } from '../../settings/components/ProfileForm';
import { SecurityForm } from '../../settings/components/SecurityForm';

const AdminSettingsPage: React.FC = () => {
  const {
    profileSettings,
    apiKeys,
    securitySettings,
    isLoading,
    error,
    updateProfileSettings,
    addAPIKey,
    deleteAPIKey,
    updateSecuritySettings,
    manageUsers,
    manageSystem,
  } = useAdminSettings();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error.message}</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Admin Settings</h1>
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Admin Profile</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
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
        <TabsContent value="system">
          {/* Admin specific system settings would go here */}
          <div className="space-y-4">
            <button onClick={manageUsers}>Manage Users</button>
            <button onClick={manageSystem}>System Settings</button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettingsPage; 