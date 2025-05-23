"use client"

import type React from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { PizzaIcon, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth()

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex items-center justify-between">
            <div className="flex items-center gap-2 md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="mr-2">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                  <div className="flex h-full flex-col">
                    <div className="flex h-14 items-center border-b px-4">
                      <div className="flex items-center gap-2 font-semibold">
                        <PizzaIcon className="h-6 w-6 text-primary" />
                        <span>Pizza Dashboard</span>
                      </div>
                    </div>
                    <DashboardNav user={user} className="flex-1 px-2 py-4" />
                  </div>
                </SheetContent>
              </Sheet>
              <div className="flex items-center gap-2 font-semibold">
                <PizzaIcon className="h-6 w-6 text-primary" />
                <span>Pizza Dashboard</span>
              </div>
            </div>

            <div className="hidden items-center gap-2 font-semibold md:flex">
              <PizzaIcon className="h-6 w-6 text-primary" />
              <span>Pizza Dashboard</span>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <UserNav user={user} />
            </div>
          </div>
        </header>

        <div className="container flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
          <DashboardNav user={user} className="sticky top-[72px] hidden h-[calc(100vh-72px)] md:block" />
          <main className="flex w-full flex-col overflow-hidden px-0 py-6">{children}</main>
        </div>

        <footer className="border-t py-6 md:py-0">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built with Next.js and Tailwind CSS. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </ProtectedRoute>
  )
}
