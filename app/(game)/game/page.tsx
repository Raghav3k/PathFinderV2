'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GameGrid } from '@/components/game/GameGrid'
import { GameOptionsPanel } from '@/components/game/GameOptionsPanel'
import { generateRandomPath, getGridSize, cn } from '@/lib/utils'
import type { GameMode, Difficulty } from '@/lib/game/types'

export default function GamePage() {
  // Game configuration
  const [selectedMode, setSelectedMode] = useState<GameMode>('classic')
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('easy')
  const [autoReset, setAutoReset] = useState(true)
  
  // Game state
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'showing' | 'input' | 'won' | 'lost'>('menu')
  const [gridSize, setGridSize] = useState(4)
  const [path, setPath] = useState<[number, number][]>([])
  const [userPath, setUserPath] = useState<[number, number][]>([])
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [timeRemaining, setTimeRemaining] = useState(60)
  const [level, setLevel] = useState(1)
  
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Start a new game
  const startGame = useCallback(() => {
    const size = getGridSize(selectedDifficulty)
    setGridSize(size)
    const newPath = generateRandomPath(size)
    setPath(newPath)
    setUserPath([[0, 0]]) // Start at 0,0
    setGameState('showing')
    setLives(3)
    setTimeRemaining(60)
    setLevel(1)
    setScore(0)
  }, [selectedDifficulty])

  // Show path animation
  useEffect(() => {
    if (gameState === 'showing') {
      const showDuration = path.length * 300 + 1000
      
      gameLoopRef.current = setTimeout(() => {
        setGameState('input')
      }, showDuration)
      
      return () => {
        if (gameLoopRef.current) clearTimeout(gameLoopRef.current)
      }
    }
  }, [gameState, path])

  // Timer for survival and 1-min modes
  useEffect(() => {
    if (gameState === 'input' || gameState === 'showing') {
      if (selectedMode === 'survival' || selectedMode === 'onemin') {
        timerRef.current = setInterval(() => {
          setTimeRemaining((prev) => {
            if (prev <= 1) {
              setGameState('lost')
              return 0
            }
            return prev - 1
          })
        }, 1000)
        
        return () => {
          if (timerRef.current) clearInterval(timerRef.current)
        }
      }
    }
  }, [gameState, selectedMode])

  // Handle cell click
  const handleCellClick = useCallback((row: number, col: number) => {
    if (gameState !== 'input') return
    
    const lastPos = userPath[userPath.length - 1]
    const isAdjacent = 
      (Math.abs(row - lastPos[0]) === 1 && col === lastPos[1]) ||
      (Math.abs(col - lastPos[1]) === 1 && row === lastPos[0])
    
    if (!isAdjacent) return
    
    const newUserPath = [...userPath, [row, col] as [number, number]]
    setUserPath(newUserPath)
    
    // Check if reached end
    if (row === gridSize - 1 && col === gridSize - 1) {
      // Check if path matches
      const isCorrect = newUserPath.every((pos, idx) => 
        path[idx] && pos[0] === path[idx][0] && pos[1] === path[idx][1]
      )
      
      if (isCorrect && newUserPath.length === path.length) {
        setScore(s => s + level * 100 + timeRemaining * 10)
        setGameState('won')
        
        if (autoReset) {
          setTimeout(() => {
            setLevel(l => l + 1)
            const newPath = generateRandomPath(gridSize)
            setPath(newPath)
            setUserPath([[0, 0]])
            setGameState('showing')
          }, 1000)
        }
      } else {
        handleWrongPath()
      }
    }
  }, [gameState, userPath, path, gridSize, level, timeRemaining, autoReset])

  const handleWrongPath = () => {
    if (selectedMode === 'survival') {
      setLives(l => {
        const newLives = l - 1
        if (newLives <= 0) {
          setGameState('lost')
        } else if (autoReset) {
          setTimeout(() => {
            const newPath = generateRandomPath(gridSize)
            setPath(newPath)
            setUserPath([[0, 0]])
            setGameState('showing')
          }, 1000)
        }
        return newLives
      })
    } else {
      setGameState('lost')
    }
  }

  // Reset to menu
  const resetGame = () => {
    setGameState('menu')
    setUserPath([])
    setPath([])
    if (timerRef.current) clearInterval(timerRef.current)
    if (gameLoopRef.current) clearTimeout(gameLoopRef.current)
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-8">
      <AnimatePresence mode="wait">
        {gameState === 'menu' ? (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-start gap-8"
          >
            {/* Preview Grid */}
            <div className="hidden lg:block">
              <div className="bg-surface-container p-6 rounded-2xl border border-outline-variant/10 shadow-lg">
                <div className="grid grid-cols-8 grid-rows-8 gap-2" style={{ width: '400px', height: '400px' }}>
                  {Array.from({ length: 64 }).map((_, i) => {
                    const row = Math.floor(i / 8)
                    const col = i % 8
                    const isStart = row === 0 && col === 0
                    const isEnd = row === 7 && col === 7
                    
                    return (
                      <motion.div
                        key={i}
                        className={cn(
                          'rounded-lg flex items-center justify-center text-sm font-semibold',
                          isStart && 'start-cell',
                          isEnd && 'end-cell',
                          !isStart && !isEnd && 'bg-surface-container-high'
                        )}
                        animate={{
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: (row + col) * 0.1,
                        }}
                      >
                        {!isStart && !isEnd && Math.floor(Math.random() * 9) + 1}
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Options Panel */}
            <GameOptionsPanel
              selectedMode={selectedMode}
              selectedDifficulty={selectedDifficulty}
              onModeChange={setSelectedMode}
              onDifficultyChange={setSelectedDifficulty}
              onPlay={startGame}
              autoReset={autoReset}
              onAutoResetChange={setAutoReset}
            />
          </motion.div>
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center gap-6"
          >
            {/* Game Stats */}
            <div className="flex items-center gap-8 text-on-surface-variant">
              <div className="text-center">
                <div className="text-xs uppercase tracking-wider">Score</div>
                <div className="text-2xl font-bold text-primary">{score.toLocaleString()}</div>
              </div>
              {(selectedMode === 'survival' || selectedMode === 'onemin') && (
                <div className="text-center">
                  <div className="text-xs uppercase tracking-wider">Time</div>
                  <div className={cn(
                    "text-2xl font-bold font-mono",
                    timeRemaining < 10 ? 'text-error' : 'text-on-surface'
                  )}>
                    {timeRemaining}s
                  </div>
                </div>
              )}
              {selectedMode === 'survival' && (
                <div className="text-center">
                  <div className="text-xs uppercase tracking-wider">Lives</div>
                  <div className="text-2xl font-bold text-tertiary">
                    {'♥'.repeat(lives)}
                  </div>
                </div>
              )}
              <div className="text-center">
                <div className="text-xs uppercase tracking-wider">Level</div>
                <div className="text-2xl font-bold text-secondary">{level}</div>
              </div>
            </div>

            {/* Game Status */}
            <div className="h-8 text-center">
              {gameState === 'showing' && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-on-surface-variant"
                >
                  Watch the path...
                </motion.span>
              )}
              {gameState === 'input' && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-primary font-medium"
                >
                  Trace the path!
                </motion.span>
              )}
              {gameState === 'won' && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-secondary font-bold"
                >
                  ✓ Perfect!
                </motion.span>
              )}
              {gameState === 'lost' && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-error font-bold"
                >
                  ✗ Game Over
                </motion.span>
              )}
            </div>

            {/* Game Grid */}
            <GameGrid
              gridSize={gridSize}
              path={path}
              isShowingPath={gameState === 'showing'}
              userPath={userPath}
              onCellClick={handleCellClick}
              gameState={gameState}
            />

            {/* Controls */}
            <div className="flex gap-4">
              <button
                onClick={resetGame}
                className="px-6 py-2 rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors"
              >
                Menu
              </button>
              {(gameState === 'won' || gameState === 'lost') && !autoReset && (
                <button
                  onClick={startGame}
                  className="px-6 py-2 rounded-full bg-primary-container text-on-primary-container font-medium hover:opacity-90 transition-opacity"
                >
                  Play Again
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
