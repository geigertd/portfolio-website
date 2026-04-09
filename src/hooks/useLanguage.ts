import { useState } from 'react'
import type { Translation } from '../types/i18n'
import { en, de } from '../i18n'

type Lang = 'en' | 'de'

// Manages EN/DE language toggle, persists choice in localStorage
export function useLanguage() {
  const [lang, setLang] = useState<Lang>(() => {
    const stored = localStorage.getItem('lang')
    return stored === 'de' ? 'de' : 'en'
  })

  const translations: Record<Lang, Translation> = { en, de }

  const toggle = () => {
    const next: Lang = lang === 'en' ? 'de' : 'en'
    setLang(next)
    localStorage.setItem('lang', next)
  }

  return { lang, t: translations[lang], toggle }
}
