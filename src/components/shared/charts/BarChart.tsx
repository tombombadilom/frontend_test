import React from 'react';

interface BarChartData {
  name: string;
  total: number;
}

interface BarChartProps {
  data: BarChartData[];
}

export function BarChart({ data }: BarChartProps) {
  // Trouver la valeur maximale pour calculer les hauteurs relatives
  const maxValue = Math.max(...data.map((item) => item.total));

  return (
    <div className="w-full h-full flex items-end justify-between">
      {data.map((item) => {
        const height = `${(item.total / maxValue) * 100}%`;

        return (
          <div key={item.name} className="flex flex-col items-center group">
            <div className="relative">
              <div
                className="w-8 bg-primary rounded-t hover:bg-primary/80 transition-all"
                style={{ height }}
              />
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {item.total.toLocaleString()}
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              {item.name}
            </div>
          </div>
        );
      })}
    </div>
  );
}
