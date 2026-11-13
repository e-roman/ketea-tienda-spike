"use client"

import { useState } from "react"
import { MapPin, Truck, TriangleAlert } from "lucide-react"
import { useDelivery } from "@/lib/delivery-context"
import { DELIVERY_OPTIONS, PICKUP_ONLY_NOTICE, type DeliveryMethod } from "@/lib/delivery"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, type RadioOption } from "@/components/ui/radio-card"

const toOption = (id: DeliveryMethod, disabled = false): RadioOption<DeliveryMethod> => ({
  value: id,
  label: DELIVERY_OPTIONS[id].label,
  description: DELIVERY_OPTIONS[id].detail,
  disabled,
})

/**
 * Elección de entrega: CP, aviso de productos que solo se retiran por el local, envío a domicilio y retiro en local.
 * Se usa en el drawer del carrito y en el checkout (con `showPostalCode={false}`, porque el CP va en el formulario):
 * comparten lo elegido, así el usuario lo puede cambiar en cualquiera de los dos. Clases de styles/patterns/delivery.css.
 */
export function DeliveryOptions({ showPostalCode = true }: { showPostalCode?: boolean }) {
  const { postalCode, setPostalCode, method, setMethod, pickupOnly } = useDelivery()
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(postalCode)

  function startEdit() {
    setDraft(postalCode)
    setEditing(true)
  }

  function saveCp(e: React.FormEvent) {
    e.preventDefault()
    if (draft.trim()) setPostalCode(draft.trim())
    setEditing(false)
  }

  return (
    <div className="delivery">
      {showPostalCode && (
        editing ? (
          <form onSubmit={saveCp} className="delivery__cp">
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              inputMode="numeric"
              maxLength={8}
              autoFocus
              aria-label="Código postal"
              placeholder="Tu código postal"
            />
            <Button type="submit" size="sm">Aceptar</Button>
          </form>
        ) : (
          <div className="delivery__cp">
            <span>Entregas para el CP: <strong>{postalCode}</strong></span>
            <Button variant="outline" size="sm" onClick={startEdit}>Cambiar CP</Button>
          </div>
        )
      )}

      {pickupOnly && (
        <div className="callout callout--rich callout--warning delivery__notice" role="status">
          <TriangleAlert aria-hidden="true" />
          <p className="callout__text">{PICKUP_ONLY_NOTICE}</p>
        </div>
      )}

      <RadioGroup
        name="delivery-method"
        legend={<><Truck aria-hidden="true" /> Envío a domicilio</>}
        options={[toOption("standard", pickupOnly), toOption("express", pickupOnly)]}
        value={method}
        onChange={setMethod}
      />
      <RadioGroup
        name="delivery-method"
        legend={<><MapPin aria-hidden="true" /> Retirar en local</>}
        options={[toOption("pickup")]}
        value={method}
        onChange={setMethod}
      />
    </div>
  )
}
