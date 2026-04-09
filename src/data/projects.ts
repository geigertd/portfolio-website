import type { Project } from '../types/project'

export const projects: Project[] = [
  {
    id: 'claukie-talkie',
    title: 'ClaukieTalkie',
    description: 'Hands-free LAN walkie-talkie for your PC terminal. Your phone connects via WebSocket to a FastAPI server on your machine — all open terminals are wrapped in tmux and mirrored live to the phone. Tap to select a session, speak to run commands, or press volume keys to cycle sessions and trigger TTS readback of the last output.',
    descriptionDe: 'Freihändiges LAN-Walkie-Talkie für den PC-Terminal. Das Smartphone verbindet sich per WebSocket mit einem FastAPI-Server auf dem PC — alle offenen Terminals werden in tmux-Sitzungen gebündelt und live auf das Handy gespiegelt. Antippen zum Auswählen, sprechen zum Ausführen von Befehlen oder Lautstärketasten zum Wechseln zwischen Sitzungen und TTS-Vorlesen der letzten Ausgabe.',
    tags: ['Python', 'FastAPI', 'React', 'TypeScript', 'WebSocket', 'PWA'],
    githubUrl: 'https://github.com/geigertd/ClaukieTalkie',
  },
  {
    id: 'project-2',
    title: 'Coming Soon',
    description: 'A new project is currently in development. Check back soon.',
    tags: ['ASP.NET Core', 'C#', 'Entity Framework'],
    githubUrl: 'https://github.com/geigertd',
  },
  {
    id: 'project-3',
    title: 'Coming Soon',
    description: 'Another project is in planning. Ideas brewing.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/geigertd',
  },
]
