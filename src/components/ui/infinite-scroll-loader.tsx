import { Loader2, ChevronDown } from 'lucide-react';

interface InfiniteScrollLoaderProps {
  loading: boolean;
  hasMore: boolean;
  itemsCount: number;
  itemName: string;
}

export function InfiniteScrollLoader({
  loading,
  hasMore,
  itemsCount,
  itemName
}: InfiniteScrollLoaderProps) {
  return (
    <div className="sticky bottom-0 flex h-20 items-center justify-center bg-gradient-to-t from-background to-transparent z-50">
      {loading && (
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      )}
      {!loading && hasMore && (
        <ChevronDown className="h-6 w-6 animate-bounce text-muted-foreground" />
      )}
      {!hasMore && itemsCount > 0 && (
        <p className="text-sm text-muted-foreground">
          Vous avez vu tous les {itemName}
        </p>
      )}
    </div>
  );
} 