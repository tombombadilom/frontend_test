import type { Price } from '@/types/game';
import type { Pack } from '@/types/pack';
import type { GameItem } from '@/types/item';

export interface FilterOption {
  id: string;
  name: string;
  count: number;
}

type CatalogItemType = GameItem | Pack;

export function prepareFilterOptions(items: CatalogItemType[]) {
  const categories = new Map<string, number>();
  let maxPrice = 0;
  let discountedCount = 0;
  let newReleasesCount = 0;

  for (const item of items) {
    // Categories
    if ('category' in item) {
      const categoryId = Math.floor(item.category / 100).toString();
      categories.set(
        categoryId,
        (categories.get(categoryId) || 0) + 1
      );
    }

    // Price
    if (item.price.amount > maxPrice) {
      maxPrice = item.price.amount;
    }

    // Discounted
    if (item.price.discount && item.price.discount > 0) {
      discountedCount++;
    }

    // New releases
    if ('isNewRelease' in item && item.isNewRelease) {
      newReleasesCount++;
    }
  }

  return {
    categories,
    maxPrice: { amount: maxPrice },
    discountedCount,
    newReleasesCount,
  };
}

export function prepareTagOptions(items: CatalogItemType[]) {
  const tags = new Map<string, number>();

  for (const item of items) {
    if (item.tags) {
      for (const tag of item.tags) {
        tags.set(tag, (tags.get(tag) || 0) + 1);
      }
    }
  }

  return Array.from(tags.entries()).map(([id, count]) => ({
    id,
    name: id, // Les tags existants sont déjà des strings
    count,
  }));
} 