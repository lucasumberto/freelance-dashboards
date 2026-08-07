import type { Metadata } from 'next'
import './globals.css'
import Layout from '../components/layout/Layout'
import { QueryClientProvider } from '../lib/react-query/providers'
import StructuredData from '../components/seo/StructuredData'

export const metadata: Metadata = {
  title: {
    default: 'Freelance Dashboards - Gestão de Projetos Freelance',
    template: '%s | Freelance Dashboards'
  },
  description: 'Sistema completo de gestão para freelancers. Controle seus projetos, finanças e clientes em um único lugar. Acompanhe progresso, orçamentos e recebimentos.',
  keywords: ['freelance', 'gestão de projetos', 'dashboard', 'finanças', 'clientes', 'produtividade', 'orçamento', 'projetos'],
  authors: [{ name: 'Freelance Dashboards' }],
  creator: 'Freelance Dashboards',
  publisher: 'Freelance Dashboards',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://freelance-dashboards.com',
    title: 'Freelance Dashboards - Gestão de Projetos Freelance',
    description: 'Sistema completo de gestão para freelancers. Controle seus projetos, finanças e clientes em um único lugar.',
    siteName: 'Freelance Dashboards',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Freelance Dashboards - Gestão de Projetos Freelance',
    description: 'Sistema completo de gestão para freelancers. Controle seus projetos, finanças e clientes em um único lugar.',
    creator: '@freelancedash',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.json',
  metadataBase: new URL('https://freelance-dashboards.com'),
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Freelance Dashboards',
    description: 'Sistema completo de gestão para freelancers. Controle seus projetos, finanças e clientes em um único lugar.',
    url: 'https://freelance-dashboards.com',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'BRL',
    },
    author: {
      '@type': 'Organization',
      name: 'Freelance Dashboards',
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://freelance-dashboards.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Projetos',
        item: 'https://freelance-dashboards.com/projects',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Finanças',
        item: 'https://freelance-dashboards.com/finances',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Clientes',
        item: 'https://freelance-dashboards.com/clients',
      },
    ],
  }

  return (
    <html lang="pt-BR">
      <body>
        <StructuredData data={organizationSchema} />
        <StructuredData data={breadcrumbSchema} />
        <QueryClientProvider>
          <Layout>{children}</Layout>
        </QueryClientProvider>
      </body>
    </html>
  )
}
