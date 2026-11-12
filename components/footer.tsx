"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Instagram, Facebook } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { WHATSAPP_LABEL } from "@/components/patterns/header/nav-items"

const ACCOUNT_LINKS = [
  ["Ingresar", "/cuenta"],
  ["Registrarse", "/cuenta"],
  ["Recuperar contraseña", "/cuenta"],
  ["Botón de arrepentimiento", "/contacto"],
]

const INFO_LINKS = [
  ["Preguntas frecuentes", "/preguntas-frecuentes"],
  ["Cómo comprar", "/como-comprar"],
  ["Políticas de privacidad", "/politicas-de-privacidad"],
  ["Términos y condiciones", "/politicas-de-privacidad"],
  ["Preferencias de cookies", "/politicas-de-privacidad"],
]

const CARDS = ["visa", "mastercard", "amex", "argencard", "naranja", "cencosud", "nativa", "cabal"]

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

/** Footer — clases de styles/patterns/footer.css. Cuatro columnas (cuenta, información, contacto, newsletter) y barra inferior con medios de pago. */
export default function Footer() {
  const pathname = usePathname()
  const [email, setEmail] = useState("")
  // Checkout tiene fondo gris propio: sin margen, para que no quede una franja blanca
  const flush = pathname?.startsWith("/checkout")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    toast.success("¡Listo! Ya estás suscripto a nuestras novedades.")
    setEmail("")
  }

  return (
    <footer className={cn("footer", !flush && "footer--spaced")}>
      <div className="footer__grid max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <FooterLinks title="Mi Cuenta" links={ACCOUNT_LINKS} />
        <FooterLinks title="Información" links={INFO_LINKS} />

        <div>
          <h2 className="footer__heading">Contacto</h2>
          <ul className="footer__list">
            <li><Link href="/contacto" className="footer__link">Dónde encontrarnos</Link></li>
            <li><a href="mailto:info@ketea.com.ar" className="footer__link">info@ketea.com.ar</a></li>
            <li><span className="footer__text">{WHATSAPP_LABEL}</span></li>
          </ul>
        </div>

        <div>
          <h2 className="footer__heading footer__heading--tight">Subscribite al Newsletter</h2>
          <p className="footer__lead">Recibe nuestras ofertas semanales y promociones.</p>
          <form onSubmit={handleSubmit} className="footer__newsletter">
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Escribe tu email"
              aria-label="Tu email"
              className="footer__newsletter-input"
            />
            <Button type="submit" size="sm">Suscribirse</Button>
          </form>
          <p className="footer__lead">
            Puedes darte de baja en cualquier momento.{" "}
            <Link href="/politicas-de-privacidad" className="footer__link footer__link--brand">Política de Privacidad</Link>
          </p>
        </div>
      </div>

      <div className="footer__legal">
        <div className="footer__legal-row max-w-7xl mx-auto px-4 md:px-6">
          <span className="footer__copy"><strong>©Ketea S.A.</strong> Todos los derechos reservados.</span>

          <ul className="footer__cards" aria-label="Medios de pago">
            {CARDS.map((card) => (
              <li key={card} className="footer__card">
                <Image src={`/cards/${card}.svg`} alt={card} width={40} height={24} className="footer__card-image" />
              </li>
            ))}
          </ul>

          <div className="footer__socials">
            <span>Seguinos en:</span>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Ketea en Facebook" className="footer__social">
              <Facebook className="icon-md" aria-hidden="true" />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Ketea en Instagram" className="footer__social">
              <Instagram className="icon-md" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
