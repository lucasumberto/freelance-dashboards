import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Finanças',
  description: 'Controle suas finanças freelance. Registre receitas, despesas e acompanhe o fluxo financeiro do seu negócio.',
  keywords: ['finanças', 'receitas', 'despesas', 'fluxo financeiro', 'freelance'],
  openGraph: {
    title: 'Finanças | Freelance Dashboards',
    description: 'Controle suas finanças freelance. Registre receitas, despesas e acompanhe o fluxo financeiro do seu negócio.',
    url: '/finances',
  },
}

export default function FinancesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
