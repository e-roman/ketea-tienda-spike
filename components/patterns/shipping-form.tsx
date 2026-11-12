"use client"

import { useState } from "react"
import { Phone, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { linkClasses } from "@/components/ui/link"
import { getDeliveryZone, isCabaCp, DELIVERY_HOURS, SUPPORT_PHONE } from "@/lib/delivery"
import { Stack } from "@/components/ui/layout"

export interface ShippingData {
  nombre: string
  apellido: string
  direccion: string
  piso: string
  localidad: string
  cp: string
  telefono: string
  recibe: string
  instrucciones: string
}

export const EMPTY_SHIPPING: ShippingData = {
  nombre: "", apellido: "", direccion: "", piso: "", localidad: "", cp: "", telefono: "", recibe: "", instrucciones: "",
}

const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=5491130656942"

/** Aviso de zona de entrega según barrio y CP (Figma: Forms / Checkout / Shipping). Clases de callout.css. */
export function DeliveryZoneNotice({ localidad, cp }: { localidad: string; cp: string }) {
  const zona = getDeliveryZone(localidad, cp)
  if (zona.kind === "caba") {
    return (
      <div className="callout callout--rich callout--success">
        <Truck aria-hidden="true" />
        <div>
          <p className="callout__title">Tu entrega: {zona.dia} {DELIVERY_HOURS}</p>
          <p className="callout__text">Entregamos en {zona.barrio} los {zona.dia}. Envío gratis en CABA.</p>
        </div>
      </div>
    )
  }
  if (zona.kind === "caba-sin-barrio") {
    return (
      <div className="callout callout--rich callout--info">
        <Truck aria-hidden="true" />
        <div>
          <p className="callout__title">Envío gratis en CABA</p>
          <p className="callout__text">
            Escribí tu barrio en <strong>Localidad</strong> (ej: Palermo) para ver qué día te entregamos.
          </p>
        </div>
      </div>
    )
  }
  if (zona.kind === "fuera") {
    return (
      <div className="callout callout--rich callout--warning">
        <Phone aria-hidden="true" />
        <div>
          <p className="callout__title">Por ahora la compra online es solo para CABA</p>
          <p className="callout__text">
            Para entregas en GBA, consultanos al{" "}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={linkClasses({ variant: "inherit" })}>
              {SUPPORT_PHONE}
            </a>.
          </p>
        </div>
      </div>
    )
  }
  return null
}

interface ShippingFormProps {
  defaultValues?: Partial<ShippingData>
  loading?: boolean
  onSubmit: (data: ShippingData) => void
}

/**
 * Formulario de envío del checkout. Dueño de su estado; entrega los datos al enviar.
 * Solo se puede continuar con zona CABA y barrio reconocido.
 */
export function ShippingForm({ defaultValues, loading = false, onSubmit }: ShippingFormProps) {
  const [data, setData] = useState<ShippingData>({ ...EMPTY_SHIPPING, ...defaultValues })
  const [cpValid, setCpValid] = useState<null | boolean>(() => (data.cp.length >= 4 ? isCabaCp(data.cp) : null))
  const zona = getDeliveryZone(data.localidad, data.cp)

  const set = (key: keyof ShippingData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setData((d) => ({ ...d, [key]: e.target.value }))

  function handleCpChange(value: string) {
    setData((d) => ({ ...d, cp: value }))
    setCpValid(value.length >= 4 ? isCabaCp(value) : null)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (loading) return
    onSubmit(data)
  }

  const cpOk = cpValid === true && zona.kind !== "fuera"

  return (
    <Stack as="form" gap={5} onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Nombre *">
          <Input value={data.nombre} onChange={set("nombre")} required placeholder="María" />
        </Field>
        <Field label="Apellido *">
          <Input value={data.apellido} onChange={set("apellido")} required placeholder="González" />
        </Field>
      </div>

      <Field label="Dirección *">
        <Input value={data.direccion} onChange={set("direccion")} required placeholder="Av. Corrientes 1234" />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Piso / Depto" note="opcional">
          <Input value={data.piso} onChange={set("piso")} placeholder="ej: 3° B" />
        </Field>
        <Field label="Código postal *">
          <span className="input-wrap">
            <Input
              value={data.cp}
              onChange={(e) => handleCpChange(e.target.value)}
              required maxLength={5} placeholder="1414" autoComplete="postal-code"
              aria-invalid={cpValid === false || undefined}
              data-valid={cpOk || undefined}
            />
            {cpOk && <span className="input-status input-status--ok">✓ CABA</span>}
            {cpValid === false && <span className="input-status">Fuera de CABA</span>}
          </span>
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Localidad *">
          <Input value={data.localidad} onChange={set("localidad")} required placeholder="Palermo, CABA" />
        </Field>
        <Field label="Teléfono *">
          <Input type="tel" autoComplete="tel" value={data.telefono} onChange={set("telefono")} required placeholder="11 4567-8901" />
        </Field>
      </div>

      <DeliveryZoneNotice localidad={data.localidad} cp={data.cp} />

      <Field label="¿Quién recibe?" note="si no sos vos">
        <Input value={data.recibe} onChange={set("recibe")} placeholder="Nombre y apellido" />
      </Field>

      <Field label="Instrucciones" note="opcional">
        <Input value={data.instrucciones} onChange={set("instrucciones")} placeholder="ej: Timbre roto, llamar al celular" />
      </Field>

      <Button type="submit" fullWidth disabled={zona.kind !== "caba"} loading={loading} loadingText="Guardando…">
        Continuar con el pago
      </Button>
    </Stack>
  )
}
