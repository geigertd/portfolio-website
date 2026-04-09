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
            Bridging Dev &amp; Business
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base">
            {t.about.body}
          </p>

          {/* Quick-stat row */}
          <div className="mt-8 flex gap-8">
            <div>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">2nd</p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">Year</p>
            </div>
            <div className="w-px bg-slate-200 dark:bg-slate-700" />
            <div>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">DE</p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">Based</p>
            </div>
            <div className="w-px bg-slate-200 dark:bg-slate-700" />
            <div>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400"></p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-1"></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
