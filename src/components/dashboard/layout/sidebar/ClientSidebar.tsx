'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type SidebarItem = {
  icon: React.ElementType;
  label: string;
  href: string;
}

type ClientSidebarProps = {
  items: SidebarItem[];
  isOpen: boolean;
}

export default function ClientSidebar({ items, isOpen }: ClientSidebarProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <aside className={`w-64 bg-black border-r overflow-y-auto transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <nav className="mt-5 px-2">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md transition ease-in-out duration-150 ${pathname === item.href
                ? 'text-gray-900 bg-gray-100 dark:text-white dark:bg-gray-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700'
                }`}
            >
              <Icon className="mr-4 h-6 w-6" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
