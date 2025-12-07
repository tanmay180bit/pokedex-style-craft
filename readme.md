<img width="20" height="20" alt="image" src="https://github.com/user-attachments/assets/92690a27-240b-4bee-b722-4992d2f6a241" />
 Pokedex Lite - Pokemon Explorer - Deployed Link- (https://pokedex-style-craft.vercel.app/)
 

A beautiful, responsive web application for exploring Pokemon using the PokeAPI.

## 🧩 Overview

A lightweight, responsive Pokémon browsing application built using React, TypeScript, Vite, and TailwindCSS.The goal of this project was to practice clean UI design, component-based architecture, and API-driven interactivity and it includes information of 151 original pokemon.

## 🌟Features

---
- **Pokemon Grid Display**: Beautiful cards with type-based gradient backgrounds
- **Real-time Search**: Filter Pokemon by name or ID as you type
- **Type Filtering**: Multi-select filter by Pokemon types (Fire, Water, Grass, etc.)
- **Pagination**: Navigate through Pokemon with elegant page controls
- **Favorites**: Mark favorites with heart icons, persisted in localStorage
- **Detail Modal**: View stats, abilities, height, weight, and official artwork
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Responsive Design**: Works on mobile, tablet, and desktop



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

```text
Style-Craft/
│
├── client/
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.png
│   │
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── PokedexPage.tsx
│   │   │   ├── AuthDemo.tsx
│   │   │
│   │   ├── components/
│   │   │   ├── PokemonCard.tsx
│   │   │   ├── PokemonModal.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── TypeFilter.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── EmptyState.tsx
│   │
│   ├── index.css
│
├── package.json
├── package-lock.json
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts
├── README.md


---
   ```
## Install it Locally

1. **Install dependencies**  
   In the terminal, run:

   ```bash
   npm install

2. **Start the development server**  
   In the terminal, run:

   ```bash
   npm run dev


---
## Building for Production

🛠️ To create a production build, run:

```bash
npm run build
```
---
#### 💡 **What I Learned:**

- Writing reusable components  
- Managing UI state cleanly  
- Handling modals and animations  
- Designing fully responsive layouts  
- Integrating external APIs  
- GitHub workflow and project structuring  
- Improving TypeScript skills  
---
## 🧩 Design Decisions

While building this project, I made several intentional design choices to improve usability, performance, and scalability.

### 1. Component-Based Architecture  
I structured the app into small, reusable components (Card, Modal, Filters, Pagination) to keep the UI modular and easy to maintain.

### 2. Clean State Management  
I avoided external state libraries for simplicity and used `useState` + `useEffect` with clear data flow.  
This keeps logic lightweight and beginner-friendly.

### 3. Responsive UI First  
All layout decisions were designed mobile-first using Tailwind’s responsive utilities (`sm:`, `md:`, `lg:`).  
This ensures the app works seamlessly on phones, tablets, and desktops.

### 4. Smooth Animations  
I added subtle animations for page transitions, Pokémon cards, and modals using Tailwind’s `animate-*` and custom transitions.  
The goal was to enhance UX without hurting performance.

### 5. Minimal & Clean Visual Design  
I followed a simple, modern design system using Tailwind color tokens.  
Soft shadows, rounded corners, and clean spacing improve readability and consistency.

### 6. Local Favorites System  
I used `localStorage` instead of a backend to persist favorite Pokémon.  
This keeps the project simple while still demonstrating state persistence.

### 7. Clear Directory Structure  
Pages and reusable components were separated for readability.  
This makes scaling easier and keeps the codebase clean.

### 8. API-Driven Approach  
All Pokémon information comes directly from PokéAPI.  
This teaches real API integration without needing a backend.

### 9. TypeScript for Reliability  
Using TypeScript improved safety and reduced bugs by enforcing type correctness in API responses and component props.

---

## 🧩Challenges & Solutions

1. **API Rate Limiting**: Batch fetched Pokemon details to avoid hitting rate limits
2. **Search Performance**: Implemented client-side filtering for instant results
3. **Responsive Images**: Used official artwork with fallback to sprites
4. **Dark Mode**: Implemented theme persistence with system preference detection

## 🧩Future Improvements (Bonus Features)
 I can add these features in Future-
 
- OAuth authentication for cloud-synced favorites
- Pokemon comparison feature
- Advanced animations and transitions
- Server-side rendering for SEO
