'use client';

import { DisplayModeSwitcher } from '@/components/catalog/display-mode-switcher';
import { FilterSidebar } from '@/components/catalog/filter-sidebar';
import { ProductDisplay } from '@/components/catalog/product-display';
import { SortSelector } from '@/components/catalog/sort-selector';
import { RecentlyViewed } from '@/components/games/recently-viewed';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';
import { useFilters } from '@/hooks/use-filters';
import { useGames } from '@/hooks/use-games';
import { useFilterStore } from '@/store/filter-store';
import { Search } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export default function CatalogPage() {
  const { games, isLoading } = useGames();
  const { setSearch } = useFilterStore();
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 300);
  const { filters: _filters, filteredGames } = useFilters(games);

  // Extraire toutes les catégories et plateformes uniques
  const allCategories = Array.from(
    new Set(games.flatMap((game) => game.genres))
  ).sort();

  const allPlatforms = Array.from(
    new Set(games.flatMap((game) => game.platforms))
  ).sort();

  // Trouver le prix maximum
  const maxPrice = Math.max(...games.map((game) => game.price), 100);

  // Mettre à jour la recherche lorsque l'entrée change
  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  return (
    <div className="container mx-auto px-4 py-8 text-foreground">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-3xl font-bold"
      >
        Catalogue
      </motion.h1>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher un jeu..."
            className="pl-10"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onBlur={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-6">
        <RecentlyViewed />
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        <FilterSidebar
          categories={allCategories}
          platforms={allPlatforms}
          maxPrice={maxPrice}
        />

        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredGames.length}{' '}
              {filteredGames.length === 1 ? 'résultat' : 'résultats'}
            </p>
            <div className="flex items-center gap-4">
              <SortSelector />
              <DisplayModeSwitcher />
            </div>
          </div>

          <ProductDisplay games={filteredGames} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
