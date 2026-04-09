import type { Translation } from '../types/i18n'

interface FooterProps {
  t: Translation
}

export function Footer({ t }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700 py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400 dark:text-slate-500">
        <span>© {year} Tobias Geiger</span>
        <span>{t.footer.built_with}</span>
      </div>
    </footer>
  )
}
