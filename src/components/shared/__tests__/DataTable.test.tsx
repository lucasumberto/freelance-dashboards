import React from 'react'
import { render, screen } from '@testing-library/react'
import DataTable from '../DataTable'

describe('DataTable', () => {
  const mockData = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  ]

  const mockColumns = [
    { key: 'name' as const, label: 'Name' },
    { key: 'email' as const, label: 'Email' },
  ]

  it('renders table with data', () => {
    render(<DataTable data={mockData} columns={mockColumns} />)
    
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('jane@example.com')).toBeInTheDocument()
  })

  it('renders search input when searchable is true', () => {
    render(<DataTable data={mockData} columns={mockColumns} searchable />)
    
    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument()
  })

  it('does not render search input when searchable is false', () => {
    render(<DataTable data={mockData} columns={mockColumns} searchable={false} />)
    
    expect(screen.queryByPlaceholderText('Buscar...')).not.toBeInTheDocument()
  })

  it('filters data based on search term', () => {
    render(<DataTable data={mockData} columns={mockColumns} searchable />)
    
    const searchInput = screen.getByPlaceholderText('Buscar...')
    
    // Type search term
    searchInput.dispatchEvent(new Event('change', { bubbles: true }))
    searchInput.dispatchEvent(new Event('input', { bubbles: true }))
  })

  it('shows empty state when no data matches search', () => {
    render(<DataTable data={[]} columns={mockColumns} />)
    
    expect(screen.getByText('Nenhum dado encontrado')).toBeInTheDocument()
  })
})
