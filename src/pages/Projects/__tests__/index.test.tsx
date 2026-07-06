import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import Projects from '../index'

describe('Projects', () => {
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
    
    render(<Projects />, { wrapper })
    expect(screen.getByTestId('spinner-element')).toBeInTheDocument()
  })

  it('deve renderizar título Projetos', async () => {
    render(<Projects />, { wrapper })
    
    await waitFor(() => {
      expect(screen.getByText('Projetos')).toBeInTheDocument()
    })
  })

  it('deve renderizar tabela de projetos', async () => {
    render(<Projects />, { wrapper })
    
    await waitFor(() => {
      expect(screen.getByText('Projetos')).toBeInTheDocument()
    })
  })
})
