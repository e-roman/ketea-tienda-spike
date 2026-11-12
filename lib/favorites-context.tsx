"use client"

import { createContext, useCallback, useContext, useState, type ReactNode } from "react"

interface FavoritesContextValue {
  ids: string[]
  isFavorite: (id: string) => boolean
  toggle: (id: string) => void
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

/** Favoritos en memoria (spike): no se guardan al recargar ni dependen de una cuenta. */
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([])
  const isFavorite = useCallback((id: string) => ids.includes(id), [ids])
  const toggle = useCallback((id: string) => setIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id])), [])
  return <FavoritesContext.Provider value={{ ids, isFavorite, toggle }}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error("useFavorites debe usarse dentro de <FavoritesProvider>")
  return ctx
}
