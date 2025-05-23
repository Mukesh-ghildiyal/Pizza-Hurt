"use client"

import { useState } from "react"
import { PizzaOrdersTable } from "@/components/pizza-orders-table"
import { pizzaOrders } from "@/lib/data"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, SlidersHorizontal, PlusCircle, RefreshCw } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function OrdersPage() {
  const { user, isLoading } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | undefined>("All Statuses")
  const [sortBy, setSortBy] = useState<string | undefined>("orderId")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [activeTab, setActiveTab] = useState("all")

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

  // Filter orders based on active tab
  let tabFilteredOrders = [...pizzaOrders]
  if (activeTab === "pending") {
    tabFilteredOrders = pizzaOrders.filter((order) => order.status === "Pending")
  } else if (activeTab === "preparing") {
    tabFilteredOrders = pizzaOrders.filter((order) => order.status === "Preparing")
  } else if (activeTab === "delivering") {
    tabFilteredOrders = pizzaOrders.filter((order) => order.status === "Out for Delivery")
  } else if (activeTab === "completed") {
    tabFilteredOrders = pizzaOrders.filter((order) => order.status === "Delivered")
  } else if (activeTab === "cancelled") {
    tabFilteredOrders = pizzaOrders.filter((order) => order.status === "Cancelled")
  }

  // Filter orders based on search query and status filter
  const filteredOrders = tabFilteredOrders.filter((order) => {
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.pizzaType.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "All Statuses" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Sort orders based on sort criteria
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (!sortBy) return 0

    let comparison = 0

    if (sortBy === "orderId") {
      comparison = a.orderId.localeCompare(b.orderId)
    } else if (sortBy === "customerName") {
      comparison = a.customerName.localeCompare(b.customerName)
    } else if (sortBy === "orderDate") {
      comparison = new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime()
    }

    return sortOrder === "asc" ? comparison : -comparison
  })

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  // Count orders by status
  const pendingCount = pizzaOrders.filter((order) => order.status === "Pending").length
  const preparingCount = pizzaOrders.filter((order) => order.status === "Preparing").length
  const deliveringCount = pizzaOrders.filter((order) => order.status === "Out for Delivery").length
  const completedCount = pizzaOrders.filter((order) => order.status === "Delivered").length
  const cancelledCount = pizzaOrders.filter((order) => order.status === "Cancelled").length

  return (
    <div className="space-y-6 px-4 md:px-0">
      <div className="flex flex-col gap-2">
        <h1 className="animate-fade-in text-3xl font-bold tracking-tight">Pizza Orders</h1>
        <p className="animate-fade-in text-muted-foreground">Manage and track all your pizza orders in one place.</p>
      </div>

      <div className="animate-slide-up">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-full max-w-md grid-cols-3 md:grid-cols-6">
              <TabsTrigger value="all" className="text-xs sm:text-sm">
                All <span className="ml-1 rounded-full bg-muted px-1.5 py-0.5 text-xs">{pizzaOrders.length}</span>
              </TabsTrigger>
              <TabsTrigger value="pending" className="text-xs sm:text-sm">
                Pending <span className="ml-1 rounded-full bg-muted px-1.5 py-0.5 text-xs">{pendingCount}</span>
              </TabsTrigger>
              <TabsTrigger value="preparing" className="text-xs sm:text-sm">
                Preparing <span className="ml-1 rounded-full bg-muted px-1.5 py-0.5 text-xs">{preparingCount}</span>
              </TabsTrigger>
              <TabsTrigger value="delivering" className="text-xs sm:text-sm">
                Delivering <span className="ml-1 rounded-full bg-muted px-1.5 py-0.5 text-xs">{deliveringCount}</span>
              </TabsTrigger>
              <TabsTrigger value="completed" className="text-xs sm:text-sm">
                Completed <span className="ml-1 rounded-full bg-muted px-1.5 py-0.5 text-xs">{completedCount}</span>
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="text-xs sm:text-sm">
                Cancelled <span className="ml-1 rounded-full bg-muted px-1.5 py-0.5 text-xs">{cancelledCount}</span>
              </TabsTrigger>
            </TabsList>
            <div className="hidden md:block">
              <Button variant="outline" size="sm" className="ml-auto gap-1">
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Refresh</span>
              </Button>
            </div>
          </div>

          <TabsContent value="all" className="mt-4">
            <Card>
              <CardHeader className="p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search orders..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All Statuses">All Statuses</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Preparing">Preparing</SelectItem>
                        <SelectItem value="Out for Delivery">Out for Delivery</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="orderId">Order ID</SelectItem>
                        <SelectItem value="customerName">Customer Name</SelectItem>
                        <SelectItem value="orderDate">Order Date</SelectItem>
                      </SelectContent>
                    </Select>

                    {sortBy && (
                      <Button variant="outline" size="icon" onClick={toggleSortOrder}>
                        <SlidersHorizontal className="h-4 w-4" />
                      </Button>
                    )}

                    <Button className="ml-auto gap-1 sm:ml-0">
                      <PlusCircle className="h-4 w-4" />
                      <span>New Order</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <PizzaOrdersTable orders={sortedOrders} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="mt-4">
            <Card>
              <CardHeader className="p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search pending orders..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button className="ml-auto gap-1">
                    <PlusCircle className="h-4 w-4" />
                    <span>New Order</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <PizzaOrdersTable orders={sortedOrders} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preparing" className="mt-4">
            <Card>
              <CardHeader className="p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search preparing orders..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <PizzaOrdersTable orders={sortedOrders} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="delivering" className="mt-4">
            <Card>
              <CardHeader className="p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search delivering orders..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <PizzaOrdersTable orders={sortedOrders} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed" className="mt-4">
            <Card>
              <CardHeader className="p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search completed orders..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <PizzaOrdersTable orders={sortedOrders} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cancelled" className="mt-4">
            <Card>
              <CardHeader className="p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search cancelled orders..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <PizzaOrdersTable orders={sortedOrders} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
