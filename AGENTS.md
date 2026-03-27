# PathfinderV2 - Project Documentation

## Overview
PathfinderV2 is a puzzle memory game where players must trace a briefly-shown path through a grid of numbers. Built with Next.js 15, Tailwind CSS, and Supabase.

## Design Philosophy

### Aesthetic Direction: "Warm & Refined"
- **Dark Mode**: Deep warm browns (#15130f) with golden accents (#d4a373)
- **Light Mode**: Warm tan/cream (#f5efe6) with chocolate brown accents (#7d562d)
- **Fonts**: Playfair Display (italic) for logo, Inter for UI, Newsreader for headlines
- **Feel**: Premium, cozy, tactile - like a well-crafted board game

### Key Design Principles (from .shared-skills)
- ❌ NO generic "AI slop" - no purple gradients, cyan-on-dark, Inter-everywhere
- ❌ NO glassmorphism without purpose
- ❌ NO card nesting
- ✅ DO use distinctive fonts and warm color palettes
- ✅ DO create intentional asymmetry and visual rhythm
- ✅ DO use spring animations with exponential easing

## Color System (Material Design 3 Inspired)

### Dark Mode
```
Background: #15130f
Surface Container: #211f1b
Surface Container High: #2c2a25
Primary: #f2be8c (warm gold)
Primary Container: #d4a373
Secondary: #b0d09f (sage green)
Tertiary: #ffb5b4 (soft terracotta)
```

### Light Mode
```
Background: #f5efe6 (warm cream)
Tan: #e8d5c4
Tan Light: #f0e2d4
Tan Dark: #d4c4b0
Brown: #7d562d (primary accent)
Brown Light: #a67c52
Text Main: #3c2820
```

## Game Modes

### Classic Mode
- Progressive difficulty: 3×3 → 10×10 grids
- Perfect completion earns stars
- Tracks progress per grid size

### Survival Mode
- Start at 3×3 with 3 lives
- Timer per level
- Wrong path = lose life
- How far can you go?

### 1-Minute Mode
- Complete as many levels as possible in 60 seconds
- Score based on speed and accuracy

## Project Structure
```
PathfinderV2/
├── app/                    # Next.js App Router
│   ├── (game)/            # Game layout with sidebar
│   │   ├── game/          # Active game page
│   │   ├── leaderboard/   # Leaderboard page
│   │   ├── profile/       # User profile
│   │   └── settings/      # Game settings
│   ├── auth/
│   │   ├── signin/        # Sign in page
│   │   └── callback/      # OAuth callback
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page (redirects to /game)
├── components/
│   ├── ui/                # shadcn components
│   ├── game/              # Game-specific components
│   └── layout/            # Layout components (Sidebar, TopBar)
├── lib/
│   ├── supabase/          # Supabase client & types
│   ├── game/              # Game logic
│   └── utils.ts
├── public/                # Static assets
└── styles/
    └── globals.css
```

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Backend**: Supabase (Auth + Database)
- **Animation**: Framer Motion
- **Icons**: Material Symbols (Google Fonts)
- **Fonts**: Google Fonts (Playfair Display, Inter, Newsreader)
- **Deployment**: Cloudflare Pages

## Database Schema (Supabase)

### Tables
- `profiles` - User profiles linked to auth
- `games` - Game sessions with scores
- `classic_progress` - Classic mode progress per user
- `leaderboard` - Aggregated leaderboard data

## Authentication
- Google OAuth via Supabase Auth
- Guest play supported (local storage for progress)
- JWT tokens stored in cookies

## Key Features
1. Collapsible sidebar navigation
2. Theme toggle (dark/light)
3. Real-time path animation preview
4. Touch and keyboard controls
5. Responsive design (desktop-first, tablet optimized)
6. Sound effects (optional)
7. Haptic feedback on mobile

## Development Notes
- Use `spring` transitions: `cubic-bezier(0.175, 0.885, 0.32, 1.275)`
- Grid cells: 70px on desktop, responsive on smaller screens
- Path preview: Sequential reveal (300ms per cell)
- Difficulty affects: Grid size and path complexity

## Build Commands
```bash
# Development
npm run dev

# Production build
npm run build

# Deploy to Cloudflare
npx wrangler pages deploy dist
```
