"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"

interface LoginButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function LoginButton({ variant = "default", size = "default", className }: LoginButtonProps) {
  const router = useRouter()
  const { isLoading } = useAuth()

  const handleLogin = () => {
    router.push("/auth/signin")
  }

  return (
    <Button variant={variant} size={size} onClick={handleLogin} disabled={isLoading} className={cn("gap-2", className)}>
      {isLoading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
      ) : (
        <LogIn className="h-5 w-5" />
      )}
      {isLoading ? "Signing in..." : "Sign in with Gmail"}
    </Button>
  )
}
