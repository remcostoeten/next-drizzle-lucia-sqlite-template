import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getProfile } from "@/data-access/profiles"
import { validateRequest } from "@/lib/session"
import { User } from "lucide-react"
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const { user } = await validateRequest()

  if (!user) {
    redirect('/login')
  }

  const profile = await getProfile(user.id)

  function greeting() {
    const hour = new Date().getHours();
    if (hour < 12) {
      return 'Good morning';
    } else if (hour < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  }


  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="border-b border-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          {profile && (
            <Avatar className="h-8 w-8">
              <AvatarImage src={profile.image || ''} alt={profile.displayName} />
              <AvatarFallback><User /></AvatarFallback>
            </Avatar>
          )}
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl">
              {profile ? `${greeting()}, ${profile.displayName}` : 'Welcome'}
            </CardTitle>
            <CardDescription className="text-gray-400">
              @{profile?.username || user.username}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">{profile?.bio || 'Welcome to your dashboard. Here you can manage your projects and settings.'}</p>
          </CardContent>
          <CardFooter>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              View Projects
            </Button>
          </CardFooter>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {['Analytics', 'Team', 'Projects', 'Documents', 'Reports', 'Settings'].map((item) => (
            <Card key={item} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle>{item}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Manage your {item.toLowerCase()}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
