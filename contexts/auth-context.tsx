"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import type { User } from "@/lib/types"
import { loadGoogleScript, initializeGoogleAuth } from "@/lib/google-auth"
import { validateConfig } from "@/lib/config"

type AuthContextType = {
  user: User | null
  isLoading: boolean
  isInitializing: boolean
  isAuthenticated: boolean
  login: () => void
  logout: () => void
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [googleClient, setGoogleClient] = useState<any>(null)
  const router = useRouter()

  // Initialize Google auth on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        // First validate configuration
        if (!validateConfig()) {
          setError("Configuration error: Google Client ID not found. Please check your environment variables.")
          setIsInitializing(false)
          return
        }

        await loadGoogleScript()

        // Check if user is already logged in
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser))
          } catch (error) {
            console.error("Error parsing stored user:", error)
            localStorage.removeItem("user")
          }
        }

        // Initialize Google auth after a short delay to ensure the script is loaded
        setTimeout(() => {
          const client = initializeGoogleAuth((googleUser) => {
            setIsLoading(false)

            if (googleUser) {
              const userData: User = {
                id: googleUser.id,
                name: googleUser.name,
                email: googleUser.email,
                image: googleUser.picture,
              }

              setUser(userData)
              localStorage.setItem("user", JSON.stringify(userData))
              router.push("/dashboard")
            } else {
              setError("Failed to authenticate with Google")
            }
          })

          if (client) {
            setGoogleClient(client)
          } else {
            setError("Failed to initialize Google authentication. Please check your configuration.")
          }
          setIsInitializing(false)
        }, 500)
      } catch (error) {
        console.error("Error initializing Google auth:", error)
        setError("Failed to load Google authentication")
        setIsInitializing(false)
      }
    }

    initAuth()
  }, [router])

  const login = () => {
    setIsLoading(true)
    setError(null)

    if (googleClient) {
      try {
        googleClient.requestAccessToken({ prompt: "consent" })
      } catch (error) {
        console.error("Error requesting access token:", error)
        setError("Failed to start Google authentication")
        setIsLoading(false)
      }
    } else {
      setError("Google authentication not initialized")
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isInitializing,
        isAuthenticated: !!user,
        login,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
