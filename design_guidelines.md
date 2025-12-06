# Pokedex Lite Design Guidelines

## Design Approach

**Reference-Based Approach**: Drawing inspiration from Pokemon GO, Pokemon Home, and modern gaming interfaces that balance playful energy with clean information architecture. This creates an engaging collection experience that appeals to Pokemon fans while maintaining excellent usability.

## Core Design Principles

1. **Playful Professionalism**: Game-inspired UI elements with clean, organized information display
2. **Type-Based Visual System**: Pokemon type colors drive card theming and visual hierarchy
3. **Collection-Focused**: Emphasis on browsing, discovering, and curating favorites
4. **Smooth Interactions**: Polished micro-interactions that feel responsive and delightful

## Typography System

**Font Families**:
- Primary: Inter (Google Fonts) - Clean, modern readability for UI text
- Accent: Poppins (Google Fonts) - Bold, playful for Pokemon names and headings

**Type Scale**:
- Hero/Pokemon Names: text-2xl to text-4xl, font-bold (Poppins)
- Section Headers: text-xl to text-2xl, font-semibold (Poppins)
- Body/Stats: text-sm to text-base, font-medium (Inter)
- Labels/Metadata: text-xs to text-sm, font-normal (Inter)

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16
- Micro spacing (gaps, padding): p-2, p-4, gap-2, gap-4
- Component spacing: p-6, p-8, m-8
- Section spacing: py-12, py-16, mb-12

**Grid Structure**:
- Container: max-w-7xl mx-auto px-4 md:px-6 lg:px-8
- Pokemon Grid: grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6
- Responsive breakpoints: Mobile-first, then sm (640px), md (768px), lg (1024px)

## Component Library

### Header/Navigation
- Sticky header with backdrop-blur effect (glass-morphism)
- Logo/title on left, search bar center (desktop) or full-width (mobile)
- Favorites counter badge on right
- Height: h-16 md:h-20
- Shadow: shadow-lg with subtle glow effect

### Search Bar
- Glass-morphism treatment: backdrop-blur-md with semi-transparent background
- Rounded-full design with pl-12 (icon space) pr-4
- Height: h-12 md:h-14
- Magnifying glass icon (Heroicons) positioned absolute left
- Smooth focus ring with ring-2 ring-offset-2

### Type Filter Pills
- Horizontal scrolling container on mobile: flex overflow-x-auto gap-2 pb-2
- Grid layout on desktop: flex flex-wrap gap-2
- Individual pills: px-4 py-2 rounded-full with type-specific styling
- Multi-select with checkmark icons (Heroicons) when active
- Smooth transition on selection state change

### Pokemon Cards
- Aspect ratio: aspect-square or aspect-[3/4]
- Structure: Gradient background overlay, Pokemon image centered, name/type badges at bottom
- Padding: p-4
- Border radius: rounded-xl to rounded-2xl
- Elevation: shadow-md with hover:shadow-xl hover:-translate-y-1 transition
- Favorite heart icon: Positioned absolute top-2 right-2
- Type badge placement: Bottom of card with flex gap-1

### Detail Modal
- Full-screen overlay on mobile, centered modal on desktop (max-w-4xl)
- Two-column layout (desktop): Left = large Pokemon image, Right = stats/info
- Single column (mobile): Image top, info below
- Modal padding: p-6 md:p-8
- Backdrop: backdrop-blur-md with semi-transparent overlay
- Close button: Absolute top-4 right-4, rounded-full with p-2

### Stats Display
- Horizontal bars for HP, Attack, Defense, Speed, etc.
- Bar structure: Background track + filled portion based on stat value
- Height: h-2 to h-3
- Labels: text-sm font-medium with stat name and value (e.g., "HP: 45")
- Spacing: space-y-3 between stat rows

### Pagination
- Centered flex layout: justify-center items-center gap-2
- Previous/Next buttons: px-4 py-2 rounded-lg
- Page numbers: Circle buttons (w-10 h-10 rounded-full) with current page highlighted
- Disabled state styling for boundary cases
- Spacing: mt-12 mb-8

### Loading States
- Pokeball spinner: Custom animation rotating on center axis
- Shimmer cards: Skeleton placeholders matching Pokemon card dimensions with pulse animation
- Full-page loader for initial load, inline loaders for pagination

### Empty/Error States
- Centered text with supporting icon (Heroicons: ExclamationCircle, FaceFrown)
- Message: text-lg font-medium
- Subtext: text-sm opacity-70
- Optional retry button for errors: mt-4

## Animations (Minimal & Purposeful)

- Card hover lift: hover:-translate-y-1 transition-transform duration-200
- Favorite heart: Scale pulse on toggle (scale-110 when active)
- Modal entrance: Slide up from bottom (mobile) or fade-in scale (desktop)
- Card grid: Staggered fade-in on load (CSS animation-delay based on index)
- NO continuous animations, NO distracting motion

## Images

**Pokemon Sprites**: 
- Source: PokeAPI official artwork (sprites.other.official-artwork.front_default)
- Fallback: sprites.front_default
- Display: object-contain with max dimensions
- Loading: Lazy load with blur-up placeholder

**No Hero Image**: This is a utility-focused app; jump straight to search + grid

## Responsive Behavior

**Mobile (< 640px)**:
- 2-column Pokemon grid
- Full-width search bar below header
- Horizontal scroll for type filters
- Full-screen modals
- Stacked stat displays

**Tablet (640px - 1024px)**:
- 3-column Pokemon grid
- Search bar integrated in header
- Wrapped type filter pills
- Centered modals with max-width

**Desktop (> 1024px)**:
- 4-5 column Pokemon grid
- All controls in single header row
- Side-by-side modal layout
- Hover effects fully enabled

## Accessibility
- Semantic HTML: <button>, <nav>, <main>, <dialog>
- ARIA labels for icons: aria-label="Search Pokemon", aria-label="Favorite"
- Keyboard navigation: Tab focus visible with ring-2
- Color contrast: Ensure type badges meet WCAG AA standards
- Focus management: Trap focus in modal, return to trigger on close

## Type Color Mapping (Implementation Reference)
Fire, Water, Grass, Electric, Psychic, Ice, Dragon, Dark, Fairy, Fighting, Flying, Poison, Ground, Rock, Bug, Ghost, Steel, Normal - each gets distinct hue with consistent saturation/lightness for cohesion.