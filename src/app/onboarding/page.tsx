'use client'

import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { Camera, Upload, X } from 'lucide-react'
import { createProfileAction } from '@/core/server/actions'

const profileSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  displayName: z.string().min(2, 'Display name must be at least 2 characters'),
  bio: z.string().max(160, 'Bio must be 160 characters or less').optional(),
  avatar: z.string().optional(),
})

export default function OnboardingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: '',
      displayName: '',
      bio: '',
      avatar: '',
    },
  })

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
        form.setValue('avatar', reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [form])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
  })

  async function onSubmit(values: z.infer<typeof profileSchema>) {
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4"
    >
      <div className="w-full max-w-md space-y-8 p-8 bg-zinc-900/80 backdrop-blur-sm rounded-xl border border-zinc-800 shadow-2xl">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Set Up Your Profile</h1>
          <p className="text-zinc-400">Let's personalize your account</p>
        </motion.div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <motion.div 
              className="flex justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div {...getRootProps()} className="relative cursor-pointer group">
                        <input {...getInputProps()} />
                        <Avatar className="h-32 w-32 border-4 border-zinc-700 group-hover:border-zinc-500 transition-colors duration-300">
                          <AvatarImage src={avatarPreview || ''} alt="Avatar" />
                          <AvatarFallback className="bg-zinc-800 text-zinc-400">
                            {avatarPreview ? (
                              <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                              <Camera className="w-12 h-12" />
                            )}
                          </AvatarFallback>
                        </Avatar>
                        <AnimatePresence>
                          {isDragActive && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center"
                            >
                              <Upload className="text-white w-12 h-12" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                        {avatarPreview && (
                          <motion.button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setAvatarPreview(null)
                              form.setValue('avatar', '')
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <X className="w-4 h-4 text-white" />
                          </motion.button>
                        )}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">Username</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-zinc-800 border-zinc-700 text-white focus:ring-2 focus:ring-purple-500 transition-all duration-300" placeholder="Choose a username" />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">Display Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-zinc-800 border-zinc-700 text-white focus:ring-2 focus:ring-purple-500 transition-all duration-300" placeholder="Enter your display name" />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">Bio (Optional)</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="bg-zinc-800 border-zinc-700 text-white focus:ring-2 focus:ring-purple-500 transition-all duration-300" placeholder="Tell us about yourself" />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div 
              className="flex justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button 
                type="button" 
                variant="outline" 
                className="bg-zinc-800 text-white hover:bg-zinc-700 transition-colors duration-300" 
                onClick={() => router.push('/dashboard')}
              >
                Skip for now
              </Button>
              <Button 
                type="submit" 
                className="bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-300" 
                disabled={isLoading}
              >
                {isLoading ? 'Creating Profile...' : 'Finish'}
              </Button>
            </motion.div>
          </form>
        </Form>
      </div>
    </motion.div>
  )
}
