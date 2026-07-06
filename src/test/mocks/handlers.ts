import { http, HttpResponse } from 'msw'

export const handlers = [
  // Mock para projetos
  http.get('/api/projects', () => {
    return HttpResponse.json([
      {
        id: '1',
        name: 'Projeto Teste',
        client: 'Cliente Teste',
        status: 'active',
        budget: 5000,
        startDate: '2024-01-01',
        endDate: '2024-12-31',
      },
    ])
  }),

  // Mock para clientes
  http.get('/api/clients', () => {
    return HttpResponse.json([
      {
        id: '1',
        name: 'Cliente Teste',
        email: 'cliente@teste.com',
        phone: '11999999999',
      },
    ])
  }),

  // Mock para finanças
  http.get('/api/finances', () => {
    return HttpResponse.json([
      {
        id: '1',
        type: 'income',
        amount: 1000,
        category: 'Serviço',
        date: '2024-01-15',
        description: 'Pagamento de projeto',
      },
    ])
  }),
]
