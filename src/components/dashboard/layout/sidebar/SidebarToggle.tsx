'use client'

import { Menu } from 'lucide-react'
import { useState } from 'react'

type SidebarToggleProps = {
  onToggle: (isOpen: boolean) => void
}

export default function SidebarToggle({ onToggle }: SidebarToggleProps) {
  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => {
    const newState = !isOpen
    setIsOpen(newState)
    onToggle(newState)
  }

  return (
    <button
      onClick={toggleSidebar}
      className="p-2 mr-4 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
      aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
    >
      <Menu size={24} />
    </button>
  )
}
