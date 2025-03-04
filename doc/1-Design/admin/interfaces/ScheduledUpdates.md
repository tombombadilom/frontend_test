# Scheduled Updates & Promotions

[← Back to Admin Interface](../README.md) | [View Documentation Map](../../../DocNavigation.md)

## Overview

The Scheduled Updates & Promotions section of the administration interface allows store administrators and content managers to plan and schedule content updates, create time-based promotions, and manage seasonal or event-based content.

## Calendar View

The calendar view provides a visual interface for scheduling and managing store updates:

```
+-------------------------------------------------------+
|  STORE ADMIN > SCHEDULE > CALENDAR                    |
+-------------------------------------------------------+
|                                                       |
|  [Month ▼] [Week] [List]    [Today] [< Prev] [Next >] |
|                                                       |
|  APRIL 2023                                           |
|  +---+---+---+---+---+---+---+                        |
|  |Mon|Tue|Wed|Thu|Fri|Sat|Sun|                        |
|  +---+---+---+---+---+---+---+                        |
|  |   |   |   |   |   | 1 | 2 |                        |
|  |   |   |   |   |   |   |   |                        |
|  +---+---+---+---+---+---+---+                        |
|  | 3 | 4 | 5 | 6 | 7 | 8 | 9 |                        |
|  |[A]|   |[B]|   |[C]|   |   |                        |
|  +---+---+---+---+---+---+---+                        |
|  | 10| 11| 12| 13| 14| 15| 16|                        |
|  |   |[D]|   |   |[E]|   |   |                        |
|  +---+---+---+---+---+---+---+                        |
|  | 17| 18| 19| 20| 21| 22| 23|                        |
|  |[F]|   |   |[G]|   |   |   |                        |
|  +---+---+---+---+---+---+---+                        |
|  | 24| 25| 26| 27| 28| 29| 30|                        |
|  |   |[H]|   |   |[I]|   |   |                        |
|  +---+---+---+---+---+---+---+                        |
|                                                       |
|  LEGEND:                                              |
|  [A] Daily Rotation   [B] New Items                   |
|  [C] Weekend Sale     [D] Special Event               |
|  [E] Layout Change    [F] Seasonal Theme              |
|  [G] Flash Sale       [H] Maintenance                 |
|  [I] Major Update                                     |
|                                                       |
|  [+ New Event]                                        |
|                                                       |
+-------------------------------------------------------+
```

## Promotion Editor

The promotion editor allows for creating and configuring various types of promotions:

```
+-------------------------------------------------------+
|  STORE ADMIN > SCHEDULE > NEW PROMOTION               |
+-------------------------------------------------------+
|                                                       |
|  BASIC INFORMATION                                    |
|  +-------------------------------------------------+  |
|  | Promotion Name: [Spring Sale]                   |  |
|  | Description:    [Celebrate spring with...]      |  |
|  | Type:           [Discount ▼]                    |  |
|  | Priority:       [High ▼]                        |  |
|  +-------------------------------------------------+  |
|                                                       |
|  TIMING                                               |
|  +-------------------------------------------------+  |
|  | Start Date:     [04/15/2023] [10:00 AM]         |  |
|  | End Date:       [04/22/2023] [11:59 PM]         |  |
|  | Time Zone:      [UTC ▼]                         |  |
|  | Recurrence:     [None ▼]                        |  |
|  +-------------------------------------------------+  |
|                                                       |
|  DISCOUNT SETTINGS                                    |
|  +-------------------------------------------------+  |
|  | Discount Type:  [Percentage ▼]                  |  |
|  | Discount Value: [25] %                          |  |
|  | Min Purchase:   [0]                             |  |
|  | Max Discount:   [No limit]                      |  |
|  +-------------------------------------------------+  |
|                                                       |
|  APPLICABLE ITEMS                                     |
|  +-------------------------------------------------+  |
|  | Apply To:       [Selected Categories ▼]         |  |
|  |                                                 |  |
|  | CATEGORIES:                                     |  |
|  | [✓] Weapons                                     |  |
|  |    [✓] Swords                                   |  |
|  |    [✓] Bows                                     |  |
|  |    [  ] Staves                                  |  |
|  | [  ] Armor                                      |  |
|  | [✓] Consumables                                 |  |
|  |                                                 |  |
|  | EXCLUSIONS:                                     |  |
|  | [+ Add Items to Exclude]                        |  |
|  +-------------------------------------------------+  |
|                                                       |
|  DISPLAY                                              |
|  +-------------------------------------------------+  |
|  | Banner:        [Select Image]                   |  |
|  | Label:         [SPRING SALE]                    |  |
|  | Label Color:   [#FF5500]                        |  |
|  | Show Timer:    [✓]                              |  |
|  | Featured:      [✓] On homepage                  |  |
|  +-------------------------------------------------+  |
|                                                       |
|  [CANCEL]    [SAVE DRAFT]    [SCHEDULE]              |
|                                                       |
+-------------------------------------------------------+
```

## Promotion Creation Flow

1. Administrator navigates to Schedule > New Promotion
2. Enters promotion details (name, description, type)
3. Sets promotion timing (start date, end date, recurrence)
4. Configures discount parameters
5. Selects applicable products or categories
6. Sets up promotional display elements
7. Previews promotion in store context
8. Makes any necessary adjustments
9. Schedules promotion for future activation
10. Receives confirmation of successful scheduling 