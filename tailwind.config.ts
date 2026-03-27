import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
        headline: ['Newsreader', 'serif'],
      },
      colors: {
        // Light mode colors
        tan: {
          DEFAULT: '#e8d5c4',
          light: '#f0e2d4',
          dark: '#d4c4b0',
        },
        brown: {
          DEFAULT: '#7d562d',
          light: '#a67c52',
          dark: '#5a3d1f',
        },
        // Semantic colors - will be overridden by CSS variables
        background: 'var(--background)',
        surface: {
          DEFAULT: 'var(--surface)',
          container: 'var(--surface-container)',
          'container-high': 'var(--surface-container-high)',
          'container-highest': 'var(--surface-container-highest)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          container: 'var(--primary-container)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          container: 'var(--secondary-container)',
        },
        tertiary: {
          DEFAULT: 'var(--tertiary)',
          container: 'var(--tertiary-container)',
        },
        outline: {
          DEFAULT: 'var(--outline)',
          variant: 'var(--outline-variant)',
        },
      },
    },
  },
  plugins: [],
}

export default config
