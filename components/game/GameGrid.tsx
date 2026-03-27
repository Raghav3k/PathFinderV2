'use client'

import { useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GameGridProps {
  gridSize: number
  path: [number, number][]
  isShowingPath: boolean
  userPath: [number, number][]
  onCellClick: (row: number, col: number) => void
  gameState: 'idle' | 'showing' | 'input' | 'won' | 'lost'
}

export function GameGrid({
  gridSize,
  path,
  isShowingPath,
  userPath,
  onCellClick,
  gameState,
}: GameGridProps) {
  const pathSet = new Set(path.map(([r, c]) => `${r},${c}`))
  const userPathSet = new Set(userPath.map(([r, c]) => `${r},${c}`))
  const isStart = (row: number, col: number) => row === 0 && col === 0
  const isEnd = (row: number, col: number) => row === gridSize - 1 && col === gridSize - 1
  const isInPath = (row: number, col: number) => pathSet.has(`${row},${col}`)
  const isInUserPath = (row: number, col: number) => userPathSet.has(`${row},${col}`)
  
  // Calculate cell size based on grid size
  const getCellSize = () => {
    if (gridSize <= 4) return 'w-20 h-20 text-2xl'
    if (gridSize <= 6) return 'w-16 h-16 text-xl'
    if (gridSize <= 8) return 'w-14 h-14 text-lg'
    return 'w-12 h-12 text-base'
  }

  const getGap = () => {
    if (gridSize <= 4) return 'gap-3'
    if (gridSize <= 6) return 'gap-2.5'
    return 'gap-2'
  }

  return (
    <div
      className={cn(
        'bg-surface-container p-4 sm:p-6 rounded-2xl border border-outline-variant/10 shadow-lg',
        'inline-block'
      )}
    >
      <div
        className={cn('grid', getGap())}
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: gridSize * gridSize }).map((_, index) => {
          const row = Math.floor(index / gridSize)
          const col = index % gridSize
          const cellIsStart = isStart(row, col)
          const cellIsEnd = isEnd(row, col)
          const cellIsInPath = isInPath(row, col)
          const cellIsInUserPath = isInUserPath(row, col)
          
          // Determine cell state for animation
          const showPathLit = gameState === 'showing' && cellIsInPath && !cellIsStart && !cellIsEnd
          const showUserSelected = gameState === 'input' && cellIsInUserPath
          
          return (
            <motion.button
              key={index}
              onClick={() => onCellClick(row, col)}
              disabled={gameState !== 'input'}
              className={cn(
                'rounded-xl spring-transition flex items-center justify-center font-semibold',
                'hover:scale-[0.95] active:scale-90',
                getCellSize(),
                cellIsStart && 'start-cell text-on-secondary-container',
                cellIsEnd && 'end-cell text-on-tertiary-container',
                !cellIsStart && !cellIsEnd && 'bg-surface-container-high text-on-surface',
                showUserSelected && 'bg-primary-container text-on-primary-container',
                gameState !== 'input' && 'cursor-default',
                gameState === 'input' && !cellIsStart && !cellIsEnd && 'cursor-pointer'
              )}
              initial={false}
              animate={{
                scale: showPathLit ? 1.05 : 1,
                backgroundColor: showPathLit 
                  ? 'var(--primary-container)' 
                  : showUserSelected 
                    ? 'var(--primary-container)'
                    : cellIsStart 
                      ? 'var(--secondary-container)'
                      : cellIsEnd 
                        ? 'var(--tertiary-container)'
                        : 'var(--surface-container-high)',
              }}
              transition={{ duration: 0.3 }}
            >
              {cellIsStart ? (
                <span className="material-symbols-outlined filled">play_arrow</span>
              ) : cellIsEnd ? (
                <span className="material-symbols-outlined filled">flag</span>
              ) : (
                Math.floor(Math.random() * 9) + 1
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
