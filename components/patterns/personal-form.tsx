"use client"

import { useState } from "react"
import { TriangleAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { FormInput } from "@/components/ui/form-input"
import { billingEmailOf, validatePersonal, type PersonalData, type PersonalField } from "@/lib/checkout"

interface PersonalFormProps {
  defaultValues: PersonalData
  onSubmit: (data: PersonalData) => void
}

/**
 * Paso 1 del checkout (Figma: Forms / Checkout / Personal data): contacto y facturación, sin crear cuenta.
 * Valida al salir de cada campo y al continuar; con errores muestra un aviso arriba y marca cada campo.
 * Clases de styles/patterns/delivery.css (.form-section*).
 */
export function PersonalForm({ defaultValues, onSubmit }: PersonalFormProps) {
  const [data, setData] = useState<PersonalData>(defaultValues)
  const [touched, setTouched] = useState<Set<PersonalField>>(new Set())
  const [submitted, setSubmitted] = useState(false)
  const errors = validatePersonal(data)
  const hasErrors = Object.keys(errors).length > 0

  const values: Record<PersonalField, string> = {
    email: data.email, nombre: data.nombre, apellido: data.apellido, billingEmail: billingEmailOf(data),
    telefono: data.telefono, calle: data.calle, numero: data.numero,
  }
  const shown = (f: PersonalField) => submitted || touched.has(f)
  const errorOf = (f: PersonalField) => (shown(f) ? errors[f] : undefined)
  const validOf = (f: PersonalField) => shown(f) && !errors[f] && values[f].trim() !== ""
  const touch = (f: PersonalField) => () => setTouched((s) => new Set(s).add(f))

  const bind = (f: PersonalField) => ({
    value: values[f],
    error: errorOf(f),
    valid: validOf(f),
    onBlur: touch(f),
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setData((d) => ({ ...d, [f === "billingEmail" ? "billingEmail" : f]: e.target.value })),
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    if (hasErrors) return
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="form-section__stack">
      {submitted && hasErrors && (
        <div className="callout callout--rich callout--error" role="alert">
          <TriangleAlert aria-hidden="true" />
          <p className="callout__text"><strong>Revisá los datos del formulario.</strong> Hay campos obligatorios incompletos o incorrectos.</p>
        </div>
      )}

      <Card padding="panel">
        <h2 className="form-section__title">Datos de contacto</h2>
        <div className="form-section__stack">
          <FormInput label="Email" type="email" autoComplete="email" {...bind("email")} />
          <Checkbox label="Quiero recibir ofertas y novedades por email" checked={data.newsletter} onChange={(e) => setData((d) => ({ ...d, newsletter: e.target.checked }))} />
        </div>

        <hr className="form-section__divider" />

        <h2 className="form-section__title">Datos de facturación</h2>
        <div className="form-section__stack">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput label="Nombre *" autoComplete="given-name" {...bind("nombre")} />
            <FormInput label="Apellido *" autoComplete="family-name" {...bind("apellido")} />
          </div>
          <FormInput label="Teléfono *" type="tel" autoComplete="tel" {...bind("telefono")} />
          <div className="grid grid-cols-6 gap-4">
            <FormInput label="Calle *" autoComplete="address-line1" className="col-span-6 sm:col-span-4" {...bind("calle")} />
            <FormInput label="Número *" inputMode="numeric" className="col-span-3 sm:col-span-1" {...bind("numero")} />
            <FormInput
              label="Depto."
              className="col-span-3 sm:col-span-1"
              value={data.depto}
              onChange={(e) => setData((d) => ({ ...d, depto: e.target.value }))}
            />
          </div>
          <Checkbox label="Mi información de facturación y envío es la misma." checked={data.sameAddress} onChange={(e) => setData((d) => ({ ...d, sameAddress: e.target.checked }))} />
          <Button type="submit" fullWidth>Continuar</Button>
        </div>
      </Card>
    </form>
  )
}
