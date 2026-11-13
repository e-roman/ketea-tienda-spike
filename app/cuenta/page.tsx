"use client"

import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { Heart, LogOut, Package, UserRound } from "lucide-react"
import { AccountAccessForm, type AccountAccessResult } from "@/components/patterns/account-access-form"
import { PageHeader } from "@/components/patterns/page-header"
import { EmptyState } from "@/components/patterns/empty-state"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Button, buttonClasses } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useFavorites } from "@/lib/favorites-context"

const favoritesLinkClasses = buttonClasses({
  variant: "outline",
  fullWidth: true,
})

/**
 * Mi cuenta. Comprar no requiere cuenta; esto es opcional (historial de pedidos y datos guardados).
 * La sesión es simulada y vive solo en memoria hasta que exista un backend de autenticación.
 */
export default function CuentaPage() {
  const [session, setSession] = useState<AccountAccessResult | null>(null)
  const { ids } = useFavorites()

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <Breadcrumb className="mb-3" items={[{ label: "Inicio", href: "/" }, { label: "Mi cuenta" }]} />

      {!session ? (
        <div className="account__access">
          <Card padding="panel" className="account__card">
            <AccountAccessForm onSuccess={(r) => { setSession(r); toast.success(r.mode === "register" ? "¡Cuenta creada con éxito!" : "¡Sesión iniciada!") }} />
          </Card>
          <p className="account__note">No hace falta tener cuenta para comprar: podés finalizar tu pedido solo con tu email.</p>
        </div>
      ) : (
        <>
          <PageHeader title="Mi cuenta" tight>{session.email}</PageHeader>

          <div className="account__grid">
            <Card padding="panel" className="account__card">
              <h2 className="account__title"><Package aria-hidden="true" /> Mis pedidos</h2>
              <EmptyState
                iconTone="muted"
                icon={<Package className="icon-xl" aria-hidden="true" />}
                title="Todavía no hiciste pedidos"
                text="Cuando compres, vas a ver acá el estado y el historial de tus pedidos."
              >
                <Link href="/productos" className={buttonClasses()}>Ver productos</Link>
              </EmptyState>
            </Card>

            <div className="account__side">
              <Card padding="panel" className="account__card">
                <h2 className="account__title"><UserRound aria-hidden="true" /> Mis datos</h2>
                <p className="account__text">{session.email}</p>
              </Card>
              <Card padding="panel" className="account__card">
                <h2 className="account__title"><Heart aria-hidden="true" /> Favoritos</h2>
                <p className="account__text">{ids.length === 0 ? "Todavía no guardaste productos." : `${ids.length} ${ids.length === 1 ? "producto guardado" : "productos guardados"}.`}</p>
                <Link href="/favoritos" className={favoritesLinkClasses}>Ver favoritos</Link>
              </Card>
              <Button variant="neutral" fullWidth onClick={() => { setSession(null); toast.success("Cerraste sesión") }}>
                <LogOut className="icon-sm" aria-hidden="true" /> Cerrar sesión
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
