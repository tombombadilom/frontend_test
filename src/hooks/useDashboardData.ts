'use client';

import { useEffect, useState } from 'react';

interface KPIData {
  title: string;
  value: string;
  change: number;
}

interface ActivityItem {
  id: string;
  type: string;
  description: string;
  timestamp: string;
}

interface Alert {
  id: string;
  severity: 'low' | 'medium' | 'high';
  message: string;
  timestamp: string;
}

interface MetricsData {
  timestamp: string;
  value: number;
}

interface DashboardData {
  kpiData: KPIData[];
  activityData: ActivityItem[];
  alertsData: Alert[];
  metricsData: MetricsData[];
}

export function useDashboardData(): DashboardData {
  const [data, setData] = useState<DashboardData>({
    kpiData: [],
    activityData: [],
    alertsData: [],
    metricsData: [],
  });

  useEffect(() => {
    // Simulating API call
    const fetchData = async () => {
      // In a real application, you would fetch this data from your API
      const mockData: DashboardData = {
        kpiData: [
          { title: 'Total Services', value: '25', change: 5 },
          { title: 'Active Certificates', value: '18', change: -2 },
          { title: 'DNS Records', value: '150', change: 10 },
          { title: 'Uptime', value: '99.9%', change: 0.1 },
        ],
        activityData: [
          {
            id: '1',
            type: 'service',
            description: 'New service added',
            timestamp: '2023-06-01 10:30:00',
          },
          {
            id: '2',
            type: 'cert',
            description: 'Certificate renewed',
            timestamp: '2023-06-01 11:45:00',
          },
        ],
        alertsData: [
          {
            id: '1',
            severity: 'high',
            message: 'Service X is down',
            timestamp: '2023-06-01 09:15:00',
          },
          {
            id: '2',
            severity: 'medium',
            message: 'Certificate expiring soon',
            timestamp: '2023-06-01 12:00:00',
          },
        ],
        metricsData: [
          { timestamp: '2023-06-01', value: 100 },
          { timestamp: '2023-06-02', value: 120 },
          { timestamp: '2023-06-03', value: 110 },
          { timestamp: '2023-06-04', value: 130 },
          { timestamp: '2023-06-05', value: 140 },
        ],
      };

      setData(mockData);
    };

    fetchData();
  }, []);

  return data;
}
