// Configuration file for environment variables
export const config = {
  googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
} as const

// For development, we can use a mock client ID if the real one is not available
export const getGoogleClientId = (): string => {
  // Use the environment variable if available
  if (config.googleClientId) {
    return config.googleClientId
  }

  // In development, provide a fallback for testing
  if (config.isDevelopment) {
    console.warn(
      "Using mock Google Client ID for development. For production, please set NEXT_PUBLIC_GOOGLE_CLIENT_ID environment variable.",
    )
    return "mock-client-id-for-development-only"
  }

  // In production, log an error but return a value to prevent crashes
  console.error("NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set. Authentication will not work correctly.")
  return "missing-client-id"
}

// Validation function that's less strict for development
export const validateConfig = () => {
  // In development, we can proceed even without the real client ID
  if (config.isDevelopment) {
    if (!config.googleClientId) {
      console.warn("NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set. Using mock values for development.")
    }
    return true
  }

  // In production, we should validate properly
  const errors: string[] = []
  if (!config.googleClientId) {
    errors.push("NEXT_PUBLIC_GOOGLE_CLIENT_ID is required but not found")
  }

  if (errors.length > 0) {
    console.error("Configuration errors:", errors)
    return false
  }

  return true
}
