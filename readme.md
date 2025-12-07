# Pokedex Lite - Pokemon Explorer

A beautiful, responsive web application for exploring Pokemon using the PokeAPI.

## Overview

This is a full-stack JavaScript application built with React, TypeScript, and Express. It allows users to browse, search, filter, and favorite Pokemon from the original 151 Pokemon collection.

## Features

- **Pokemon Grid Display**: Beautiful cards with type-based gradient backgrounds
- **Real-time Search**: Filter Pokemon by name or ID as you type
- **Type Filtering**: Multi-select filter by Pokemon types (Fire, Water, Grass, etc.)
- **Pagination**: Navigate through Pokemon with elegant page controls
- **Favorites**: Mark favorites with heart icons, persisted in localStorage
- **Detail Modal**: View stats, abilities, height, weight, and official artwork
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Responsive Design**: Works on mobile, tablet, and desktop

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling with custom Pokemon type colors
- **Shadcn/UI** for accessible components
- **TanStack Query** for data fetching
- **Wouter** for routing
- **Lucide React** for icons

### Backend
- **Express.js** for serving the application
- **Vite** for development and building

### Data Source
- **PokeAPI** (https://pokeapi.co/api/v2/) for all Pokemon data

## Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── ui/           # Shadcn UI components
│   │   ├── Header.tsx    # App header with search and theme toggle
│   │   ├── SearchBar.tsx # Glass-morphism search input
│   │   ├── TypeFilter.tsx # Pokemon type filter pills
│   │   ├── TypeBadge.tsx # Colored type badges
│   │   ├── PokemonCard.tsx # Pokemon display card
│   │   ├── PokemonModal.tsx # Detail view modal
│   │   ├── StatBar.tsx   # Stats visualization
│   │   ├── Pagination.tsx # Page navigation
│   │   ├── FavoriteButton.tsx # Heart toggle
│   │   ├── LoadingSpinner.tsx # Pokeball loader
│   │   └── EmptyState.tsx # Empty/error states
│   ├── hooks/
│   │   ├── use-favorites.ts # Favorites localStorage hook
│   │   └── use-theme.ts  # Theme management hook
│   ├── lib/
│   │   ├── pokeapi.ts    # PokeAPI service functions
│   │   └── pokemon-types.ts # Type definitions and colors
│   ├── pages/
│   │   └── Pokedex.tsx   # Main application page
│   └── App.tsx           # Root component with routing
server/
├── index.ts              # Express server entry
├── routes.ts             # API routes
└── vite.ts               # Vite dev server integration
```

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:5000 in your browser

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Design Decisions

### Why localStorage for Favorites?
As per the assignment requirements, favorites are persisted client-side using localStorage. This provides a simple, zero-configuration solution that works immediately without authentication.

### Why Load All 151 Pokemon Initially?
While the app supports pagination in the UI, we fetch all 151 original Pokemon on initial load to enable instant client-side search and filtering. This provides a much smoother user experience than making API calls on every search/filter change.

### Type-based Color System
Each Pokemon type has a distinct color scheme that creates visual hierarchy and makes the grid visually engaging. Colors are defined in Tailwind config for consistency.

## Challenges & Solutions

1. **API Rate Limiting**: Batch fetched Pokemon details to avoid hitting rate limits
2. **Search Performance**: Implemented client-side filtering for instant results
3. **Responsive Images**: Used official artwork with fallback to sprites
4. **Dark Mode**: Implemented theme persistence with system preference detection

## Future Improvements (Bonus Features)

- OAuth authentication for cloud-synced favorites
- Infinite scroll as pagination alternative
- Pokemon comparison feature
- Advanced animations and transitions
- Server-side rendering for SEO
