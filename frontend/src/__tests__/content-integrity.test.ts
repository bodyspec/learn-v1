import { describe, it, expect } from 'vitest'
import { getModules, getSectionContent, getQuiz, getModulesByTrack, getAllQuizzes } from '@/content'
import type { Track } from '@/types'

/**
 * Content integrity tests — verify that all modules, sections, quizzes,
 * and tracks are properly linked with no missing or broken content.
 *
 * These tests use the REAL content loader (no mocks) so they catch
 * issues like module ID / directory name mismatches.
 */

const modules = getModules()
const userTracks: Track[] = ['physician', 'chiropractor', 'trainer']

describe('Content Integrity', () => {
  it('loads at least one module', () => {
    expect(modules.length).toBeGreaterThan(0)
  })

  describe('every module has valid metadata', () => {
    for (const mod of modules) {
      it(`"${mod.id}" has required fields`, () => {
        expect(mod.id).toBeTruthy()
        expect(mod.title).toBeTruthy()
        expect(mod.track).toBeTruthy()
        expect(mod.sections.length).toBeGreaterThan(0)
        expect(mod.estimated_minutes).toBeGreaterThan(0)
        expect(typeof mod.is_deep_dive).toBe('boolean')
        expect(typeof mod.required_for_certificate).toBe('boolean')
      })
    }
  })

  describe('every section has loadable markdown content', () => {
    for (const mod of modules) {
      for (const section of mod.sections) {
        it(`"${mod.id}/${section.slug}" resolves to content`, () => {
          const content = getSectionContent(mod.id, section.slug)
          expect(content, `Missing markdown for ${mod.id}/${section.slug}`).toBeDefined()
          expect(content!.length).toBeGreaterThan(100)
        })
      }
    }
  })

  describe('every track has at least 2 modules', () => {
    for (const track of userTracks) {
      it(`track "${track}" has >= 2 modules`, () => {
        const trackModules = getModulesByTrack(track)
        expect(trackModules.length).toBeGreaterThanOrEqual(2)
      })
    }
  })

  describe('every certificate-required module has a quiz', () => {
    for (const mod of modules.filter(m => m.required_for_certificate)) {
      it(`"${mod.id}" has a quiz`, () => {
        const quiz = getQuiz(mod.id)
        expect(quiz, `No quiz found for certificate-required module "${mod.id}"`).toBeDefined()
      })
    }
  })

  describe('every quiz references an existing module', () => {
    const quizzes = getAllQuizzes()
    const moduleIds = new Set(modules.map(m => m.id))

    for (const [moduleId, quiz] of Object.entries(quizzes)) {
      it(`quiz "${moduleId}" references a valid module`, () => {
        expect(moduleIds.has(moduleId), `Quiz references unknown module "${moduleId}"`).toBe(true)
        expect(quiz.questions.length).toBeGreaterThan(0)
        expect(quiz.passing_score).toBeGreaterThan(0)
      })
    }
  })

  describe('no duplicate module IDs', () => {
    it('all module IDs are unique', () => {
      const ids = modules.map(m => m.id)
      const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i)
      expect(duplicates, `Duplicate module IDs: ${duplicates.join(', ')}`).toHaveLength(0)
    })
  })

  describe('deep-dive modules reference valid parent modules', () => {
    const moduleIds = new Set(modules.map(m => m.id))
    for (const mod of modules.filter(m => m.is_deep_dive && m.parent_module)) {
      it(`"${mod.id}" parent "${mod.parent_module}" exists`, () => {
        expect(
          moduleIds.has(mod.parent_module!),
          `Deep-dive "${mod.id}" references non-existent parent "${mod.parent_module}"`,
        ).toBe(true)
      })
    }
  })

  describe('all generated routes are valid', () => {
    // Module back links: module.track must be a user-facing track or core
    // (core modules use fromTrack state, but if accessed directly they fall back)
    const validBackTracks = ['core', 'physician', 'chiropractor', 'trainer']
    for (const mod of modules) {
      it(`"${mod.id}" track "${mod.track}" is a known track`, () => {
        expect(
          validBackTracks.includes(mod.track),
          `Module "${mod.id}" has unknown track "${mod.track}"`,
        ).toBe(true)
      })
    }

    // Every module that appears in a user-facing track should be reachable
    for (const track of userTracks) {
      const trackModules = getModulesByTrack(track)
      for (const mod of trackModules) {
        it(`module "${mod.id}" in track "${track}" has a valid route`, () => {
          expect(mod.id).toBeTruthy()
          expect(mod.sections.length).toBeGreaterThan(0)
          // First section should be reachable
          const content = getSectionContent(mod.id, mod.sections[0].slug)
          expect(content, `First section of "${mod.id}" has no content`).toBeDefined()
        })
      }
    }
  })
})
