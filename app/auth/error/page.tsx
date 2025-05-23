"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { PizzaIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  let errorMessage = "An unknown error occurred during authentication."

  if (error === "Configuration") {
    errorMessage = "There is a problem with the server configuration."
  } else if (error === "AccessDenied") {
    errorMessage = "You do not have permission to sign in."
  } else if (error === "Verification") {
    errorMessage = "The verification link has expired or has already been used."
  } else if (error === "OAuthSignin") {
    errorMessage = "Error starting the sign in process. Please try again."
  } else if (error === "OAuthCallback") {
    errorMessage = "Error during the sign in process. Please try again."
  } else if (error === "OAuthAccountNotLinked") {
    errorMessage = "This email is already associated with another account."
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg">
            <PizzaIcon className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Authentication Error</h1>
          <div className="rounded-md bg-destructive/10 p-4 text-center text-destructive">{errorMessage}</div>
          <Button asChild className="mt-4">
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
