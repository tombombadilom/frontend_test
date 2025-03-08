import type { Game, GameItem } from './game';
import type { Pack } from './pack';

export type WishlistItem = Game | Pack | GameItem;

export interface WishlistState {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clear: () => void;
} 