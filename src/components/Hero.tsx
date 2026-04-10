import { useState } from 'react'
import type { Translation } from '../types/i18n'

interface HeroProps {
  t: Translation
}

export function Hero({ t }: HeroProps) {
  const [profileImgError, setProfileImgError] = useState(false)
  const [aiImgError, setAiImgError] = useState(false)

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 px-6 pt-20">
      <div className="max-w-5xl w-full mx-auto py-24 md:py-32">

        {/* Two-column grid — scroll indicator excluded so avatar centers with the text block */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">

          {/* Left: text content */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 tracking-wide uppercase">
                {t.hero.greeting}
              </p>
            </div>

            <h1
              className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-4 pb-2 bg-gradient-to-r from-slate-900 via-emerald-700 to-slate-800 dark:from-white dark:via-emerald-400 dark:to-slate-200 bg-clip-text text-transparent"
              style={{ backgroundSize: '200% auto', animation: 'gradient-shift 6s ease infinite' }}
            >
              Daniel Geigert
            </h1>

            <h2 className="text-xl md:text-2xl font-medium text-slate-500 dark:text-slate-400 mb-6">
              {t.hero.role}
            </h2>

            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed mb-10">
              {t.hero.tagline}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-medium text-sm transition-colors"
              >
                {t.hero.cta_projects}
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 rounded-full border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium text-sm transition-colors"
              >
                {t.hero.cta_contact}
              </a>
            </div>
          </div>

          {/* Right: flippable round avatar */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-80 h-80">

              <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-full bg-emerald-100 dark:bg-emerald-900/40" />

              {/* group enables the hover-triggered flip on the inner card */}
              <div
                className="relative w-full h-full group"
                style={{ perspective: '800px' }}
              >
                <div
                  className="relative w-full h-full transition-transform duration-700 group-hover:[transform:rotateY(180deg)]"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front face: real profile photo */}
                  <div
                    className="absolute inset-0 rounded-full overflow-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    {profileImgError ? (
                      // Fallback to initials if the image fails to load
                      <div className="w-full h-full rounded-full bg-emerald-600 dark:bg-emerald-700 flex items-center justify-center">
                        <span className="text-7xl font-bold text-white tracking-tight select-none">DG</span>
                      </div>
                    ) : (
                      <img
                        src="/profile_pic.jpeg"
                        alt="Daniel Geigert"
                        className="w-full h-full object-cover"
                        onError={() => setProfileImgError(true)}
                      />
                    )}
                  </div>

                  {/* Back face (hover): AI-generated photo — to be added */}
                  <div
                    className="absolute inset-0 rounded-full overflow-hidden"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    {aiImgError ? (
                      <div className="w-full h-full rounded-full bg-emerald-800 dark:bg-emerald-900 flex flex-col items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-300">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                        </svg>
                        <span className="text-emerald-300 text-xs">AI photo coming soon</span>
                      </div>
                    ) : (
                      <img
                        src="/profile-ai.png"
                        alt="Daniel Geigert — AI version"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center -15px' }}
                        onError={() => setAiImgError(true)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator — outside the grid so it doesn't affect avatar centering */}
        <div className="flex items-center gap-3 text-slate-400 dark:text-slate-600">
          <div className="w-8 h-px bg-slate-300 dark:bg-slate-700" />
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg className="animate-bounce" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>

      </div>
    </section>
  )
}
