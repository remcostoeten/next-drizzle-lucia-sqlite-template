'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createProfile, updateProfile, getProfile, deleteProfile } from "@/data-access/profiles"
import { deleteUser } from "@/data-access/users"
import { validateRequest } from "@/lib/auth"
import { z } from "zod"

const profileSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  displayName: z.string().min(2, 'Display name must be at least 2 characters'),
  bio: z.string().max(160, 'Bio must be 160 characters or less').optional(),
  avatar: z.string().optional(),
})

export async function createProfileAction(formData: FormData) {
  const { user } = await validateRequest()
  if (!user) {
    return { error: 'User not authenticated' }
  }

  const result = profileSchema.safeParse({
    username: formData.get('username'),
    displayName: formData.get('displayName'),
    bio: formData.get('bio'),
    avatar: formData.get('avatar'),
  })

  if (!result.success) {
    const errors = result.error.flatten()
    return { error: 'Validation failed', details: errors }
  }

  const { username, displayName, bio, avatar } = result.data

  try {
    const existingProfile = await getProfile(user.id)
    if (existingProfile) {
      await updateProfile(user.id, {
        username,
        displayName,
        bio,
        image: avatar,
      })
    } else {
      await createProfile(user.id, displayName, avatar, bio)
    }
    revalidatePath('/dashboard/settings')
    return { success: true, username }
  } catch (error) {
    console.error('Failed to create/update profile:', error)
    return { error: 'Failed to create/update profile. Please try again.' }
  }
}

export async function updateProfileAction(userId: number, formData: FormData) {
  const result = profileSchema.safeParse({
    username: formData.get('username'),
    displayName: formData.get('displayName'),
    bio: formData.get('bio'),
    avatar: formData.get('avatar'),
  })

  if (!result.success) {
    return { error: 'Validation failed', details: result.error.flatten() }
  }

  try {
    await updateProfile(userId, {
      username: result.data.username,
      displayName: result.data.displayName,
      bio: result.data.bio,
      image: result.data.avatar,
    })
    revalidatePath('/dashboard/settings')
    return { success: true, message: 'Profile updated successfully' }
  } catch (error) {
    console.error('Failed to update profile:', error)
    return { error: 'Failed to update profile. Please try again.' }
  }
}

export async function deleteAccountAction(userId: number) {
  try {
    await deleteProfile(userId)
    await deleteUser(userId)
    redirect('/login')
  } catch (error) {
    console.error('Failed to delete account:', error)
    return { error: 'Failed to delete account. Please try again.' }
  }
}
