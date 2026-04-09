// Represents a single portfolio project entry
export interface Project {
  id: string
  title: string
  description: string
  tags: string[]       // Tech stack tags shown in JetBrains Mono badges
  githubUrl?: string   // Optional — not all projects may be public
  liveUrl?: string     // Optional — not all projects are deployed
}
