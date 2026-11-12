"use client"

import { createContext, useContext, useReducer, useCallback, useState, ReactNode } from "react"
import type { Product } from "./products"

// Pedido mínimo: cantidad de packs (x3) que debe alcanzar el carrito para
// poder finalizar la compra. Reemplaza la lógica anterior de envío gratis
// por monto.
export const MINIMUM_PACKS = 4

export interface CartItem {
  product: Product
  quantity: number  // quantity of 3-packs
}

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: "ADD"; product: Product }
  | { type: "REMOVE"; productId: string }
  | { type: "INCREMENT"; productId: string }
  | { type: "DECREMENT"; productId: string }
  | { type: "CLEAR" }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((i) => i.product.id === action.product.id)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }
      }
      return { items: [...state.items, { product: action.product, quantity: 1 }] }
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.product.id !== action.productId) }
    case "INCREMENT":
      return {
        items: state.items.map((i) =>
          i.product.id === action.productId ? { ...i, quantity: i.quantity + 1 } : i
        ),
      }
    case "DECREMENT":
      return {
        items: state.items
          .map((i) =>
            i.product.id === action.productId ? { ...i, quantity: i.quantity - 1 } : i
          )
          .filter((i) => i.quantity > 0),
      }
    case "CLEAR":
      return { items: [] }
    default:
      return state
  }
}

interface CartContextValue {
  items: CartItem[]
  add: (product: Product) => void
  remove: (productId: string) => void
  increment: (productId: string) => void
  decrement: (productId: string) => void
  clear: () => void
  totalItems: number
  subtotal: number
  remainingForMinimum: number
  minimumMet: boolean
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  const [isOpen, setIsOpen] = useState(false)

  const add      = useCallback((product: Product) => dispatch({ type: "ADD", product }), [])
  const remove   = useCallback((id: string) => dispatch({ type: "REMOVE", productId: id }), [])
  const increment= useCallback((id: string) => dispatch({ type: "INCREMENT", productId: id }), [])
  const decrement= useCallback((id: string) => dispatch({ type: "DECREMENT", productId: id }), [])
  const clear    = useCallback(() => dispatch({ type: "CLEAR" }), [])

  const openCart   = useCallback(() => setIsOpen(true), [])
  const closeCart  = useCallback(() => setIsOpen(false), [])
  const toggleCart = useCallback(() => setIsOpen((v) => !v), [])

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0)
  const subtotal   = state.items.reduce((s, i) => s + i.product.priceX3 * i.quantity, 0)
  const remainingForMinimum = Math.max(MINIMUM_PACKS - totalItems, 0)
  const minimumMet = totalItems >= MINIMUM_PACKS

  return (
    <CartContext.Provider value={{
      items: state.items, add, remove, increment, decrement, clear, totalItems, subtotal,
      remainingForMinimum, minimumMet,
      isOpen, openCart, closeCart, toggleCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used inside CartProvider")
  return ctx
}
