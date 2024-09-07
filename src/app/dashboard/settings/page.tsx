import { Skeleton } from "@/components/ui/Skeleton"
import { getProfile } from "@/data-access/profiles"
import { validateRequest } from "@/lib/auth"
import { notFound } from 'next/navigation'
import { SettingsForm } from "./_components/SettingsForm"

export const revalidate = 3600

async function SettingsContent() {
  const { user } = await validateRequest()

  if (!user) {
    notFound()
  }

  const profile = await getProfile(user.id)

  if (!profile) {
    notFound()
  }

  return <SettingsForm initialData={{ ...profile, username: profile.displayName }} userId={user.id} />
}

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
        <SettingsContent />
      </div>
    </div>
  )
}

function SettingsSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  )
}
