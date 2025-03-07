import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface AlertItem {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  timestamp: string;
}

interface AlertsListProps {
  className?: string;
  data?: AlertItem[];
}

export function AlertsList({ className, data: initialData }: AlertsListProps) {
  const [data, setAlertsData] = useState<AlertItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement
    const timer = setTimeout(() => {
      // Si des données initiales sont fournies, les utiliser
      if (initialData && initialData.length > 0) {
        setAlertsData(initialData);
      } else {
        // Sinon, charger depuis le fichier JSON
        import('../../data/alerts-data.json')
          .then((importedData) => {
            const typedData = importedData.default as AlertItem[];
            setAlertsData(typedData);
          })
          .catch((error) => {
            console.error('Erreur lors du chargement des alertes:', error);
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

  // Obtenir la couleur de badge en fonction de la sévérité
  const getSeverityColor = (severity: AlertItem['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-destructive text-destructive-foreground hover:bg-destructive/80';
      case 'high':
        return 'bg-amber-500 text-white hover:bg-amber-600';
      case 'medium':
        return 'bg-yellow-500 text-white hover:bg-yellow-600';
      case 'low':
        return 'bg-emerald-500 text-white hover:bg-emerald-600';
      default:
        return '';
    }
  };

  const skeletons = [
    { key: 'skeleton-1' },
    { key: 'skeleton-2' },
    { key: 'skeleton-3' },
    { key: 'skeleton-4' },
    { key: 'skeleton-5' },
  ];

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Alertes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skeletons.map((skeleton) => (
              <div
                key={skeleton.key}
                className="flex flex-col gap-2 animate-pulse"
              >
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-muted rounded w-1/3"></div>
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                </div>
                <div className="h-3 bg-muted rounded w-full"></div>
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
        <CardTitle>Alertes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((alert) => (
            <div
              key={alert.id}
              className="border-b border-border pb-3 last:border-0 last:pb-0"
            >
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium">{alert.title}</h4>
                <Badge className={cn(getSeverityColor(alert.severity))}>
                  {alert.severity}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-1">
                {alert.description}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDate(alert.timestamp)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default AlertsList;
