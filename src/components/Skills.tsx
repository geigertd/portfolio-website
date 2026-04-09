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

function SkillGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map(skill => (
          <span
            key={skill}
            className="font-jetbrains text-sm px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

export function Skills({ t, skills }: SkillsProps) {
  const { ref, visible } = useScrollFade()

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
          My Toolbox
        </h2>

        <div className="flex flex-col gap-10">
          <SkillGroup title={t.skills.categories.languages} items={skills.languages} />
          <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent dark:via-emerald-700" />
          <SkillGroup title={t.skills.categories.frameworks} items={skills.frameworks} />
          <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent dark:via-emerald-700" />
          <SkillGroup title={t.skills.categories.tools} items={skills.tools} />
        </div>
      </div>
    </section>
  )
}
