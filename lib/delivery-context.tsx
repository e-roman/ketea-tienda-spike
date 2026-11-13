"use client"

import { createContext, useCallback, useContext, useState, type ReactNode } from "react"
import { useCart } from "./cart-context"
import { DELIVERY_OPTIONS, type DeliveryMethod, type DeliveryOption } from "./delivery"

interface DeliveryContextValue {
  postalCode: string
  setPostalCode: (cp: string) => void
  /** Método vigente: si el carrito tiene productos que solo se retiran por el local, siempre es "pickup". */
  method: DeliveryMethod
  setMethod: (m: DeliveryMethod) => void
  option: DeliveryOption
  shippingCost: number
  /** Hay productos que solo se retiran por el local. */
  pickupOnly: boolean
}

const DeliveryContext = createContext<DeliveryContextValue | null>(null)

/** Entrega elegida (CP y método), compartida por el drawer, el carrito y el checkout. El CP inicial es de ejemplo. */
export function DeliveryProvider({ children }: { children: ReactNode }) {
  const { items } = useCart()
  const [postalCode, setPostalCode] = useState("1706")
  const [selected, setSelected] = useState<DeliveryMethod>("standard")
  const pickupOnly = items.some((i) => i.product.pickupOnly)
  const method: DeliveryMethod = pickupOnly ? "pickup" : selected
  const setMethod = useCallback((m: DeliveryMethod) => setSelected(m), [])
  const option = DELIVERY_OPTIONS[method]

  return (
    <DeliveryContext.Provider value={{ postalCode, setPostalCode, method, setMethod, option, shippingCost: option.cost, pickupOnly }}>
      {children}
    </DeliveryContext.Provider>
  )
}

export function useDelivery() {
  const ctx = useContext(DeliveryContext)
  if (!ctx) throw new Error("useDelivery debe usarse dentro de <DeliveryProvider>")
  return ctx
}
