import React from 'react';
import type { ChartData } from '@/types/charts';

interface PieChartProps {
  data: ChartData[];
}

export function PieChart({ data }: PieChartProps) {
  const total = data.reduce((sum, item) => sum + (item.value || 0), 0);
  const colors = [
    'hsl(var(--primary))',
    'hsl(var(--primary) / 0.8)',
    'hsl(var(--primary) / 0.6)',
    'hsl(var(--primary) / 0.4)',
    'hsl(var(--primary) / 0.3)',
    'hsl(var(--primary) / 0.2)',
  ];

  // Calculer les segments du camembert
  let cumulativePercent = 0;
  const segments = data.map((item, index) => {
    const percent = (item.value / total) * 100;
    const startPercent = cumulativePercent;
    cumulativePercent += percent;

    return {
      ...item,
      percent,
      startPercent,
      endPercent: cumulativePercent,
      color: colors[index % colors.length],
    };
  });

  // Fonction pour calculer les coordonnées d'un point sur le cercle
  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <svg 
        className="w-64 h-64" 
        viewBox="-1 -1 2 2"
        role="img"
        aria-label="Pie chart showing data distribution"
      >
        <title>Pie chart showing data distribution</title>
        {segments.map((segment, index) => {
          const [startX, startY] = getCoordinatesForPercent(
            segment.startPercent / 100
          );
          const [endX, endY] = getCoordinatesForPercent(
            (segment.startPercent + segment.percent) / 100
          );
          const largeArcFlag = segment.percent > 50 ? 1 : 0;
          const pathData = [
            `M ${startX} ${startY}`,
            `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
            'L 0 0',
          ].join(' ');

          return (
            <path
              key={`segment-${Date.now()}-${index}`}
              d={pathData}
              fill={segment.color}
              stroke="white"
              strokeWidth="0.01"
              className="hover:opacity-90 transition-opacity cursor-pointer"
            />
          );
        })}
      </svg>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {segments.map((segment, index) => (
          <div key={`legend-${Date.now()}-${index}`} className="flex items-center text-sm">
            <div
              className="w-3 h-3 mr-2 rounded-sm"
              style={{ backgroundColor: segment.color }}
            />
            <span className="text-xs">
              {segment.name} ({segment.percent.toFixed(1)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
