import { toast } from 'sonner';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Game } from '@/types/game';

interface WishlistStore {
  items: Game[];
  addItem: (item: Game) => void;
  removeItem: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const { isInWishlist } = get();

        if (isInWishlist(item.id)) {
          toast.error('Ce produit est déjà dans vos favoris');
          return;
        }

        set((state) => ({
          items: [...state.items, item],
        }));

        toast.success(`${item.title} ajouté aux favoris`);
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));

        toast.success('Produit retiré des favoris');
      },

      isInWishlist: (id) => {
        return get().items.some((item) => item.id === id);
      },

      clearWishlist: () => {
        set({ items: [] });
        toast.success('Liste de favoris vidée');
      },
    }),
    {
      name: 'game-shop-wishlist',
    }
  )
);
