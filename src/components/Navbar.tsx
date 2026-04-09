import { useState } from 'react'
import type { Translation } from '../types/i18n'

interface NavbarProps {
  t: Translation
  isDark: boolean
  onToggleDark: () => void
  lang: string
  onToggleLang: () => void
}

export function Navbar({ t, isDark, onToggleDark, lang, onToggleLang }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.skills, href: '#skills' },
    { label: t.nav.contact, href: '#contact' },
  ]

  return (
    // Outer header: fixed, floats 16px from the top, centers the pill
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">

      {/* The pill itself — this is the visible navbar bubble */}
      <div className="relative w-full max-w-2xl">
        <nav className="
          flex items-center justify-between gap-2 px-3 h-12
          rounded-full
          bg-white/90 dark:bg-slate-900/90
          backdrop-blur-md
          shadow-lg shadow-slate-200/50 dark:shadow-black/40
          border border-slate-200/80 dark:border-slate-700/60
        ">

          {/* Logo / Name */}
          <a
            href="#"
            className="shrink-0 text-sm font-bold text-slate-900 dark:text-slate-100 tracking-tight hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors px-2"
          >
            DG
          </a>

          {/* Desktop nav links — pill buttons */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="
                    inline-block rounded-full px-4 py-1.5
                    text-sm font-medium
                    text-slate-600 dark:text-slate-400
                    hover:bg-slate-100 dark:hover:bg-slate-800
                    hover:text-emerald-600 dark:hover:text-emerald-400
                    transition-colors
                  "
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right-side controls */}
          <div className="flex items-center gap-1.5 shrink-0">

            {/* Language toggle — pill */}
            <button
              onClick={onToggleLang}
              aria-label="Toggle language"
              className="
                rounded-full px-3 py-1 text-xs font-semibold
                border border-slate-200 dark:border-slate-700
                text-slate-600 dark:text-slate-400
                hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400
                transition-colors
              "
            >
              {lang === 'en' ? 'DE' : 'EN'}
            </button>

            {/* Dark mode toggle — circular pill */}
            <button
              onClick={onToggleDark}
              aria-label="Toggle dark mode"
              className="
                w-8 h-8 flex items-center justify-center rounded-full
                text-slate-500 dark:text-slate-400
                hover:bg-slate-100 dark:hover:bg-slate-800
                hover:text-emerald-600 dark:hover:text-emerald-400
                transition-colors
              "
            >
              {isDark ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            {/* Mobile hamburger — circular pill */}
            <button
              onClick={() => setMenuOpen(prev => !prev)}
              aria-label="Toggle menu"
              className="
                md:hidden w-8 h-8 flex items-center justify-center rounded-full
                text-slate-500 dark:text-slate-400
                hover:bg-slate-100 dark:hover:bg-slate-800
                transition-colors
              "
            >
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile dropdown — rounded card floats below the pill */}
        {menuOpen && (
          <div className="
            absolute top-[3.5rem] left-0 right-0
            rounded-2xl
            bg-white dark:bg-slate-900
            border border-slate-200 dark:border-slate-700
            shadow-xl shadow-slate-200/50 dark:shadow-black/40
            px-3 py-3
          ">
            <ul className="flex flex-col gap-1">
              {navLinks.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="
                      block rounded-xl px-4 py-2.5
                      text-sm font-medium
                      text-slate-600 dark:text-slate-400
                      hover:bg-slate-100 dark:hover:bg-slate-800
                      hover:text-emerald-600 dark:hover:text-emerald-400
                      transition-colors
                    "
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}
