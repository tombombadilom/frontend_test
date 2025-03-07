import React from 'react';
import type { AreaChartData } from '@/types/charts';

interface AreaChartProps {
  data: AreaChartData[];
}

export function AreaChart({ data }: AreaChartProps) {
  // Trouver la valeur maximale pour calculer les hauteurs relatives
  const maxValue = Math.max(...data.map((item) => item.total));

  // Générer les points pour la ligne supérieure
  const linePoints = data
    .map((item, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - (item.total / maxValue) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  // Générer les points pour l'aire (ajouter les points en bas)
  const areaPoints = `${linePoints} 100,100 0,100`;

  return (
    <div className="w-full h-full relative">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-labelledby="area-chart-title"
      >
        <title id="area-chart-title">Area Chart</title>
        {/* Aire du graphique */}
        <polygon
          points={areaPoints}
          fill="hsl(var(--primary) / 0.2)"
          stroke="none"
        />

        {/* Ligne du graphique */}
        <polyline
          points={linePoints}
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
                r="1.5"
                fill="hsl(var(--primary))"
                className="transition-all duration-200 group-hover:r-2"
              />

              {/* Tooltip */}
              <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <rect
                  x={x - 15}
                  y={y - 25}
                  width="30"
                  height="20"
                  rx="4"
                  fill="hsl(var(--card))"
                  stroke="hsl(var(--border))"
                  strokeWidth="0.5"
                />
                <text
                  x={x}
                  y={y - 12}
                  textAnchor="middle"
                  fontSize="8"
                  fill="hsl(var(--foreground))"
                >
                  {item.total}
                </text>
              </g>
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
