import type { Module, Quiz, Track } from '@/types'

// Import all module metadata
const moduleYamls = import.meta.glob<Module>('@content/modules/*/_module.yaml', {
  eager: true,
  import: 'default',
})

// Import deep dive modules
const deepDiveYamls = import.meta.glob<Module>('@content/deep-dives/*/_module.yaml', {
  eager: true,
  import: 'default',
})

// Import all quiz files
const quizYamls = import.meta.glob<Quiz>('@content/quizzes/*.yaml', {
  eager: true,
  import: 'default',
})

// Import all markdown content
const markdownFiles = import.meta.glob<string>('@content/modules/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const deepDiveMarkdown = import.meta.glob<string>('@content/deep-dives/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

// Combine all modules
const allModuleYamls = { ...moduleYamls, ...deepDiveYamls }
const allMarkdown = { ...markdownFiles, ...deepDiveMarkdown }

export function getModules(): Module[] {
  return Object.entries(allModuleYamls)
    .map(([, module]) => ({
      ...module,
    }))
    .sort((a, b) => a.sort_order - b.sort_order)
}

export function getModulesByTrack(track: Track): Module[] {
  return getModules().filter(m => m.track === track || m.track === 'core')
}

export function getModule(moduleId: string): Module | undefined {
  return getModules().find(m => m.id === moduleId)
}

export function getSectionContent(moduleId: string, sectionSlug: string): string | undefined {
  const key = Object.keys(allMarkdown).find(k =>
    k.includes(`/${moduleId}/`) && k.includes(sectionSlug)
  )
  return key ? allMarkdown[key] : undefined
}

export function getQuiz(moduleId: string): Quiz | undefined {
  const key = Object.keys(quizYamls).find(k => k.includes(`${moduleId}.yaml`))
  return key ? quizYamls[key] : undefined
}

export function getAllQuizzes(): Record<string, Quiz> {
  const quizzes: Record<string, Quiz> = {}
  Object.values(quizYamls).forEach((quiz) => {
    quizzes[quiz.module_id] = quiz
  })
  return quizzes
}

export function getTrackInfo(track: Track): { title: string; description: string } {
  const trackInfo: Record<Track, { title: string; description: string }> = {
    core: {
      title: 'DEXA Fundamentals',
      description: 'Learn how DEXA technology works and what it measures',
    },
    physician: {
      title: 'Clinical Applications',
      description: 'Clinical interpretation and patient counseling for medical professionals',
    },
    chiropractor: {
      title: 'Body Composition in Practice',
      description: 'Integrating DEXA data into chiropractic assessment and care',
    },
    trainer: {
      title: 'Programming with DEXA Data',
      description: 'Using body composition analysis for fitness programming and client management',
    },
  }
  return trackInfo[track]
}
