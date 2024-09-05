"use client";

import { GithubIcon, GoogleIcon, MailIcon } from "@/components/theme/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="mx-auto flex min-h-[80dvh] items-center justify-center py-24">
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Sign in to your account using one of the options below.
          </p>
        </div>
        <div className="space-y-4">
          <Link
            href="/api/login/google"
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "w-full"
            )}
          >
            <GoogleIcon className="mr-2 h-5 w-5 stroke-white" />
            Sign in with Google
          </Link>
          <Link
            href="/api/login/github"
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "w-full"
            )}
          >
            <GithubIcon className="mr-2 h-5 w-5" />
            Sign in with GitHub
          </Link>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-100 px-2 text-gray-500 dark:bg-gray-950 dark:text-gray-400">
                Or sign in with email
              </span>
            </div>
          </div>

          <div className="flex justify-center">
            <Button variant="outline" className="w-full">
              <Link href="/sign-in/email" className="flex items-center gap-4">
                <MailIcon /> <span>Sign in with Email</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
