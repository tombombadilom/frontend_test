import { toast } from 'sonner';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Game } from '@/types/game';
import type { GameItem } from '@/types/item';
import type { Pack } from '@/types/pack';
import type { MigrateFunction } from '@/types/store';

interface WishlistState {
  games: Game[];
  objects: GameItem[];
  packs: Pack[];
  addItem: (item: Game | GameItem | Pack, type: 'game' | 'object' | 'pack') => void;
  removeFromWishlist: (id: string, type: 'game' | 'object' | 'pack') => void;
  isInWishlist: (id: string, type: 'game' | 'object' | 'pack') => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      games: [],
      objects: [],
      packs: [],
      addItem: (item, type) => {
        console.log('Adding item to wishlist:', { item, type });
        set((state) => {
          const itemId = item.id.toString();
          switch (type) {
            case 'game':
              if (!state.games.some(g => g.id.toString() === itemId)) {
                console.log('Adding game to wishlist:', item);
                return { ...state, games: [...state.games, item as Game] };
              }
              break;
            case 'object':
              if (!state.objects.some(o => o.id.toString() === itemId)) {
                console.log('Adding object to wishlist:', item);
                return { ...state, objects: [...state.objects, item as GameItem] };
              }
              break;
            case 'pack':
              if (!state.packs.some(p => p.id.toString() === itemId)) {
                console.log('Adding pack to wishlist:', item);
                return { ...state, packs: [...state.packs, item as Pack] };
              }
              break;
          }
          console.log('Item already in wishlist');
          return state;
        });
      },
      removeFromWishlist: (id, type) => {
        console.log('Removing item from wishlist:', { id, type });
        set((state) => {
          switch (type) {
            case 'game':
              return { ...state, games: state.games.filter(g => g.id.toString() !== id) };
            case 'object':
              return { ...state, objects: state.objects.filter(o => o.id.toString() !== id) };
            case 'pack':
              return { ...state, packs: state.packs.filter(p => p.id.toString() !== id) };
            default:
              return state;
          }
        });
      },
      isInWishlist: (id, type) => {
        const state = get();
        const result = (() => {
          switch (type) {
            case 'game':
              return state.games.some(g => g.id.toString() === id);
            case 'object':
              return state.objects.some(o => o.id.toString() === id);
            case 'pack':
              return state.packs.some(p => p.id.toString() === id);
            default:
              return false;
          }
        })();
        console.log('Checking if item is in wishlist:', { id, type, result });
        return result;
      },
      clearWishlist: () => set({ games: [], objects: [], packs: [] }),
    }),
    {
      name: 'wishlist-storage',
      version: 2,
      migrate: ((persistedState: unknown, version: number) => {
        if (version === 0 || version === 1) {
          return {
            games: [],
            objects: [],
            packs: [],
          };
        }
        return persistedState as WishlistState;
      }) as MigrateFunction<WishlistState>,
    }
  )
);
