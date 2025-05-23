export interface PizzaOrder {
  orderId: string
  customerName: string
  pizzaType: string
  quantity: number
  orderDate: string
  status: string
}

export interface User {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
}
