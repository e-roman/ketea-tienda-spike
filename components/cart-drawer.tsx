"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import ConfirmDeleteModal from "@/components/confirm-delete-modal"
import { buttonClasses } from "@/components/ui/button"
import { CartItem } from "@/components/patterns/cart-item"
import { Drawer } from "@/components/patterns/drawer"
import { EmptyState } from "@/components/patterns/empty-state"
import { DrawerFooter } from "@/components/patterns/drawer-footer"
import { DeliveryOptions } from "@/components/patterns/delivery-options"
import { useDelivery } from "@/lib/delivery-context"
import { formatPrice } from "@/lib/products"

export default function CartDrawer() {
  const {
    items, increment, decrement, remove, subtotal, totalItems, isOpen, closeCart,
  } = useCart()
  const router = useRouter()
  const { shippingCost } = useDelivery()

  const [pendingRemove, setPendingRemove] = useState<{ id: string; name: string } | null>(null)
  const [goingCheckout, setGoingCheckout] = useState(false)
  const [qtyLoading, setQtyLoading] = useState<{ id: string; dir: "inc" | "dec" } | null>(null)

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
      closeCart()
      router.push("/checkout")
      setGoingCheckout(false)
    }, 600)
  }

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={closeCart}
        title="Carrito"
        count={totalItems > 0 ? `${totalItems} producto${totalItems !== 1 ? "s" : ""}` : undefined}
        wide
        closeLabel="Cerrar carrito"
      >
        {items.length === 0 ? (
          <EmptyState
            className="empty-state--fill"
            icon={<ShoppingCart className="icon-xl" aria-hidden="true" />}
            title="Tu carrito está vacío"
            text="Explorá nuestros productos y empezá tu pedido."
          >
            <Link href="/productos" onClick={closeCart} className={buttonClasses({ size: "md" })}>
              Ver productos
            </Link>
          </EmptyState>
        ) : (
          <>
            <div className="drawer__body">
              {items.map(({ product, quantity }) => (
                <CartItem
                  key={product.id}
                  variant="drawer"
                  product={product}
                  quantity={quantity}
                  loading={qtyLoading?.id === product.id ? qtyLoading.dir : null}
                  onIncrement={() => handleIncrement(product.id)}
                  onDecrement={() => handleDecrement(product.id)}
                  onRemove={() => setPendingRemove({ id: product.id, name: product.name })}
                  onNavigate={closeCart}
                />
              ))}

              <div className="drawer-subtotal">
                <span><strong>Subtotal</strong> <span className="drawer-subtotal__note">(Sin envío)</span>:</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>

              <DeliveryOptions />
            </div>

            <DrawerFooter
              total={subtotal + shippingCost}
              loading={goingCheckout}
              onCheckout={handleGoCheckout}
              onNavigate={closeCart}
            />
          </>
        )}
      </Drawer>

      <ConfirmDeleteModal
        open={!!pendingRemove}
        productName={pendingRemove?.name ?? ""}
        onCancel={() => setPendingRemove(null)}
        onConfirm={() => {
          if (pendingRemove) remove(pendingRemove.id)
          setPendingRemove(null)
        }}
      />
    </>
  )
}
