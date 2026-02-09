import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'

vi.mock('@/content', () => ({
  getModules: vi.fn(() => [
    { id: 'core', title: 'Core', track: 'core', sections: [] },
    { id: 'physician', title: 'Physician', track: 'physician', sections: [] },
  ]),
  getModule: vi.fn((id: string) => (id === 'core' ? { id: 'core', title: 'Core' } : undefined)),
  getModulesByTrack: vi.fn((track: string) =>
    track === 'physician' ? [{ id: 'physician', title: 'Physician' }] : []
  ),
  getQuiz: vi.fn((id: string) => (id === 'core' ? { module_id: 'core', questions: [] } : null)),
  getSectionContent: vi.fn(() => '# Test Content'),
}))

import { useModules } from '@/hooks/useModules'

describe('useModules', () => {
  it('returns all five properties', () => {
    const { result } = renderHook(() => useModules())
    expect(result.current).toHaveProperty('modules')
    expect(result.current).toHaveProperty('getModule')
    expect(result.current).toHaveProperty('getModulesByTrack')
    expect(result.current).toHaveProperty('getQuiz')
    expect(result.current).toHaveProperty('getSectionContent')
  })

  it('returns modules array', () => {
    const { result } = renderHook(() => useModules())
    expect(result.current.modules).toHaveLength(2)
  })

  it('getModulesByTrack filters correctly', () => {
    const { result } = renderHook(() => useModules())
    const physician = result.current.getModulesByTrack('physician')
    expect(physician).toHaveLength(1)
  })

  it('getModule returns undefined for unknown ID', () => {
    const { result } = renderHook(() => useModules())
    expect(result.current.getModule('nonexistent')).toBeUndefined()
  })

  it('getQuiz returns quiz for known module', () => {
    const { result } = renderHook(() => useModules())
    expect(result.current.getQuiz('core')).not.toBeNull()
  })
})
