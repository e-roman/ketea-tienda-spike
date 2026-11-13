"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { linkClasses } from "@/components/ui/link"
import { Logo } from "@/components/ui/logo"
import { useCart } from "@/lib/cart-context"

/** Header simplificado del checkout (Figma: Header / Checkout): volver al carrito (o a la tienda si ya no hay carrito), logo y sello de compra segura. */
export function CheckoutHeader() {
  const { items } = useCart()
  const hasCart = items.length > 0
  const href = hasCart ? "/carrito" : "/"
  const label = hasCart ? "Volver al carrito" : "Volver a la tienda"
  return (
    <header className="site-header">
      <div className="checkout-header__row grid grid-cols-3 max-w-7xl mx-auto px-4 md:px-6 gap-4">
        <Link
          href={href}
          aria-label={label}
          className={linkClasses({ variant: "subtle", size: "sm", icon: true, className: "justify-self-start" })}
        >
          <ArrowLeft className="icon-sm" aria-hidden="true" />
          <span className="hidden sm:inline">{label}</span>
        </Link>

        <Link href="/" className="checkout-header__logo justify-self-center">
          <Logo size="checkout" />
        </Link>

        <div className="security-seal justify-self-end">
          <Image src="/assets/img/safe-shopping.svg" alt="" width={28} height={26} className="security-seal__badge" />
          <span className="security-seal__text">
            <b className="security-seal__title">Compra segura</b>
            <span>100% protegido</span>
          </span>
        </div>
      </div>
    </header>
  )
}
