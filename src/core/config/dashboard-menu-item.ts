import { LayoutGrid, Search, BarChart3, FileText, Database, HelpCircle, Settings } from 'lucide-react'

export const sidebarConfig = [
  {
    items: [
      { icon: LayoutGrid, label: 'Dashboard', href: '/dashboard' },
      { icon: Search, label: 'Queries', href: '/queries' },
      { icon: BarChart3, label: 'Analytics', href: '/analytics' },
      { icon: FileText, label: 'Documents', href: '/documents' },
    ],
  },
  {
    items: [
      { icon: Database, label: 'Databases', href: '/databases' },
      { icon: HelpCircle, label: 'Help', href: '/help' },
    ],
  },
  {
    items: [
      { icon: Settings, label: 'Settings', href: '/settings' },
    ],
    position: 'bottom',
  },
]
