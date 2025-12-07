<img width="20" height="20" alt="image" src="https://github.com/user-attachments/assets/92690a27-240b-4bee-b722-4992d2f6a241" />
 Pokedex Lite - Pokemon Explorer

A beautiful, responsive web application for exploring Pokemon using the PokeAPI.

## Overview

A lightweight, responsive Pokémon browsing application built using React, TypeScript, Vite, and TailwindCSS.The goal of this project was to practice clean UI design, component-based architecture, and API-driven interactivity and it includes information of 151 original pokemon.

## Features

- **Pokemon Grid Display**: Beautiful cards with type-based gradient backgrounds
- **Real-time Search**: Filter Pokemon by name or ID as you type
- **Type Filtering**: Multi-select filter by Pokemon types (Fire, Water, Grass, etc.)
- **Pagination**: Navigate through Pokemon with elegant page controls
- **Favorites**: Mark favorites with heart icons, persisted in localStorage
- **Detail Modal**: View stats, abilities, height, weight, and official artwork
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Responsive Design**: Works on mobile, tablet, and desktop

# Pokedex Lite – Frontend Assignment (DeepSolv)

A clean, responsive, and high-performance Pokédex built with **React + TypeScript + Vite + Tailwind CSS**.  
Includes search, filtering, pagination, favorites, animations, dark mode, and an optional OAuth demo.

---

## 🌟 Features

### ✅ **Mandatory Features**
- Fetch Pokémon from **PokéAPI**
- Search Pokémon by name
- Filter by type (Fire, Water, Grass, etc.)
- Client-side pagination (20 per page)
- Favorite / unfavorite with UI state
- Opens Pokémon details in a **modal with animation**
- Fully responsive UI (mobile + desktop)
- Clean + maintainable component structure
- State managed using `useState`, `useEffect`

### 🎁 **Bonus Features (Implemented)**
- Smooth **page transition animations**
- Pokémon **card hover animations**
- Modal open/close animations
- **Dark / Light mode switch**
- Simple **OAuth Demo** (Google button mock + page routing)

---

## 🛠️ Tech Stack

| Category | Tools |
|---------|--------|
| Framework | React + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS |
| Animations | Tailwind Animate utilities |
| State | useState + custom logic |
| API | PokéAPI |
| Routing Switch | Local view state |
| Deployment | GitHub Pages (optional) |

---

## 📡 Data Source

All Pokémon data is fetched from the official PokeAPI:

🔗 https://pokeapi.co/api/v2/

---

## 📁 Project Structure


##  My Project Structure

Style-Craft/
│
├── client/
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.png
│   │
│   ├── src/
│   │   ├── App.tsx                # Main application shell + theme + routing
│   │   ├── main.tsx              # Entry file
│   │   │
│   │   ├── pages/
│   │   │   ├── PokedexPage.tsx   # Main Pokédex UI
│   │   │   ├── AuthDemo.tsx      # OAuth mock page
│   │   │
│   │   ├── components/           # Reusable UI components
│   │   │   ├── PokemonCard.tsx
│   │   │   ├── PokemonModal.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── TypeFilter.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── EmptyState.tsx
│   │
│   ├── index.css
│
├── package.json
├── tailwind.config.ts
├── postcss.config.js
├── vite.config.ts
├── tsconfig.json
├── README.md




## Running Locally

1. Install dependencies:
   In Terminal-
   npm install
   ```

2. Start the development server:
   In Terminal-
   npm run dev
   ```

3. Open http://localhost:5173 in your browser

## Building for Production

🏗️ Building for Production
-npm run build

This will create an optimized bundle inside:

-dist/
## What i learned
💡 What I Learned:

1)Writing reusable components

2)Managing UI state cleanly

3)Handling modals and animations

4)Designing fully responsive layouts

5)Integrating external APIs

6)GitHub workflow and project structuring

7)Improving TypeScript skills

## Design Decisions

## Managing API Data & Structuring Pokémon Information

Challenge:
PokéAPI returns deeply nested data, and the list endpoint doesn’t include images or types directly. Initially, this caused missing information and inconsistent UI.

Solution:
I wrote a helper function that fetched details for each Pokémon individually and normalized the structure (id, name, image, types) before passing it to the UI. This ensured consistent card rendering and clean component props.

## Handling Multiple Filters Together (Search + Type + Favorites)

Challenge:
When search, type filters, and favorites were used together, the filtered results sometimes showed empty pages or incorrect counts.

Solution:
I created a unified filtering function that applied all filters in a predictable order and updated pagination accordingly. This prevented edge cases and made the UX smoother.

## Building a Smooth & Responsive Layout with Tailwind

Challenge:
Pokémon cards were overflowing on smaller screens and spacing looked inconsistent across breakpoints.

Solution:
I reorganized the layout using Tailwind’s responsive utilities (grid-cols-1, sm:grid-cols-2, md:grid-cols-3, etc.).
I also tuned spacing and shadows until the design felt balanced on mobile and desktop.

## Modal Animation Issues

Challenge:
The details modal initially opened abruptly, without animation, and sometimes caused layout shift.

Solution:
I wrapped the modal in a container using Tailwind animation utilities (animate-in, fade-in-0, zoom-in-95) and prevented background scrolling. This made the modal interaction feel smooth and intentional.

## Favorites Feature with localStorage

Challenge:
Favorites didn’t persist after page reload, and clicking the star icon would sometimes open the modal unintentionally.

Solution:

Added a stopPropagation() on the favorite button to isolate the click event
Synced favorites with localStorage inside a useEffect
Loaded saved favorites when the page initialized
This made the favorites feature predictable and permanent.

## Challenges & Solutions

1. **API Rate Limiting**: Batch fetched Pokemon details to avoid hitting rate limits
2. **Search Performance**: Implemented client-side filtering for instant results
3. **Responsive Images**: Used official artwork with fallback to sprites
4. **Dark Mode**: Implemented theme persistence with system preference detection

## Future Improvements (Bonus Features)
 I can add these features in Future-
 
- OAuth authentication for cloud-synced favorites
- Pokemon comparison feature
- Advanced animations and transitions
- Server-side rendering for SEO
