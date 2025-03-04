# Product Management

[← Back to Admin Interface](../README.md) | [View Documentation Map](../../../DocNavigation.md)

## Overview

The Product Management section of the administration interface allows store administrators and content managers to create, edit, organize, and manage all products available in the game store.

## Product Creation and Editing

The product editor provides a comprehensive interface for managing all aspects of store products:

```
+-------------------------------------------------------+
|  STORE ADMIN > PRODUCTS > NEW PRODUCT                 |
+-------------------------------------------------------+
|                                                       |
|  BASIC INFORMATION                                    |
|  +-------------------------------------------------+  |
|  | Product Name: [________________________]        |  |
|  | Product ID:   [____________] [Generate] [Check] |  |
|  | Description:  [________________________]        |  |
|  |               [________________________]        |  |
|  | Category:     [Select Category ▼]               |  |
|  | Subcategory:  [Select Subcategory ▼]            |  |
|  +-------------------------------------------------+  |
|                                                       |
|  PRICING                                              |
|  +-------------------------------------------------+  |
|  | Base Price:   [______] [Currency Type ▼]        |  |
|  | Discount:     [______] % or [______] flat       |  |
|  | Final Price:  1000 (calculated automatically)   |  |
|  | Sale Period:  [Start Date] to [End Date]        |  |
|  +-------------------------------------------------+  |
|                                                       |
|  MEDIA                                                |
|  +-------------------------------------------------+  |
|  | Main Image:   [Select File] or [Drag & Drop]    |  |
|  | Gallery:      [Manage Gallery]                  |  |
|  | Preview Video:[URL____________]                 |  |
|  +-------------------------------------------------+  |
|                                                       |
|  AVAILABILITY                                         |
|  +-------------------------------------------------+  |
|  | Status:       [Active ▼]                        |  |
|  | Visibility:   [Public ▼]                        |  |
|  | Available:    [Start Date] to [End Date]        |  |
|  | Platforms:    [✓] PC [✓] Console [✓] Mobile    |  |
|  | Regions:      [✓] All or [Select Regions]       |  |
|  +-------------------------------------------------+  |
|                                                       |
|  ADVANCED                                             |
|  +-------------------------------------------------+  |
|  | Tags:         [_________] [+ Add]               |  |
|  | Rarity:       [Select Rarity ▼]                 |  |
|  | Purchase Limit:[_____] per [User ▼]             |  |
|  | Related Items: [Select Items]                   |  |
|  +-------------------------------------------------+  |
|                                                       |
|  [SAVE DRAFT]    [PREVIEW]    [PUBLISH]              |
|                                                       |
+-------------------------------------------------------+
```

## Product Bulk Management

The bulk management interface allows for efficient handling of multiple products:

```
+-------------------------------------------------------+
|  STORE ADMIN > PRODUCTS > BULK OPERATIONS             |
+-------------------------------------------------------+
|                                                       |
|  [Import CSV] [Export CSV] [Bulk Edit] [Bulk Delete]  |
|                                                       |
|  FILTERS:                                             |
|  [Category ▼] [Status ▼] [Date Range] [Search...]     |
|                                                       |
+-------------------------------------------------------+
|                                                       |
|  [✓] Select All                                       |
|                                                       |
|  +---+----------+-------------+--------+----------+   |
|  | ✓ | ID       | Name        | Price  | Status   |   |
|  +---+----------+-------------+--------+----------+   |
|  | ✓ | ITEM-001 | Product 1   | $9.99  | Active   |   |
|  | ✓ | ITEM-002 | Product 2   | $19.99 | Active   |   |
|  |   | ITEM-003 | Product 3   | $4.99  | Draft    |   |
|  | ✓ | ITEM-004 | Product 4   | $14.99 | Active   |   |
|  |   | ITEM-005 | Product 5   | $24.99 | Scheduled|   |
|  +---+----------+-------------+--------+----------+   |
|                                                       |
|  WITH SELECTED:                                       |
|  [Set Category ▼] [Set Status ▼] [Set Price] [Delete] |
|                                                       |
+-------------------------------------------------------+
```

## Product Creation Flow

1. Administrator logs into the admin interface
2. Navigates to Products > New Product
3. Fills in product details (name, description, price, etc.)
4. Uploads product images
5. Sets availability parameters
6. Saves product as draft
7. Previews product in store context
8. Makes any necessary adjustments
9. Publishes product or schedules it for future publication
10. Receives confirmation of successful publication 