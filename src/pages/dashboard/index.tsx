import type React from 'react';
import { useEffect, useState } from 'react';
import { ActivityFeed } from '../../components/dashboard/ActivityFeed';
import { AlertsList } from '../../components/dashboard/AlertsList';
import { DashboardCharts } from '../../components/dashboard/DashboardCharts';
import { KPIGrid } from '../../components/dashboard/KPIGrid';
import type { KPIItem } from '@/components/dashboard/KPIGrid';
import type { ActivityItem } from '@/components/dashboard/ActivityFeed';
import type { AlertItem } from '@/components/dashboard/AlertsList';
import type { ChartDataType } from '@/components/dashboard/DashboardCharts';

interface DashboardData {
  kpiData: KPIItem[];
  activityData: ActivityItem[];
  alertsData: AlertItem[];
  chartData: ChartDataType;
}

const DashboardPage: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement des données
    Promise.all([
      import('../../data/kpi-data.json'),
      import('../../data/activity-data.json'),
      import('../../data/alerts-data.json'),
      import('../../data/chart-data.json'),
    ])
      .then(([kpiData, activityData, alertsData, chartData]) => {
        setData({
          kpiData: kpiData.default,
          activityData: activityData.default,
          alertsData: alertsData.default,
          chartData: chartData.default,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors du chargement des données:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading || !data) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="animate-pulse">
          <div className="h-40 bg-muted rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="h-80 bg-muted rounded"></div>
            <div className="h-80 bg-muted rounded"></div>
          </div>
          <div className="h-96 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <KPIGrid data={data.kpiData} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActivityFeed data={data.activityData} />
        <AlertsList data={data.alertsData} />
      </div>
      <DashboardCharts data={data.chartData} />
    </div>
  );
};

export default DashboardPage;
