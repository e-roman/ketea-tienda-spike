"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field } from "@/components/ui/field"
import { Text } from "@/components/ui/text"

/**
 * Código de descuento: Field + Input + Button secondary.
 * Un solo componente para carrito y checkout (antes había una versión a mano con <input> crudo).
 */
export function CouponField({ className }: { className?: string }) {
  const [code, setCode] = useState("")
  const [applied, setApplied] = useState(false)
  const [applying, setApplying] = useState(false)

  function apply() {
    if (applying || code.trim().length < 3) return
    setApplying(true)
    // Simula la validación en backend
    setTimeout(() => {
      setApplied(true)
      setApplying(false)
    }, 700)
  }

  if (applied) {
    return (
      <Text as="p" size="xs" tone="success" weight="medium" role="status" className={`coupon__applied ${className ?? ""}`}>
        <Check className="icon-xs" aria-hidden="true" /> Código &quot;{code.toUpperCase()}&quot; aplicado
      </Text>
    )
  }

  return (
    <Field label="Código de descuento" className={className}>
      <span className="coupon__row">
        <Input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Ingresá tu código" className="coupon__input input--upper" />
        <Button variant="secondary" onClick={apply} loading={applying}>
          Aplicar
        </Button>
      </span>
    </Field>
  )
}
