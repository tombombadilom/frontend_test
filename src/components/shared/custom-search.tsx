'use client';

import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '@/hooks/use-debounce';
import SearchToolbar from '../header/search-toolbar';
import type { SearchResult } from '@/types/search';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

const mockResults: SearchResult[] = [
  {
    id: '1',
    type: 'game',
    title: 'The Legend of Zelda',
    image: '/games/zelda.jpg',
    price: 59.99,
    subtitle: 'Action-Adventure'
  },
  {
    id: '2',
    type: 'pack',
    title: 'Starter Pack',
    image: '/packs/starter.jpg',
    price: 29.99,
    subtitle: 'Pack débutant'
  },
  {
    id: '3',
    type: 'object',
    title: 'Épée légendaire',
    image: '/objects/sword.jpg',
    price: 9.99,
    subtitle: 'Rare'
  },
];

const resultIcons = {
  game: '🎮',
  pack: '📦',
  object: '🎁'
} as const;

export default function CustomSearch() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const debouncedQuery = useDebounce(query, 300);

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    
    return mockResults.filter(result => 
      result.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      result.subtitle?.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  }, [debouncedQuery]);

  const handleSelect = useCallback((result: SearchResult) => {
    setQuery('');
    navigate(`/${result.type}s/${result.id}`);
  }, [navigate]);

  return (
    <div className="relative">
      <SearchToolbar onQueryChange={setQuery} query={query} />
      {results.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 rounded-md border bg-popover shadow-md">
          <Command>
            <CommandList>
              <CommandGroup heading="Résultats">
                {results.map((result) => (
                  <CommandItem
                    key={`${result.type}-${result.id}`}
                    value={result.title}
                    onSelect={() => handleSelect(result)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-muted">
                        {resultIcons[result.type]}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{result.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {result.subtitle}
                        </span>
                      </div>
                      <span className="ml-auto text-xs text-muted-foreground">
                        {result.type}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
} 