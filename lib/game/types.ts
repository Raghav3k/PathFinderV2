export type GameMode = 'classic' | 'survival' | 'onemin'
export type Difficulty = 'easy' | 'medium' | 'hard' | 'extreme'

export interface GameState {
  mode: GameMode
  difficulty: Difficulty
  gridSize: number
  score: number
  lives: number
  timeRemaining: number
  level: number
  isPlaying: boolean
  isShowingPath: boolean
}

export interface PathCell {
  row: number
  col: number
}

export interface GameResult {
  success: boolean
  score: number
  timeSeconds: number
  isPerfect: boolean
  livesRemaining?: number
}

export interface UserStats {
  totalGames: number
  levelsCompleted: number
  bestScore: number
  classicProgress: Record<number, number> // gridSize -> stars
}

export interface GameRecord {
  id: string
  mode: GameMode
  grid_size: number
  score: number
  is_perfect: boolean
  created_at: string
}
