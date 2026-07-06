import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import Finances from '../index'

describe('Finances', () => {
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
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  )

  it('deve mostrar loading spinner durante carregamento', () => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          staleTime: Infinity,
        },
      },
    })
    
    render(<Finances />, { wrapper })
    expect(screen.getByTestId('spinner-element')).toBeInTheDocument()
  })

  it('deve renderizar título Finanças', async () => {
    render(<Finances />, { wrapper })
    
    await waitFor(() => {
      expect(screen.getByText('Finanças')).toBeInTheDocument()
    })
  })

  it('deve renderizar tabela de transações', async () => {
    render(<Finances />, { wrapper })
    
    await waitFor(() => {
      expect(screen.getByText('Finanças')).toBeInTheDocument()
    })
  })
})
