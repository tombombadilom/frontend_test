import type { Price } from './game';

interface BaseItem {
  id: string;
  name: string;
  description: string;
  price: Price;
  category?: {
    id: string;
    name: string;
  };
  platforms: Array<{
    id: string;
    name: string;
  }>;
  tags: Array<{
    id: string;
    name: string;
  }>;
}

export interface Game extends BaseItem {
  type: 'game';
  isNewRelease?: boolean;
}

export interface Pack extends BaseItem {
  type: 'pack';
  games: Game[];
}

export interface StoreObject extends BaseItem {
  type: 'object';
  gameId: string;
}

export type CatalogItem = Game | Pack | StoreObject;

export type MigrateFunction<T> = (persistedState: unknown, version: number) => T | Promise<T>; 