import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, ArrowUp, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';


interface KPIGridProps {
  data: Array<{
    id: string;
    title: string;
    value: string;
    change: number;
    icon: LucideIcon;
    iconClassName?: string;
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
  content: 'p-4',
} as const;

function KPIGrid({ data, isLoading = false, className }: KPIGridProps) {
  if (isLoading) {
    return (
      <table className={cn(STYLES.grid, className)}>
        <tbody>
          <tr>
            {Array.from({ length: 4 }).map((_, i) => (
              <td key={`skeleton-${i}-${Date.now()}`} className={STYLES.card}>
                <CardHeader className={STYLES.header}>
                  <CardTitle className={STYLES.title}>Loading...</CardTitle>
                </CardHeader>
                <CardContent className={STYLES.content}>
                  <Skeleton className="h-4 w-20" />
                </CardContent>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <table className={cn(STYLES.grid, className)}>
      <tbody>
        <tr>
          {data.map((item) => {
            const Icon = item.icon;
            const isPositive = item.change > 0;
            const changeColor = isPositive ? 'text-green-500' : 'text-red-500';

            return (
              <td key={item.id} className={STYLES.card}>
                <CardHeader className={STYLES.header}>
                  <CardTitle className={STYLES.title}>{item.title}</CardTitle>
                  {Icon && (
                    <Icon className={cn(STYLES.icon, item.iconClassName)} />
                  )}
                </CardHeader>
                <CardContent className={STYLES.content}>
                  <div className={STYLES.value}>{item.value}</div>
                  <div className={cn(STYLES.change, changeColor)}>
                    {isPositive && '+'}
                    {item.change}%
                  </div>
                </CardContent>
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
}

export default KPIGrid;
