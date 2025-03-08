export interface WithId {
  id: string | number;
}

export type WithOptionalId = Partial<WithId>;

export interface DisplayItem extends WithId {
  [key: string]: unknown;
} 