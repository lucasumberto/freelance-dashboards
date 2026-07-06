import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useClients } from '../useClients'

describe('useClients', () => {
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

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  it('deve carregar clientes corretamente', async () => {
    const { result } = renderHook(() => useClients(), { wrapper })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.clients).toBeDefined()
    expect(Array.isArray(result.current.clients)).toBe(true)
  })

  it('deve ter função createClient disponível', () => {
    const { result } = renderHook(() => useClients(), { wrapper })

    expect(result.current.createClient).toBeDefined()
    expect(typeof result.current.createClient).toBe('function')
  })

  it('deve ter função updateClient disponível', () => {
    const { result } = renderHook(() => useClients(), { wrapper })

    expect(result.current.updateClient).toBeDefined()
    expect(typeof result.current.updateClient).toBe('function')
  })

  it('deve ter função deleteClient disponível', () => {
    const { result } = renderHook(() => useClients(), { wrapper })

    expect(result.current.deleteClient).toBeDefined()
    expect(typeof result.current.deleteClient).toBe('function')
  })

  it('deve ter estados de loading para mutações', () => {
    const { result } = renderHook(() => useClients(), { wrapper })

    expect(result.current.isCreating).toBeDefined()
    expect(result.current.isUpdating).toBeDefined()
    expect(result.current.isDeleting).toBeDefined()
    expect(typeof result.current.isCreating).toBe('boolean')
    expect(typeof result.current.isUpdating).toBe('boolean')
    expect(typeof result.current.isDeleting).toBe('boolean')
  })

  it('deve executar createClient', async () => {
    const { result } = renderHook(() => useClients(), { wrapper })

    act(() => {
      result.current.createClient({ name: 'Novo Cliente' })
    })

    await waitFor(() => {
      expect(result.current.isCreating).toBe(false)
    })
  })

  it('deve executar updateClient', async () => {
    const { result } = renderHook(() => useClients(), { wrapper })

    act(() => {
      result.current.updateClient({ id: '1', data: { name: 'Cliente Atualizado' } })
    })

    await waitFor(() => {
      expect(result.current.isUpdating).toBe(false)
    })
  })

  it('deve executar deleteClient', async () => {
    const { result } = renderHook(() => useClients(), { wrapper })

    act(() => {
      result.current.deleteClient('1')
    })

    await waitFor(() => {
      expect(result.current.isDeleting).toBe(false)
    })
  })
})
