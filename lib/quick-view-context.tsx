"use client"

import { createContext, useCallback, useContext, useState, type ReactNode } from "react"
import type { Product } from "./products"

interface QuickViewContextValue {
  /** Último producto abierto: se conserva al cerrar para que el panel no quede vacío mientras se desliza hacia afuera. */
  product: Product | null
  isOpen: boolean
  openQuickView: (product: Product) => void
  closeQuickView: () => void
}

const QuickViewContext = createContext<QuickViewContextValue | null>(null)

export function QuickViewProvider({ children }: { children: ReactNode }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const openQuickView = useCallback((p: Product) => { setProduct(p); setIsOpen(true) }, [])
  const closeQuickView = useCallback(() => setIsOpen(false), [])
  return (
    <QuickViewContext.Provider value={{ product, isOpen, openQuickView, closeQuickView }}>
      {children}
    </QuickViewContext.Provider>
  )
}

export function useQuickView() {
  const ctx = useContext(QuickViewContext)
  if (!ctx) throw new Error("useQuickView debe usarse dentro de <QuickViewProvider>")
  return ctx
}
