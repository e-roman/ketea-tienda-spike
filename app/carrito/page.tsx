"use client"

import Link from "next/link"
import { linkClasses } from "@/components/ui/link"
import { useRouter } from "next/navigation"
import { ShoppingCart, ArrowLeft } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useDelivery } from "@/lib/delivery-context"
import { useState } from "react"
import ConfirmDeleteModal from "@/components/confirm-delete-modal"
import { buttonClasses } from "@/components/ui/button"
import { CartItem } from "@/components/patterns/cart-item"
import { OrderSummary } from "@/components/patterns/order-summary"
import { EmptyState } from "@/components/patterns/empty-state"
import { Heading } from "@/components/ui/text"
import { Badge } from "@/components/ui/badge"
import { Row } from "@/components/ui/layout"

export default function CartPage() {
  const {
    items, increment, decrement, remove, subtotal, totalItems,
  } = useCart()
  const router = useRouter()
  const [pendingRemove, setPendingRemove] = useState<{ id: string; name: string } | null>(null)
  const [goingCheckout, setGoingCheckout] = useState(false)
  const [qtyLoading, setQtyLoading] = useState<{ id: string; dir: "inc" | "dec" } | null>(null)

  const { shippingCost } = useDelivery()
  const total = subtotal + shippingCost

  function handleIncrement(id: string) {
    if (qtyLoading) return
    setQtyLoading({ id, dir: "inc" })
    setTimeout(() => {
      increment(id)
      setQtyLoading(null)
    }, 350)
  }

  function handleDecrement(id: string) {
    if (qtyLoading) return
    setQtyLoading({ id, dir: "dec" })
    setTimeout(() => {
      decrement(id)
      setQtyLoading(null)
    }, 350)
  }

  function handleGoCheckout() {
    if (goingCheckout) return
    setGoingCheckout(true)
    setTimeout(() => {
      router.push("/checkout")
      setGoingCheckout(false)
    }, 600)
  }

  if (items.length === 0) {
    return (
      <EmptyState
        variant="page"
        iconSize="xxl"
        className="max-w-2xl mx-auto px-4 py-24"
        icon={<ShoppingCart className="icon-2xl" aria-hidden="true" />}
        title="Tu carrito está vacío"
        text="¿No sabés por dónde empezar? Te recomendamos explorar nuestros productos."
      >
        <Link href="/productos" className={buttonClasses()}>
          Ver productos
        </Link>
      </EmptyState>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <Row align="center" gap={3} className="mb-8">
        <Heading as="h1" size="page">Tu carrito</Heading>
        <Badge variant="outline">{totalItems} producto{totalItems !== 1 ? "s" : ""}</Badge>
      </Row>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Items */}
        <div className="md:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <CartItem
              key={product.id}
              product={product}
              quantity={quantity}
              loading={qtyLoading?.id === product.id ? qtyLoading.dir : null}
              onIncrement={() => handleIncrement(product.id)}
              onDecrement={() => handleDecrement(product.id)}
              onRemove={() => setPendingRemove({ id: product.id, name: product.name })}
            />
          ))}

          <Link
            href="/productos"
            className={linkClasses({ size: "sm", icon: true })}
          >
            <ArrowLeft className="icon-xs" /> Continuar comprando
          </Link>
        </div>

        {/* Summary */}
        <div>
          <OrderSummary
            className="sticky top-36"
            totalItems={totalItems}
            subtotal={subtotal}
            total={total}
            loading={goingCheckout}
            onCheckout={handleGoCheckout}
          />
        </div>
      </div>

      <ConfirmDeleteModal
        open={!!pendingRemove}
        productName={pendingRemove?.name ?? ""}
        onCancel={() => setPendingRemove(null)}
        onConfirm={() => {
          if (pendingRemove) remove(pendingRemove.id)
          setPendingRemove(null)
        }}
      />
    </div>
  )
}
