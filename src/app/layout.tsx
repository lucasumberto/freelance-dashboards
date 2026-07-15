import type { Metadata } from 'next'
import './globals.css'
import Layout from '../components/layout/Layout'
import { QueryClientProvider } from '../lib/react-query/providers'

export const metadata: Metadata = {
  title: 'Freelance Dashboards',
  description: 'Dashboard para gestão de projetos freelance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <QueryClientProvider>
          <Layout>{children}</Layout>
        </QueryClientProvider>
      </body>
    </html>
  )
}
