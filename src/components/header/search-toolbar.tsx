'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchToolbarProps {
  query: string;
  onQueryChange: (value: string) => void;
}

export default function SearchToolbar({ query, onQueryChange }: SearchToolbarProps) {
  return (
    <div className="flex items-center gap-2 w-full max-w-sm">
      <Search className="h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Rechercher..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        className="h-9 w-full bg-background"
      />
    </div>
  );
} 