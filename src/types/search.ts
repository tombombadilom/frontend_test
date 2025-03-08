export type SearchResultType = 'game' | 'pack' | 'object';

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  image?: string;
  price: number;
  subtitle?: string;
} 