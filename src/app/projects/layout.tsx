import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projetos',
  description: 'Gerencie todos os seus projetos freelance em um só lugar. Acompanhe o progresso, orçamentos e status de cada projeto.',
  keywords: ['projetos', 'gestão de projetos', 'freelance', 'orçamento', 'progresso'],
  openGraph: {
    title: 'Projetos | Freelance Dashboards',
    description: 'Gerencie todos os seus projetos freelance em um só lugar. Acompanhe o progresso, orçamentos e status de cada projeto.',
    url: '/projects',
  },
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
