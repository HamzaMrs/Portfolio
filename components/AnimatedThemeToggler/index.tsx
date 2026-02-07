'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { flushSync } from 'react-dom'
import { useTheme } from 'next-themes'
import { cn } from '../../lib/utils'

interface AnimatedThemeTogglerProps {
  className?: string
  duration?: number
  toggleThemeFn?: () => void
}

export const AnimatedThemeToggler = ({ className, duration = 500, toggleThemeFn }: AnimatedThemeTogglerProps) => {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [isDark, setIsDark] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Sync local state with theme
  useEffect(() => {
    setIsDark(resolvedTheme === 'dark' || document.documentElement.className.includes('dark'))
  }, [resolvedTheme, theme])

  const applyTheme = useCallback((nextIsDark: boolean) => {
    const newTheme = nextIsDark ? 'dark' : 'light'
    setIsDark(nextIsDark)
    setTheme(newTheme)
    
    if (toggleThemeFn) {
      toggleThemeFn()
    }
  }, [setTheme, toggleThemeFn])

  const toggleTheme = useCallback(async () => {
    if (isAnimating) return
    
    const btn = buttonRef.current
    if (!btn) return

    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const supportsVT = typeof document.startViewTransition === 'function'
    const nextIsDark = !isDark

    if (!supportsVT || prefersReduce) {
      applyTheme(nextIsDark)
      return
    }

    setIsAnimating(true)

    try {
      const transition = document.startViewTransition!(() => {
        flushSync(() => applyTheme(nextIsDark))
      })

      await transition.ready

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
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      )

      await transition.finished
    } catch {
      applyTheme(nextIsDark)
    } finally {
      setIsAnimating(false)
    }
  }, [isDark, applyTheme, duration, isAnimating])

  return (
    <button 
      ref={buttonRef} 
      onClick={toggleTheme} 
      className={cn('nav-link nav-svg btn-icon', className)} 
      aria-label="Toggle theme"
      disabled={isAnimating}
      style={{ 
        border: 'none', 
        background: 'transparent', 
        cursor: isAnimating ? 'wait' : 'pointer', 
        outline: 'none',
        transition: 'transform 0.3s ease, opacity 0.2s ease',
        transform: isAnimating ? 'scale(1.2) rotate(180deg)' : 'scale(1)',
      }}
    >
      <span style={{
        display: 'inline-block',
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isDark ? 'rotate(0deg)' : 'rotate(-90deg)',
      }}>
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </span>
    </button>
  )
}
