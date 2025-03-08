'use client';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchToolbar from '../header/search-toolbar';
import type { Game } from '@/types/game';
import type { Pack } from '@/types/pack';
import type { GameItem } from '@/types/item';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';

interface SearchResult {
  id: string;
  type: 'game' | 'pack' | 'object';
  title: string;
  image?: string;
  price: number;
  subtitle?: string;
}

export default function CustomSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim()) {
      // Simuler la recherche dans les différents types
      // À remplacer par de vraies requêtes API
      const searchResults: SearchResult[] = [
        // Simuler des résultats de jeux
        {
          id: '1',
          type: 'game',
          title: 'The Legend of Zelda',
          image: '/games/zelda.jpg',
          price: 59.99,
          subtitle: 'Action-Adventure'
        },
        // Simuler des résultats de packs
        {
          id: '2',
          type: 'pack',
          title: 'Starter Pack',
          image: '/packs/starter.jpg',
          price: 29.99,
          subtitle: 'Pack débutant'
        },
        // Simuler des résultats d'objets
        {
          id: '3',
          type: 'object',
          title: 'Épée légendaire',
          image: '/objects/sword.jpg',
          price: 9.99,
          subtitle: 'Rare'
        },
      ].filter(result => 
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.subtitle?.toLowerCase().includes(query.toLowerCase())
      );

      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    switch (result.type) {
      case 'game':
        navigate(`/games/${result.id}`);
        break;
      case 'pack':
        navigate(`/packs/${result.id}`);
        break;
      case 'object':
        navigate(`/objects/${result.id}`);
        break;
    }
    setQuery('');
  };

  const renderResultIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'game':
        return '🎮';
      case 'pack':
        return '📦';
      case 'object':
        return '🎁';
    }
  };

  return (
    <div className="relative">
      <SearchToolbar />
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
                        {renderResultIcon(result.type)}
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