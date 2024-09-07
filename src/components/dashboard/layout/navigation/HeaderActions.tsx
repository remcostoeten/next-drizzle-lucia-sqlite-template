import { MenuButton } from "@/app/_header/menu-button"
import { ModeToggle } from "@/app/_header/mode-toggle"
import { Button } from "@/components/ui/button"
import { getCurrentUser } from "@/lib/session"
import { Bell, HelpCircle } from "lucide-react"
import Link from "next/link"
import { UserMenu } from "../navigation/UserMenu"

export async function HeaderActions() {
  const user = await getCurrentUser()

  return (
    <div className="flex items-center space-x-4">
      <button className="text-neutral-300 hover:text-white" aria-label="Help">
        <HelpCircle size={20} />
      </button>
      <button className="text-neutral-300 hover:text-white" aria-label="Notifications">
        <Bell size={20} />
      </button>
      {user ? (
        <>
          <div className="hidden md:block">
            <ModeToggle />
          </div>
          <UserMenu userId={user.id} />
          <div className="md:hidden">
            <MenuButton />
          </div>
        </>
      ) : (
        <>
          <ModeToggle />
          <Button asChild variant="secondary">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </>
      )}
    </div>
  )
}
