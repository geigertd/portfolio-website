import { useState, useEffect } from 'react'

// This hook manages the dark/light mode toggle.
// It persists the user's preference in localStorage so it survives page reloads.
// It also reads the OS preference on first visit (prefers-color-scheme).
export function useDarkMode() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    // Check localStorage first (returning visitor)
    const stored = localStorage.getItem('theme')
    if (stored) return stored === 'dark'
    // Fall back to OS-level preference (first visit)
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      // Tailwind's dark mode requires the 'dark' class on the <html> element
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  const toggle = () => setIsDark(prev => !prev)

  return { isDark, toggle }
}
