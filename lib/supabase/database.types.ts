export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      games: {
        Row: {
          id: string
          user_id: string | null
          mode: 'classic' | 'survival' | 'onemin'
          grid_size: number
          score: number
          is_perfect: boolean
          time_seconds: number | null
          lives_remaining: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          mode: 'classic' | 'survival' | 'onemin'
          grid_size: number
          score: number
          is_perfect?: boolean
          time_seconds?: number | null
          lives_remaining?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          mode?: 'classic' | 'survival' | 'onemin'
          grid_size?: number
          score?: number
          is_perfect?: boolean
          time_seconds?: number | null
          lives_remaining?: number | null
          created_at?: string
        }
      }
      classic_progress: {
        Row: {
          id: string
          user_id: string
          grid_size: number
          stars: number
          best_time_seconds: number | null
          completed_at: string
        }
        Insert: {
          id?: string
          user_id: string
          grid_size: number
          stars?: number
          best_time_seconds?: number | null
          completed_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          grid_size?: number
          stars?: number
          best_time_seconds?: number | null
          completed_at?: string
        }
      }
    }
    Views: {
      leaderboard_survival: {
        Row: {
          user_id: string | null
          username: string | null
          total_score: number | null
          max_level: number | null
          games_played: number | null
        }
      }
      leaderboard_classic: {
        Row: {
          user_id: string | null
          username: string | null
          total_stars: number | null
          levels_completed: number | null
        }
      }
    }
    Functions: {}
    Enums: {}
  }
}
