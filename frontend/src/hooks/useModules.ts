import { getModules, getModule, getModulesByTrack, getQuiz, getSectionContent } from '@/content'
import type { Track } from '@/types'

export function useModules() {
  return {
    modules: getModules(),
    getModule,
    getModulesByTrack: (track: Track) => getModulesByTrack(track),
    getQuiz,
    getSectionContent,
  }
}
