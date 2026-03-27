'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export default function HomePage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState<'classic' | 'survival' | 'onemin'>('classic')
  const [selectedDiff, setSelectedDiff] = useState<'easy' | 'medium' | 'hard' | 'extreme'>('easy')
  const [autoReset, setAutoReset] = useState(true)

  useEffect(() => setMounted(true), [])

  // Handle click outside to collapse sidebar
  useEffect(() => {
    const handleClickOutside = () => setIsExpanded(false)
    if (isExpanded) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isExpanded])

  const isDark = theme === 'dark'

  return (
    <div className="h-screen overflow-hidden" style={{ backgroundColor: isDark ? '#15130f' : '#f5efe6' }}>
      {/* Top Bar */}
      <header 
        className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-6 backdrop-blur-md z-[100]"
        style={{ 
          backgroundColor: isDark ? 'rgba(29, 27, 23, 0.9)' : 'rgba(232, 213, 196, 0.9)',
          borderBottom: isDark ? '1px solid rgba(80, 69, 59, 0.1)' : '1px solid #d4c4b0'
        }}
      >
        <h1 
          className="italic text-2xl"
          style={{ 
            fontFamily: "'Playfair Display', serif",
            color: isDark ? '#d4a373' : '#7d562d'
          }}
        >
          PathFinder
        </h1>
        <div className="flex items-center gap-5" style={{ color: isDark ? '#d4a373' : '#7d562d' }}>
          {/* Theme Toggle */}
          {mounted && (
            <button 
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="hover:opacity-80"
              style={{ transition: 'all 350ms cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
            >
              <span className="material-symbols-outlined">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
          )}
          <button className="hover:opacity-80" style={{ transition: 'all 350ms cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
            <span className="material-symbols-outlined">help_outline</span>
          </button>
          <button className="hover:opacity-80 relative" style={{ transition: 'all 350ms cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full" style={{ backgroundColor: isDark ? '#ffb4ab' : '#7d562d' }} />
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        onClick={(e) => {
          if (!isExpanded) {
            e.stopPropagation()
            setIsExpanded(true)
          }
        }}
        className="h-screen fixed left-0 top-0 flex flex-col py-4 z-50 pt-20 cursor-pointer"
        style={{
          width: isExpanded ? '180px' : '72px',
          backgroundColor: isDark ? 'rgba(29, 27, 23, 0.85)' : 'rgba(240, 226, 212, 0.95)',
          backdropFilter: 'blur(12px)',
          borderRight: isDark ? '1px solid rgba(80, 69, 59, 0.2)' : '1px solid #d4c4b0',
          transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <nav className="flex flex-col gap-2 flex-grow px-3">
          {/* Play - Active */}
          <button 
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-3 py-3 px-3 rounded-xl font-bold"
            style={{
              backgroundColor: isDark ? 'rgba(44, 42, 37, 0.5)' : 'rgba(255,255,255,0.5)',
              color: isDark ? '#d4a373' : '#7d562d',
              boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.1)',
              transition: 'all 350ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
          >
            <span className="material-symbols-outlined filled flex-shrink-0" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>videogame_asset</span>
            <span 
              className="font-['Inter'] text-[0.75rem] tracking-[0.05rem] uppercase"
              style={{
                opacity: isExpanded ? 1 : 0,
                width: isExpanded ? 'auto' : 0,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                transition: 'opacity 200ms ease, width 200ms ease'
              }}
            >
              Play
            </span>
          </button>
          
          {/* Leaderboard */}
          <button 
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-3 py-3 px-3 rounded-xl hover:bg-opacity-50"
            style={{
              color: isDark ? 'rgba(212, 196, 183, 0.6)' : '#6b5040',
              transition: 'all 350ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isDark ? 'rgba(44, 42, 37, 0.5)' : 'rgba(255,255,255,0.3)'
              e.currentTarget.style.color = isDark ? '#d4c4b7' : '#3c2820'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = isDark ? 'rgba(212, 196, 183, 0.6)' : '#6b5040'
            }}
          >
            <span className="material-symbols-outlined flex-shrink-0">leaderboard</span>
            <span 
              className="font-['Inter'] text-[0.75rem] tracking-[0.05rem] uppercase"
              style={{
                opacity: isExpanded ? 1 : 0,
                width: isExpanded ? 'auto' : 0,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                transition: 'opacity 200ms ease, width 200ms ease'
              }}
            >
              Leaderboard
            </span>
          </button>
          
          {/* Settings */}
          <button 
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-3 py-3 px-3 rounded-xl"
            style={{
              color: isDark ? 'rgba(212, 196, 183, 0.6)' : '#6b5040',
              transition: 'all 350ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isDark ? 'rgba(44, 42, 37, 0.5)' : 'rgba(255,255,255,0.3)'
              e.currentTarget.style.color = isDark ? '#d4c4b7' : '#3c2820'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = isDark ? 'rgba(212, 196, 183, 0.6)' : '#6b5040'
            }}
          >
            <span className="material-symbols-outlined flex-shrink-0">settings</span>
            <span 
              className="font-['Inter'] text-[0.75rem] tracking-[0.05rem] uppercase"
              style={{
                opacity: isExpanded ? 1 : 0,
                width: isExpanded ? 'auto' : 0,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                transition: 'opacity 200ms ease, width 200ms ease'
              }}
            >
              Settings
            </span>
          </button>
          
          {/* Messages */}
          <button 
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-3 py-3 px-3 rounded-xl"
            style={{
              color: isDark ? 'rgba(212, 196, 183, 0.6)' : '#6b5040',
              transition: 'all 350ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isDark ? 'rgba(44, 42, 37, 0.5)' : 'rgba(255,255,255,0.3)'
              e.currentTarget.style.color = isDark ? '#d4c4b7' : '#3c2820'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = isDark ? 'rgba(212, 196, 183, 0.6)' : '#6b5040'
            }}
          >
            <span className="material-symbols-outlined flex-shrink-0">mail</span>
            <span 
              className="font-['Inter'] text-[0.75rem] tracking-[0.05rem] uppercase"
              style={{
                opacity: isExpanded ? 1 : 0,
                width: isExpanded ? 'auto' : 0,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                transition: 'opacity 200ms ease, width 200ms ease'
              }}
            >
              Messages
            </span>
          </button>
        </nav>
        
        {/* Profile */}
        <div className="mt-auto px-3 pb-4">
          <button 
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-3 py-3 px-3 rounded-xl w-full"
            style={{
              color: isDark ? 'rgba(212, 196, 183, 0.6)' : '#6b5040',
              transition: 'all 350ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isDark ? 'rgba(44, 42, 37, 0.5)' : 'rgba(255,255,255,0.3)'
              e.currentTarget.style.color = isDark ? '#d4c4b7' : '#3c2820'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = isDark ? 'rgba(212, 196, 183, 0.6)' : '#6b5040'
            }}
          >
            <span className="material-symbols-outlined flex-shrink-0 text-2xl">account_circle</span>
            <span 
              className="font-['Inter'] text-[0.75rem] tracking-[0.05rem] uppercase"
              style={{
                opacity: isExpanded ? 1 : 0,
                width: isExpanded ? 'auto' : 0,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                transition: 'opacity 200ms ease, width 200ms ease'
              }}
            >
              Profile
            </span>
          </button>
        </div>
      </aside>

      {/* Click outside overlay */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsExpanded(false)}
          style={{ backgroundColor: 'transparent' }}
        />
      )}

      {/* Main Content */}
      <main 
        className="h-screen flex items-center justify-center pt-16"
        style={{ 
          marginLeft: '72px',
          backgroundColor: isDark ? '#15130f' : '#f5efe6',
          transition: 'all 300ms'
        }}
      >
        <div className="flex items-start gap-8">
          {/* Game Board Preview */}
          <div 
            className="hidden lg:block p-5 rounded-2xl shadow-lg"
            style={{
              backgroundColor: isDark ? '#211f1b' : '#e8d5c4',
              border: isDark ? '1px solid rgba(80, 69, 59, 0.1)' : '1px solid #d4c4b0'
            }}
          >
            <div 
              className="grid gap-2"
              style={{ 
                gridTemplateColumns: 'repeat(8, 1fr)',
                width: '560px',
                height: '560px'
              }}
            >
              {Array.from({ length: 64 }).map((_, i) => {
                const row = Math.floor(i / 8)
                const col = i % 8
                const isStart = row === 0 && col === 0
                const isEnd = row === 7 && col === 7
                
                return (
                  <div
                    key={i}
                    className="rounded-lg flex items-center justify-center text-base font-semibold"
                    style={{
                      backgroundColor: isStart 
                        ? (isDark ? '#4a6d3a' : '#5a7d4a')
                        : isEnd 
                          ? (isDark ? '#8b4a42' : '#a05a52')
                          : (isDark ? '#2c2a25' : '#fff8f0'),
                      color: isStart || isEnd 
                        ? '#ffffff' 
                        : (isDark ? '#e8e1db' : '#3c2820'),
                      border: isStart 
                        ? `2px solid ${isDark ? '#5a7d4a' : '#6a8d5a'}`
                        : isEnd 
                          ? `2px solid ${isDark ? '#9b5a52' : '#b06a62'}`
                          : 'none',
                      boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.08)',
                      transition: 'all 350ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}
                  >
                    {isStart ? '' : isEnd ? '' : Math.floor(Math.random() * 9) + 1}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Options Panel */}
          <div 
            className="w-[300px] rounded-2xl flex flex-col overflow-hidden shadow-lg"
            style={{
              backgroundColor: isDark ? '#211f1b' : '#e8d5c4',
              border: isDark ? '1px solid rgba(80, 69, 59, 0.1)' : '1px solid #d4c4b0'
            }}
          >
            {/* Mode Tabs */}
            <div 
              className="flex p-3 flex-shrink-0"
              style={{
                backgroundColor: isDark ? 'rgba(16, 14, 10, 0.5)' : '#d4c4b0',
                borderBottom: isDark ? '1px solid rgba(80, 69, 59, 0.05)' : 'none'
              }}
            >
              <div 
                className="relative flex w-full rounded-full p-1"
                style={{
                  backgroundColor: isDark ? '#211f1b' : '#f5efe6',
                  border: isDark ? 'none' : '1px solid #d4c4b0'
                }}
              >
                {/* Tab Indicator */}
                <div
                  className="absolute top-1 bottom-1 rounded-full shadow-md z-0"
                  style={{
                    left: activeTab === 'classic' ? '4px' : activeTab === 'survival' ? '33.33%' : '66.66%',
                    width: 'calc(33.33% - 4px)',
                    backgroundColor: isDark ? '#d4a373' : '#7d562d',
                    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
                
                <button
                  onClick={() => setActiveTab('classic')}
                  className="relative z-10 w-1/3 text-[10px] font-bold uppercase tracking-tighter py-2"
                  style={{ color: activeTab === 'classic' ? '#ffffff' : (isDark ? 'rgba(212, 196, 183, 0.6)' : '#6b5040') }}
                >
                  Classic
                </button>
                <button
                  onClick={() => setActiveTab('survival')}
                  className="relative z-10 w-1/3 text-[10px] font-bold uppercase tracking-tighter py-2"
                  style={{ color: activeTab === 'survival' ? '#ffffff' : (isDark ? 'rgba(212, 196, 183, 0.6)' : '#6b5040') }}
                >
                  Survival
                </button>
                <button
                  onClick={() => setActiveTab('onemin')}
                  className="relative z-10 w-1/3 text-[10px] font-bold uppercase tracking-tighter py-2"
                  style={{ color: activeTab === 'onemin' ? '#ffffff' : (isDark ? 'rgba(212, 196, 183, 0.6)' : '#6b5040') }}
                >
                  1 Min
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div 
              className="flex-1 rounded-xl p-5 flex flex-col"
              style={{ 
                margin: '16px',
                backgroundColor: isDark ? '#2c2a25' : '#f0e2d4'
              }}
            >
              {/* Classic Content */}
              {activeTab === 'classic' && (
                <div className="flex flex-col flex-grow">
                  <div className="mb-5">
                    <label 
                      className="block mb-3 font-['Inter'] text-[0.6875rem] uppercase tracking-[0.1rem]"
                      style={{ color: isDark ? 'rgba(212, 196, 183, 0.8)' : '#6b5040' }}
                    >
                      Difficulty
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['easy', 'medium', 'hard', 'extreme'] as const).map((diff) => (
                        <button
                          key={diff}
                          onClick={() => setSelectedDiff(diff)}
                          className="border rounded-lg py-2.5 px-3 text-sm font-medium transition-all"
                          style={{
                            backgroundColor: selectedDiff === diff 
                              ? (isDark ? 'rgba(212, 163, 115, 0.25)' : '#7d562d')
                              : (isDark ? 'transparent' : 'rgba(255, 255, 255, 0.5)'),
                            borderColor: selectedDiff === diff 
                              ? (isDark ? 'rgba(212, 163, 115, 0.5)' : '#7d562d')
                              : (isDark ? 'rgba(80, 69, 59, 0.3)' : 'rgba(125, 86, 45, 0.2)'),
                            color: selectedDiff === diff 
                              ? (isDark ? '#e8e1db' : '#ffffff')
                              : (isDark ? '#d4c4b7' : '#3c2820')
                          }}
                        >
                          {diff.charAt(0).toUpperCase() + diff.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    className="w-full py-3.5 rounded-full font-bold uppercase tracking-widest text-sm mb-5"
                    style={{
                      backgroundColor: isDark ? '#d4a373' : '#7d562d',
                      color: isDark ? '#482904' : '#ffffff',
                      boxShadow: isDark ? '0 10px 25px rgba(212, 163, 115, 0.2)' : '0 10px 25px rgba(125, 86, 45, 0.3)',
                      transition: 'all 350ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.03) translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1) translateY(0)'
                    }}
                    onMouseDown={(e) => {
                      e.currentTarget.style.transform = 'scale(0.95)'
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.transform = 'scale(1.03) translateY(-2px)'
                    }}
                  >
                    Play Now
                  </button>
                  
                  <div 
                    className="pt-5"
                    style={{ borderTop: isDark ? '1px solid rgba(80, 69, 59, 0.1)' : '1px solid #d4c4b0' }}
                  >
                    <label 
                      className="block mb-4 font-['Inter'] text-[0.6875rem] uppercase tracking-[0.1rem]"
                      style={{ color: isDark ? 'rgba(212, 196, 183, 0.8)' : '#6b5040' }}
                    >
                      Settings
                    </label>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium" style={{ color: isDark ? 'rgba(232, 225, 219, 0.8)' : '#3c2820' }}>
                        Auto-reset
                      </span>
                      <button
                        onClick={() => setAutoReset(!autoReset)}
                        className="w-11 h-6 rounded-full relative p-1 flex items-center"
                        style={{
                          backgroundColor: autoReset 
                            ? (isDark ? '#d4a373' : '#7d562d')
                            : (isDark ? '#373430' : '#f5efe6')
                        }}
                      >
                        <div 
                          className="w-4 h-4 rounded-full bg-white"
                          style={{
                            transform: autoReset ? 'translateX(20px)' : 'translateX(0)',
                            transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                          }}
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium" style={{ color: isDark ? 'rgba(232, 225, 219, 0.8)' : '#3c2820' }}>
                        Reset key
                      </span>
                      <span 
                        className="px-3 py-1.5 rounded-lg text-xs font-bold font-mono"
                        style={{
                          backgroundColor: isDark ? '#373430' : '#ffffff',
                          color: isDark ? '#d4a373' : '#7d562d',
                          border: isDark ? '1px solid rgba(80, 69, 59, 0.3)' : '1px solid #d4c4b0'
                        }}
                      >
                        R
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Survival Content */}
              {activeTab === 'survival' && (
                <div className="flex flex-col flex-grow">
                  <div className="mb-5">
                    <label 
                      className="block mb-3 font-['Inter'] text-[0.6875rem] uppercase tracking-[0.1rem]"
                      style={{ color: isDark ? 'rgba(212, 196, 183, 0.8)' : '#6b5040' }}
                    >
                      Lives
                    </label>
                    <div className="text-2xl font-bold" style={{ color: isDark ? '#ffb5b4' : '#a05a52' }}>
                      {'♥ ♥ ♥'}
                    </div>
                  </div>
                  
                  <div className="mb-5">
                    <label 
                      className="block mb-3 font-['Inter'] text-[0.6875rem] uppercase tracking-[0.1rem]"
                      style={{ color: isDark ? 'rgba(212, 196, 183, 0.8)' : '#6b5040' }}
                    >
                      Difficulty
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['easy', 'medium', 'hard', 'extreme'] as const).map((diff) => (
                        <button
                          key={diff}
                          onClick={() => setSelectedDiff(diff)}
                          className="border rounded-lg py-2.5 px-3 text-sm font-medium transition-all"
                          style={{
                            backgroundColor: selectedDiff === diff 
                              ? (isDark ? 'rgba(212, 163, 115, 0.25)' : '#7d562d')
                              : (isDark ? 'transparent' : 'rgba(255, 255, 255, 0.5)'),
                            borderColor: selectedDiff === diff 
                              ? (isDark ? 'rgba(212, 163, 115, 0.5)' : '#7d562d')
                              : (isDark ? 'rgba(80, 69, 59, 0.3)' : 'rgba(125, 86, 45, 0.2)'),
                            color: selectedDiff === diff 
                              ? (isDark ? '#e8e1db' : '#ffffff')
                              : (isDark ? '#d4c4b7' : '#3c2820')
                          }}
                        >
                          {diff.charAt(0).toUpperCase() + diff.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    className="w-full py-3.5 rounded-full font-bold uppercase tracking-widest text-sm mb-5"
                    style={{
                      backgroundColor: isDark ? '#d4a373' : '#7d562d',
                      color: isDark ? '#482904' : '#ffffff',
                      boxShadow: isDark ? '0 10px 25px rgba(212, 163, 115, 0.2)' : '0 10px 25px rgba(125, 86, 45, 0.3)',
                      transition: 'all 350ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.03) translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1) translateY(0)'
                    }}
                    onMouseDown={(e) => {
                      e.currentTarget.style.transform = 'scale(0.95)'
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.transform = 'scale(1.03) translateY(-2px)'
                    }}
                  >
                    Play Now
                  </button>
                  
                  <div 
                    className="pt-5"
                    style={{ borderTop: isDark ? '1px solid rgba(80, 69, 59, 0.1)' : '1px solid #d4c4b0' }}
                  >
                    <label 
                      className="block mb-4 font-['Inter'] text-[0.6875rem] uppercase tracking-[0.1rem]"
                      style={{ color: isDark ? 'rgba(212, 196, 183, 0.8)' : '#6b5040' }}
                    >
                      Settings
                    </label>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium" style={{ color: isDark ? 'rgba(232, 225, 219, 0.8)' : '#3c2820' }}>
                        Auto-reset
                      </span>
                      <button
                        onClick={() => setAutoReset(!autoReset)}
                        className="w-11 h-6 rounded-full relative p-1 flex items-center"
                        style={{
                          backgroundColor: autoReset 
                            ? (isDark ? '#d4a373' : '#7d562d')
                            : (isDark ? '#373430' : '#f5efe6')
                        }}
                      >
                        <div 
                          className="w-4 h-4 rounded-full bg-white"
                          style={{
                            transform: autoReset ? 'translateX(20px)' : 'translateX(0)',
                            transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                          }}
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium" style={{ color: isDark ? 'rgba(232, 225, 219, 0.8)' : '#3c2820' }}>
                        Reset key
                      </span>
                      <span 
                        className="px-3 py-1.5 rounded-lg text-xs font-bold font-mono"
                        style={{
                          backgroundColor: isDark ? '#373430' : '#ffffff',
                          color: isDark ? '#d4a373' : '#7d562d',
                          border: isDark ? '1px solid rgba(80, 69, 59, 0.3)' : '1px solid #d4c4b0'
                        }}
                      >
                        R
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* 1 Min Content */}
              {activeTab === 'onemin' && (
                <div className="flex flex-col flex-grow">
                  <div className="mb-5">
                    <label 
                      className="block mb-3 font-['Inter'] text-[0.6875rem] uppercase tracking-[0.1rem]"
                      style={{ color: isDark ? 'rgba(212, 196, 183, 0.8)' : '#6b5040' }}
                    >
                      Total Time
                    </label>
                    <div 
                      className="text-3xl font-bold font-mono"
                      style={{ color: isDark ? '#d4a373' : '#7d562d' }}
                    >
                      60s
                    </div>
                  </div>
                  
                  <div className="mb-5">
                    <label 
                      className="block mb-3 font-['Inter'] text-[0.6875rem] uppercase tracking-[0.1rem]"
                      style={{ color: isDark ? 'rgba(212, 196, 183, 0.8)' : '#6b5040' }}
                    >
                      Best Score
                    </label>
                    <div 
                      className="text-lg font-bold"
                      style={{ color: isDark ? '#e8e1db' : '#3c2820' }}
                    >
                      12 levels
                    </div>
                  </div>
                  
                  <button 
                    className="w-full py-3.5 rounded-full font-bold uppercase tracking-widest text-sm mb-5"
                    style={{
                      backgroundColor: isDark ? '#d4a373' : '#7d562d',
                      color: isDark ? '#482904' : '#ffffff',
                      boxShadow: isDark ? '0 10px 25px rgba(212, 163, 115, 0.2)' : '0 10px 25px rgba(125, 86, 45, 0.3)',
                      transition: 'all 350ms cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.03) translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1) translateY(0)'
                    }}
                    onMouseDown={(e) => {
                      e.currentTarget.style.transform = 'scale(0.95)'
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.transform = 'scale(1.03) translateY(-2px)'
                    }}
                  >
                    Play Now
                  </button>
                  
                  <div 
                    className="pt-5"
                    style={{ borderTop: isDark ? '1px solid rgba(80, 69, 59, 0.1)' : '1px solid #d4c4b0' }}
                  >
                    <label 
                      className="block mb-4 font-['Inter'] text-[0.6875rem] uppercase tracking-[0.1rem]"
                      style={{ color: isDark ? 'rgba(212, 196, 183, 0.8)' : '#6b5040' }}
                    >
                      Settings
                    </label>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium" style={{ color: isDark ? 'rgba(232, 225, 219, 0.8)' : '#3c2820' }}>
                        Auto-reset
                      </span>
                      <button
                        onClick={() => setAutoReset(!autoReset)}
                        className="w-11 h-6 rounded-full relative p-1 flex items-center"
                        style={{
                          backgroundColor: autoReset 
                            ? (isDark ? '#d4a373' : '#7d562d')
                            : (isDark ? '#373430' : '#f5efe6')
                        }}
                      >
                        <div 
                          className="w-4 h-4 rounded-full bg-white"
                          style={{
                            transform: autoReset ? 'translateX(20px)' : 'translateX(0)',
                            transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                          }}
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium" style={{ color: isDark ? 'rgba(232, 225, 219, 0.8)' : '#3c2820' }}>
                        Reset key
                      </span>
                      <span 
                        className="px-3 py-1.5 rounded-lg text-xs font-bold font-mono"
                        style={{
                          backgroundColor: isDark ? '#373430' : '#ffffff',
                          color: isDark ? '#d4a373' : '#7d562d',
                          border: isDark ? '1px solid rgba(80, 69, 59, 0.3)' : '1px solid #d4c4b0'
                        }}
                      >
                        R
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
