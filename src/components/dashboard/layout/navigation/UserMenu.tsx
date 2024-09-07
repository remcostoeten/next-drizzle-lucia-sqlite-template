'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronDown, LogOut, Settings } from 'lucide-react'
import { Switch } from "@/components/ui/switch"

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

interface UserMenuProps {
  user: User
}

export default function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      const response = await fetch('/api/sign-out', { method: 'GET' })
      if (response.ok) {
        router.push('/signed-out')
      } else {
        console.error('Sign out failed')
      }
    } catch (error) {
      console.error('Error during sign out:', error)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-[#1e1e1e] rounded-full p-1 pr-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-sm font-medium">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <ChevronDown size={16} className="text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-[#1e1e1e] rounded-md shadow-lg py-1 z-10">
          <div className="px-4 py-3 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-sm font-medium">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{user.name}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
            </div>
          </div>
          <div className="py-1">
            <Link href="/account-settings" className="px-4 py-2 text-sm text-white hover:bg-gray-800 flex items-center justify-between">
              <span>Account Settings</span>
              <Settings size={16} />
            </Link>
            <div className="px-4 py-2 text-sm text-white hover:bg-gray-800 flex items-center justify-between">
              <span>Theme</span>
              <Switch
                checked={isDarkTheme}
                onCheckedChange={setIsDarkTheme}
                className="data-[state=checked]:bg-gray-600"
              />
            </div>
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-2 text-sm text-white hover:bg-gray-800 flex items-center justify-between"
            >
              <span>Log out</span>
              <LogOut size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
