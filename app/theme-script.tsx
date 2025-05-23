"use client"

import { useEffect } from "react"

export function ThemeScript() {
  useEffect(() => {
    // This script runs only on the client
    return
  }, [])

  // This script runs on the server and is injected into the HTML
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              // Get stored theme or default to dark
              const theme = localStorage.getItem('pizza-dashboard-theme') || 'dark';
              
              // Check for system preference
              const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              
              // Apply theme - default to dark if no preference
              document.documentElement.classList.toggle('dark', 
                theme === 'dark' || (theme === 'system' && systemPreference === 'dark') || (!theme)
              );
            } catch (e) {
              // Default to dark theme on error
              document.documentElement.classList.add('dark');
              console.error('Error applying theme:', e);
            }
          })();
        `,
      }}
    />
  )
}
