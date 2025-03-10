# Administration Interface

## Overview

The administration interface allows administrators to manage the store content. It is accessible via the `/admin` path and requires administrative privileges.

## Features

### Categories Management
- Display categories in a sortable list
- Create, modify, and delete categories
- Reorganize categories through drag-and-drop

### Games Management
- List of games with filters and search
- Create and modify games
- Manage game metadata

### Objects Management
- Object catalog with advanced filters
- Create and modify objects
- Manage prices and availability

### Packs Management
- Configure promotional packs
- Manage pack prices and contents
- Schedule availability

## Components

### AdminSidebar
- Main navigation for the administration interface
- Quick access to different sections
- Visual indication of active section

### AdminHeader
- Header with administrator information
- Quick actions and notifications
- Global search

### SortableCategories
- Category management interface
- Drag-and-drop support for reorganization
- Contextual actions (edit, delete)

## Security

- Authentication required
- Administrative rights verification
- Action logging

## State Management

The administration interface uses a combination of:
- React Context for global interface state
- Zustand for data management 