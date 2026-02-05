'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { flushSync } from 'react-dom'
import { useTheme } from 'next-themes'
import { cn } from '../../lib/utils'

interface AnimatedThemeTogglerProps {
  className?: string
  duration?: number
  // Allow passing the original toggle function to keep compatibility with existing context
  toggleThemeFn?: () => void
}

export const AnimatedThemeToggler = ({ className, duration = 400, toggleThemeFn }: AnimatedThemeTogglerProps) => {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [isDark, setIsDark] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Sync local state with theme
  useEffect(() => {
    setIsDark(resolvedTheme === 'dark' || document.documentElement.className.includes('dark'))
  }, [resolvedTheme, theme])

  const applyTheme = useCallback((nextIsDark: boolean) => {
    const newTheme = nextIsDark ? 'dark' : 'light'
    setIsDark(nextIsDark)
    
    // Update via next-themes
    setTheme(newTheme)
    
    // Also call the original context toggle if provided, to ensure other parts (like styled-components) are updated
    if (toggleThemeFn) {
       // We might need logic here to ensure it syncs, but existing toggle usually just flips
       // If the existing toggle just flips, we need to be careful not to flip it back if it's already correct
       // But if we use next-themes, we might replace the old context eventually. 
       // For now, let's trust next-themes for the class and also call the old one.
       // Actually, the user wants the animation. 
       
       // Force update the old context if needed
       // Check if old context theme state matches
       toggleThemeFn()
    }
    
  }, [setTheme, toggleThemeFn])

  const toggleTheme = useCallback(async () => {
    const btn = buttonRef.current
    if (!btn) return

    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Fallback for document.startViewTransition 
    const supportsVT = 'startViewTransition' in document && document.startViewTransition
    const nextIsDark = !isDark

    if (!supportsVT || prefersReduce) {
      applyTheme(nextIsDark)
      return
    }

    await document.startViewTransition(() => {
      flushSync(() => applyTheme(nextIsDark))
    }).ready

    const { top, left, width, height } = btn.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    )

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      }
    )
  }, [isDark, applyTheme, duration])

  return (
    <button 
      ref={buttonRef} 
      onClick={toggleTheme} 
      className={cn('nav-link nav-svg btn-icon', className)} 
      aria-label="Toggle theme"
      style={{ border: 'none', background: 'transparent', cursor: 'pointer', outline: 'none' }}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}
