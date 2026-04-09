import type { Translation } from '../types/i18n'

interface HeroProps {
  t: Translation
}

export function Hero({ t }: HeroProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 px-6 pt-20">
      <div className="max-w-5xl w-full mx-auto py-24 md:py-32">

        {/* Subtle top label */}
        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-4 tracking-wide uppercase">
          {t.hero.greeting}
        </p>

        {/* Name — largest element on the page */}
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-none mb-6">
          Daniel Geigert
        </h1>

        {/* Role — secondary heading */}
        <h2 className="text-xl md:text-2xl font-medium text-slate-500 dark:text-slate-400 mb-6">
          {t.hero.role}
        </h2>

        {/* Tagline */}
        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed mb-10">
          {t.hero.tagline}
        </p>

        {/* CTA buttons — pill shaped */}
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

        {/* Decorative scroll indicator */}
        <div className="mt-20 flex items-center gap-3 text-slate-400 dark:text-slate-600">
          <div className="w-8 h-px bg-slate-300 dark:bg-slate-700" />
          <span className="text-xs tracking-widest uppercase">Scroll</span>
        </div>
      </div>
    </section>
  )
}
