'use client'

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { LogOut, Settings } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from 'react'

type User = {
  name?: string;
  email?: string;
  username?: string;
} | null | undefined

type UserMenuProps = {
  user: User;
}

export default function UserMenu({ user }: UserMenuProps) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSignOut = async () => {
    try {
      const response = await fetch('/api/sign-out', { method: 'POST' })
      if (response.ok) {
        router.push('/signed-out')
      } else {
        console.error('Sign out failed')
      }
    } catch (error) {
      console.error('Error during sign out:', error)
    }
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const userInitials = user?.username ? getInitials(user.username) : '💩'

  if (!mounted) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center gap-2 p-2">
          <Avatar className="h-10 w-10 border">
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.username || 'Anonymous'}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email || 'No email provided'}
            </p>
          </div>
        </div>
        <DropdownMenuItem asChild>
          <Link href="/account-settings" className="flex justify-between items-center cursor-pointer">
            Account Settings
            <Settings className="h-4 w-4" />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="flex justify-between items-center cursor-pointer">
          <span>Theme</span>
          <Switch
            checked={theme === 'dark'}
            onCheckedChange={toggleTheme}
            className="data-[state=checked]:bg-primary"
          />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignOut} className="flex justify-between items-center cursor-pointer">
          Log out
          <LogOut className="h-4 w-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
