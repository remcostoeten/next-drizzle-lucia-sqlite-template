'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useServerAction } from 'zsa-react'
import { signInAction } from '@/core/server/actions'
import { LoaderButton } from '@/components/loader-button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { Eye, EyeOff, Github, Mail, Terminal } from 'lucide-react'

const loginSchema = z.object({
  identifier: z.string().min(1, 'Email or username is required'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().default(false),
})

interface EmailSignInFormProps {
  googleAuthEnabled: boolean
  githubAuthEnabled: boolean
}

export default function EmailSignInForm({ googleAuthEnabled, githubAuthEnabled }: EmailSignInFormProps) {
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)

  const { execute, isPending, error } = useServerAction(signInAction, {
    onError({ err }) {
      toast({
        title: 'Something went wrong',
        description: err.message,
        variant: 'destructive',
      })
    },
    onSuccess() {
      toast({
        title: "Let's Go!",
        description: 'Enjoy your session',
      })
    },
  })

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
      rememberMe: false,
    },
  })

  function onSubmit(values: z.infer<typeof loginSchema>) {
    execute(values)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-300">Email or Username</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500" placeholder="Enter your email or username" type="text" />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-300">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      {...field} 
                      className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 pr-10" 
                      placeholder="Enter your password" 
                      type={showPassword ? 'text' : 'password'} 
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-200"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="bg-zinc-800 border-zinc-700 text-white"
                    />
                  </FormControl>
                  <FormLabel className="text-zinc-300 text-sm font-normal">Remember me</FormLabel>
                </FormItem>
              )}
            />
            <a href="/forgot-password" className="text-sm text-zinc-300 hover:text-white">
              Forgot password?
            </a>
          </div>

          {error && (
            <Alert variant="destructive" className="bg-red-900/50 border border-red-800 text-red-300">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}

          <LoaderButton isLoading={isPending} className="w-full bg-white hover:bg-zinc-200 text-black font-medium" type="submit">
            Sign In
          </LoaderButton>
        </form>
      </Form>

      {(googleAuthEnabled || githubAuthEnabled) && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-zinc-900 px-2 text-zinc-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {githubAuthEnabled && (
              <Button variant="outline" className="w-full bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            )}
            {googleAuthEnabled && (
              <Button variant="outline" className="w-full bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700">
                <Mail className="mr-2 h-4 w-4" />
                Google
              </Button>
            )}
          </div>
        </>
      )}
    </>
  )
}
