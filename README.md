# Game Store Configuration Interface

## Project Overview

This project implements a flexible and powerful solution for configuring in-game store interfaces, based on best practices identified from existing interfaces like Fortnite, Genshin Impact, and World of Warcraft.

## Key Features

- **Three Display Modes**:
  - Carousel View for featured items
  - Grid View for efficient browsing
  - Infinite Scroll for exploration

- **Modern Tech Stack**:
  - React 19 with Vite 6.2
  - React Router DOM 7.2
  - TypeScript
  - Tailwind CSS 4
  - Shadcn UI
  - Zustand for state management
  - Biome for linting and formatting
  - Vitest for unit testing

- **User Experience**:
  - Skeleton loading for improved perceived performance
  - Responsive design for all devices
  - Accessibility compliance

## Project Structure

```
src/
├── assets/          # Static assets (images, icons)
├── components/      # Reusable components
│   ├── ui/          # Basic UI components
│   ├── layout/      # Layout components
│   ├── display-modes/  # Display mode components
│   ├── shop/        # Shop-specific components
│   └── cart/        # Cart-related components
├── context/         # React Context providers
├── data/            # Mock JSON data
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── pages/           # Page components
├── routes/          # Route definitions
├── store/           # Zustand store definitions
├── styles/          # Global styles and Tailwind config
├── types/           # TypeScript type definitions
├── tests/           # Test utilities and setup
├── App.tsx          # Main application component
└── main.tsx         # Application entry point
```

## Getting Started

1. Clone the repository
2. Install dependencies with `pnpm install`
3. Start the development server with `pnpm dev`
4. Run tests with `pnpm test`
5. Check code quality with `pnpm lint` and `pnpm format`

## Documentation

For detailed documentation about the project, please refer to the [Documentation](doc/README.md).
