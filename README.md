# PathfinderV2

A puzzle memory game where players trace hidden paths through numbered grids.

## Features
- 🎮 Three game modes: Classic, Survival, and 1-Minute
- 🎨 Light/Dark theme toggle
- 📱 Responsive design
- 🏆 Leaderboards
- 👤 User profiles

## Tech Stack
- Next.js 15
- React 19
- Tailwind CSS 4
- Framer Motion
- Supabase (Auth + Database)

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

## Deployment

### Cloudflare Pages
1. Push to GitHub
2. Connect repo to Cloudflare Pages
3. Build command: `npm run build`
4. Build output: `dist`

## Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
