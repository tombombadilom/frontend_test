import type { WishlistItem } from '@/store/wishlist-store';
import { mockGames } from './games';

export const mockWishlistItems: WishlistItem[] = mockGames.slice(0, 2).map((game) => ({
  id: `wishlist-${game.id}`,
  gameId: game.id.toString(),
  addedAt: new Date().toISOString(),
  game,
})); 