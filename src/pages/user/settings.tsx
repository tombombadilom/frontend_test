'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useState } from 'react';
import { showToast } from '@/lib/toast';
import { z } from 'zod';
import { useAuth } from '@/hooks/use-auth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from "@/components/ui/checkbox";
import { useTheme } from '@/components/theme/ThemeProvider';

const settingsSchema = z.object({
  language: z.enum(['fr', 'en'], {
    required_error: "Veuillez sélectionner une langue",
  }),
  theme: z.enum(['light', 'dark'], {
    required_error: "Veuillez sélectionner un thème",
  }),
  preferences: z.object({
    saveHistory: z.boolean(),
    autoPlayVideos: z.boolean(),
    enableSounds: z.boolean(),
    showRecommendations: z.boolean(),
    enableBetaFeatures: z.boolean(),
  }),
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
    promotions: z.boolean(),
    updates: z.boolean(),
    newsletter: z.boolean(),
    loginAlerts: z.boolean(),
  }),
  privacy: z.object({
    showEmail: z.boolean(),
    showProfile: z.boolean(),
    showActivity: z.boolean(),
  }),
  security: z.object({
    twoFactor: z.boolean(),
    sessionTimeout: z.string(),
  }),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const { user, updateSettings } = useAuth();
  const { setTheme } = useTheme();

  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      language: user?.language || 'fr',
      theme: user?.theme || 'light',
      preferences: {
        saveHistory: user?.preferences?.saveHistory || false,
        autoPlayVideos: user?.preferences?.autoPlayVideos || false,
        enableSounds: user?.preferences?.enableSounds || true,
        showRecommendations: user?.preferences?.showRecommendations || true,
        enableBetaFeatures: user?.preferences?.enableBetaFeatures || false,
      },
      notifications: {
        email: user?.notifications?.email || false,
        push: user?.notifications?.push || false,
        promotions: user?.notifications?.promotions || false,
        updates: user?.notifications?.updates || false,
        newsletter: user?.notifications?.newsletter || false,
        loginAlerts: user?.notifications?.loginAlerts || false,
      },
      privacy: {
        showEmail: user?.privacy?.showEmail || false,
        showProfile: user?.privacy?.showProfile || false,
        showActivity: user?.privacy?.showActivity || false,
      },
      security: {
        twoFactor: user?.security?.twoFactor || false,
        sessionTimeout: user?.security?.sessionTimeout || '15 minutes',
      },
    },
  });

  const onSubmit = async (data: SettingsFormData) => {
    try {
      // Mettre à jour le thème dans le ThemeProvider
      setTheme(data.theme);
      
      // Mettre à jour tous les paramètres utilisateur
      const result = await updateSettings({
        language: data.language,
        theme: data.theme,
        preferences: data.preferences,
        notifications: data.notifications,
        privacy: data.privacy,
        security: data.security,
      });

      if (result.success) {
        showToast.success('Paramètres mis à jour avec succès');
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour des paramètres:', error);
      showToast.error('Erreur lors de la mise à jour des paramètres');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="bg-background p-6 rounded-lg">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Paramètres</h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Préférences générales</h3>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Langue</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner une langue" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fr">Français</SelectItem>
                              <SelectItem value="en">English</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="theme"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Thème</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un thème" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">Clair</SelectItem>
                              <SelectItem value="dark">Sombre</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Préférences utilisateur</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="preferences.saveHistory"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Sauvegarder l'historique
                          </FormLabel>
                          <FormDescription>
                            Conserver l'historique de navigation et d'activité
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferences.autoPlayVideos"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Lecture automatique des vidéos
                          </FormLabel>
                          <FormDescription>
                            Lancer automatiquement la lecture des vidéos
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferences.enableSounds"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Activer les sons
                          </FormLabel>
                          <FormDescription>
                            Activer les effets sonores de l'interface
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferences.showRecommendations"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Afficher les recommandations
                          </FormLabel>
                          <FormDescription>
                            Afficher des suggestions personnalisées
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferences.enableBetaFeatures"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Fonctionnalités bêta
                          </FormLabel>
                          <FormDescription>
                            Activer les fonctionnalités expérimentales
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 md:col-span-2">
                <h3 className="text-lg font-medium">Notifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="notifications.email"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Notifications par email
                          </FormLabel>
                          <FormDescription>
                            Recevoir les notifications par email
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notifications.push"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Notifications push
                          </FormLabel>
                          <FormDescription>
                            Recevoir les notifications push
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notifications.promotions"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Promotions
                          </FormLabel>
                          <FormDescription>
                            Recevoir les offres promotionnelles
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notifications.updates"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Mises à jour
                          </FormLabel>
                          <FormDescription>
                            Recevoir les notifications de mises à jour
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notifications.newsletter"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Newsletter
                          </FormLabel>
                          <FormDescription>
                            Recevoir notre newsletter
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notifications.loginAlerts"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Alertes de connexion
                          </FormLabel>
                          <FormDescription>
                            Recevoir une notification lors d'une nouvelle connexion
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 md:col-span-2">
                <h3 className="text-lg font-medium">Confidentialité</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="privacy.showEmail"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Afficher l'email
                          </FormLabel>
                          <FormDescription>
                            Rendre votre email visible aux autres utilisateurs
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="privacy.showProfile"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Afficher le profil
                          </FormLabel>
                          <FormDescription>
                            Rendre votre profil visible aux autres utilisateurs
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="privacy.showActivity"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Afficher l'activité
                          </FormLabel>
                          <FormDescription>
                            Rendre votre activité visible aux autres utilisateurs
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 md:col-span-2">
                <h3 className="text-lg font-medium">Sécurité</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="security.twoFactor"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Double authentification
                          </FormLabel>
                          <FormDescription>
                            Activer la double authentification pour plus de sécurité
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="security.sessionTimeout"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Délai d'expiration de session</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un délai" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="15 minutes">15 minutes</SelectItem>
                              <SelectItem value="30 minutes">30 minutes</SelectItem>
                              <SelectItem value="1 hour">1 heure</SelectItem>
                              <SelectItem value="4 hours">4 heures</SelectItem>
                              <SelectItem value="8 hours">8 heures</SelectItem>
                              <SelectItem value="24 hours">24 heures</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription>
                          Durée avant la déconnexion automatique
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit">Enregistrer les modifications</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
