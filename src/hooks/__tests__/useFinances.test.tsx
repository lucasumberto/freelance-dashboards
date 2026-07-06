import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useFinances } from '../useFinances'

describe('useFinances', () => {
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

  it('deve carregar transações corretamente', async () => {
    const { result } = renderHook(() => useFinances(), { wrapper })

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.transactions).toBeDefined()
    expect(Array.isArray(result.current.transactions)).toBe(true)
  })

  it('deve ter função createTransaction disponível', () => {
    const { result } = renderHook(() => useFinances(), { wrapper })

    expect(result.current.createTransaction).toBeDefined()
    expect(typeof result.current.createTransaction).toBe('function')
  })

  it('deve ter função updateTransaction disponível', () => {
    const { result } = renderHook(() => useFinances(), { wrapper })

    expect(result.current.updateTransaction).toBeDefined()
    expect(typeof result.current.updateTransaction).toBe('function')
  })

  it('deve ter função deleteTransaction disponível', () => {
    const { result } = renderHook(() => useFinances(), { wrapper })

    expect(result.current.deleteTransaction).toBeDefined()
    expect(typeof result.current.deleteTransaction).toBe('function')
  })

  it('deve ter estados de loading para mutações', () => {
    const { result } = renderHook(() => useFinances(), { wrapper })

    expect(result.current.isCreating).toBeDefined()
    expect(result.current.isUpdating).toBeDefined()
    expect(result.current.isDeleting).toBeDefined()
    expect(typeof result.current.isCreating).toBe('boolean')
    expect(typeof result.current.isUpdating).toBe('boolean')
    expect(typeof result.current.isDeleting).toBe('boolean')
  })

  it('deve executar createTransaction', async () => {
    const { result } = renderHook(() => useFinances(), { wrapper })

    act(() => {
      result.current.createTransaction({ type: 'income', amount: 1000, description: 'Teste' })
    })

    await waitFor(() => {
      expect(result.current.isCreating).toBe(false)
    })
  })

  it('deve executar updateTransaction', async () => {
    const { result } = renderHook(() => useFinances(), { wrapper })

    act(() => {
      result.current.updateTransaction({ id: '1', data: { amount: 2000 } })
    })

    await waitFor(() => {
      expect(result.current.isUpdating).toBe(false)
    })
  })

  it('deve executar deleteTransaction', async () => {
    const { result } = renderHook(() => useFinances(), { wrapper })

    act(() => {
      result.current.deleteTransaction('1')
    })

    await waitFor(() => {
      expect(result.current.isDeleting).toBe(false)
    })
  })
})
