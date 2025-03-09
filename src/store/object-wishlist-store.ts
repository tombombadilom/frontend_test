import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameItem } from '@/types/game';
import type { MigrateFunction } from '@/types/store';

export interface ObjectWishlistItem {
  id: string;
  objectId: string;
  addedAt: string;
  object: GameItem;
}

export interface ObjectWishlistState {
  items: ObjectWishlistItem[];
  addItem: (object: GameItem) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
}

export const useObjectWishlistStore = create<ObjectWishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (object) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.objectId === object.id.toString());
          if (existingItem) return state;

          const newItem: ObjectWishlistItem = {
            id: Math.random().toString(36).substring(7),
            objectId: object.id.toString(),
            addedAt: new Date().toISOString(),
            object,
          };

          return {
            ...state,
            items: [...state.items, newItem],
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          ...state,
          items: state.items.filter((item) => item.id !== id),
        })),

      isInWishlist: (id) => {
        return get().items.some((item) => item.objectId === id);
      },

      clearWishlist: () =>
        set({
          items: [],
        }),
    }),
    {
      name: 'game-shop-object-wishlist',
      version: 1,
      migrate: ((persistedState: unknown, version: number) => {
        if (version === 0) {
          return {
            items: []
          };
        }
        return persistedState as ObjectWishlistState;
      }) as MigrateFunction<ObjectWishlistState>,
    }
  )
); 