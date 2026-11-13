"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Field } from "@/components/ui/field"
import { Input, Select } from "@/components/ui/input"
import { DeliveryOptions } from "@/components/patterns/delivery-options"
import { useDelivery } from "@/lib/delivery-context"
import { HOME_TYPES, PROVINCES } from "@/lib/delivery"

export interface ShippingData {
  calle: string
  numero: string
  cp: string
  tipo: string
  piso: string
  provincia: string
  ciudad: string
}

export const EMPTY_SHIPPING: ShippingData = {
  calle: "", numero: "", cp: "", tipo: HOME_TYPES[0], piso: "", provincia: PROVINCES[0], ciudad: "",
}

interface ShippingFormProps {
  defaultValues?: Partial<ShippingData>
  loading?: boolean
  onSubmit: (data: ShippingData) => void
}

/**
 * Paso de entrega del checkout (Figma: Forms / Checkout / Shipping): "Datos de entrega" y "Tipo de Entrega".
 * El código postal y la forma de entrega son los mismos del drawer del carrito: se cambian acá o allá.
 */
export function ShippingForm({ defaultValues, loading = false, onSubmit }: ShippingFormProps) {
  const { postalCode, setPostalCode } = useDelivery()
  const [data, setData] = useState<ShippingData>({ ...EMPTY_SHIPPING, ...defaultValues, cp: defaultValues?.cp ?? postalCode })

  const set = (key: keyof ShippingData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setData((d) => ({ ...d, [key]: e.target.value }))

  function handleCpChange(e: React.ChangeEvent<HTMLInputElement>) {
    setData((d) => ({ ...d, cp: e.target.value }))
    setPostalCode(e.target.value)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (loading) return
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit} className="form-section__stack">
      <Card padding="panel">
        <h2 className="form-section__title">Datos de entrega</h2>
        <div className="form-section__stack">
          <div className="grid grid-cols-6 gap-4">
            <Field label="Calle *" className="col-span-6 sm:col-span-4">
              <Input value={data.calle} onChange={set("calle")} required autoComplete="address-line1" />
            </Field>
            <Field label="Número *" className="col-span-3 sm:col-span-1">
              <Input value={data.numero} onChange={set("numero")} required inputMode="numeric" />
            </Field>
            <Field label="Código Postal *" className="col-span-3 sm:col-span-1">
              <Input value={data.cp} onChange={handleCpChange} required maxLength={8} inputMode="numeric" autoComplete="postal-code" />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Tipo de domicilio *">
              <Select value={data.tipo} onChange={set("tipo")} required>
                {HOME_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </Select>
            </Field>
            <Field label="Piso / Depto.">
              <Input value={data.piso} onChange={set("piso")} />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Provincia *">
              <Select value={data.provincia} onChange={set("provincia")} required>
                {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
              </Select>
            </Field>
            <Field label="Ciudad *">
              <Input value={data.ciudad} onChange={set("ciudad")} required autoComplete="address-level2" />
            </Field>
          </div>
        </div>
      </Card>

      <Card padding="panel">
        <h2 className="form-section__title">Tipo de Entrega</h2>
        <div className="form-section__stack">
          <p className="callout callout--rich callout--warning">
            <span><strong>Retiro en sucursal</strong>: sólo podrá retirar la compra el titular de la tarjeta. Si pagás con 2 tarjetas, deberá presentarse quien abonó el mayor monto.</span>
          </p>
          <DeliveryOptions showPostalCode={false} />
          <Button type="submit" fullWidth loading={loading} loadingText="Guardando…">
            Continuar
          </Button>
        </div>
      </Card>
    </form>
  )
}
