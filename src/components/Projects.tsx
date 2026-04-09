import { useScrollFade } from '../hooks/useScrollFade'
import type { Translation } from '../types/i18n'
import type { Project } from '../types/project'
import { ProjectCard } from './ProjectCard'

interface ProjectsProps {
  t: Translation
  projects: Project[]
}

export function Projects({ t, projects }: ProjectsProps) {
  const { ref, visible } = useScrollFade()

  return (
    <section id="projects" className="bg-white dark:bg-slate-900 py-24 px-6">
      <div
        ref={ref}
        className={`max-w-5xl mx-auto transition-[opacity,transform] duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >

        <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-3">
          {t.projects.title}
        </p>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mb-12">
          {t.projects.heading}
        </h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  )
}
