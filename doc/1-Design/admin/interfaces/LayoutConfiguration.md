# Store Layout Configuration

[← Back to Admin Interface](../README.md) | [View Documentation Map](../../../DocNavigation.md)

## Overview

The Layout Configuration section of the administration interface allows store administrators and content managers to design and customize the visual layout of the in-game store. This includes creating and managing sections, configuring display modes, and arranging products for optimal presentation.

## Layout Editor

The layout editor provides a visual interface for configuring the store's appearance and organization:

```
+-------------------------------------------------------+
|  STORE ADMIN > LAYOUT > EDITOR                        |
+-------------------------------------------------------+
|                                                       |
|  LAYOUT: [Default ▼] [+ New Layout] [Duplicate]       |
|                                                       |
|  SECTIONS:                                            |
|  [+ Add Section]                                      |
|                                                       |
|  +-------------------------------------------------+  |
|  | FEATURED CAROUSEL (drag to reorder)             |  |
|  | [Edit] [Delete] [↑] [↓]                        |  |
|  +-------------------------------------------------+  |
|                                                       |
|  +-------------------------------------------------+  |
|  | DAILY DEALS (drag to reorder)                   |  |
|  | [Edit] [Delete] [↑] [↓]                        |  |
|  +-------------------------------------------------+  |
|                                                       |
|  +-------------------------------------------------+  |
|  | CATEGORY GRID: WEAPONS (drag to reorder)        |  |
|  | [Edit] [Delete] [↑] [↓]                        |  |
|  +-------------------------------------------------+  |
|                                                       |
|  PREVIEW:                                             |
|  +-------------------------------------------------+  |
|  |                                                 |  |
|  |  [Desktop ▼] [Refresh] [Full Preview]          |  |
|  |                                                 |  |
|  |  +---------------------------------------+      |  |
|  |  |                                       |      |  |
|  |  |        Interactive Preview            |      |  |
|  |  |                                       |      |  |
|  |  +---------------------------------------+      |  |
|  |                                                 |  |
|  +-------------------------------------------------+  |
|                                                       |
|  [SAVE DRAFT]    [SCHEDULE]    [PUBLISH]             |
|                                                       |
+-------------------------------------------------------+
```

## Section Editor

The section editor allows for detailed configuration of individual store sections:

```
+-------------------------------------------------------+
|  STORE ADMIN > LAYOUT > SECTION EDITOR                |
+-------------------------------------------------------+
|                                                       |
|  SECTION TYPE: [Carousel ▼]                           |
|                                                       |
|  BASIC SETTINGS                                       |
|  +-------------------------------------------------+  |
|  | Title:       [Featured Items]                   |  |
|  | Description: [Check out our featured items]     |  |
|  | Display Mode:[Carousel ▼]                       |  |
|  | Items Per Row:[4] (desktop) [2] (mobile)        |  |
|  | Background:  [Select Color] or [Select Image]   |  |
|  +-------------------------------------------------+  |
|                                                       |
|  CONTENT                                              |
|  +-------------------------------------------------+  |
|  | Content Type:[Manual Selection ▼]               |  |
|  |                                                 |  |
|  | SELECTED ITEMS:                                 |  |
|  | [+ Add Items]                                   |  |
|  |                                                 |  |
|  | +--------+  +--------+  +--------+             |  |
|  | |        |  |        |  |        |             |  |
|  | | ITEM 1 |  | ITEM 2 |  | ITEM 3 |  [+ Add]    |  |
|  | |  [×]   |  |  [×]   |  |  [×]   |             |  |
|  | +--------+  +--------+  +--------+             |  |
|  |                                                 |  |
|  | [Reorder Items]                                 |  |
|  +-------------------------------------------------+  |
|                                                       |
|  DISPLAY SETTINGS                                     |
|  +-------------------------------------------------+  |
|  | Animation:   [Fade ▼]                           |  |
|  | Auto-rotate: [✓] Every [5] seconds              |  |
|  | Show Arrows: [✓]                                |  |
|  | Show Dots:   [✓]                                |  |
|  | Card Style:  [Standard ▼]                       |  |
|  +-------------------------------------------------+  |
|                                                       |
|  [CANCEL]    [SAVE]                                   |
|                                                       |
+-------------------------------------------------------+
```

## Store Layout Configuration Flow

1. Administrator navigates to Layout > Editor
2. Selects existing layout or creates a new one
3. Adds sections to the layout (carousel, grid, etc.)
4. Configures each section (title, display mode, etc.)
5. Adds products to each section
6. Arranges sections by dragging and reordering
7. Previews layout in different device contexts
8. Makes adjustments based on preview
9. Saves layout as draft or publishes immediately
10. Optionally schedules layout for future activation 