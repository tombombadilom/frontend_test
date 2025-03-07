import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';
import { AreaChart, BarChart, LineChart, PieChart } from '../shared/charts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import type { ChartDataType } from '@/types/charts';

interface DashboardChartsProps {
  className?: string;
  data?: ChartDataType;
}

export function DashboardCharts({
  className,
  data: initialData,
}: DashboardChartsProps) {
  const [data, setChartData] = useState<ChartDataType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement
    const timer = setTimeout(() => {
      // Si des données initiales sont fournies, les utiliser
      if (initialData) {
        setChartData(initialData);
      } else {
        // Sinon, charger depuis le fichier JSON
        import('../../data/chart-data.json')
          .then((importedData) => {
            const typedData = importedData.default as ChartDataType;
            setChartData(typedData);
          })
          .catch((error) => {
            console.error(
              'Erreur lors du chargement des données de graphiques:',
              error
            );
          });
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [initialData]);

  if (isLoading || !data) {
    return (
      <Card className={cn('col-span-full', className)}>
        <CardHeader>
          <CardTitle>Graphiques</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center gap-4">
              <div className="h-4 bg-muted rounded w-48"></div>
              <div className="h-[300px] bg-muted rounded w-full"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('col-span-full', className)}>
      <CardHeader>
        <CardTitle>Graphiques</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bar">
          <TabsList className="mb-4">
            <TabsTrigger value="bar">Barres</TabsTrigger>
            <TabsTrigger value="line">Ligne</TabsTrigger>
            <TabsTrigger value="area">Aire</TabsTrigger>
            <TabsTrigger value="pie">Camembert</TabsTrigger>
          </TabsList>
          <TabsContent value="bar" className="h-[350px]">
            <h3 className="text-lg font-medium mb-2">{data.barChart.title}</h3>
            <BarChart data={data.barChart.data} />
          </TabsContent>
          <TabsContent value="line" className="h-[350px]">
            <h3 className="text-lg font-medium mb-2">{data.lineChart.title}</h3>
            <LineChart data={data.lineChart.data} />
          </TabsContent>
          <TabsContent value="area" className="h-[350px]">
            <h3 className="text-lg font-medium mb-2">{data.areaChart.title}</h3>
            <AreaChart data={data.areaChart.data} />
          </TabsContent>
          <TabsContent value="pie" className="h-[350px]">
            <h3 className="text-lg font-medium mb-2">{data.pieChart.title}</h3>
            <PieChart data={data.pieChart.data} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export default DashboardCharts;
