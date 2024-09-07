'use client'

import { useState, useCallback, useEffect } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { createProfileAction } from '@/core/server/actions/auth/create-profile-action'
import { useDropzone } from 'react-dropzone'

const profileSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  displayName: z.string().min(2, 'Display name must be at least 2 characters'),
  bio: z.string().max(160, 'Bio must be 160 characters or less').optional(),
  avatar: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export default function OnboardingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [initialUsername, setInitialUsername] = useState('')

  const form: UseFormReturn<ProfileFormValues> = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: '',
      displayName: '',
      bio: '',
      avatar: '',
    },
  })

  useEffect(() => {
    async function fetchInitialUsername() {
      const response = await fetch('/api/user/username')
      if (response.ok) {
        const { username } = await response.json()
        setInitialUsername(username)
        form.setValue('username', username)
      }
    }
    fetchInitialUsername()
  }, [form])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setAvatarPreview(base64String)
        form.setValue('avatar', base64String)
      }
      reader.readAsDataURL(file)
    }
  }, [form])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
  })

  const onSubmit = async (values: ProfileFormValues) => {
    setIsLoading(true)
    const formData = new FormData()
    Object.entries(values).forEach(([key, value]) => {
      if (value) formData.append(key, value)
    })

    try {
      const result = await createProfileAction(formData)
      if ('error' in result) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
        if (result.details) {
          console.error('Validation errors:', result.details)
        }
      } else {
        toast({
          title: "Profile created",
          description: "Your profile has been set up successfully.",
        })
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Failed to create profile:', error)
      toast({
        title: "Error",
        description: "Failed to create profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
      <div className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6">Complete Your Profile</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-center mb-6">
              <div {...getRootProps()} className="cursor-pointer">
                <input {...getInputProps()} />
                <Avatar className="w-24 h-24">
                  {avatarPreview ? (
                    <AvatarImage src={avatarPreview} alt="Avatar preview" />
                  ) : (
                    <AvatarFallback className="bg-zinc-700 text-white text-xl">
                      {initialUsername.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>
            </div>

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Username</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-zinc-800 border-zinc-700 text-white" placeholder="Choose a username" />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Display Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-zinc-800 border-zinc-700 text-white" placeholder="Enter your display name" />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Bio (Optional)</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="bg-zinc-800 border-zinc-700 text-white" placeholder="Tell us about yourself" />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <div className="flex justify-between">
              <Button type="button" variant="outline" className="bg-zinc-800 text-white" onClick={() => router.push('/dashboard')}>
                Skip for now
              </Button>
              <Button type="submit" className="bg-white text-black" disabled={isLoading}>
                {isLoading ? 'Creating Profile...' : 'Finish'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
