'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { type SortOption, useFilterStore } from '@/store/filter-store';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Les plus récents' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'name-asc', label: 'Nom (A-Z)' },
  { value: 'name-desc', label: 'Nom (Z-A)' },
  { value: 'rating-desc', label: 'Meilleures notes' },
];

export function SortSelector() {
  const { sortBy, setSortBy } = useFilterStore();

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Trier par:</span>
      <Select
        value={sortBy}
        onValueChange={(value) => setSortBy(value as SortOption)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Trier par" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
