# Freelance Dashboards

Um dashboard moderno para gerenciamento de projetos freelancers, desenvolvido com React, TypeScript e Vite. Este projeto serve como portfólio demonstrando boas práticas de desenvolvimento frontend.

## 🚀 Tecnologias

- **React 18** - Biblioteca UI para construção de interfaces
- **TypeScript** - Tipagem estática para maior segurança no código
- **Vite** - Build tool rápido e otimizado
- **React Router** - Roteamento client-side
- **TanStack Query** - Gerenciamento de estado e cache de dados
- **TailwindCSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes UI reutilizáveis e acessíveis
- **Lucide React** - Ícones modernos e consistentes

## 📋 Funcionalidades

- **Dashboard** - Visão geral de métricas e estatísticas
- **Projetos** - Gerenciamento completo de projetos freelancers
  - Listagem com busca e filtros
  - Criação de novos projetos
  - Edição de projetos existentes
  - Visualização detalhada de cada projeto
- **Clientes** - Cadastro e gestão de clientes
  - Listagem com busca
  - Criação de novos clientes
  - Edição de informações de clientes
- **Finanças** - Controle financeiro
  - Registro de receitas e despesas
  - Categorização de transações
  - Edição de transações

## 🏗️ Estrutura do Projeto

```
src/
├── api/              # Configurações de API e handlers
├── assets/           # Imagens e recursos estáticos
├── components/       # Componentes reutilizáveis
│   ├── dashboard/    # Componentes do dashboard
│   ├── layout/       # Componentes de layout (Header, Sidebar)
│   ├── projects/     # Componentes específicos de projetos
│   ├── clients/      # Componentes específicos de clientes
│   ├── finances/     # Componentes específicos de finanças
│   ├── shared/       # Componentes compartilhados (DataTable, LoadingSpinner)
│   └── ui/           # Componentes UI base (shadcn/ui)
├── hooks/            # Custom hooks (useProjects, useClients, useFinances)
├── pages/            # Páginas da aplicação
│   ├── Dashboard/
│   ├── Projects/
│   ├── Clients/
│   └── Finances/
├── types/            # Definições de tipos TypeScript
└── utils/            # Funções utilitárias
```

## 🎨 Boas Práticas Implementadas

### 1. **Arquitetura de Componentes**
- Componentes pequenos e focados em uma única responsabilidade
- Separação clara entre componentes de UI e lógica de negócios
- Reutilização de componentes através de props bem definidas

### 2. **TypeScript**
- Tipagem estrita em todo o código
- Interfaces bem definidas para props e dados
- Uso de tipos genéricos para componentes reutilizáveis (DataTable)

### 3. **Gerenciamento de Estado**
- Custom hooks para encapsular lógica de dados (useProjects, useClients, useFinances)
- TanStack Query para cache automático e sincronização de dados
- Estado local apenas quando necessário (formulários, modais)

### 4. **Estilização**
- Sistema de design baseado em variáveis CSS para fácil troca de temas
- Uso de componentes UI consistentes (shadcn/ui)
- Classes utilitárias do TailwindCSS para estilização rápida
- Variáveis CSS como `--primary`, `--foreground` para consistência

### 5. **Roteamento**
- Rotas aninhadas para páginas de detalhes (`/projects/:id`)
- Navegação programática com React Router
- Links semânticos para melhor acessibilidade

### 6. **Performance**
- Lazy loading de componentes quando necessário
- Otimização de re-renders com React.memo onde aplicável
- Build otimizado com Vite

### 7. **Acessibilidade**
- Componentes UI acessíveis (shadcn/ui)
- Labels em formulários
- Navegação por teclado suportada
- Contraste de cores adequado

### 8. **Organização de Código**
- Estrutura de pastas lógica e escalável
- Nomes de arquivos e componentes descritivos
- Separação de concerns (UI, lógica, tipos)

## 🛠️ Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview
```

## 📦 Personalização de Tema

O projeto usa variáveis CSS definidas em `src/index.css`. Para personalizar as cores:

```css
:root {
  --primary: oklch(0.55 0.22 250);        /* Cor principal */
  --primary-foreground: oklch(0.985 0 0); /* Texto sobre cor principal */
  --background: oklch(1 0 0);            /* Fundo */
  --foreground: oklch(0.145 0 0);         /* Texto principal */
  /* ... outras variáveis */
}
```

Para modo escuro, modifique as variáveis na classe `.dark`.

## 📄 Licença

Este projeto foi desenvolvido como portfólio e está disponível para fins educacionais.

## 👤 Autor

Lucas Umberto Pereira