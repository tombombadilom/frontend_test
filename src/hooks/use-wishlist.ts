import { useWishlistStore } from '@/store/wishlist-store';
import type { Game } from '@/types/game';

export function useWishlist() {
  const wishlistStore = useWishlistStore();

  const addGameToWishlist = (game: Game) => {
    wishlistStore.addItem({
      id: game.id,
      name: game.title,
      price: game.price * (1 - game.discount / 100),
      image: game.coverImage,
    });
  };

  return {
    ...wishlistStore,
    addGameToWishlist,
  };
}
