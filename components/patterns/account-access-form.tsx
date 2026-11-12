"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field } from "@/components/ui/field"
import { linkClasses } from "@/components/ui/link"
import { FormHeader, FormDivider, FormFootnote } from "@/components/ui/form-parts"
import { Stack } from "@/components/ui/layout"

/**
 * Pattern Figma `Form/Account Access` (Mode=Register | Login) + recuperar contraseña.
 * Se usa en el modal Ingresar y en el paso Cuenta del checkout.
 * El cambio de modo es por link, como en Figma. Lo único que cambia entre usos es `submitLabels`.
 */
export type AccountMode = "register" | "login"
export type AuthProvider = "google" | "apple" | null
export type AccountAccessResult = { mode: AccountMode; email: string; provider: AuthProvider }

const COPY = {
  register: {
    title: "Creá tu cuenta",
    subtitle: "Guardá tus datos para que tu próxima compra sea más rápida.",
    divider: "o registrate con email",
    submit: "Crear cuenta",
  },
  login: {
    title: "Ingresá a tu cuenta",
    subtitle: "Tu historial de pedidos quedará guardado para tu próxima compra.",
    divider: "o ingresá con email",
    submit: "Iniciar sesión",
  },
  forgot: {
    title: "Recuperar contraseña",
    subtitle: "Ingresá tu email y te enviaremos instrucciones.",
  },
} as const

// Mientras no haya backend de auth, los proveedores sociales devuelven un email de ejemplo.
const DEMO_EMAIL = { google: "usuario@gmail.com", apple: "usuario@icloud.com" } as const

export function AccountAccessForm({
  initialMode = "register",
  submitLabels,
  onSuccess,
}: {
  initialMode?: AccountMode
  submitLabels?: Partial<Record<AccountMode, string>>
  onSuccess: (result: AccountAccessResult) => void
}) {
  const [mode, setMode] = useState<AccountMode | "forgot">(initialMode)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState<null | "google" | "apple" | "form">(null)

  function handleAuth(e?: React.FormEvent, source: "google" | "apple" | "form" = "form") {
    e?.preventDefault()
    if (loading || mode === "forgot") return
    setLoading(source)
    setTimeout(() => {
      setLoading(null)
      const provider: AuthProvider = source === "form" ? null : source
      onSuccess({ mode, email: provider ? DEMO_EMAIL[provider] : email, provider })
      setPassword("")
    }, 700)
  }

  function handleForgot(e: React.FormEvent) {
    e.preventDefault()
    if (loading) return
    setLoading("form")
    setTimeout(() => {
      setLoading(null)
      toast.success("Te enviamos instrucciones a tu email")
      setMode("login")
    }, 700)
  }

  return (
    <>
      <FormHeader title={COPY[mode].title} subtitle={COPY[mode].subtitle} />

      {mode === "forgot" ? (
        <>
          <Stack as="form" gap={4} onSubmit={handleForgot}>
            <Field label="Email">
              <Input type="email" autoComplete="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Field>
            <Button type="submit" fullWidth disabled={!!loading} loading={loading === "form"} loadingText="Enviando…">
              Enviar
            </Button>
          </Stack>
          <FormFootnote>
            ¿Recordás tu contraseña?{" "}
            <button type="button" onClick={() => setMode("login")} className={linkClasses()}>Ingresar</button>
          </FormFootnote>
        </>
      ) : (
        <>
          <Stack gap={3} className="form-block">
            <Button variant="neutral" fullWidth onClick={() => handleAuth(undefined, "google")} disabled={!!loading} loading={loading === "google"} loadingText="Conectando…">
              <svg className="icon-sm" aria-hidden="true" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continuar con Google
            </Button>
            <Button variant="neutral" fullWidth onClick={() => handleAuth(undefined, "apple")} disabled={!!loading} loading={loading === "apple"} loadingText="Conectando…">
              <svg className="icon-sm" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              Continuar con Apple
            </Button>
          </Stack>

          <FormDivider>{COPY[mode].divider}</FormDivider>

          <Stack as="form" gap={4} onSubmit={(e) => handleAuth(e, "form")}>
            <Field label="Email">
              <Input type="email" autoComplete="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Field>
            <Field label="Contraseña">
              <Input
                type="password"
                autoComplete={mode === "register" ? "new-password" : "current-password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Field>
            {mode === "login" && (
              <div className="form-aside">
                <button type="button" onClick={() => setMode("forgot")} className={linkClasses({ variant: "subtle", underline: true, size: "sm" })}>
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            )}
            <Button type="submit" fullWidth disabled={!!loading} loading={loading === "form"} loadingText="Procesando…">
              {submitLabels?.[mode] ?? COPY[mode].submit}
            </Button>
          </Stack>

          <FormFootnote>
            {mode === "register" ? (
              <>¿Ya tenés una cuenta?{" "}<button type="button" onClick={() => setMode("login")} className={linkClasses()}>Ingresar</button></>
            ) : (
              <>¿Aún no tenés una cuenta?{" "}<button type="button" onClick={() => setMode("register")} className={linkClasses()}>Registrarme</button></>
            )}
          </FormFootnote>
        </>
      )}
    </>
  )
}
