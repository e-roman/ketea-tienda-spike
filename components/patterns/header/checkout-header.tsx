import Link from "next/link"
import { ArrowLeft, Phone } from "lucide-react"
import { linkClasses } from "@/components/ui/link"
import { WHATSAPP_URL, WHATSAPP_LABEL } from "./nav-items"
import { Logo } from "@/components/ui/logo"

/** Header simplificado del checkout (Figma: Header / Checkout): volver al carrito, logo, contacto. */
export function CheckoutHeader() {
  return (
    <header className="site-header">
      <div className="checkout-header__row grid grid-cols-3 max-w-7xl mx-auto px-4 md:px-6 gap-4">
        <Link
          href="/carrito"
          aria-label="Volver al carrito"
          className={linkClasses({ variant: "subtle", size: "sm", icon: true, className: "justify-self-start" })}
        >
          <ArrowLeft className="icon-sm" aria-hidden="true" />
          <span className="hidden sm:inline">Volver al carrito</span>
        </Link>

        <Link href="/" className="checkout-header__logo justify-self-center">
          <Logo size="checkout" />
        </Link>

        <div className="checkout-header__contact justify-self-end">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClasses({ variant: "subtle", size: "sm", icon: true })}
          >
            <Phone className="icon-xs" aria-hidden="true" /> {WHATSAPP_LABEL}
          </a>
          <Link href="/contacto" className={linkClasses({ variant: "subtle", size: "sm", hoverUnderline: true })}>
            Contáctanos
          </Link>
        </div>
      </div>
    </header>
  )
}
