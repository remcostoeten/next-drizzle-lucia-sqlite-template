import DashboardWrapper from '@/components/dashboard/layout/DashboardWrapper';
import Header from '@/components/dashboard/layout/navigation/Header';
import { getCurrentUser } from '@/lib/session';

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()

  // Ensure the user object matches the User interface
  const user: User | undefined = currentUser
    ? {
        id: currentUser.id.toString(), // Convert to string if it's a number
        name: currentUser.name || '',
        email: currentUser.email || '',
        image: currentUser.image,
      }
    : undefined

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <Header user={user} />
      <DashboardWrapper>
        {children}
      </DashboardWrapper>
    </div>
  )
}
