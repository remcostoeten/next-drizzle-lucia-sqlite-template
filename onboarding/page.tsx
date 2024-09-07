'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useToast } from "@/components/ui/use-toast"
import { createProfileAction } from '@/core/server/actions'

type OnboardingClientProps = {
  initialUsername: string
}

export function OnboardingClient({ initialUsername }: OnboardingClientProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(values: any) {
    setIsLoading(true)
    const formData = new FormData()
    Object.entries(values).forEach(([key, value]) => {
      if (value) formData.append(key, value as string)
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-gray-900 p-4"
    >
      <div className="w-full max-w-md space-y-8 p-8 bg-gray-800 rounded-lg border border-gray-700 shadow-xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Set Up Your Profile</h1>
          <p className="text-gray-400">Let's personalize your account</p>
        </motion.div>

        <OnboardingForm onSubmit={onSubmit} isLoading={isLoading} initialUsername={initialUsername} />
      </div>
    </motion.div>
  )
}
