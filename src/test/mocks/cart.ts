import type { CartItem } from '@/store/cart-store';

export const mockCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Super Game 1',
    price: {
      amount: 59.99,
      currency: 'EUR',
      discount: 20,
    },
    image: '/images/games/game1.jpg',
    quantity: 1,
  },
  {
    id: '2',
    name: 'Super Game 2',
    price: {
      amount: 49.99,
      currency: 'EUR',
      discount: 0,
    },
    image: '/images/games/game2.jpg',
    quantity: 2,
  },
]; 