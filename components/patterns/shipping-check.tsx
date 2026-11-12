"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

/**
 * Verificación de zona por código postal (Figma: _Product / Shipping check).
 * Clases de styles/patterns/buy-box.css. CABA = CP 1000–1499 (heurística simple).
 */
export function ShippingCheck({ className }: { className?: string }) {
  const [cp, setCp] = useState("")
  const [valid, setValid] = useState<null | boolean>(null)

  function check() {
    const n = parseInt(cp)
    setValid(n >= 1000 && n <= 1499)
  }

  return (
    <div className={cn("shipping-check", className)}>
      <span className="shipping-check__title">Verificá si llegamos a tu zona</span>
      <div className="shipping-check__form">
        <Input
          type="text"
          value={cp}
          onChange={(e) => { setCp(e.target.value); setValid(null) }}
          placeholder="Ingresá tu CP"
          maxLength={5}
          aria-label="Código postal"
          autoComplete="postal-code"
          className="shipping-check__input"
        />
        <Button variant="secondary" onClick={check}>
          Verificar
        </Button>
      </div>
      {valid === true && (
        <p role="status" className="shipping-check__result shipping-check__result--ok">
          <Check aria-hidden="true" /> ¡Llegamos a tu zona! Envío gratis en CABA.
        </p>
      )}
      {valid === false && (
        <p role="status" className="shipping-check__result shipping-check__result--no">
          Zona no cubierta por el momento. Solo CABA y parte del GBA.
        </p>
      )}
    </div>
  )
}
