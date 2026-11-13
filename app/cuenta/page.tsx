"use client"

import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { Heart, LogOut, Package, UserRound } from "lucide-react"
import { AccountAccessForm } from "@/components/patterns/account-access-form"
import { PageHeader } from "@/components/patterns/page-header"
import { EmptyState } from "@/components/patterns/empty-state"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Button, buttonClasses } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { OrderList } from "@/components/patterns/order-list"
import { useAuth } from "@/lib/auth-context"
import { useFavorites } from "@/lib/favorites-context"
import { useOrders } from "@/lib/orders-context"

const favoritesLinkClasses = buttonClasses({
  variant: "outline",
  fullWidth: true,
})

/**
 * Mi cuenta. Comprar no requiere cuenta; esto es opcional (historial de pedidos y datos guardados).
 * La sesión es simulada y vive solo en memoria hasta que exista un backend de autenticación.
 */
export default function CuentaPage() {
  const { user, login, logout } = useAuth()
  const { ids } = useFavorites()
  const { orders } = useOrders()
  const [wantsAccess, setWantsAccess] = useState(false)
  // Quien compró como invitado también ve sus pedidos, con el email de la compra.
  const email = user?.email ?? orders[0]?.email

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <Breadcrumb className="mb-3" items={[{ label: "Inicio", href: "/" }, { label: "Mi cuenta" }]} />

      {!email || wantsAccess ? (
        <div className="account__access">
          <Card padding="panel" className="account__card">
            <AccountAccessForm onSuccess={(r) => { login(r.email); setWantsAccess(false); toast.success(r.mode === "register" ? "¡Cuenta creada con éxito!" : "¡Sesión iniciada!") }} />
          </Card>
          <p className="account__note">No hace falta tener cuenta para comprar: podés finalizar tu pedido solo con tu email.</p>
        </div>
      ) : (
        <>
          <PageHeader title={user ? `Hola, ${user.name}` : "Mi cuenta"} tight>{email}</PageHeader>

          <div className="account__grid">
            <Card padding="panel" className="account__card">
              <h2 className="account__title"><Package aria-hidden="true" /> Mis pedidos</h2>
              {orders.length === 0 ? (
                <EmptyState
                  iconTone="muted"
                  icon={<Package className="icon-xl" aria-hidden="true" />}
                  title="Todavía no hiciste pedidos"
                  text="Cuando compres, vas a ver acá el estado y el historial de tus pedidos."
                >
                  <Link href="/productos" className={buttonClasses()}>Ver productos</Link>
                </EmptyState>
              ) : (
                <OrderList orders={orders} />
              )}
            </Card>

            <div className="account__side">
              <Card padding="panel" className="account__card">
                <h2 className="account__title"><UserRound aria-hidden="true" /> Mis datos</h2>
                <p className="account__text">{email}</p>
              </Card>
              <Card padding="panel" className="account__card">
                <h2 className="account__title"><Heart aria-hidden="true" /> Favoritos</h2>
                <p className="account__text">{ids.length === 0 ? "Todavía no guardaste productos." : `${ids.length} ${ids.length === 1 ? "producto guardado" : "productos guardados"}.`}</p>
                <Link href="/favoritos" className={favoritesLinkClasses}>Ver favoritos</Link>
              </Card>
              {user ? (
                <Button variant="neutral" fullWidth onClick={() => { logout(); toast.success("Cerraste sesión") }}>
                  <LogOut className="icon-sm" aria-hidden="true" /> Cerrar sesión
                </Button>
              ) : (
                <Button variant="neutral" fullWidth onClick={() => setWantsAccess(true)}>Crear cuenta o ingresar</Button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
