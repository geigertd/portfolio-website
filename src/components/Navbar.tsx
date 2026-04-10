import { useState, useRef, useEffect } from 'react'
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
  const [bubble, setBubble] = useState({ left: 0, width: 0, visible: false })
  // Tracks which href is currently "active" — used for aria-current
  const [activeHref, setActiveHref] = useState<string | null>(null)

  // Ref to the <ul> container — used to compute bubble's relative position
  const navListRef = useRef<HTMLUListElement>(null)

  // Map of href → <a> element — so we can measure any link on demand (e.g. on scroll)
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map())

  // Ref to the mobile dropdown — used for outside-click and Escape handling
  const menuRef = useRef<HTMLDivElement>(null)

  // Ref to the hamburger button — excluded from outside-click check so toggling works
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  // Ref to the first mobile link — receives focus when menu opens (keyboard accessibility)
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null)

  // When a nav link is clicked we programmatically scroll the page. During that
  // scroll the IntersectionObserver fires for sections it passes through, which
  // would incorrectly move the bubble away from the clicked link. This flag
  // suppresses observer updates for ~800ms after a click (covers scroll duration).
  const scrollingFromClick = useRef(false)

  const navLinks = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.skills, href: '#skills' },
    { label: t.nav.contact, href: '#contact' },
  ]

  // Moves the bubble to whichever link corresponds to the given href
  const moveBubbleTo = (href: string) => {
    const link = linkRefs.current.get(href)
    const nav = navListRef.current
    if (!link || !nav) return
    const navRect = nav.getBoundingClientRect()
    const linkRect = link.getBoundingClientRect()
    setActiveHref(href)
    setBubble({
      left: linkRect.left - navRect.left,
      width: linkRect.width,
      visible: true,
    })
  }

  const handleNavClick = (_e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    moveBubbleTo(href)
    scrollingFromClick.current = true
    setTimeout(() => { scrollingFromClick.current = false }, 800)
  }

  // Re-measure the bubble after a language switch — translated labels have different
  // widths, so the old pixel measurements are stale and need to be recalculated.
  useEffect(() => {
    if (activeHref) moveBubbleTo(activeHref)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]) // intentionally only on lang change; activeHref/refs are stable at this point

  // IntersectionObserver — watches each section and moves the bubble when a
  // section crosses the midpoint of the viewport (rootMargin "-50% 0px -50% 0px"
  // creates an invisible horizontal line at the center; whichever section crosses
  // it becomes "active").
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !scrollingFromClick.current) {
            moveBubbleTo(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )

    // Observe each section by its id
    const sectionIds = ['about', 'projects', 'skills', 'contact']
    sectionIds.forEach(id => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // stable refs and setState — safe with empty deps

  // Close menu when clicking outside of it (but not the hamburger button itself)
  useEffect(() => {
    if (!menuOpen) return
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        hamburgerRef.current && !hamburgerRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [menuOpen])

  // Move focus to the first menu link when the menu opens (keyboard accessibility)
  useEffect(() => {
    if (menuOpen) {
      firstMobileLinkRef.current?.focus()
    }
  }, [menuOpen])

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
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
            onClick={() => setBubble(b => ({ ...b, visible: false }))}
            className="shrink-0 hover:opacity-90 hover:scale-105 transition-[opacity,transform] duration-200 px-1"
            aria-label="Home"
          >
            {/* Miniature version of the hero flip-card front — same DG-on-emerald language */}
            <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-sm shadow-emerald-500/25">
              <span className="text-white text-xs font-black tracking-tight select-none">DG</span>
            </span>
          </a>

          {/* Desktop nav links with sliding bubble */}
          <ul ref={navListRef} className="hidden md:flex items-center gap-1 relative">

            {/* The sliding green bubble */}
            <div
              className="absolute top-1/2 -translate-y-1/2 h-8 rounded-full bg-emerald-500/20 dark:bg-emerald-400/15 pointer-events-none"
              style={{
                left: bubble.left,
                width: bubble.width,
                opacity: bubble.visible ? 1 : 0,
                transition: 'left 300ms ease, width 250ms ease, opacity 200ms ease',
              }}
            />

            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  // Store the element in linkRefs so scroll handler can measure it
                  ref={el => {
                    if (el) linkRefs.current.set(link.href, el)
                    else linkRefs.current.delete(link.href)
                  }}
                  onClick={e => handleNavClick(e, link.href)}
                  // aria-current tells screen readers which section is active
                  aria-current={activeHref === link.href ? 'true' : undefined}
                  className="
                    relative inline-block rounded-full px-4 py-1.5
                    text-sm font-medium
                    text-slate-600 dark:text-slate-400
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

            {/* Hamburger — aria-expanded and aria-controls wire it to the menu for screen readers */}
            <button
              ref={hamburgerRef}
              onClick={() => setMenuOpen(prev => !prev)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
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

        {/* Mobile dropdown — Escape closes it, outside clicks close it, focus moves here on open */}
        {menuOpen && (
          <div
            id="mobile-menu"
            ref={menuRef}
            onKeyDown={e => { if (e.key === 'Escape') setMenuOpen(false) }}
            className="
              absolute top-[3.5rem] left-0 right-0
              rounded-2xl
              bg-white dark:bg-slate-900
              border border-slate-200 dark:border-slate-700
              shadow-xl shadow-slate-200/50 dark:shadow-black/40
              px-3 py-3
            "
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    // First link receives focus when menu opens
                    ref={i === 0 ? firstMobileLinkRef : undefined}
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
