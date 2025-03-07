import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, ArrowUp, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';


interface KPIGridProps {
  data: Array<{
    id: string;
    title: string;
    value: string;
    change: number;
    icon: LucideIcon;
  }>;
  isLoading?: boolean;
  className?: string;
}

const STYLES = {
  grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4',
  card: 'relative overflow-hidden',
  header: 'flex items-center justify-between space-y-0 pb-2',
  title: 'text-sm font-medium text-muted-foreground',
  value: 'text-2xl font-bold',
  change: 'text-xs font-medium',
  icon: 'h-4 w-4 text-muted-foreground',
} as const;

function KPIGrid({ data, isLoading = false, className }: KPIGridProps) {
  if (isLoading) {
    return (
      <div role="grid" className={cn(STYLES.grid, className)}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={`skeleton-${i}-${Date.now()}`} className={STYLES.card} role="gridcell">
            <CardHeader className={STYLES.header}>
              <CardTitle className={STYLES.title}>Loading...</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div role="grid" className={cn(STYLES.grid, className)}>
      {data.map((item) => {
        const Icon = item.icon;
        const isPositive = item.change > 0;
        const TrendIcon = isPositive ? ArrowUp : ArrowDown;
        const trendColor = isPositive ? 'text-green-500' : 'text-red-500';

        return (
          <Card key={item.id} className={STYLES.card} role="gridcell">
            <CardHeader className={STYLES.header}>
              <CardTitle className={STYLES.title}>{item.title}</CardTitle>
              <Icon className={cn(STYLES.icon, trendColor)} role="img" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className={STYLES.value}>{item.value}</div>
              <div className={cn(STYLES.change, trendColor)}>
                <TrendIcon className="inline-block h-4 w-4" role="img" aria-hidden="true" />
                {isPositive ? '+' : ''}{item.change}%
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default KPIGrid;
