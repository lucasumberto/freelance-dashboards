import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LoadingSpinner from '../LoadingSpinner'

describe('LoadingSpinner', () => {
  it('deve renderizar com tamanho md por padrão', () => {
    render(<LoadingSpinner />)
    const spinner = screen.getByTestId('spinner-element')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveClass('w-8', 'h-8')
  })

  it('deve renderizar com tamanho sm quando especificado', () => {
    render(<LoadingSpinner size="sm" />)
    const spinner = screen.getByTestId('spinner-element')
    expect(spinner).toHaveClass('w-4', 'h-4')
  })

  it('deve renderizar com tamanho lg quando especificado', () => {
    render(<LoadingSpinner size="lg" />)
    const spinner = screen.getByTestId('spinner-element')
    expect(spinner).toHaveClass('w-12', 'h-12')
  })

  it('deve ter classes de animação e borda corretas', () => {
    render(<LoadingSpinner />)
    const spinner = screen.getByTestId('spinner-element')
    expect(spinner).toHaveClass('border-4', 'border-gray-200', 'border-t-blue-600', 'rounded-full', 'animate-spin')
  })
})
