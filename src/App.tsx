import { useDarkMode } from './hooks/useDarkMode'
import { useLanguage } from './hooks/useLanguage'
import { projects } from './data/projects'
import { skills } from './data/skills'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

function App() {
  // Dark mode state — adds/removes 'dark' class on <html>
  const { isDark, toggle: toggleDark } = useDarkMode()

  // Language state — returns active translation object t
  const { lang, t, toggle: toggleLang } = useLanguage()

  return (
    // min-h-screen ensures the page fills the viewport even with little content
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navbar
        t={t}
        isDark={isDark}
        onToggleDark={toggleDark}
        lang={lang}
        onToggleLang={toggleLang}
      />
      <main>
        <Hero t={t} />
        <About t={t} />
        <Projects t={t} projects={projects} lang={lang} />
        <Skills t={t} skills={skills} />
        <Contact t={t} />
      </main>
      <Footer t={t} />
    </div>
  )
}

export default App
