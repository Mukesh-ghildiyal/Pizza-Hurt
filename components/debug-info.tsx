"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"

export function DebugInfo() {
  const [showDebug, setShowDebug] = useState(false)

  if (process.env.NODE_ENV !== "development") {
    return null
  }

  const envVars = Object.keys(process.env)
    .filter((key) => key.startsWith("NEXT_PUBLIC"))
    .reduce(
      (acc, key) => {
        acc[key] = process.env[key] || "undefined"
        return acc
      },
      {} as Record<string, string>,
    )

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button variant="outline" size="sm" onClick={() => setShowDebug(!showDebug)} className="mb-2">
        {showDebug ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        Debug
      </Button>

      {showDebug && (
        <Card className="w-80 max-h-60 overflow-auto">
          <CardHeader>
            <CardTitle className="text-sm">Environment Variables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(envVars).map(([key, value]) => (
                <div key={key} className="text-xs">
                  <strong>{key}:</strong>
                  <div className="break-all text-muted-foreground">
                    {key.includes("CLIENT_ID") ? (value ? `${value.substring(0, 20)}...` : "undefined") : value}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
