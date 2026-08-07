import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Clientes',
  description: 'Gerencie sua carteira de clientes. Mantenha informações de contato, histórico de projetos e valores investidos.',
  keywords: ['clientes', 'carteira de clientes', 'contatos', 'freelance', 'negócios'],
  openGraph: {
    title: 'Clientes | Freelance Dashboards',
    description: 'Gerencie sua carteira de clientes. Mantenha informações de contato, histórico de projetos e valores investidos.',
    url: '/clients',
  },
}

export default function ClientsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
