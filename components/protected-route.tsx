"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { PizzaIcon } from "lucide-react"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isInitializing } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isInitializing && !user) {
      router.push("/auth/signin")
    }
  }, [user, isInitializing, router])

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-700 border-t-orange-500"></div>
            <PizzaIcon className="absolute inset-0 m-auto h-8 w-8 text-orange-500" />
          </div>
          <p className="text-lg font-medium text-muted-foreground">Verifying authentication...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to sign-in
  }

  return <>{children}</>
}
