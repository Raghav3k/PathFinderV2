'use client'

import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

interface GameLayoutProps {
  children: React.ReactNode
}

export function GameLayout({ children }: GameLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Sidebar />
      
      <main
        className="min-h-screen transition-all duration-300 pt-16"
        style={{ marginLeft: '72px' }}
      >
        {children}
      </main>
    </div>
  )
}
