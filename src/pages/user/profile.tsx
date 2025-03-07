import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar: string;
  fullName: string;
  joinDate: string;
  bio: string;
}

const UserProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simuler le chargement des données du profil
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        // Simuler un délai de chargement
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Dans une application réelle, cela ferait une requête API
        // Pour l'instant, on utilise des données mockées
        const mockProfile: UserProfile = {
          id: 'user-1',
          username: 'gamer123',
          email: 'gamer@example.com',
          avatar: 'https://i.pravatar.cc/150?img=32',
          fullName: 'John Doe',
          joinDate: '2023-01-15',
          bio: "Passionné de jeux vidéo depuis toujours. Fan de RPG et de jeux d'aventure.",
        };

        setProfile(mockProfile);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Une erreur est survenue')
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) {
    return <div>Chargement du profil...</div>;
  }

  if (error || !profile) {
    return <div>Erreur: {error?.message || 'Profil non trouvé'}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Mon Profil</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Colonne gauche - Informations de base */}
        <div>
          <Card>
            <CardHeader className="flex flex-col items-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile.avatar} alt={profile.username} />
                <AvatarFallback>
                  {profile.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4">{profile.fullName}</CardTitle>
              <p className="text-sm text-muted-foreground">
                @{profile.username}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{profile.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Membre depuis</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(profile.joinDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Bio</p>
                <p className="text-sm text-muted-foreground">{profile.bio}</p>
              </div>
              <Button className="w-full">Modifier le profil</Button>
            </CardContent>
          </Card>
        </div>

        {/* Colonne droite - Onglets */}
        <div className="md:col-span-2">
          <Tabs defaultValue="activity">
            <TabsList className="mb-4">
              <TabsTrigger value="activity">Activité récente</TabsTrigger>
              <TabsTrigger value="games">Ma collection</TabsTrigger>
              <TabsTrigger value="friends">Amis</TabsTrigger>
            </TabsList>

            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Activité récente</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Aucune activité récente à afficher.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="games">
              <Card>
                <CardHeader>
                  <CardTitle>Ma collection de jeux</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Vous n'avez pas encore de jeux dans votre collection.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="friends">
              <Card>
                <CardHeader>
                  <CardTitle>Mes amis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Vous n'avez pas encore d'amis dans votre liste.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
