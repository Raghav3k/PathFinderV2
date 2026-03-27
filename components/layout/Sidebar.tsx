'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface NavItem {
  icon: string
  label: string
  href: string
  filled?: boolean
}

const navItems: NavItem[] = [
  { icon: 'videogame_asset', label: 'Play', href: '/game', filled: true },
  { icon: 'leaderboard', label: 'Leaderboard', href: '/leaderboard' },
  { icon: 'settings', label: 'Settings', href: '/settings' },
]

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const pathname = usePathname()

  const handleSidebarClick = (e: React.MouseEvent) => {
    if (!isExpanded) {
      e.stopPropagation()
      setIsExpanded(true)
    }
  }

  const handleDocumentClick = () => {
    if (isExpanded) {
      setIsExpanded(false)
    }
  }

  return (
    <>
      <aside
        onClick={handleSidebarClick}
        className={cn(
          'sidebar h-screen fixed left-0 top-0 flex flex-col py-4 z-50 pt-20 cursor-pointer',
          'bg-surface-container-low/85 backdrop-blur-md border-r border-outline-variant/20',
          isExpanded ? 'expanded' : 'collapsed'
        )}
      >
        <nav className="flex flex-col gap-2 flex-grow px-3">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  'flex items-center gap-3 spring-transition py-3 px-3 rounded-xl group',
                  isActive
                    ? 'text-primary font-bold bg-surface-container-high/50'
                    : 'text-on-surface-variant/60 hover:bg-surface-container-high/50 hover:text-on-surface-variant'
                )}
              >
                <span
                  className={cn(
                    'material-symbols-outlined flex-shrink-0 text-xl',
                    item.filled && 'filled'
                  )}
                >
                  {item.icon}
                </span>
                <span className="sidebar-text font-body text-[0.75rem] tracking-[0.05rem] uppercase">
                  {item.label}
                </span>
              </Link>
            )
          })}
        </nav>
        
        <div className="mt-auto px-3 pb-4">
          <Link
            href="/profile"
            onClick={(e) => e.stopPropagation()}
            className={cn(
              'flex items-center gap-3 spring-transition py-3 px-3 rounded-xl group w-full',
              pathname === '/profile'
                ? 'text-primary font-bold bg-surface-container-high/50'
                : 'text-on-surface-variant/60 hover:bg-surface-container-high/50 hover:text-on-surface-variant'
            )}
          >
            <span className="material-symbols-outlined flex-shrink-0 text-2xl">
              account_circle
            </span>
            <span className="sidebar-text font-body text-[0.75rem] tracking-[0.05rem] uppercase">
              Profile
            </span>
          </Link>
        </div>
      </aside>
      
      {/* Click outside to collapse */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-40"
          onClick={handleDocumentClick}
        />
      )}
    </>
  )
}
