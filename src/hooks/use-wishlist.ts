import { useWishlistStore } from '@/store/wishlist-store';
import type { Game } from '@/types/game';

export function useWishlist() {
  const wishlistStore = useWishlistStore();

  const addGameToWishlist = (game: Game) => {
    wishlistStore.addItem(game);
  };

  return {
    ...wishlistStore,
    addGameToWishlist,
  };
}
