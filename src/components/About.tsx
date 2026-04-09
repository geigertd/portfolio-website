import { CalendarDays, MapPin, Briefcase, Languages } from 'lucide-react'
import { useScrollFade } from '../hooks/useScrollFade'
import type { Translation } from '../types/i18n'

interface AboutProps {
  t: Translation
}

export function About({ t }: AboutProps) {
  const { ref, visible } = useScrollFade()

  return (
    <section id="about" className="bg-slate-50 dark:bg-slate-800/50 py-24 px-6">
      <div
        ref={ref}
        className={`max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center transition-[opacity,transform] duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >

        {/* Left: decorative initials avatar */}
        <div className="flex justify-center md:justify-start">
          <div className="relative w-48 h-48">
            {/* Offset shadow square */}
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40" />
            {/* Main avatar */}
            <div className="relative w-full h-full rounded-2xl bg-emerald-600 dark:bg-emerald-700 flex items-center justify-center">
              <span className="text-5xl font-bold text-white tracking-tight select-none">DG</span>
            </div>
          </div>
        </div>

        {/* Right: about text */}
        <div>
          <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-3">
            {t.about.title}
          </p>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mb-6">
            {t.about.heading}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
            {t.about.body}
          </p>

          {/* Quick-stat grid — 2×2 so 4 cards fit without crowding */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            {/* Stat card: Year */}
            <div className="flex items-center gap-3 bg-white dark:bg-slate-800 rounded-xl px-4 py-3 shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="bg-emerald-100 dark:bg-emerald-900/40 p-2 rounded-lg">
                <CalendarDays className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t.about.stats.year_value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-500">{t.about.stats.year_label}</p>
              </div>
            </div>

            {/* Stat card: Based */}
            <div className="flex items-center gap-3 bg-white dark:bg-slate-800 rounded-xl px-4 py-3 shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="bg-emerald-100 dark:bg-emerald-900/40 p-2 rounded-lg">
                <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t.about.stats.based_value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-500">{t.about.stats.based_label}</p>
              </div>
            </div>

            {/* Stat card: Open for Internships */}
            <div className="flex items-center gap-3 bg-white dark:bg-slate-800 rounded-xl px-4 py-3 shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="bg-emerald-100 dark:bg-emerald-900/40 p-2 rounded-lg">
                <Briefcase className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t.about.stats.work_value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-500">{t.about.stats.work_label}</p>
              </div>
            </div>

            {/* Stat card: Languages */}
            <div className="flex items-center gap-3 bg-white dark:bg-slate-800 rounded-xl px-4 py-3 shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="bg-emerald-100 dark:bg-emerald-900/40 p-2 rounded-lg">
                <Languages className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t.about.stats.lang_value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-500">{t.about.stats.lang_label}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
