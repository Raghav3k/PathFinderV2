'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { GameMode, Difficulty } from '@/lib/game/types'

interface GameOptionsPanelProps {
  selectedMode: GameMode
  selectedDifficulty: Difficulty
  onModeChange: (mode: GameMode) => void
  onDifficultyChange: (difficulty: Difficulty) => void
  onPlay: () => void
  autoReset: boolean
  onAutoResetChange: (value: boolean) => void
}

const modes: { id: GameMode; label: string }[] = [
  { id: 'classic', label: 'Classic' },
  { id: 'survival', label: 'Survival' },
  { id: 'onemin', label: '1 Min' },
]

const difficulties: { id: Difficulty; label: string }[] = [
  { id: 'easy', label: 'Easy' },
  { id: 'medium', label: 'Medium' },
  { id: 'hard', label: 'Hard' },
  { id: 'extreme', label: 'Extreme' },
]

export function GameOptionsPanel({
  selectedMode,
  selectedDifficulty,
  onModeChange,
  onDifficultyChange,
  onPlay,
  autoReset,
  onAutoResetChange,
}: GameOptionsPanelProps) {
  const [activeTab, setActiveTab] = useState<GameMode>(selectedMode)

  const handleModeChange = (mode: GameMode) => {
    setActiveTab(mode)
    onModeChange(mode)
  }

  const getModeContent = () => {
    switch (activeTab) {
      case 'classic':
        return (
          <div className="space-y-5">
            <div>
              <label className="font-body text-[0.6875rem] uppercase tracking-[0.1rem] text-on-surface-variant block mb-3">
                Difficulty
              </label>
              <div className="grid grid-cols-2 gap-2">
                {difficulties.map((diff) => (
                  <button
                    key={diff.id}
                    onClick={() => onDifficultyChange(diff.id)}
                    className={cn(
                      'difficulty-option border rounded-lg py-2.5 px-3 text-sm font-medium transition-all',
                      selectedDifficulty === diff.id
                        ? 'selected border-primary bg-primary text-on-primary'
                        : 'border-outline-variant/30 text-on-surface hover:border-primary/50'
                    )}
                  >
                    {diff.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
      case 'survival':
        return (
          <div className="space-y-5">
            <div>
              <label className="font-body text-[0.6875rem] uppercase tracking-[0.1rem] text-on-surface-variant block mb-3">
                Lives
              </label>
              <div className="text-2xl font-bold text-tertiary flex gap-1">
                {'♥'.repeat(3).split('').map((heart, i) => (
                  <span key={i}>{heart}</span>
                ))}
              </div>
            </div>
            <div>
              <label className="font-body text-[0.6875rem] uppercase tracking-[0.1rem] text-on-surface-variant block mb-3">
                Difficulty
              </label>
              <div className="grid grid-cols-2 gap-2">
                {difficulties.map((diff) => (
                  <button
                    key={diff.id}
                    onClick={() => onDifficultyChange(diff.id)}
                    className={cn(
                      'difficulty-option border rounded-lg py-2.5 px-3 text-sm font-medium transition-all',
                      selectedDifficulty === diff.id
                        ? 'selected border-primary bg-primary text-on-primary'
                        : 'border-outline-variant/30 text-on-surface hover:border-primary/50'
                    )}
                  >
                    {diff.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )
      case 'onemin':
        return (
          <div className="space-y-5">
            <div>
              <label className="font-body text-[0.6875rem] uppercase tracking-[0.1rem] text-on-surface-variant block mb-3">
                Total Time
              </label>
              <div className="text-3xl font-bold text-primary font-mono">60s</div>
            </div>
            <div>
              <label className="font-body text-[0.6875rem] uppercase tracking-[0.1rem] text-on-surface-variant block mb-3">
                Best Score
              </label>
              <div className="text-lg font-bold text-on-surface">12 levels</div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="w-[300px] bg-surface-container rounded-2xl flex flex-col overflow-hidden border border-outline-variant/10 shadow-lg">
      {/* Mode Tabs */}
      <div className="flex p-3 bg-surface-container-lowest/50 border-b border-outline-variant/5 flex-shrink-0">
        <div className="relative flex w-full bg-surface-container rounded-full p-1">
          <motion.div
            className="absolute top-1 bottom-1 bg-primary-container rounded-full shadow-md z-0"
            initial={false}
            animate={{
              left: activeTab === 'classic' ? '4px' : activeTab === 'survival' ? '33.33%' : '66.66%',
              width: '32%',
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => handleModeChange(mode.id)}
              className={cn(
                'tab-btn relative z-10 w-1/3 text-[10px] font-bold uppercase tracking-tighter py-2 transition-colors',
                activeTab === mode.id ? 'text-on-primary-container' : 'text-on-surface-variant'
              )}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col">
        {getModeContent()}

        {/* Play Button */}
        <button
          onClick={onPlay}
          className="w-full py-3.5 mt-5 bg-primary-container text-on-primary-container rounded-full font-bold uppercase tracking-widest text-sm shadow-lg shadow-primary-container/20 spring-transition hover:scale-[1.03] hover:-translate-y-0.5 active:scale-95"
        >
          Play Now
        </button>

        {/* Settings */}
        <div className="border-t border-outline-variant/10 pt-5 mt-5">
          <label className="font-body text-[0.6875rem] uppercase tracking-[0.1rem] text-on-surface-variant block mb-4">
            Settings
          </label>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-on-surface/80">Auto-reset</span>
            <button
              onClick={() => onAutoResetChange(!autoReset)}
              className={cn(
                'w-11 h-6 rounded-full relative p-1 flex items-center transition-colors',
                autoReset ? 'bg-primary-container' : 'bg-surface-container-highest'
              )}
            >
              <motion.div
                className="w-4 h-4 bg-on-primary-container rounded-full"
                animate={{ x: autoReset ? 20 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-on-surface/80">Reset key</span>
            <span className="bg-surface-container-highest px-3 py-1.5 rounded-lg text-xs font-bold border border-outline-variant/30 text-primary font-mono">
              R
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
