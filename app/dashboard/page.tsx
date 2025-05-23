"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PizzaIcon, TruckIcon, CheckCircleIcon, ClockIcon, DollarSignIcon, UsersIcon } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { pizzaOrders } from "@/lib/data"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex space-x-2">
          <div className="h-3 w-3 animate-bounce rounded-full bg-primary [animation-delay-0ms]"></div>
          <div className="h-3 w-3 animate-bounce rounded-full bg-primary animation-delay-200"></div>
          <div className="h-3 w-3 animate-bounce rounded-full bg-primary animation-delay-400"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to home
  }

  const userName = user.name || "User"

  // Calculate dashboard stats
  const totalOrders = pizzaOrders.length
  const pendingOrders = pizzaOrders.filter((order) => order.status === "Pending").length
  const preparingOrders = pizzaOrders.filter((order) => order.status === "Preparing").length
  const deliveringOrders = pizzaOrders.filter((order) => order.status === "Out for Delivery").length
  const completedOrders = pizzaOrders.filter((order) => order.status === "Delivered").length
  const cancelledOrders = pizzaOrders.filter((order) => order.status === "Cancelled").length

  // Calculate total revenue (just for demo)
  const totalRevenue = pizzaOrders.reduce((sum, order) => {
    // Assume average price of $15 per pizza
    return sum + order.quantity * 15
  }, 0)

  return (
    <div className="space-y-8 px-4 md:px-0">
      <div className="flex flex-col gap-2">
        <h1 className="animate-fade-in text-3xl font-bold tracking-tight">
          Hello, <span className="text-primary">{userName}</span>!
        </h1>
        <p className="animate-fade-in text-muted-foreground">
          Welcome to your pizza dashboard. Here's what's cooking today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="animate-slide-up border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <PizzaIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">+2.5% from last week</p>
          </CardContent>
        </Card>

        <Card className="animate-slide-up border-l-4 border-l-warning [animation-delay:0.1s]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders + preparingOrders}</div>
            <p className="text-xs text-muted-foreground">
              {pendingOrders} pending, {preparingOrders} preparing
            </p>
          </CardContent>
        </Card>

        <Card className="animate-slide-up border-l-4 border-l-info [animation-delay:0.2s]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Out for Delivery</CardTitle>
            <TruckIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deliveringOrders}</div>
            <p className="text-xs text-muted-foreground">Estimated delivery: 30 mins</p>
          </CardContent>
        </Card>

        <Card className="animate-slide-up border-l-4 border-l-success [animation-delay:0.3s]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
            <CheckCircleIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedOrders}</div>
            <p className="text-xs text-muted-foreground">{cancelledOrders} cancelled</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="animate-slide-up col-span-4 [animation-delay:0.4s]">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Daily pizza sales and revenue for the current week</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[200px] w-full">
              <div className="flex h-full items-center justify-center">
                <img src="/pizza-sales-line-chart.png" alt="Sales chart" className="h-full w-full object-contain" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-slide-up col-span-3 [animation-delay:0.5s]">
          <CardHeader>
            <CardTitle>Popular Pizzas</CardTitle>
            <CardDescription>Top selling pizzas this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="mr-4 h-8 w-8 rounded-full bg-primary/10 p-1">
                  <PizzaIcon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Pepperoni</p>
                  <p className="text-sm text-muted-foreground">32% of orders</p>
                </div>
                <div className="font-medium">254</div>
              </div>

              <div className="flex items-center">
                <div className="mr-4 h-8 w-8 rounded-full bg-primary/10 p-1">
                  <PizzaIcon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Margherita</p>
                  <p className="text-sm text-muted-foreground">28% of orders</p>
                </div>
                <div className="font-medium">189</div>
              </div>

              <div className="flex items-center">
                <div className="mr-4 h-8 w-8 rounded-full bg-primary/10 p-1">
                  <PizzaIcon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Supreme</p>
                  <p className="text-sm text-muted-foreground">18% of orders</p>
                </div>
                <div className="font-medium">145</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="animate-slide-up [animation-delay:0.6s]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+5.2% from last month</p>
          </CardContent>
        </Card>

        <Card className="animate-slide-up [animation-delay:0.7s]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">+12 new customers this week</p>
          </CardContent>
        </Card>

        <Card className="animate-slide-up [animation-delay:0.8s]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Delivery Time</CardTitle>
            <TruckIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24 min</div>
            <p className="text-xs text-muted-foreground">-2 min from last week</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
