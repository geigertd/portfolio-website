// This interface defines the shape of all translatable text on the site.
// Think of it as a "data dictionary" — a BA tool that documents what content exists.
// Both en.ts and de.ts must implement this interface exactly.
export interface Translation {
  nav: {
    about: string
    projects: string
    skills: string
    contact: string
  }
  hero: {
    greeting: string      // e.g. "Hi, I'm"
    role: string          // e.g. "Computer Science Student"
    tagline: string       // 1-line bio
    cta_projects: string  // "View Projects" button
    cta_contact: string   // "Contact Me" button
  }
  about: {
    title: string
    heading: string
    body: string
    stats: {
      year_value: string   // e.g. "2nd Year"
      year_label: string   // e.g. "Student"
      based_value: string  // e.g. "Germany"
      based_label: string  // e.g. "Based"
      work_value: string   // e.g. "Open for"
      work_label: string   // e.g. "Internships"
      lang_value: string   // e.g. "DE / EN"
      lang_label: string   // e.g. "Languages"
    }
  }
  projects: {
    title: string
    heading: string
    placeholder_desc: string // shown on placeholder cards
  }
  skills: {
    title: string
    heading: string
    categories: {
      languages: string
      frameworks: string
      tools: string
    }
  }
  contact: {
    title: string
    heading: string
    subtitle: string
  }
  footer: {
    built_with: string
  }
}
