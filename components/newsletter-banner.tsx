"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function NewsletterBanner() {
  const [email, setEmail] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    toast.success("¡Listo! Ya estás suscripto a nuestras novedades.")
    setEmail("")
  }

  return (
    <section className="newsletter-section">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="newsletter grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-8 md:gap-12 items-center">
          <div>
            <span className="newsletter__eyebrow text--eyebrow">
              Novedades · Beneficios
            </span>
            <h2 className="newsletter__title">
              Ofertas y novedades de Ketea,<br />directo a tu email.
            </h2>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="newsletter__form">
              <Input
                variant="pill"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu email"
                aria-label="Tu email"
                className="newsletter__input"
              />
              <Button type="submit" shape="pill">Suscribirme</Button>
            </form>
            <p className="newsletter__note">Sin spam. Solo cosas ricas.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
