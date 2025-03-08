import { Skeleton } from '@/components/ui/skeleton';

export function FilterSkeleton() {
  return (
    <div className="space-y-6">
      {/* Prix Section */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Catégories Section */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-24" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </div>
      </div>

      {/* Plateformes Section */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-28" />
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>

      {/* Bouton Reset */}
      <Skeleton className="h-10 w-full" />
    </div>
  );
} 