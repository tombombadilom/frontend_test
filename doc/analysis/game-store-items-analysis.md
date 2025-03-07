# Game Store Items Analysis

[← Back to Documentation](../README.md) | [View Documentation Map](../DocNavigation.md)

## Navigation

- [📋 Main README](../README.md) - Overview of the entire documentation
- [📝 Project Analysis](../Analysis.md) - Analysis of the project requirements
- [🎨 Design Brief](../DesignBrief.md) - Design and ergonomics guidelines
- [📋 Analysis Overview](2-Analysis/README.md) - Overview of the analysis process
- [🖼️ Wireframes](1-Design/Wireframes.md) - Wireframes for the three display modes
- [📱 Functional Specifications](3-Specifications/FunctionalSpecifications.md) - Detailed functional requirements
- [💻 Technical Specifications](3-Specifications/TechnicalSpecifications.md) - Technical implementation details
- [📋 Original Instructions](0-Instructions/INSTRUCTIONS_Frontend.md) - Original test instructions
- [✅ Implementation Plan](4-Todo/README.md) - Tasks and timeline for implementation
- [🧭 Documentation Navigation](DocNavigation.md) - Complete documentation map

## Overview
This document analyzes the item categories, structures, and patterns across three major game stores:
- Fortnite Item Shop
- Genshin Impact Shop
- World of Warcraft Shop

## Item Categories Analysis

### Fortnite Item Shop Categories

1. **Cosmetic Items**
   - Character Skins (101)
   - Emotes (102)
   - Gliders (105)
   - Pickaxes (106)
   - Back Blings (107)
   - Wraps (108)
   - Loading Screens (109)
   - Music Packs (110)

2. **Bundles**
   - Character Bundles (201)
   - Event Bundles (202)
   - Battle Pass Bundles (203)
   - Starter Packs (204)
   - Crew Packs (205)

3. **Time-Limited Items**
   - Daily Items (301)
   - Featured Items (302)
   - Seasonal Items (303)
   - Event-Specific Items (304)

### Genshin Impact Shop Categories

1. **Character-Related**
   - Character Wishes (401)
   - Character Skins (402)
   - Character Bundles (403)
   - Constellations (404)

2. **Gameplay Items**
   - Weapons (501)
   - Materials (502)
   - Consumables (503)
   - Enhancement Items (504)
   - Artifacts (505)

3. **Premium Items**
   - Genesis Crystals (601)
   - Blessing of the Welkin Moon (602)
   - Battle Pass (603)
   - Special Bundles (604)

4. **Time-Limited Items**
   - Limited Character Banners (701)
   - Weapon Banners (702)
   - Event Items (703)
   - Seasonal Items (704)

### World of Warcraft Shop Categories

1. **Services**
   - Character Transfers (801)
   - Faction Changes (802)
   - Name Changes (803)
   - Race Changes (804)
   - Server Transfers (805)

2. **Cosmetic Items**
   - Mounts (901)
   - Pets (902)
   - Toys (903)
   - Transmog Sets (904)
   - Character Customization (905)

3. **Gameplay Items**
   - Level Boosts (1001)
   - Character Slots (1002)
   - Game Time (1003)
   - Token Services (1004)

4. **Bundles**
   - Starter Packs (1101)
   - Expansion Bundles (1102)
   - Service Bundles (1103)
   - Collection Bundles (1104)

## Pack/Bundle Structures

### Fortnite
1. **Character Bundles**
   - Main skin
   - Matching back bling
   - Matching pickaxe
   - Matching glider
   - Price: 2000-2800 V-Bucks
   - Savings: 20-30%

2. **Event Bundles**
   - Multiple themed items
   - Exclusive emotes
   - Special effects
   - Price: 1500-2500 V-Bucks
   - Savings: 15-25%

3. **Battle Pass Bundles**
   - Battle Pass
   - 25 tier levels
   - Exclusive skin
   - Price: 2800 V-Bucks
   - Savings: 25%

### Genshin Impact
1. **Character Bundles**
   - Character
   - Signature weapon
   - Materials
   - Price: Varies by rarity
   - Savings: 10-20%

2. **Premium Bundles**
   - Genesis Crystals
   - Bonus crystals
   - Special items
   - Price: Various tiers
   - Savings: 10-30%

3. **Event Bundles**
   - Limited items
   - Materials
   - Currency
   - Price: Event-specific
   - Savings: 15-25%

### World of Warcraft
1. **Service Bundles**
   - Multiple services
   - Discounted price
   - Time-limited availability
   - Savings: 20-30%

2. **Expansion Bundles**
   - Base expansion
   - Level boost
   - Mount
   - Price: Various tiers
   - Savings: 15-25%

3. **Starter Packs**
   - Game time
   - Mount
   - Pet
   - Price: Fixed tiers
   - Savings: 10-15%

## Time-Limited Items Analysis

### Fortnite
- Daily rotation (24 hours)
- Weekly featured items
- Seasonal items (3 months)
- Event items (limited duration)
- Battle Pass items (season duration)
- Crew Pack items (monthly)

### Genshin Impact
- Character banners (3 weeks)
- Weapon banners (3 weeks)
- Event items (2-3 weeks)
- Monthly shop reset
- Battle Pass items (6 weeks)
- Limited-time bundles (1-2 weeks)

### World of Warcraft
- Limited-time mounts
- Seasonal items
- Event-specific items
- Service promotions
- Bundle availability
- Special offers (weekly)

## Item Grouping Patterns

### Common Patterns
1. **Thematic Grouping**
   - Items related to specific events or seasons
   - Character sets with matching items
   - Expansion-themed bundles

2. **Value-Based Grouping**
   - Starter packs for new players
   - Premium bundles with bonus items
   - Service bundles with discounts

3. **Time-Based Grouping**
   - Daily/Weekly featured items
   - Seasonal collections
   - Event-specific bundles

### Game-Specific Patterns
1. **Fortnite**
   - Battle Pass progression sets
   - Character skin sets
   - Event-themed collections

2. **Genshin Impact**
   - Character + Weapon combinations
   - Element-themed sets
   - Region-specific bundles

3. **World of Warcraft**
   - Class-specific bundles
   - Expansion-themed collections
   - Service combination packs

## Data Model Recommendations

### Item Interface
```typescript
interface GameItem {
  id: number;
  name: string;
  description: string;
  category: number;
  rarity: ItemRarity;
  price: {
    amount: number;
    currency: CurrencyType;
  };
  availability: {
    startDate?: Date;
    endDate?: Date;
    isLimited: boolean;
  };
  preview: {
    imageUrl: string;
    videoUrl?: string;
    modelUrl?: string;
  };
  gameId: string;
  tags: string[];
  metadata: Record<string, unknown>;
}
```

### Pack Interface
```typescript
interface GamePack {
  id: number;
  name: string;
  description: string;
  items: number[] | GameItem[];
  price: {
    amount: number;
    currency: CurrencyType;
    discount?: number;
  };
  availability: {
    startDate?: Date;
    endDate?: Date;
    isLimited: boolean;
  };
  type: PackType;
  gameId: string;
  tags: string[];
  metadata: Record<string, unknown>;
}
```

### Category Interface
```typescript
interface ItemCategory {
  id: number;
  name: string;
  description: string;
  parentCategory?: number;
  gameId: string;
  icon?: string;
  order: number;
  isActive: boolean;
}
```

## Implementation Guidelines

1. **Data Structure**
   - Use TypeScript interfaces for type safety
   - Implement proper validation
   - Support multiple currencies
   - Handle time-limited items
   - Use numeric IDs for better performance

2. **Filtering System**
   - Category-based filtering
   - Price range filtering
   - Availability filtering
   - Tag-based filtering
   - Search functionality
   - Game-specific filtering

3. **Sorting Options**
   - Price (ascending/descending)
   - Rarity
   - Release date
   - Popularity
   - Discount percentage
   - Time remaining

4. **Grouping Features**
   - Thematic collections
   - Value-based bundles
   - Time-based promotions
   - Game-specific sets
   - Cross-category combinations

## Next Steps

1. Create mock data files:
   - `src/data/items.json`
   - `src/data/packs.json`
   - `src/data/categories.json`

2. Implement TypeScript interfaces
3. Create filtering and sorting utilities
4. Develop preview components
5. Implement time management system 