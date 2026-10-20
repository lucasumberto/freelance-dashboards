'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, FolderKanban, DollarSign, Users, Settings } from 'lucide-react'

const menuItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/projects', icon: FolderKanban, label: 'Projetos' },
  { path: '/finances', icon: DollarSign, label: 'Finanças' },
  { path: '/clients', icon: Users, label: 'Clientes' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border flex flex-col items-center">
          <svg
              className="w-12 h-12 mt-2 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
              <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
              <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
              <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1"/>
              <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.3"/>
          </svg>
        <h1 className="text-xl font-bold text-foreground">Freelance Dash</h1>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.path || 
            (item.path !== '/' && pathname?.startsWith(item.path))
          
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-border">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-muted transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Configurações</span>
        </Link>
      </div>
    </aside>
  );
}
