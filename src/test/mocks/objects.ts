export const mockObjects = {
  items: [
    {
      id: 1001,
      name: 'Midas Rex',
      description: 'A legendary skin',
      category: 103,
      rarity: 'legendary',
      price: {
        amount: 2000,
        currency: 'V-Bucks'
      },
      availability: {
        startDate: '2024-01-01T00:00:00Z',
        endDate: '2024-12-31T23:59:59Z',
        isLimited: false
      },
      preview: {
        imageUrl: '/images/items/midas-rex.jpg'
      },
      gameId: 9,
      tags: ['legendary', 'skin'],
      metadata: {
        type: 'item',
        isFeatured: true,
        isNewRelease: false
      }
    },
    {
      id: 1002,
      name: 'Battle Pass',
      description: 'Season 5 Battle Pass',
      category: 104,
      rarity: 'epic',
      price: {
        amount: 950,
        currency: 'V-Bucks'
      },
      availability: {
        startDate: '2024-01-01T00:00:00Z',
        endDate: '2024-03-31T23:59:59Z',
        isLimited: true
      },
      preview: {
        imageUrl: '/images/items/battle-pass.jpg'
      },
      gameId: 9,
      tags: ['battle-pass', 'season-5'],
      metadata: {
        type: 'battle-pass',
        isFeatured: true,
        isNewRelease: true
      }
    }
  ]
}; 