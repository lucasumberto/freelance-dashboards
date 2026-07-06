import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTheme } from '../useTheme'

describe('useTheme', () => {
  beforeEach(() => {
    // Limpar localStorage antes de cada teste
    localStorage.clear()
    // Limpar classes do document
    document.documentElement.classList.remove('light', 'dark')
  })

  it('deve iniciar com tema light por padrão', () => {
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('light')
  })

  it('deve carregar tema salvo no localStorage', () => {
    localStorage.setItem('theme', 'dark')
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')
  })

  it('deve alternar entre light e dark', () => {
    const { result } = renderHook(() => useTheme())
    
    act(() => {
      result.current.toggleTheme()
    })
    
    expect(result.current.theme).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('deve definir tema específico', () => {
    const { result } = renderHook(() => useTheme())
    
    act(() => {
      result.current.setTheme('dark')
    })
    
    expect(result.current.theme).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('deve adicionar classe ao document.documentElement', () => {
    const { result } = renderHook(() => useTheme())
    
    act(() => {
      result.current.setTheme('dark')
    })
    
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(document.documentElement.classList.contains('light')).toBe(false)
  })
})
