import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export interface ActivityUser {
  name: string;
  avatar: string;
}

export interface ActivityItem {
  id: string;
  user: ActivityUser;
  action: string;
  target: string;
  timestamp: string;
  status: 'success' | 'default' | 'destructive';
}

interface ActivityFeedProps {
  className?: string;
  data?: ActivityItem[];
}

export function ActivityFeed({
  className,
  data: initialData,
}: ActivityFeedProps) {
  const [data, setActivityData] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement
    const timer = setTimeout(() => {
      // Si des données initiales sont fournies, les utiliser
      if (initialData && initialData.length > 0) {
        setActivityData(initialData);
      } else {
        // Sinon, charger depuis le fichier JSON
        import('../../data/activity-data.json')
          .then((importedData) => {
            const typedData = importedData.default as ActivityItem[];
            setActivityData(typedData);
          })
          .catch((error) => {
            console.error(
              "Erreur lors du chargement des données d'activité:",
              error
            );
          });
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [initialData]);

  // Formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Activité récente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={`skeleton-${Date.now()}-${i}`} className="flex items-center gap-4 py-3">
                <div className="h-10 w-10 rounded-full bg-muted"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Activité récente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.id} className="flex items-center gap-4 py-3">
              <Avatar>
                <AvatarImage src={item.user.avatar} alt={item.user.name} />
                <AvatarFallback>
                  {item.user.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1 flex-1">
                <p className="text-sm font-medium leading-none">
                  <span className="font-semibold">{item.user.name}</span>{' '}
                  <span className="text-muted-foreground">{item.action}</span>{' '}
                  <span
                    className={cn(
                      item.status === 'success' && 'text-emerald-500',
                      item.status === 'destructive' && 'text-rose-500'
                    )}
                  >
                    {item.target}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(item.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default ActivityFeed;
