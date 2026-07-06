# Guia de Testes

Este projeto utiliza **Vitest** + **Testing Library** + **MSW** para testes.

## 📦 Dependências Instaladas

- `vitest` - Framework de testes
- `@testing-library/react` - Testes de componentes React
- `@testing-library/user-event` - Simulação de interações do usuário
- `@testing-library/jest-dom` - Matchers customizados do Jest
- `msw` - Mock Service Worker para interceptar requisições HTTP
- `@vitest/ui` - Interface visual para testes
- `jsdom` - Ambiente DOM para testes

## 🚀 Scripts Disponíveis

```bash
# Executar todos os testes
npm test

# Executar testes com interface visual
npm run test:ui

# Executar testes com coverage
npm run test:coverage
```

## 📁 Estrutura de Testes

```
src/
├── test/
│   ├── setup.ts              # Configuração global dos testes
│   └── mocks/
│       ├── handlers.ts       # Handlers do MSW
│       ├── browser.ts       # Configuração MSW para browser
│       └── server.ts        # Configuração MSW para Node
├── lib/__tests__/           # Testes de utilitários
├── hooks/__tests__/         # Testes de custom hooks
├── components/
│   ├── shared/__tests__/    # Testes de componentes compartilhados
│   └── ui/__tests__/        # Testes de componentes UI
```

## 🧪 Tipos de Testes

### 1. Testes de Utilitários

Testam funções puras sem dependências de React.

**Exemplo:** `src/lib/__tests__/utils.test.ts`

```typescript
import { describe, it, expect } from 'vitest'
import { cn } from '../utils'

describe('cn', () => {
  it('deve combinar classes CSS corretamente', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2')
  })
})
```

### 2. Testes de Hooks

Testam custom hooks usando `renderHook` do Testing Library.

**Exemplo:** `src/hooks/__tests__/useTheme.test.ts`

```typescript
import { renderHook, act } from '@testing-library/react'
import { useTheme } from '../useTheme'

describe('useTheme', () => {
  it('deve alternar entre light e dark', () => {
    const { result } = renderHook(() => useTheme())
    
    act(() => {
      result.current.toggleTheme()
    })
    
    expect(result.current.theme).toBe('dark')
  })
})
```

### 3. Testes de Componentes

Testam componentes React focando no comportamento do usuário.

**Exemplo:** `src/components/ui/__tests__/button.test.tsx`

```typescript
import { render, screen } from '@testing-library/react'
import { Button } from '../button'

describe('Button', () => {
  it('deve renderizar com variant default', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })
})
```

## 🔧 Mock de API com MSW

O MSW é configurado em `src/test/setup.ts` e intercepta requisições HTTP.

**Adicionar novo handler em `src/test/mocks/handlers.ts`:**

```typescript
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/endpoint', () => {
    return HttpResponse.json({ data: 'mocked' })
  }),
]
```

## 📝 Boas Práticas

1. **Use `data-testid`** para elementos que não têm roles semânticos
2. **Teste comportamento, não implementação** - foque no que o usuário vê
3. **Use `act()`** para ações que causam re-renders
4. **Limpe após cada teste** - o setup já faz cleanup automático
5. **Mock dependências externas** - use MSW para APIs, vi.fn para funções

## 🎯 Próximos Passos

- Adicionar testes para hooks de dados (useProjects, useClients, useFinances)
- Adicionar testes para componentes de páginas (Dashboard, Projects, etc.)
- Adicionar testes de integração com TanStack Query
- Configurar threshold de coverage no CI/CD
