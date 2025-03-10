# Game Store Configuration Interface

- [📋 Main README](README.md) - Overview of the entire documentation
- [📝 Project Analysis](doc/Analysis.md) - Analysis of the project requirements
- [🎨 Design Brief](doc/DesignBrief.md) - Design and ergonomics guidelines
- [📋 Analysis Overview](doc/2-Analysis/README.md) - Overview of the analysis process
- [🔍 Methodology](doc/1-Methodology/README.md) - Research and development methodology
- [🖼️ Wireframes](doc/1-Design/Wireframes.md) - Wireframes for the three display modes
- [⚙️ Admin Interface](doc/1-Design/AdminInterface.md) - Conceptual design for the administration interface
- [📱 Functional Specifications](doc/3-Specifications/FunctionalSpecifications.md) - Detailed functional requirements
- [💻 Technical Specifications](doc/3-Specifications/TechnicalSpecifications.md) - Technical implementation details
- [📋 Original Instructions](doc/0-Instructions/INSTRUCTIONS_Frontend.md) - Original test instructions
- [✅ Implementation Plan](doc/4-Todo/README.md) - Tasks and timeline for implementation
- [🧭 Documentation Navigation](doc/DocNavigation.md) - Complete documentation map

## Project Overview

This project implements a flexible and powerful solution for configuring in-game store interfaces, based on best practices identified from existing interfaces like Fortnite, Genshin Impact, and World of Warcraft.

## Key Features

- **Admin Interface**:
  - Complete CRUD operations for games, packs, objects, and categories
  - Advanced filtering and sorting capabilities
  - Real-time search functionality
  - Responsive design for all devices

- **Modern Tech Stack**:
  - Vite
  - React 19
  - TypeScript 5
  - Tailwind CSS 4
  - Shadcn UI
  - Zustand for state management
  - Biome for linting and formatting
  - Vitest for unit testing
  - i18next for internationalization # to be added later

- **User Experience**:
  - Client-side routing with React Router
  - Dark mode support
  - Accessibility compliance (ARIA)
  - Form validation with Zod
  - Motion animations with Framer Motion

## Project Structure

```
src/
├── app/             # App configuration
├── assets/          # Static assets
├── components/      # Reusable components
│   ├── admin/       # Admin interface components
│   ├── auth/        # Authentication components
│   ├── catalog/     # Catalog components
│   ├── dashboard/   # Dashboard components
│   ├── header/      # Header components
│   ├── home/        # Home page components
│   ├── layout/      # Layout components
│   ├── shared/      # Shared components
│   ├── theme/       # Theme components
│   └── ui/          # Shadcn UI components
├── config/          # Configuration files
├── contexts/        # React contexts
├── data/           # Mock JSON data
├── hooks/          # Custom React hooks
├── layouts/        # Layout templates
├── lib/            # Utility functions
├── pages/          # Page components
│   ├── admin/      # Admin dashboard and management
│   │   ├── categories/    # Category management
│   │   ├── games/        # Game management
│   │   ├── objects/      # Object management
│   │   ├── orders/       # Order management
│   │   └── packs/        # Pack management
│   ├── auth/       # Authentication pages
│   ├── cart/       # Shopping cart
│   ├── catalog/    # Game and item catalog
│   ├── dashboard/  # User dashboard
│   ├── home/       # Home page
│   ├── settings/   # User settings
│   ├── user/       # User profile
│   ├── cart.tsx    # Cart page component
│   ├── home.tsx    # Home page component
│   └── wishlist.tsx # Wishlist page component
├── store/          # Zustand store
├── stores/         # Store modules
├── styles/         # Global styles
├── test/           # Test utilities
└── types/          # TypeScript definitions
```

## Page Structure

### Admin Section
- **Categories Management** (`/admin/categories`)
  - List view with sorting and filtering
  - Create/Edit category forms
  - Category details and statistics

- **Games Management** (`/admin/games`)
  - Game list with advanced filters
  - Game creation and editing
  - Game assets management

- **Objects Management** (`/admin/objects`)
  - Object catalog with filters
  - Object creation and editing
  - Object availability settings

- **Orders Management** (`/admin/orders`)
  - Order list and history
  - Order status management
  - Order details and tracking

- **Packs Management** (`/admin/packs`)
  - Pack list and configuration
  - Pack creation and editing
  - Pack scheduling and availability

### User Section
- **Authentication** (`/auth`)
  - Login
  - Registration
  - Password recovery
  - Email verification

- **Shopping** (`/cart`, `/wishlist`)
  - Shopping cart management
  - Wishlist management
  - Checkout process
  - Order confirmation

- **User Experience** (`/dashboard`, `/user`, `/settings`)
  - User dashboard
  - Profile management
  - Account settings
  - Preferences configuration

- **Catalog** (`/catalog`)
  - Game browsing
  - Item browsing
  - Search and filters
  - Item details

- **Home** (`/`)
  - Featured items
  - New releases
  - Special offers
  - Quick access navigation

## Getting Started

1. Clone the repository
2. Install dependencies with `pnpm install`
3. Start the development server with `pnpm dev`
4. Run tests with `pnpm test`
5. Check code quality with `pnpm lint`
6. Format code with `pnpm format`

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run Biome linting
- `pnpm format` - Format code with Biome
- `pnpm test` - Run tests with Vitest

## Environment Variables

```env
VITE_API_URL=http://localhost:3000/api
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.