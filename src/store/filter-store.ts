import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Game, Price } from '@/types/game';
import type { MigrateFunction } from '@/types/store';

export type SortOption = 'newest' | 'oldest' | 'price-asc' | 'price-desc';

// Interface de base pour tous les filtres
interface BaseFilterState {
  search: string;
  platforms: string[];
  priceRange: [number, number];
  sortBy: SortOption;
  onlyDiscounted: boolean;
  onlyNewReleases: boolean;
}

interface FilterActions {
  setSearch: (search: string) => void;
  togglePlatform: (platform: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortBy: (sortBy: SortOption) => void;
  toggleDiscounted: () => void;
  toggleNewReleases: () => void;
  resetFilters: () => void;
}

type FilterState = BaseFilterState & FilterActions;

type SetState = <T extends FilterState>(
  partial: T | Partial<T> | ((state: T) => T | Partial<T>),
  replace?: false
) => void;

// Interface pour les filtres de jeux
export interface GameFilterState extends BaseFilterState {
  categories: string[]; // RPG, MOBA, etc.
}

// Interface pour les filtres de packs
export interface PackFilterState extends BaseFilterState {
  games: string[]; // IDs des jeux
  types: string[]; // starter, collector, etc.
}

// Interface pour les filtres d'objets
export interface ObjectFilterState extends BaseFilterState {
  games: string[]; // IDs des jeux
  categories: string[]; // Catégories d'objets
  rarities: string[]; // Communes, Rares, etc.
}

const DEFAULT_PRICE_RANGE: [number, number] = [0, 100];

const createBaseFilterSlice = (set: SetState) => ({
  search: '',
  platforms: [],
  priceRange: DEFAULT_PRICE_RANGE,
  sortBy: 'newest' as SortOption,
  onlyDiscounted: false,
  onlyNewReleases: false,
  setSearch: (search: string) => set({ search }),
  togglePlatform: (platform: string) =>
    set((state) => ({
      platforms: state.platforms.includes(platform)
        ? state.platforms.filter((p: string) => p !== platform)
        : [...state.platforms, platform],
    })),
  setPriceRange: (range: [number, number]) => set({ priceRange: range }),
  setSortBy: (sortBy: SortOption) => set({ sortBy }),
  toggleDiscounted: () =>
    set((state) => ({ onlyDiscounted: !state.onlyDiscounted })),
  toggleNewReleases: () =>
    set((state) => ({ onlyNewReleases: !state.onlyNewReleases })),
  resetFilters: () =>
    set({
      search: '',
      platforms: [],
      priceRange: DEFAULT_PRICE_RANGE,
      sortBy: 'newest',
      onlyDiscounted: false,
      onlyNewReleases: false,
    }),
});

// Store pour les jeux
export const useGameFilterStore = create<GameFilterState & {
  setSearch: (search: string) => void;
  toggleCategory: (category: string) => void;
  togglePlatform: (platform: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortBy: (sortBy: SortOption) => void;
  toggleDiscounted: () => void;
  toggleNewReleases: () => void;
  resetFilters: () => void;
}>()(
  persist(
    (set) => ({
      ...createBaseFilterSlice(set),
      categories: [],
      toggleCategory: (category) =>
        set((state) => ({
          categories: state.categories.includes(category)
            ? state.categories.filter((c) => c !== category)
            : [...state.categories, category],
        })),
      resetFilters: () =>
        set({
          search: '',
          categories: [],
          platforms: [],
          priceRange: DEFAULT_PRICE_RANGE,
          sortBy: 'newest',
          onlyDiscounted: false,
          onlyNewReleases: false,
        }),
    }),
    {
      name: 'game-filter-storage',
      version: 1,
    }
  )
);

// Store pour les packs
export const usePackFilterStore = create<PackFilterState & {
  setSearch: (search: string) => void;
  toggleGame: (gameId: string) => void;
  toggleType: (type: string) => void;
  togglePlatform: (platform: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortBy: (sortBy: SortOption) => void;
  toggleDiscounted: () => void;
  toggleNewReleases: () => void;
  resetFilters: () => void;
}>()(
  persist(
    (set) => ({
      ...createBaseFilterSlice(set),
      games: [],
      types: [],
      toggleGame: (gameId) =>
        set((state) => ({
          games: state.games.includes(gameId)
            ? state.games.filter((g) => g !== gameId)
            : [...state.games, gameId],
        })),
      toggleType: (type) =>
        set((state) => ({
          types: state.types.includes(type)
            ? state.types.filter((t) => t !== type)
            : [...state.types, type],
        })),
      resetFilters: () =>
        set({
          search: '',
          games: [],
          types: [],
          platforms: [],
          priceRange: DEFAULT_PRICE_RANGE,
          sortBy: 'newest',
          onlyDiscounted: false,
          onlyNewReleases: false,
        }),
    }),
    {
      name: 'pack-filter-storage',
      version: 1,
    }
  )
);

// Store pour les objets
export const useObjectFilterStore = create<ObjectFilterState & {
  setSearch: (search: string) => void;
  toggleGame: (gameId: string) => void;
  toggleCategory: (category: string) => void;
  toggleRarity: (rarity: string) => void;
  togglePlatform: (platform: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortBy: (sortBy: SortOption) => void;
  toggleDiscounted: () => void;
  toggleNewReleases: () => void;
  resetFilters: () => void;
}>()(
  persist(
    (set) => ({
      ...createBaseFilterSlice(set),
      games: [],
      categories: [],
      rarities: [],
      toggleGame: (gameId) =>
        set((state) => ({
          games: state.games.includes(gameId)
            ? state.games.filter((g) => g !== gameId)
            : [...state.games, gameId],
        })),
      toggleCategory: (category) =>
        set((state) => ({
          categories: state.categories.includes(category)
            ? state.categories.filter((c) => c !== category)
            : [...state.categories, category],
        })),
      toggleRarity: (rarity) =>
        set((state) => ({
          rarities: state.rarities.includes(rarity)
            ? state.rarities.filter((r) => r !== rarity)
            : [...state.rarities, rarity],
        })),
      resetFilters: () =>
        set({
          search: '',
          games: [],
          categories: [],
          rarities: [],
          platforms: [],
          priceRange: DEFAULT_PRICE_RANGE,
          sortBy: 'newest',
          onlyDiscounted: false,
          onlyNewReleases: false,
        }),
    }),
    {
      name: 'object-filter-storage',
      version: 1,
    }
  )
);
