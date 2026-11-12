"use client"

import { Check, ShoppingCart } from "lucide-react"
import { iconButtonClasses } from "@/components/ui/icon-button"
import { usePathname } from "next/navigation"
import { useCart, MINIMUM_PACKS } from "@/lib/cart-context"
import { Progress } from "@/components/ui/progress"
import { Text } from "@/components/ui/text"

export default function MinimumProgressBar() {
  const { totalItems, remainingForMinimum, minimumMet, openCart, isOpen } = useCart()
  const pathname = usePathname()

  // En checkout el mínimo ya está cumplido y la barra compite con el formulario
  if (totalItems === 0 || isOpen || pathname?.startsWith("/checkout")) return null

  const progress = Math.min((totalItems / MINIMUM_PACKS) * 100, 100)

  return (
    <div className="floating-bar-anchor">
      <div className="floating-bar">
        <Text as="span" size="sm" weight="medium">
          {totalItems} de {MINIMUM_PACKS} packs
        </Text>
        <Progress
          size="sm"
          value={progress}
          state={minimumMet ? "success" : "error"}
          label={`${totalItems} de ${MINIMUM_PACKS} packs`}
          className="floating-bar__progress"
        />
        {minimumMet ? (
          <Text as="span" size="sm" tone="success" weight="medium" className="floating-bar__status">
            <Check aria-hidden="true" />
            <span className="hidden sm:inline">Mínimo cumplido</span>
          </Text>
        ) : (
          <Text as="span" size="sm" tone="secondary" weight="medium">
            Te falta {remainingForMinimum} pack{remainingForMinimum !== 1 ? "s" : ""}
          </Text>
        )}
        <button
          onClick={openCart}
          aria-label="Ver carrito"
          className={iconButtonClasses({ variant: minimumMet ? "success" : "subtle", size: "sm" })}
        >
          <ShoppingCart className="icon-sm" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
