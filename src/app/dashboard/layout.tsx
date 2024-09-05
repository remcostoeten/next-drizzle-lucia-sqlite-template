"use client";

import { Button } from "@/components/ui/button";
import { signOutAction } from "@/core/server/actions";
import { motion } from 'framer-motion';
import { FileText, LayoutDashboard, LogOut, Settings, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Users, label: 'Team', href: '/dashboard/team' },
  { icon: FileText, label: 'Documents', href: '/dashboard/documents' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
]

function SidebarItem({ icon: Icon, label, href }: { icon: any; label: string; href: string }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link href={href} passHref>
      <Button
        variant="ghost"
        className={`w-full justify-start ${
          isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
        }`}
      >
        <Icon className="mr-2 h-4 w-4" />
        {label}
      </Button>
    </Link>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-900">
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        className="w-64 bg-gray-800 p-4"
      >
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <SidebarItem key={item.href} {...item} />
          ))}
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <form action={signOutAction}>
            <Button type="submit" variant="destructive" className="w-full">
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </form>
        </div>
      </motion.aside>
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  )
}
