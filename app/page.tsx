'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'

export default function HomePage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<'classic' | 'survival' | 'onemin'>('classic')
  const [selectedDiff, setSelectedDiff] = useState<'easy' | 'medium' | 'hard' | 'extreme'>('easy')
  const [autoReset, setAutoReset] = useState(true)
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false)

  // Handle click outside to collapse sidebar
  useEffect(() => {
    const handleClickOutside = () => setIsSidebarExpanded(false)
    if (isSidebarExpanded) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isSidebarExpanded])

  // Prevent hydration mismatch for theme
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="h-screen overflow-hidden bg-background">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-6 bg-surface-container/90 backdrop-blur-md z-[100] border-b border-outline-variant/10">
        <h1 className="font-display italic text-2xl text-primary">
          PathFinder
        </h1>
        <div className="flex items-center gap-5 text-primary">
          {/* Theme Toggle */}
          {mounted && (
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="spring-transition hover:opacity-80"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <span className="material-symbols-outlined">
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
          )}
          <button className="spring-transition hover:opacity-80">
            <span className="material-symbols-outlined">help_outline</span>
          </button>
          <button className="spring-transition hover:opacity-80 relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-tertiary rounded-full" />
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        onClick={(e) => {
          if (!isSidebarExpanded) {
            e.stopPropagation()
            setIsSidebarExpanded(true)
          }
        }}
        className={`sidebar ${isSidebarExpanded ? 'expanded' : 'collapsed'} h-screen fixed left-0 top-0 flex flex-col py-4 bg-surface-container/85 backdrop-blur-md z-50 pt-20 cursor-pointer border-r border-outline-variant/20`}
      >
        <nav className="flex flex-col gap-2 flex-grow px-3">
          {/* Play - Active */}
          <button 
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-3 spring-transition text-primary font-bold bg-surface-container-high/50 py-3 px-3 rounded-xl"
          >
            <span className="material-symbols-outlined filled flex-shrink-0">videogame_asset</span>
            <span className="sidebar-text font-body text-[0.75rem] tracking-[0.05rem] uppercase">Play</span>
          </button>
          
          {/* Leaderboard */}
          <button 
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-3 spring-transition text-on-surface-variant/60 hover:bg-surface-container-high/50 hover:text-on-surface-variant py-3 px-3 rounded-xl"
          >
            <span className="material-symbols-outlined flex-shrink-0">leaderboard</span>
            <span className="sidebar-text font-body text-[0.75rem] tracking-[0.05rem] uppercase">Leaderboard</span>
          </button>
          
          {/* Settings */}
          <button 
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-3 spring-transition text-on-surface-variant/60 hover:bg-surface-container-high/50 hover:text-on-surface-variant py-3 px-3 rounded-xl"
          >
            <span className="material-symbols-outlined flex-shrink-0">settings</span>
            <span className="sidebar-text font-body text-[0.75rem] tracking-[0.05rem] uppercase">Settings</span>
          </button>
          
          {/* Messages */}
          <button 
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-3 spring-transition text-on-surface-variant/60 hover:bg-surface-container-high/50 hover:text-on-surface-variant py-3 px-3 rounded-xl"
          >
            <span className="material-symbols-outlined flex-shrink-0">mail</span>
            <span className="sidebar-text font-body text-[0.75rem] tracking-[0.05rem] uppercase">Messages</span>
          </button>
        </nav>
        
        {/* Profile */}
        <div className="mt-auto px-3 pb-4">
          <button 
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-3 spring-transition text-on-surface-variant/60 hover:bg-surface-container-high/50 hover:text-on-surface-variant py-3 px-3 rounded-xl w-full"
          >
            <span className="material-symbols-outlined flex-shrink-0 text-2xl">account_circle</span>
            <span className="sidebar-text font-body text-[0.75rem] tracking-[0.05rem] uppercase">Profile</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main 
        className="h-screen flex items-center justify-center transition-all duration-300 pt-16"
        style={{ marginLeft: '72px' }}
      >
        <div className="flex items-start gap-8">
          {/* Game Board Preview */}
          <div className="hidden lg:block bg-surface-container p-5 sm:p-6 rounded-2xl shadow-lg border border-outline-variant/10">
            <div 
              className="grid gap-2"
              style={{ 
                gridTemplateColumns: 'repeat(8, 1fr)',
                width: '480px',
                height: '480px'
              }}
            >
              {Array.from({ length: 64 }).map((_, i) => {
                const row = Math.floor(i / 8)
                const col = i % 8
                const isStart = row === 0 && col === 0
                const isEnd = row === 7 && col === 7
                
                return (
                  <motion.div
                    key={i}
                    className={`rounded-lg flex items-center justify-center text-base font-semibold ${
                      isStart ? 'start-cell text-white' : 
                      isEnd ? 'end-cell text-white' : 
                      'grid-cell'
                    }`}
                    initial={false}
                    animate={{
                      scale: [1, 1.02, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: (row * 8 + col) * 0.02,
                      ease: "easeInOut"
                    }}
                  >
                    {isStart ? 'S' : isEnd ? 'E' : Math.floor(Math.random() * 9) + 1}
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Options Panel */}
          <div className="w-[300px] bg-surface-container rounded-2xl flex flex-col overflow-hidden shadow-lg border border-outline-variant/10 p-4">
            {/* Mode Tabs */}
            <div className="flex p-2 bg-surface-container-high rounded-xl mb-4 flex-shrink-0">
              <div className="relative flex w-full bg-background rounded-full p-1 border border-outline-variant">
                {/* Tab Indicator */}
                <motion.div
                  className="absolute top-1 bottom-1 bg-primary rounded-full shadow-md z-0"
                  animate={{
                    left: activeTab === 'classic' ? '4px' : activeTab === 'survival' ? '33.33%' : '66.66%',
                    width: 'calc(33.33% - 4px)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
                
                <button
                  onClick={() => setActiveTab('classic')}
                  className={`tab-btn relative z-10 w-1/3 text-[10px] font-bold uppercase tracking-tighter py-2 transition-colors ${
                    activeTab === 'classic' ? 'text-on-primary' : 'text-on-surface-variant'
                  }`}
                >
                  Classic
                </button>
                <button
                  onClick={() => setActiveTab('survival')}
                  className={`tab-btn relative z-10 w-1/3 text-[10px] font-bold uppercase tracking-tighter py-2 transition-colors ${
                    activeTab === 'survival' ? 'text-on-primary' : 'text-on-surface-variant'
                  }`}
                >
                  Survival
                </button>
                <button
                  onClick={() => setActiveTab('onemin')}
                  className={`tab-btn relative z-10 w-1/3 text-[10px] font-bold uppercase tracking-tighter py-2 transition-colors ${
                    activeTab === 'onemin' ? 'text-on-primary' : 'text-on-surface-variant'
                  }`}
                >
                  1 Min
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-surface-container-high rounded-xl p-5 flex flex-col">
              {/* Classic Content */}
              {activeTab === 'classic' && (
                <div className="tab-content flex flex-col flex-grow">
                  <div className="mb-5">
                    <label className="font-body text-[0.6875rem] uppercase tracking-[0.1rem] text-on-surface-variant block mb-3">
                      Difficulty
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['easy', 'medium', 'hard', 'extreme'] as const).map((diff) => (
                        <button
                          key={diff}
                          onClick={() => setSelectedDiff(diff)}
                          className={`difficulty-option border rounded-lg py-2.5 px-3 text-sm font-medium transition-all ${
                            selectedDiff === diff ? 'selected' : 'text-on-surface'
                          }`}
                        >
                          {diff.charAt(0).toUpperCase() + diff.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <button className="w-full py-3.5 bg-primary text-on-primary rounded-full font-bold uppercase tracking-widest text-sm shadow-lg shadow-primary/30 spring-transition hover:scale-[1.03] hover:-translate-y-0.5 active:scale-95 mb-5">
                    Play Now
                  </button>
                  
                  <div className="border-t border-outline-variant/30 pt-5">
                    <label className="font-body text-[0.6875rem] uppercase tracking-[0.1rem] text-on-surface-variant block mb-4">
                      Settings
                    </label>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-on-surface">Auto-reset</span>
                      <button
                        onClick={() => setAutoReset(!autoReset)}
                        className={`w-11 h-6 rounded-full relative p-1 flex items-center transition-colors ${
                          autoReset ? 'bg-primary' : 'bg-surface-container-highest'
                        }`}
                      >
                        <motion.div
                          className="w-4 h-4 bg-white rounded-full"
                          animate={{ x: autoReset ? 20 : 0 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-on-surface">Reset key</span>
                      <span className="bg-surface-container-highest px-3 py-1.5 rounded-lg text-xs font-bold text-primary font-mono border border-outline-variant">
                        R
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Survival Content */}
              {activeTab === 'survival' && (
                <div className="tab-content flex flex-col flex-grow">
                  <div className="mb-5">
                    <label className="font-body text-[0.6875rem] uppercase tracking-[0.1rem] text-on-surface-variant block mb-3">
                      Lives
                    </label>
                    <div className="text-2xl font-bold text-tertiary flex gap-1">
                      {'♥'.repeat(3).split('').map((h, i) => <span key={i}>{h}</span>)}
                    </div>
                  </div>
                  <div className="mb-5">
                    <label className="font-body text-[0.6875rem] uppercase tracking-[0.1rem] text-on-surface-variant block mb-3">
                      Difficulty
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['easy', 'medium', 'hard', 'extreme'] as const).map((diff) => (
                        <button
                          key={diff}
                          onClick={() => setSelectedDiff(diff)}
                          className={`difficulty-option border rounded-lg py-2.5 px-3 text-sm font-medium transition-all ${
                            selectedDiff === diff ? 'selected' : 'text-on-surface'
                          }`}
                        >
                          {diff.charAt(0).toUpperCase() + diff.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button className="w-full py-3.5 bg-primary text-on-primary rounded-full font-bold uppercase tracking-widest text-sm shadow-lg shadow-primary/30 spring-transition hover:scale-[1.03] hover:-translate-y-0.5 active:scale-95 mb-5">
                    Play Now
                  </button>
                </div>
              )}

              {/* 1 Min Content */}
              {activeTab === 'onemin' && (
                <div className="tab-content flex flex-col flex-grow">
                  <div className="mb-5">
                    <label className="font-body text-[0.6875rem] uppercase tracking-[0.1rem] text-on-surface-variant block mb-3">
                      Total Time
                    </label>
                    <div className="text-3xl font-bold text-primary font-mono">60s</div>
                  </div>
                  <div className="mb-5">
                    <label className="font-body text-[0.6875rem] uppercase tracking-[0.1rem] text-on-surface-variant block mb-3">
                      Best Score
                    </label>
                    <div className="text-lg font-bold text-on-surface">12 levels</div>
                  </div>
                  <button className="w-full py-3.5 bg-primary text-on-primary rounded-full font-bold uppercase tracking-widest text-sm shadow-lg shadow-primary/30 spring-transition hover:scale-[1.03] hover:-translate-y-0.5 active:scale-95 mb-5">
                    Play Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
