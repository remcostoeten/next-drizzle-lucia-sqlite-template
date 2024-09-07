import { validateRequest } from '@/lib/auth'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = await validateRequest()
  if (!user) {
    redirect('/login')
  }

  return (
    <div>
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/dashboard" className="text-xl font-bold">
            Notes App
          </Link>
          <div>
            <span className="mr-4">Welcome, {user.username}</span>
            <form action="/api/logout" method="post">
              <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  )
} 
