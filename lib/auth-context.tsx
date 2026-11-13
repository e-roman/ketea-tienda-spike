"use client"

import { createContext, useCallback, useContext, useState, type ReactNode } from "react"

export interface User {
  email: string
  /** Nombre para el saludo, sacado del email (ana.perez@… → «Ana»). */
  name: string
}

interface AuthContextValue {
  user: User | null
  login: (email: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

/** «ana.perez@mail.com» → «Ana». Sin backend no hay nombre real: se arma con lo que hay antes de la arroba. */
function nameFromEmail(email: string) {
  const first = email.split("@")[0].split(/[._\-+]/)[0] || "usuario"
  return first.charAt(0).toUpperCase() + first.slice(1)
}

/** Sesión simulada (spike): vive en memoria y se pierde al recargar. Hasta que haya backend de autenticación. */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const login = useCallback((email: string) => setUser({ email, name: nameFromEmail(email) }), [])
  const logout = useCallback(() => setUser(null), [])
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>")
  return ctx
}
