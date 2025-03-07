import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Activity,
  ArrowUpRight,
  DollarSign,
  ShoppingBag,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface SalesData {
  name: string;
  value: number;
}

interface KPI {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

const AdminDashboardPage = () => {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simuler le chargement des données du tableau de bord
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Dans une application réelle, cela ferait une requête API
        // Pour l'instant, on utilise des données mockées
        const mockSalesData: SalesData[] = [
          { name: 'Jan', value: 1200 },
          { name: 'Fév', value: 1900 },
          { name: 'Mar', value: 1500 },
          { name: 'Avr', value: 1800 },
          { name: 'Mai', value: 2200 },
          { name: 'Juin', value: 2500 },
          { name: 'Juil', value: 2100 },
          { name: 'Août', value: 2800 },
          { name: 'Sep', value: 3200 },
          { name: 'Oct', value: 2900 },
          { name: 'Nov', value: 3500 },
          { name: 'Déc', value: 4000 },
        ];

        const mockKpis: KPI[] = [
          {
            title: 'Ventes totales',
            value: '27,495 €',
            change: 12.5,
            icon: <DollarSign className="h-5 w-5 text-muted-foreground" />,
          },
          {
            title: 'Nouveaux utilisateurs',
            value: '1,245',
            change: 8.2,
            icon: <Users className="h-5 w-5 text-muted-foreground" />,
          },
          {
            title: 'Produits vendus',
            value: '3,456',
            change: 5.3,
            icon: <ShoppingBag className="h-5 w-5 text-muted-foreground" />,
          },
          {
            title: 'Taux de conversion',
            value: '3.2%',
            change: -1.5,
            icon: <Activity className="h-5 w-5 text-muted-foreground" />,
          },
        ];

        setSalesData(mockSalesData);
        setKpis(mockKpis);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Une erreur est survenue')
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <div>Chargement du tableau de bord...</div>;
  }

  if (error) {
    return <div>Erreur: {error.message}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <Button>Exporter les données</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi) => (
          <Card key={kpi.title}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {kpi.title}
                  </p>
                  <p className="text-2xl font-bold mt-1">{kpi.value}</p>
                </div>
                <div className="p-2 rounded-full bg-muted">{kpi.icon}</div>
              </div>
              <div className="flex items-center mt-4">
                <div
                  className={`flex items-center text-sm ${kpi.change >= 0 ? 'text-green-500' : 'text-red-500'}`}
                >
                  <ArrowUpRight
                    className={`h-4 w-4 mr-1 ${kpi.change < 0 ? 'rotate-180' : ''}`}
                  />
                  <span>{Math.abs(kpi.change)}%</span>
                </div>
                <span className="text-sm text-muted-foreground ml-2">
                  vs mois précédent
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="sales">Ventes</TabsTrigger>
          <TabsTrigger value="products">Produits</TabsTrigger>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
        </TabsList>

        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <CardTitle>Ventes mensuelles</CardTitle>
              <CardDescription>
                Aperçu des ventes pour l'année en cours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={salesData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Produits populaires</CardTitle>
              <CardDescription>
                Les produits les plus vendus ce mois-ci
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Données des produits non disponibles pour le moment.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Activité des utilisateurs</CardTitle>
              <CardDescription>
                Aperçu de l'activité des utilisateurs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Données des utilisateurs non disponibles pour le moment.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboardPage;
