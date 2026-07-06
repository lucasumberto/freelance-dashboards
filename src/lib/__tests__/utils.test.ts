import { describe, it, expect } from 'vitest'
import { cn } from '../utils'

describe('cn', () => {
  it('deve combinar classes CSS corretamente', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2')
  })

  it('deve lidar com classes condicionais', () => {
    expect(cn('px-4', true && 'py-2', false && 'bg-red')).toBe('px-4 py-2')
  })

  it('deve remover classes duplicadas com tailwind-merge', () => {
    expect(cn('px-4', 'px-2')).toBe('px-2')
  })

  it('deve lidar com arrays de classes', () => {
    expect(cn(['px-4', 'py-2'])).toBe('px-4 py-2')
  })

  it('deve retornar string vazia quando não há classes', () => {
    expect(cn()).toBe('')
  })
})
