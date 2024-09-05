'use client';

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { LucideIcon } from 'lucide-react'

type SidebarItem = {
  icon: LucideIcon
  label: string
  onClick: () => void
}

type SidebarProps = {
  items: SidebarItem[]
}

export function Sidebar({ items }: SidebarProps) {
  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-64 bg-zinc-800 p-4 flex flex-col"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Your App</h1>
      </div>
      <nav className="space-y-2">
        {items.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Button
              variant="ghost"
              className="w-full justify-start text-zinc-300 hover:text-white hover:bg-zinc-700"
              onClick={item.onClick}
            >
              <item.icon className="mr-2 h-5 w-5" />
              {item.label}
            </Button>
          </motion.div>
        ))}
      </nav>
    </motion.aside>
  )
}
