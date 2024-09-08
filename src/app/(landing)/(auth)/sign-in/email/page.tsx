import { getServerSideConfig } from '@/lib/auth/ssr-config'
import EmailSignInForm from './EmailSignInForm'

export default async function EmailSignInPage() {
  const config = await getServerSideConfig()

  return (
    <div className="w-full mx-auto max-w-md space-y-8 p-8 bg-dark rounded-lg border border-border">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Sign In</h1>
        <p className="text-zinc-400">Welcome back! Please sign in to your account.</p>
      </div>

      <EmailSignInForm
        googleAuthEnabled={config.googleAuthEnabled}
        githubAuthEnabled={config.githubAuthEnabled}
      />

      <p className="text-center text-zinc-500 text-sm">
        Don't have an account?{" "}
        <a href="/sign-up" className="text-white hover:underline">
          Sign up
        </a>
      </p>
    </div>
  )
}
