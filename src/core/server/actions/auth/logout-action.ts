'use server'

import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { validateRequest, lucia } from '@/lib/auth'

export async function signOutAction() {
  const { session } = await validateRequest()
  if (!session) {
    return redirect("/sign-in")
  }

  await lucia.invalidateSession(session.id)

  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )

  return redirect("/signed-out")
}
