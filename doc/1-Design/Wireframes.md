# Display Modes & Pages Wireframes

[← Back to Documentation](../README.md)

## Overview

This document presents wireframe concepts for the three display modes required by the technical test:
1. Carousel View
2. Grid View
3. Infinite Scroll View

## 1. Carousel View

```
+--------------------------------------------------+
|                                                  |
|                    ◄   [●○○]   ►                 |
|                                                  |
|            +------------------+                  |
|            |                  |                  |
|            |      Image       |                  |
|            |                  |                  |
|            +------------------+                  |
|                                                  |
|            Title                                 |
|            Description                           |
|            Price                                 |
|            [♡] [Add to Cart]                    |
|                                                  |
+--------------------------------------------------+

Loading State:
+--------------------------------------------------+
|                                                  |
|                    ◄   [○○○]   ►                 |
|                                                  |
|            +------------------+                  |
|            |▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒|                  |
|            |▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒|                  |
|            |▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒|                  |
|            +------------------+                  |
|                                                  |
|            ▒▒▒▒▒▒▒▒▒▒▒▒                        |
|            ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒                  |
|            ▒▒▒▒▒▒▒▒                            |
|            ▒▒ ▒▒                               |
|                                                  |
+--------------------------------------------------+
```

### Key Elements
- **Navigation**: Left/Right arrows for item navigation
- **Pagination**: Dots indicating current position and total items
- **Content**:
  - Image (centered, fixed aspect ratio)
  - Title (below image)
  - Description (below title)
  - Price (below description)
  - Wishlist button (heart icon)
  - Add to Cart button
- **Loading State**: Skeleton placeholders for all elements

## 2. Grid View

```
+--------------------------------------------------------------------------------+
|  +--------+    +--------+    +--------+    +--------+                           |
|  |        |    |        |    |        |    |        |                          |
|  | Image  |    | Image  |    | Image  |    | Image  |                          |
|  |        |    |        |    |        |    |        |                          |
|  +--------+    +--------+    +--------+    +--------+                          |
|  Title        Title        Title        Title                                   |
|  Description  Description  Description  Description                             |
|  Price        Price        Price        Price                                   |
|  [♡][Cart]    [♡][Cart]    [♡][Cart]    [♡][Cart]                             |
|                                                                                 |
|  +--------+    +--------+    +--------+    +--------+                          |
|  |        |    |        |    |        |    |        |                          |
|  | Image  |    | Image  |    | Image  |    | Image  |                          |
|  |        |    |        |    |        |    |        |                          |
|  +--------+    +--------+    +--------+    +--------+                          |
|  Title        Title        Title        Title                                   |
|  Description  Description  Description  Description                             |
|  Price        Price        Price        Price                                   |
|  [♡][Cart]    [♡][Cart]    [♡][Cart]    [♡][Cart]                             |
+--------------------------------------------------------------------------------+

Loading State:
+--------------------------------------------------------------------------------+
|  +--------+    +--------+    +--------+    +--------+                           |
|  |▒▒▒▒▒▒▒▒|    |▒▒▒▒▒▒▒▒|    |▒▒▒▒▒▒▒▒|    |▒▒▒▒▒▒▒▒|                          |
|  |▒▒▒▒▒▒▒▒|    |▒▒▒▒▒▒▒▒|    |▒▒▒▒▒▒▒▒|    |▒▒▒▒▒▒▒▒|                          |
|  |▒▒▒▒▒▒▒▒|    |▒▒▒▒▒▒▒▒|    |▒▒▒▒▒▒▒▒|    |▒▒▒▒▒▒▒▒|                          |
|  +--------+    +--------+    +--------+    +--------+                          |
|  ▒▒▒▒▒▒▒▒     ▒▒▒▒▒▒▒▒     ▒▒▒▒▒▒▒▒     ▒▒▒▒▒▒▒▒                           |
|  ▒▒▒▒▒▒▒▒     ▒▒▒▒▒▒▒▒     ▒▒▒▒▒▒▒▒     ▒▒▒▒▒▒▒▒                           |
|  ▒▒▒▒▒▒       ▒▒▒▒▒▒       ▒▒▒▒▒▒       ▒▒▒▒▒▒                             |
|  ▒▒ ▒▒        ▒▒ ▒▒        ▒▒ ▒▒        ▒▒ ▒▒                              |
+--------------------------------------------------------------------------------+
```

### Key Elements
- **Grid Layout**: 4 columns by default (responsive)
- **Items**:
  - Image (fixed aspect ratio)
  - Title (below image)
  - Description (below title)
  - Price (below description)
  - Wishlist button (heart icon)
  - Add to Cart button
- **Pagination**: Numbered pages with Next button
- **Loading State**: Skeleton grid with placeholders

## 3. Infinite Scroll View

```
+--------------------------------------------------------------------------------+
|  +--------+  Title                                                              |
|  |        |  Description                                                        |
|  | Image  |  Price                                                             |
|  |        |  [♡] [Add to Cart]                                                |
|  +--------+                                                                    |
|                                                                                |
|  +--------+  Title                                                              |
|  |        |  Description                                                        |
|  | Image  |  Price                                                             |
|  |        |  [♡] [Add to Cart]                                                |
|  +--------+                                                                    |
|                                                                                |
|  +--------+  Title                                                              |
|  |        |  Description                                                        |
|  | Image  |  Price                                                             |
|  |        |  [♡] [Add to Cart]                                                |
|  +--------+                                                                    |
|                                                                                |
|  +--------+  Title                                                              |
|  |        |  Description                                                        |
|  | Image  |  Price                                                             |
|  |        |  [♡] [Add to Cart]                                                |
|  +--------+                                                                    |
|                                                                                |
|  [Loading more items...]                                                       |
+--------------------------------------------------------------------------------+

Loading State:
+--------------------------------------------------------------------------------+
|  +--------+  ▒▒▒▒▒▒▒▒▒▒                                                        |
|  |▒▒▒▒▒▒▒▒|  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒                                                |
|  |▒▒▒▒▒▒▒▒|  ▒▒▒▒▒▒                                                          |
|  |▒▒▒▒▒▒▒▒|  ▒▒ ▒▒                                                          |
|  +--------+                                                                    |
|                                                                                |
|  +--------+  ▒▒▒▒▒▒▒▒▒▒                                                        |
|  |▒▒▒▒▒▒▒▒|  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒                                                |
|  |▒▒▒▒▒▒▒▒|  ▒▒▒▒▒▒                                                          |
|  |▒▒▒▒▒▒▒▒|  ▒▒ ▒▒                                                          |
|  +--------+                                                                    |
|                                                                                |
|  +--------+  ▒▒▒▒▒▒▒▒▒▒                                                        |
|  |▒▒▒▒▒▒▒▒|  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒                                                |
|  |▒▒▒▒▒▒▒▒|  ▒▒▒▒▒▒                                                          |
|  |▒▒▒▒▒▒▒▒|  ▒▒ ▒▒                                                          |
|  +--------+                                                                    |
|                                                                                |
|  +--------+  ▒▒▒▒▒▒▒▒▒▒                                                        |
|  |▒▒▒▒▒▒▒▒|  ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒                                                |
|  |▒▒▒▒▒▒▒▒|  ▒▒▒▒▒▒                                                          |
|  |▒▒▒▒▒▒▒▒|  ▒▒ ▒▒                                                          |
|  +--------+                                                                    |
+--------------------------------------------------------------------------------+
```

### Key Elements
- **List Layout**: Items stacked vertically
- **Item Layout**: Image left, content right
- **Content per Item**:
  - Image (fixed size)
  - Title (right of image)
  - Description (below title)
  - Price (below description)
  - Wishlist button (heart icon)
  - Add to Cart button
- **Loading Indicator**: At bottom when fetching more items
- **Loading State**: Skeleton placeholders for visible items



### Objects Page
```
+--------------------------------------------------------------------------------+
|                                                                                 |
|  [Mode Switch: Carousel | Grid | Infinite]                                      |
|                                                                                 |
|  [Selected Display Mode Content]                                               |
|  Shows objects in the selected display mode                                    |
|  (Carousel, Grid, or Infinite Scroll as shown above)                           |
|                                                                                 |
+--------------------------------------------------------------------------------+
```

### Packs Page
```
+--------------------------------------------------------------------------------+
|                                                                                 |
|  [Mode Switch: Carousel | Grid | Infinite]                                      |
|                                                                                 |
|  [Selected Display Mode Content]                                               |
|  Shows packs in the selected display mode                                      |
|  (Carousel, Grid, or Infinite Scroll as shown above)                           |
|                                                                                 |
+--------------------------------------------------------------------------------+
```

### Games Page
```
+--------------------------------------------------------------------------------+
|                                                                                 |
|  [Mode Switch: Carousel | Grid | Infinite]                                      |
|                                                                                 |
|  [Selected Display Mode Content]                                               |
|  Shows games in the selected display mode                                      |
|  (Carousel, Grid, or Infinite Scroll as shown above)                           |
|                                                                                 |
+--------------------------------------------------------------------------------+
```

### Product Detail Pages

Each product (Object, Pack, Game) uses the same detail layout:
```
+--------------------------------------------------------------------------------+
|                                                                                 |
|  [Mode Switch: Carousel | Grid | Infinite]                                      |
|                                                                                 |
|  [Selected Display Mode Content]                                               |
|  Shows the product details in the selected display mode                        |
|  (Carousel, Grid, or Infinite Scroll as shown above)                           |
|                                                                                 |
+--------------------------------------------------------------------------------+
```

## Responsive Behavior

The responsive behavior follows the same patterns defined in the Display Modes section:

### Mobile (< 640px)
- Full width display
- Mode switch as dropdown
- Display mode specific mobile layout

### Tablet (640px - 1024px)
- 80% width centered
- Horizontal mode switch
- Display mode specific tablet layout

### Desktop (> 1024px)
- 60% width centered
- Horizontal mode switch
- Display mode specific desktop layout

## Accessibility Considerations

All wireframes incorporate these accessibility features:

1. **Keyboard Navigation**: All interactive elements accessible via keyboard
2. **Screen Reader Support**: Proper labeling and semantic structure
3. **Touch Targets**: Sufficiently sized for users with motor impairments
4. **Color Contrast**: Meets WCAG AA standards for text readability
5. **Reduced Motion Option**: Alternative to animations for users with vestibular disorders

## Conclusion

Each of these display modes serves different user needs and shopping contexts:

- **Carousel View**: Best for featured items and focused attention
- **Grid View**: Ideal for efficient browsing and comparison
- **Infinite Scroll**: Optimized for exploration and discovery

The implementation will allow users to switch between these views based on their preferences and shopping goals. This flexibility ensures the store interface can adapt to different game contexts, product types, and user behaviors. 