"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { User } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Home, PizzaIcon, TruckIcon, BarChart3, Settings, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface DashboardNavProps {
  user: User | undefined
  className?: string
}

export function DashboardNav({ user, className }: DashboardNavProps) {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Pizza Orders",
      href: "/dashboard/orders",
      icon: PizzaIcon,
    },
    {
      title: "Deliveries",
      href: "/dashboard/deliveries",
      icon: TruckIcon,
      disabled: true,
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3,
      disabled: true,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      disabled: true,
    },
    {
      title: "Help",
      href: "/dashboard/help",
      icon: HelpCircle,
      disabled: true,
    },
  ]

  if (!user) return null

  return (
    <div className={cn("flex flex-col space-y-1", className)}>
      <nav className="grid items-start gap-2 px-2 text-sm font-medium">
        {navItems.map((item) => {
          const isActive = pathname === item.href

          return (
            <Button
              key={item.href}
              asChild
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "justify-start transition-all",
                isActive ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground",
                item.disabled && "opacity-50 pointer-events-none",
              )}
              disabled={item.disabled}
            >
              <Link href={item.disabled ? "#" : item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            </Button>
          )
        })}
      </nav>

      <div className="mt-auto px-4 py-4">
        <div className="mt-auto rounded-lg bg-accent p-4">
          <div className="mb-2 flex items-center justify-center">
            <PizzaIcon className="h-10 w-10 text-primary" />
          </div>
          <h3 className="mb-1 text-center text-sm font-medium">Pizza Pro Plan</h3>
          <p className="mb-3 text-center text-xs text-muted-foreground">Get advanced analytics and delivery insights</p>
          <Button size="sm" className="w-full text-xs" variant="default" disabled>
            Upgrade
          </Button>
        </div>
      </div>
    </div>
  )
}
