"use client"

import { createContext, useCallback, useContext, useState, type ReactNode } from "react"

export type NotificationType = "promo" | "order" | "price"

export interface Notification {
  id: string
  type: NotificationType
  title: string
  text: string
  /** Texto de tiempo ya armado ("Hace 2 h", "Ayer"). */
  time: string
  href?: string
  read: boolean
}

interface NotificationsContextValue {
  items: Notification[]
  unread: number
  markRead: (id: string) => void
  markAllRead: () => void
  add: (n: Omit<Notification, "id" | "read" | "time"> & { time?: string }) => void
}

// Avisos de ejemplo: no hay servidor. Los de pedido se agregan solos al confirmar una compra.
const SEED: Notification[] = [
  { id: "seed-1", type: "promo", title: "Ofertas de la semana", text: "Hasta 50% OFF en robots limpiafondos y bombas de calor.", time: "Hace 2 h", href: "/productos?nav=ofertas", read: false },
  { id: "seed-2", type: "promo", title: "Cuotas sin interés", text: "Hasta 12 cuotas sin interés en equipamiento seleccionado.", time: "Ayer", href: "/productos", read: false },
  { id: "seed-3", type: "price", title: "Bajó de precio", text: "Robot limpia piscina Dolphin Liberty 400 ahora tiene 25% OFF.", time: "Hace 2 días", href: "/productos/robot-limpia-piscinas-dolphin-liberty-400", read: true },
]

const NotificationsContext = createContext<NotificationsContextValue | null>(null)

/** Notificaciones del header: lista en memoria (spike), con leído / no leído. */
export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Notification[]>(SEED)

  const markRead = useCallback((id: string) => setItems((cur) => cur.map((n) => (n.id === id ? { ...n, read: true } : n))), [])
  const markAllRead = useCallback(() => setItems((cur) => cur.map((n) => ({ ...n, read: true }))), [])
  const add = useCallback<NotificationsContextValue["add"]>((n) => {
    setItems((cur) => [{ ...n, id: `n-${Date.now()}`, time: n.time ?? "Recién", read: false }, ...cur])
  }, [])

  const unread = items.filter((n) => !n.read).length
  return <NotificationsContext.Provider value={{ items, unread, markRead, markAllRead, add }}>{children}</NotificationsContext.Provider>
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext)
  if (!ctx) throw new Error("useNotifications debe usarse dentro de <NotificationsProvider>")
  return ctx
}
