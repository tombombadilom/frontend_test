import React from 'react';
import type { LineChartData } from './types';

interface LineChartProps {
  data: LineChartData[];
}

export function LineChart({ data }: LineChartProps) {
  // Trouver la valeur maximale pour calculer les hauteurs relatives
  const maxValue = Math.max(...data.map((item) => item.total));
  const points = data
    .map((item, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - (item.total / maxValue) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="w-full h-full relative">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-labelledby="line-chart-title"
      >
        <title id="line-chart-title">Line Chart</title>
        {/* Ligne du graphique */}
        <polyline
          points={points}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />

        {/* Points sur la ligne */}
        {data.map((item, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = 100 - (item.total / maxValue) * 100;

          return (
            <g key={`point-${item.name}`} className="group">
              <circle
                cx={x}
                cy={y}
                r="2"
                fill="hsl(var(--primary))"
                className="hover:r-3 transition-all"
              />
              <text
                x={x}
                y={y - 10}
                textAnchor="middle"
                fontSize="8"
                fill="currentColor"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                {item.total.toLocaleString()}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Étiquettes en bas */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between">
        {data.map((item) => (
          <div
            key={`label-${item.name}`}
            className="text-xs text-muted-foreground"
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
