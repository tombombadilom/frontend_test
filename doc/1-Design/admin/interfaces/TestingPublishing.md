# Testing & Publishing

[← Back to Admin Interface](../README.md) | [View Documentation Map](../../../DocNavigation.md)

## Overview

The Testing & Publishing section of the administration interface allows store administrators to manage version control for store configurations, test changes in sandbox environments, and deploy updates to production.

## Version Management

```
+-------------------------------------------------------+
|  STORE ADMIN > VERSIONS                               |
+-------------------------------------------------------+
|                                                       |
|  CURRENT LIVE VERSION: v2.4.1                         |
|                                                       |
|  ENVIRONMENTS:                                        |
|  [Production ▼] [Staging] [Development] [Sandbox]     |
|                                                       |
+-------------------------------------------------------+
|                                                       |
|  VERSION HISTORY:                                     |
|                                                       |
|  +---+--------+----------+-------------+----------+   |
|  | # | Version| Date     | Author      | Status   |   |
|  +---+--------+----------+-------------+----------+   |
|  | 1 | v2.4.1 | 04/01/23 | John Smith  | Live     |   |
|  | 2 | v2.4.0 | 03/15/23 | Sarah Jones | Archived |   |
|  | 3 | v2.3.2 | 03/01/23 | Tom Brown   | Archived |   |
|  | 4 | v2.3.1 | 02/15/23 | Kim Lee     | Archived |   |
|  | 5 | v2.3.0 | 02/01/23 | John Smith  | Archived |   |
|  +---+--------+----------+-------------+----------+   |
|                                                       |
|  PENDING VERSIONS:                                    |
|                                                       |
|  +---+--------+----------+-------------+----------+   |
|  | # | Version| Date     | Author      | Status   |   |
|  +---+--------+----------+-------------+----------+   |
|  | 1 | v2.5.0 | Scheduled| Sarah Jones | Draft    |   |
|  |   |        | 04/15/23 |             |          |   |
|  | 2 | v2.6.0 | Scheduled| Tom Brown   | Draft    |   |
|  |   |        | 05/01/23 |             |          |   |
|  +---+--------+----------+-------------+----------+   |
|                                                       |
|  [Create New Version] [Compare Versions]              |
|                                                       |
+-------------------------------------------------------+
```

## Deployment Workflow

```
+-------------------------------------------------------+
|  STORE ADMIN > DEPLOYMENT > v2.5.0                    |
+-------------------------------------------------------+
|                                                       |
|  VERSION: v2.5.0 (Spring Update)                      |
|  AUTHOR: Sarah Jones                                  |
|  SCHEDULED: April 15, 2023 10:00 AM UTC               |
|                                                       |
|  DEPLOYMENT WORKFLOW:                                 |
|                                                       |
|  +-------------------------------------------------+  |
|  | [✓] 1. DEVELOPMENT                              |  |
|  |    [✓] Create Version     (04/01/23)            |  |
|  |    [✓] Configure Layout   (04/02/23)            |  |
|  |    [✓] Add New Products   (04/03/23)            |  |
|  |    [✓] Set Up Promotions  (04/04/23)            |  |
|  +-------------------------------------------------+  |
|                                                       |
|  +-------------------------------------------------+  |
|  | [✓] 2. INTERNAL REVIEW                          |  |
|  |    [✓] QA Testing        (04/05/23)            |  |
|  |    [✓] Content Review    (04/06/23)            |  |
|  |    [✓] Performance Check (04/07/23)            |  |
|  +-------------------------------------------------+  |
|                                                       |
|  +-------------------------------------------------+  |
|  | [✓] 3. STAGING DEPLOYMENT                       |  |
|  |    [✓] Deploy to Staging (04/08/23)            |  |
|  |    [✓] Staging Tests     (04/09/23)            |  |
|  |    [✓] Stakeholder Review(04/10/23)            |  |
|  +-------------------------------------------------+  |
|                                                       |
|  +-------------------------------------------------+  |
|  | [ ] 4. PRODUCTION DEPLOYMENT                    |  |
|  |    [ ] Final Approval    (Pending)              |  |
|  |    [ ] Schedule Deployment(Pending)             |  |
|  |    [ ] Deploy to Production(Scheduled 04/15/23) |  |
|  |    [ ] Post-Deploy Verification(Scheduled)      |  |
|  +-------------------------------------------------+  |
|                                                       |
|  [CANCEL DEPLOYMENT] [MODIFY SCHEDULE] [APPROVE]      |
|                                                       |
+-------------------------------------------------------+
```

## Version Deployment Flow

1. Administrator creates a new store version
2. Configures layout, products, and promotions for the version
3. Submits version for internal review
4. QA team tests the version and provides feedback
5. Administrator makes necessary adjustments
6. Deploys version to staging environment
7. Stakeholders review the staging version
8. Administrator schedules production deployment
9. System deploys to production at scheduled time
10. Administrator verifies successful deployment 