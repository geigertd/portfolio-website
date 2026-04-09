import { useState } from 'react'
import { Wrench, Plus, Minus, Database, Layers, HardDrive } from 'lucide-react'
import { Code2, Settings2 } from 'lucide-react'
import { useScrollFade } from '../hooks/useScrollFade'
import type { Translation } from '../types/i18n'

interface SkillsData {
  languages: string[]
  frameworks: string[]
  tools: string[]
}

interface SkillsProps {
  t: Translation
  skills: SkillsData
}

interface DrawerProps {
  icon: React.ReactNode
  title: string
  items: string[]
  isOpen: boolean
  onToggle: () => void
  hasBorder: boolean
}

// Maps each skill label to a Simple Icons CDN slug.
// https://cdn.simpleicons.org/{slug} returns the SVG in brand colour, no package needed.
const SIMPLE_ICONS: Record<string, string> = {
  'C#':                   'csharp',
  'TypeScript':           'typescript',
  'JavaScript':           'javascript',
  'Python':               'python',
  'Java':                 'java',
  'React':                'react',
  'ASP.NET Core':         'dotnet',
  'Tailwind CSS':         'tailwindcss',
  'Vite':                 'vite',
  'Git':                  'git',
  'GitHub':               'github',
  'Rider':                'rider',
  'WebStorm':             'webstorm',
  'Swagger':              'swagger',
  'Vercel':               'vercel',
}

// Lucide fallbacks for skills that have no Simple Icons entry.
const LUCIDE_FALLBACKS: Record<string, React.ReactNode> = {
  'SQL':                    <Database size={14} />,
  'Entity Framework Core':  <Layers size={14} />,
  'DBeaver':                <HardDrive size={14} />,
}


// Cheap string hash — deterministic, same input always gives same tilt.
function hashCode(str: string): number {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(31, h) + str.charCodeAt(i) | 0
  }
  return h
}

// Returns an inline style that tilts + nudges a pill.
// Chaotic preset: ±6° rotation, ±4px vertical drift.
function pillStyle(skill: string): React.CSSProperties {
  const h = hashCode(skill)
  const rot = ((h % 13) - 6)
  const dy  = (((h >> 4) % 9) - 4)
  return { transform: `rotate(${rot}deg) translateY(${dy}px)` }
}

function SkillIcon({ skill }: { skill: string }) {
  const slug = SIMPLE_ICONS[skill]
  if (slug) {
    return (
      // In dark mode: brightness-0 makes the image black, invert flips it to white.
      <img
        src={`https://cdn.simpleicons.org/${slug}`}
        alt=""
        aria-hidden="true"
        className="w-4 h-4 shrink-0 dark:brightness-0 dark:invert"
      />
    )
  }
  const fallback = LUCIDE_FALLBACKS[skill]
  if (fallback) {
    return <span className="shrink-0 text-slate-400 dark:text-slate-500">{fallback}</span>
  }
  return null
}

function AccordionDrawer({ icon, title, items, isOpen, onToggle, hasBorder }: DrawerProps) {
  return (
    <div className={hasBorder ? 'border-b border-slate-300 dark:border-slate-600' : ''}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <span className="text-emerald-600 dark:text-emerald-400">{icon}</span>
          <span className="w-6 h-1 rounded-full bg-emerald-500" />
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-widest">
            {title}
          </span>
        </div>
        {isOpen
          ? <Minus size={16} className="text-slate-400 shrink-0" />
          : <Plus  size={16} className="text-slate-400 shrink-0" />
        }
      </button>

      {/* grid-rows trick: collapses row to zero height, no JS measurement needed */}
      <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="flex flex-wrap gap-3 px-6 pt-5 pb-7 bg-slate-100 dark:bg-slate-900">
            {items.map(skill => (
              <span
                key={skill}
                style={pillStyle(skill)}
                className="
                  inline-flex items-center gap-1.5
                  font-jetbrains text-sm px-3 py-1.5 rounded-full
                  bg-white dark:bg-slate-800
                  border border-slate-200 dark:border-slate-700
                  text-slate-700 dark:text-slate-300
                  hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400
                  hover:[transform:rotate(0deg)_translateY(0px)]
                  transition-[transform,color,border-color] duration-200
                  cursor-default
                "
              >
                <SkillIcon skill={skill} />
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Skills({ t, skills }: SkillsProps) {
  const { ref, visible } = useScrollFade()

  const [openDrawers, setOpenDrawers] = useState<Set<string>>(
    new Set(['languages', 'frameworks', 'tools'])
  )

  function toggle(key: string) {
    setOpenDrawers(prev => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })
  }

  return (
    <section id="skills" className="bg-slate-50 dark:bg-slate-800/50 py-24 px-6">
      <div
        ref={ref}
        className={`max-w-5xl mx-auto transition-[opacity,transform] duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-3">
          {t.skills.title}
        </p>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mb-12">
          {t.skills.heading}
        </h2>

        <div className="bg-slate-100 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-600 rounded-2xl shadow-xl overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-4 bg-slate-200 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-600">
            <Wrench size={16} className="text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200 tracking-wide">
              My Toolbox
            </span>
          </div>

          <AccordionDrawer
            icon={<Code2 size={14} />}
            title={t.skills.categories.languages}
            items={skills.languages}
            isOpen={openDrawers.has('languages')}
            onToggle={() => toggle('languages')}
            hasBorder={true}
          />
          <AccordionDrawer
            icon={<Layers size={14} />}
            title={t.skills.categories.frameworks}
            items={skills.frameworks}
            isOpen={openDrawers.has('frameworks')}
            onToggle={() => toggle('frameworks')}
            hasBorder={true}
          />
          <AccordionDrawer
            icon={<Settings2 size={14} />}
            title={t.skills.categories.tools}
            items={skills.tools}
            isOpen={openDrawers.has('tools')}
            onToggle={() => toggle('tools')}
            hasBorder={false}
          />
        </div>
      </div>
    </section>
  )
}
