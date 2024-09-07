'use client'

import SidebarToggle from '@/components/dashboard/layout/sidebar/SidebarToggle'
import { BarChart3, Database, FileText, HelpCircle, LayoutGrid, Search, Settings } from 'lucide-react'
import { useState } from 'react'
import ClientSidebar from './sidebar/ClientSidebar'

const sidebarItems = [
  { icon: 'LayoutGrid', label: 'Tables', href: '/dashboard/tables' },
  { icon: 'Search', label: 'Queries', href: '/dashboard/queries' },
  { icon: 'BarChart3', label: 'Analytics', href: '/dashboard/analytics' },
  { icon: 'FileText', label: 'Documents', href: '/dashboard/documents' },
  { icon: 'Database', label: 'Database', href: '/dashboard/database' },
  { icon: 'HelpCircle', label: 'Help', href: '/dashboard/help' },
  { icon: 'Settings', label: 'Settings', href: '/dashboard/settings' },
]

const iconComponents = {
  LayoutGrid,
  Search,
  BarChart3,
  FileText,
  Database,
  HelpCircle,
  Settings,
}

interface DashboardWrapperProps {
  children: React.ReactNode
}

export default function DashboardWrapper({ children }: DashboardWrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const sidebarItemsWithComponents = sidebarItems.map(item => ({
    ...item,
    icon: iconComponents[item.icon as keyof typeof iconComponents],
  }))

  return (
    <div className="flex flex-1 overflow-hidden">
      <ClientSidebar items={sidebarItemsWithComponents} isOpen={isSidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex items-center p-4 bg-bodyy border-b border-gray-200 dark:border-border">
          <SidebarToggle onToggle={setIsSidebarOpen} />
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Dashboard</h1>
        </div>
        <main className="flex-1 overflow-auto p-6  bg-body">
          {children}
        </main>
      </div>
    </div>
  )
}
