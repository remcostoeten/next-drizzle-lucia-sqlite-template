'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { AvatarUpload } from '@/app/(landing)/onboarding/_components/AvatarUpload'
import { updateProfileAction, deleteAccountAction } from '@/core/server/actions'

const profileSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  displayName: z.string().min(2, 'Display name must be at least 2 characters'),
  bio: z.string().max(160, 'Bio must be 160 characters or less').optional(),
  avatar: z.string().optional(),
})

interface SettingsFormProps {
  initialData: {
    username: string
    displayName: string
    bio: string | null
    image: string | null
  }
  userId: number
}

export function SettingsForm({ initialData, userId }: SettingsFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: initialData.username,
      displayName: initialData.displayName,
      bio: initialData.bio || '',
      avatar: initialData.image || '',
    },
  })

  async function onSubmit(formData: FormData) {
    const result = await updateProfileAction(userId, formData)
    if (result.success) {
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
      router.refresh()
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    }
  }

  async function handleDeleteAccount() {
    setIsDeleting(true)
    try {
      const result = await deleteAccountAction(userId)
      if (result.success) {
        toast({
          title: "Account deleted",
          description: "Your account has been deleted successfully.",
        })
        router.push('/login')
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Form {...form}>
      <form action={onSubmit} className="space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Profile Picture</FormLabel>
                <FormControl>
                  <AvatarUpload
                    avatarPreview={field.value}
                    setAvatarPreview={(value) => field.onChange(value)}
                    setFieldValue={form.setValue}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Username</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Display Name</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Bio</FormLabel>
                <FormControl>
                  <Textarea {...field} className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-blue-500 transition-all duration-300" />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </motion.div>

        <div className="flex justify-between items-center">
          <Button 
            type="submit" 
            className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
          >
            Update Profile
          </Button>
          <Button 
            type="button"
            onClick={handleDeleteAccount}
            className="bg-red-600 text-white hover:bg-red-700 transition-colors duration-300" 
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete Account'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
