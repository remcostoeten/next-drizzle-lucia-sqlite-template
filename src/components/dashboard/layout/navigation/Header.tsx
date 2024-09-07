import { HeaderProps } from '@/components/dashboard/layout/navigation/navigation.types'
import Logo from '@/components/theme/Logo'
import { Button } from '@/components/ui/button'
import { Bell, HelpCircle } from 'lucide-react'
import Link from 'next/link'
import { SearchModal } from './SearchModal'
import UserMenu from './UserMenu'

export default function Header({ user }: HeaderProps) {
  return (
    <header className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />

        <div className="flex-1 mx-4">
          <SearchModal />
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-neutral-300 hover:text-white" aria-label="Help">
            <HelpCircle size={20} />
          </button>
          <button className="text-neutral-300 hover:text-white" aria-label="Notifications">
            <Bell size={20} />
          </button>
          
          {user ? (
            <UserMenu user={user} />
          ) : (
            <Button asChild variant="secondary">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
