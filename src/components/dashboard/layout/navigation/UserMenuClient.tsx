'use client'

import { Switch } from "@/components/ui/switch"
import { Profile } from "@/core/server/schema"
import { ChevronDown, LogOut, Moon, Settings, Sun } from 'lucide-react'
import { useTheme } from "next-themes"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface UserMenuClientProps {
  profile: Profile
}

export function UserMenuClient({ profile }: UserMenuClientProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  const initials = profile.displayName
    ? profile.displayName.split(' ').map(n => n[0]).join('').toUpperCase()
    : 'U'

  const handleSignOut = async () => {
    const response = await fetch('/api/sign-out', { method: 'GET' })
    if (response.ok) {
      router.push('/signed-out')
    }
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-[#1e1e1e] rounded-full p-1 pr-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-sm font-medium">
          {initials}
        </div>
        <ChevronDown size={16} className="text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-[#1e1e1e] rounded-md shadow-lg py-1 z-10">
          <div className="px-4 py-3 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-sm font-medium">
                {initials}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{profile.displayName}</p>
                <p className="text-xs text-gray-400">{profile.userId}</p>
              </div>
            </div>
          </div>
          <div className="py-1">
            <Link href="/account-settings" className="px-4 py-2 text-sm text-white hover:bg-gray-800 flex items-center">
              <Settings size={16} className="mr-2" />
              Account Settings
            </Link>
            <div className="px-4 py-2 text-sm text-white hover:bg-gray-800 flex items-center justify-between">
              <span className="flex items-center">
                {theme === 'dark' ? <Moon size={16} className="mr-2" /> : <Sun size={16} className="mr-2" />}
                Theme
              </span>
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-gray-600"
              />
            </div>
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-2 text-sm text-white hover:bg-gray-800 flex items-center"
            >
              <LogOut size={16} className="mr-2" />
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
