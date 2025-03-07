import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SortOption =
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'
  | 'name-desc'
  | 'rating-desc'
  | 'newest';

export interface FilterState {
  search: string;
  categories: string[];
  platforms: string[];
  priceRange: [number, number];
  sortBy: SortOption;
  onlyDiscounted: boolean;
  onlyNewReleases: boolean;

  // Actions
  setSearch: (search: string) => void;
  toggleCategory: (category: string) => void;
  togglePlatform: (platform: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortBy: (sortBy: SortOption) => void;
  toggleDiscounted: () => void;
  toggleNewReleases: () => void;
  resetFilters: () => void;
}

const DEFAULT_PRICE_RANGE: [number, number] = [0, 100];

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      search: '',
      categories: [],
      platforms: [],
      priceRange: DEFAULT_PRICE_RANGE,
      sortBy: 'newest',
      onlyDiscounted: false,
      onlyNewReleases: false,

      setSearch: (search) => set({ search }),

      toggleCategory: (category) =>
        set((state) => ({
          categories: state.categories.includes(category)
            ? state.categories.filter((c) => c !== category)
            : [...state.categories, category],
        })),

      togglePlatform: (platform) =>
        set((state) => ({
          platforms: state.platforms.includes(platform)
            ? state.platforms.filter((p) => p !== platform)
            : [...state.platforms, platform],
        })),

      setPriceRange: (range) => set({ priceRange: range }),

      setSortBy: (sortBy) => set({ sortBy }),

      toggleDiscounted: () =>
        set((state) => ({ onlyDiscounted: !state.onlyDiscounted })),

      toggleNewReleases: () =>
        set((state) => ({ onlyNewReleases: !state.onlyNewReleases })),

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
      name: 'game-shop-filters',
    }
  )
);
