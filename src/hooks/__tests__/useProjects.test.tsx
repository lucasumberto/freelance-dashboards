import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useProjects } from '../useProjects'

describe('useProjects', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })
  })

  function wrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }

  it('deve carregar projetos corretamente', async () => {
    const { result } = renderHook(() => useProjects(), { wrapper })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.projects).toBeDefined()
    expect(Array.isArray(result.current.projects)).toBe(true)
  })

  it('deve ter função createProject disponível', () => {
    const { result } = renderHook(() => useProjects(), { wrapper })

    expect(result.current.createProject).toBeDefined()
    expect(typeof result.current.createProject).toBe('function')
  })

  it('deve ter função updateProject disponível', () => {
    const { result } = renderHook(() => useProjects(), { wrapper })

    expect(result.current.updateProject).toBeDefined()
    expect(typeof result.current.updateProject).toBe('function')
  })

  it('deve ter função deleteProject disponível', () => {
    const { result } = renderHook(() => useProjects(), { wrapper })

    expect(result.current.deleteProject).toBeDefined()
    expect(typeof result.current.deleteProject).toBe('function')
  })

  it('deve ter estados de loading para mutações', () => {
    const { result } = renderHook(() => useProjects(), { wrapper })

    expect(result.current.isCreating).toBeDefined()
    expect(result.current.isUpdating).toBeDefined()
    expect(result.current.isDeleting).toBeDefined()
    expect(typeof result.current.isCreating).toBe('boolean')
    expect(typeof result.current.isUpdating).toBe('boolean')
    expect(typeof result.current.isDeleting).toBe('boolean')
  })

  it('deve executar createProject', async () => {
    const { result } = renderHook(() => useProjects(), { wrapper })

    act(() => {
      result.current.createProject({ name: 'Novo Projeto' })
    })

    await waitFor(() => {
      expect(result.current.isCreating).toBe(false)
    })
  })

  it('deve executar updateProject', async () => {
    const { result } = renderHook(() => useProjects(), { wrapper })

    act(() => {
      result.current.updateProject({ id: '1', data: { name: 'Projeto Atualizado' } })
    })

    await waitFor(() => {
      expect(result.current.isUpdating).toBe(false)
    })
  })

  it('deve executar deleteProject', async () => {
    const { result } = renderHook(() => useProjects(), { wrapper })

    act(() => {
      result.current.deleteProject('1')
    })

    await waitFor(() => {
      expect(result.current.isDeleting).toBe(false)
    })
  })
})
