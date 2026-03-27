'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function TopBar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-6 bg-surface-container-low/90 backdrop-blur-md z-[100] border-b border-outline-variant/10">
      <h1 className="font-display italic text-2xl text-primary">
        PathFinder
      </h1>
      
      <div className="flex items-center gap-5 text-primary">
        {/* Theme Toggle */}
        {mounted && (
          <button
            onClick={toggleTheme}
            className="spring-transition hover:opacity-80"
            aria-label="Toggle theme"
          >
            <span className="material-symbols-outlined">
              {theme === 'dark' ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
        )}
        
        {/* Help */}
        <button className="spring-transition hover:opacity-80">
          <span className="material-symbols-outlined">help_outline</span>
        </button>
        
        {/* Notifications */}
        <button className="spring-transition hover:opacity-80 relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-error rounded-full" />
        </button>
      </div>
    </header>
  )
}
