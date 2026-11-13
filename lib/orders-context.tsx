"use client"

import { createContext, useCallback, useContext, useState, type ReactNode } from "react"
import type { CartItem } from "@/lib/cart-context"

export interface Order {
  /** Email con el que se compró. */
  email: string
  /** Número visible, ej. «ORD-2026-48213». */
  ref: string
  /** Fecha ya formateada. */
  date: string
  items: CartItem[]
  subtotal: number
  shippingCost: number
  total: number
  deliveryLabel: string
  paymentLabel: string
}

interface OrdersContextValue {
  orders: Order[]
  add: (order: Order) => void
}

const OrdersContext = createContext<OrdersContextValue | null>(null)

/** Pedidos confirmados en esta visita (en memoria, spike): se muestran en Mi cuenta → Mis pedidos. */
export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])
  const add = useCallback((order: Order) => setOrders((cur) => [order, ...cur]), [])
  return <OrdersContext.Provider value={{ orders, add }}>{children}</OrdersContext.Provider>
}

export function useOrders() {
  const ctx = useContext(OrdersContext)
  if (!ctx) throw new Error("useOrders debe usarse dentro de <OrdersProvider>")
  return ctx
}
