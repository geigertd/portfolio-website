import type { Translation } from '../types/i18n'
import type { Project } from '../types/project'
import { ProjectCard } from './ProjectCard'

interface ProjectsProps {
  t: Translation
  projects: Project[]
}

export function Projects({ t, projects }: ProjectsProps) {
  return (
    <section id="projects" className="bg-white dark:bg-slate-900 py-24 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Section header */}
        <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">
          {t.projects.title}
        </p>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mb-12">
          Things I've Built
        </h2>

        {/* Project grid: 2 cols on desktop, 1 on mobile */}
        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
