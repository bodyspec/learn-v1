export const queryKeys = {
  progress: {
    all: ['progress'] as const,
  },
  certificates: {
    all: ['certificates'] as const,
  },
  quiz: {
    attempts: (moduleId: string) => ['quiz', 'attempts', moduleId] as const,
  },
  verify: {
    certificate: (uid: string) => ['verify', uid] as const,
  },
}
