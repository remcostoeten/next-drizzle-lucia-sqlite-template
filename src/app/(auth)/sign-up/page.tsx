'use client'

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useServerAction } from "zsa-react"
import { useToast } from "@/components/ui/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { LoaderButton } from "@/components/loader-button"
import { cn } from "@/lib/utils"
import { Terminal, Github, Mail } from "lucide-react"
import Link from "next/link"
import { signUpAction } from "./actions"

const registrationSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(8),
  passwordConfirmation: z.string().min(8),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords don't match",
  path: ["passwordConfirmation"],
})

export default function SignUpPage() {
  const { toast } = useToast()

  const { execute, isPending, error } = useServerAction(signUpAction, {
    onError({ err }) {
      toast({
        title: "Something went wrong",
        description: err.message,
        variant: "destructive",
      })
    },
  })

  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  })

  function onSubmit(values: z.infer<typeof registrationSchema>) {
    execute(values)
  }

  return (
      <div className="w-full  mx-auto max-w-md space-y-8 p-8 bg-dark--section border border-dark">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Create an account</h1>
          <p className="text-zinc-400">Enter your details to get started</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Email</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500" placeholder="Enter your email" type="email" />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Username</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500" placeholder="Choose a username" type="text" />
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
                    <Input {...field} className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500" placeholder="Create a password" type="password" />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-300">Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500" placeholder="Confirm your password" type="password" />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            {error && (
              <Alert variant="destructive" className="bg-red-900/50 border border-red-800 text-red-300">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            )}

            <LoaderButton isLoading={isPending} className="w-full bg-white hover:bg-zinc-200 text-black font-medium" type="submit">
              Create Account
            </LoaderButton>
          </form>
        </Form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-zinc-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-zinc-900 px-2 text-zinc-500">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="w-full bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
          <Button variant="outline" className="w-full bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700">
            <Mail className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>

        <p className="text-center text-zinc-500 text-sm">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-white hover:underline">
            Sign in
          </Link>
        </p>
      </div>
  )
}
