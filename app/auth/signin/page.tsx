"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { PizzaIcon, AlertCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { GoogleSignInButton } from "@/components/google-sign-in-button"
import { DebugInfo } from "@/components/debug-info"

export default function SignIn() {
  const router = useRouter()
  const { user, isInitializing, error } = useAuth()

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-700 border-t-orange-500"></div>
            <PizzaIcon className="absolute inset-0 m-auto h-8 w-8 text-orange-500" />
          </div>
          <p className="text-lg font-medium text-muted-foreground">Initializing authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg">
            <PizzaIcon className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Sign in to PizzaDash</h1>
          <p className="text-center text-muted-foreground">
            Sign in with your Gmail account to access your pizza dashboard.
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="my-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col space-y-4">
          <GoogleSignInButton />
        </div>

        <div className="text-center text-sm text-muted-foreground">
          By signing in, you agree to our{" "}
          <a href="#" className="underline hover:text-foreground">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-foreground">
            Privacy Policy
          </a>
          .
        </div>

        <DebugInfo />
      </div>
    </div>
  )
}
