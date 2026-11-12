"use client"

import Link from "next/link"
import { iconButtonClasses } from "@/components/ui/icon-button"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Instagram, Facebook, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/ui/logo"

const PRODUCT_LINKS = [
  ["Pastas", "/productos?nav=pastas-todos"],
  ["Tapas", "/productos?nav=tapas-todos"],
  ["Empanadas rellenas", "/productos?nav=empanadas-rellenas"],
  ["Especiales", "/productos?nav=especiales"],
]

const INFO_LINKS = [
  ["¿Cómo comprar?", "/como-comprar"],
  ["Preguntas frecuentes", "/preguntas-frecuentes"],
  ["Políticas de privacidad", "/politicas-de-privacidad"],
  ["Contacto", "/contacto"],
]

function FooterLinks({ title, links }: { title: string; links: string[][] }) {
  return (
    <div>
      <h2 className="footer__heading">{title}</h2>
      <ul className="footer__list">
        {links.map(([label, href]) => (
          <li key={label}><Link href={href} className="footer__link">{label}</Link></li>
        ))}
      </ul>
    </div>
  )
}

/** Footer — clases de styles/patterns/footer.css. */
export default function Footer() {
  const pathname = usePathname()
  // Checkout tiene fondo gris propio: sin margen, para que no quede una franja blanca
  const flush = pathname?.startsWith("/checkout")
  return (
    <footer className={cn("footer", !flush && "footer--spaced")}>
      <div className="footer__grid max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-2">
          <Link href="/" className="footer__brand">
            <Logo size="md" />
          </Link>
          <p className="footer__text max-w-sm">
            Empresa familiar con más de 50 años de experiencia. Pastas frescas, tapas y empanadas artesanales, de la fábrica directo a tu domicilio.
          </p>
          <div className="footer__socials">
            <a href="https://www.instagram.com/orali.argentina/" target="_blank" rel="noopener noreferrer"
               aria-label="Orali en Instagram"
               className={iconButtonClasses({ variant: "subtle", size: "sm" })}>
              <Instagram className="icon-sm" aria-hidden="true" />
            </a>
            <a href="https://www.facebook.com/pastasorali" target="_blank" rel="noopener noreferrer"
               aria-label="Orali en Facebook"
               className={iconButtonClasses({ variant: "subtle", size: "sm" })}>
              <Facebook className="icon-sm" aria-hidden="true" />
            </a>
          </div>
        </div>

        <FooterLinks title="Productos" links={PRODUCT_LINKS} />
        <FooterLinks title="Información" links={INFO_LINKS} />
      </div>

      <div className="footer__legal">
        <div className="footer__legal-row max-w-7xl mx-auto px-4 md:px-6">
          <span>© {new Date().getFullYear()} Orali SIPA SRL · Todos los derechos reservados</span>
          <div className="footer__legal-group">
            <span className="footer__legal-item">
              <ShieldCheck aria-hidden="true" /> Sitio seguro
            </span>
            <span className="footer__legal-item">
              <Image src="/cards/mercado-pago.svg" alt="" width={40} height={28} className="footer__payment" />
              Pago con Mercado Pago
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
