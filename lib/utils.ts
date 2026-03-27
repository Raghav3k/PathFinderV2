import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Spring transition for animations
export const springTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 25,
} as const

// Generate a random path for the grid
export function generateRandomPath(gridSize: number): [number, number][] {
  const path: [number, number][] = [[0, 0]]
  let row = 0, col = 0
  
  while (row < gridSize - 1 || col < gridSize - 1) {
    const moves: string[] = []
    if (row < gridSize - 1) moves.push('down')
    if (col < gridSize - 1) moves.push('right')
    if (row < gridSize - 1 && col > 0 && Math.random() > 0.7) moves.push('downleft')
    if (col < gridSize - 1 && row > 0 && Math.random() > 0.7) moves.push('rightup')
    
    const move = moves[Math.floor(Math.random() * moves.length)]
    
    if (move === 'down') row++
    else if (move === 'right') col++
    else if (move === 'downleft') { row++; col-- }
    else if (move === 'rightup') { row--; col++ }
    
    // Ensure within bounds
    row = Math.max(0, Math.min(gridSize - 1, row))
    col = Math.max(0, Math.min(gridSize - 1, col))
    
    // Avoid duplicates
    const lastPos = path[path.length - 1]
    if (lastPos[0] !== row || lastPos[1] !== col) {
      path.push([row, col])
    }
  }
  
  return path
}

// Calculate grid size based on difficulty
export function getGridSize(difficulty: 'easy' | 'medium' | 'hard' | 'extreme'): number {
  switch (difficulty) {
    case 'easy': return 4
    case 'medium': return 6
    case 'hard': return 8
    case 'extreme': return 10
    default: return 6
  }
}

// Format time in seconds to mm:ss
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
