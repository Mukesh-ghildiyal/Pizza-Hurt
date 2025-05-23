import { getGoogleClientId } from "./config"

// Google Identity Services API helper functions
export interface GoogleUser {
  id: string
  name: string
  email: string
  picture: string
}

// Load the Google Identity Services API script
export const loadGoogleScript = () => {
  return new Promise<void>((resolve, reject) => {
    if (document.querySelector("script#google-identity-script")) {
      resolve()
      return
    }

    const script = document.createElement("script")
    script.id = "google-identity-script"
    script.src = "https://accounts.google.com/gsi/client"
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = (error) => reject(error)
    document.head.appendChild(script)
  })
}

// Initialize Google Identity Services
export const initializeGoogleAuth = (callback: (user: GoogleUser | null) => void) => {
  if (!window.google) {
    console.error("Google Identity Services not loaded")
    return null
  }

  const clientId = getGoogleClientId()

  if (!clientId) {
    return null
  }

  console.log("Initializing Google auth with client ID:", clientId.substring(0, 20) + "...")

  try {
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: "email profile",
      callback: (response: any) => {
        if (response.error) {
          console.error("Google authentication error:", response.error)
          callback(null)
          return
        }

        // Get user info with the access token
        fetchUserInfo(response.access_token)
          .then((user) => {
            if (user) {
              callback(user)
            } else {
              callback(null)
            }
          })
          .catch((error) => {
            console.error("Error fetching user info:", error)
            callback(null)
          })
      },
    })

    return client
  } catch (error) {
    console.error("Error initializing Google auth:", error)
    return null
  }
}

// Fetch user info from Google API
export const fetchUserInfo = async (accessToken: string): Promise<GoogleUser | null> => {
  try {
    const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch user info")
    }

    const data = await response.json()

    return {
      id: data.sub,
      name: data.name,
      email: data.email,
      picture: data.picture,
    }
  } catch (error) {
    console.error("Error fetching user info:", error)
    return null
  }
}

// Add type definition for Google Identity Services
declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void
          renderButton: (element: HTMLElement, options: any) => void
          prompt: () => void
        }
        oauth2: {
          initTokenClient: (config: any) => {
            requestAccessToken: (options?: { prompt?: string }) => void
          }
        }
      }
    }
  }
}
