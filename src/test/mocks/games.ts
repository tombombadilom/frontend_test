export const mockGames = [
  {
    id: 1,
    title: 'Featured Game',
    description: 'A featured game',
    price: {
      amount: 59.99,
      currency: 'USD',
      discount: 0
    },
    releaseDate: '2023-01-01',
    developer: 'Test Developer',
    publisher: 'Test Publisher',
    genres: ['Action'],
    platforms: ['PC'],
    coverImage: 'https://via.placeholder.com/300x400',
    screenshots: [],
    rating: 4.5,
    isFeatured: true,
    isNewRelease: false,
    gameId: 1
  },
  {
    id: 2,
    title: 'New Release Game',
    description: 'A new release game',
    price: {
      amount: 69.99,
      currency: 'USD',
      discount: 0
    },
    releaseDate: '2023-05-01',
    developer: 'Test Developer',
    publisher: 'Test Publisher',
    genres: ['RPG'],
    platforms: ['PS5'],
    coverImage: 'https://via.placeholder.com/300x400',
    screenshots: [],
    rating: 4.8,
    isFeatured: false,
    isNewRelease: true,
    gameId: 2
  },
  {
    id: 3,
    title: 'Regular Game',
    description: 'A regular game',
    price: {
      amount: 49.99,
      currency: 'USD',
      discount: 10
    },
    releaseDate: '2022-01-01',
    developer: 'Test Developer',
    publisher: 'Test Publisher',
    genres: ['Strategy'],
    platforms: ['PC', 'XSX'],
    coverImage: 'https://via.placeholder.com/300x400',
    screenshots: [],
    rating: 4.0,
    isFeatured: false,
    isNewRelease: false,
    gameId: 3
  }
]; 