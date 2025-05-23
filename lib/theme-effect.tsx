"use client"

import { useTheme } from "next-themes"
import { useEffect } from "react"

export function ThemeEffect() {
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    const savedTheme = localStorage.getItem("pizza-dashboard-theme")

    // If there's no saved theme, default to dark
    if (!savedTheme) {
      setTheme("dark")
    }

    // Add a class to disable transitions during theme change
    const handleThemeChange = () => {
      document.documentElement.classList.add("disable-transitions")
      setTimeout(() => {
        document.documentElement.classList.remove("disable-transitions")
      }, 0)
    }

    window.addEventListener("themechange", handleThemeChange)
    return () => window.removeEventListener("themechange", handleThemeChange)
  }, [setTheme])

  return null
}
