"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input, Select } from "@/components/ui/input"
import { formatPrice } from "@/lib/products"
import { cn } from "@/lib/utils"
import type { PaymentMethod } from "@/lib/checkout"

// Mapa literal: Tailwind purga las clases de @layer components que no encuentra escritas.
const CARD = { true: "pay-method pay-method--selected", false: "pay-method" } as const

const LOGOS = {
  modo: ["modo"],
  mercadopago: ["mercado-pago"],
  card: ["visa", "mastercard", "amex", "argencard", "naranja", "cencosud", "nativa", "cabal"],
  cash: ["rapipago", "pagofacil"],
} as const

const METHODS: { id: PaymentMethod; title: string; description: string }[] = [
  { id: "modo", title: "Pagá con MODO", description: "Hacé clic en “Pagar con MODO” y pagá con la app de MODO o tu banco en tu celular." },
  { id: "mercadopago", title: "Pagá con Mercado Pago", description: "Pagá con dinero en cuenta o tus tarjetas de debito y credito ya precargadas." },
  { id: "card", title: "Pagá con tarjetas de crédito, débito o prepagas", description: "Selecciona la cantidad de cuotas que desees." },
  { id: "cash", title: "Efectivo", description: "Rapipago o Pago Fácil." },
]

const INSTALLMENTS = [1, 3, 6, 12]

interface PaymentMethodsProps {
  total: number
  loading: boolean
  /** Se llama al confirmar el pago, con el método elegido. */
  onPay: (method: PaymentMethod) => void
}

/**
 * Paso de pago SIMULADO (Figma: Forms / Checkout / Payment): MODO, Mercado Pago, tarjetas y efectivo.
 * No procesa nada: cada botón confirma la compra. Para cobrar de verdad hay que reemplazar este componente
 * por el del proveedor (ej. Payment Brick de Mercado Pago). Clases de styles/patterns/payment-methods.css.
 */
export function PaymentMethods({ total, loading, onPay }: PaymentMethodsProps) {
  const [method, setMethod] = useState<PaymentMethod>("modo")
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "", holder: "", installments: "1" })
  const [cashPlace, setCashPlace] = useState("")

  const formatNumber = (v: string) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim()
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4)
    return d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d
  }

  function submitCard(e: React.FormEvent) {
    e.preventDefault()
    onPay("card")
  }

  return (
    <section aria-labelledby="payment-title" className="pay">
      <h2 id="payment-title" className="form-section__title">Método de pago</h2>

      <div className="pay__list">
        {METHODS.map((m) => {
          const selected = method === m.id
          return (
            <div key={m.id} className={CARD[String(selected) as "true" | "false"]}>
              <label className="pay-method__head">
                <input type="radio" name="payment-method" value={m.id} checked={selected} onChange={() => setMethod(m.id)} className="radio-card__input" />
                <span className="radio-card__dot" aria-hidden="true" />
                <span className="radio-card__text">
                  <span className="radio-card__title">{m.title}</span>
                  <span className="radio-card__desc">{m.description}</span>
                </span>
              </label>

              <ul className="pay-method__logos" aria-label="Medios incluidos">
                {LOGOS[m.id].map((logo) => (
                  <li key={logo} className="pay-logo">
                    <Image src={`/cards/${logo}.svg`} alt={logo} width={40} height={24} className="pay-logo__image" />
                  </li>
                ))}
              </ul>

              {selected && m.id === "modo" && (
                <div className="pay-method__panel">
                  <p className="pay-method__hint">Si estás en una computadora, tené el celular a mano.</p>
                  <Button onClick={() => onPay("modo")} loading={loading} loadingText="Procesando…" className="pay-method__cta">Pagar con MODO</Button>
                </div>
              )}

              {selected && m.id === "mercadopago" && (
                <div className="pay-method__panel">
                  <p className="pay-method__hint">Te llevamos a Mercado Pago para completar el pago de forma segura.</p>
                  <Button onClick={() => onPay("mercadopago")} loading={loading} loadingText="Procesando…" className="pay-method__cta">Pagar con Mercado Pago</Button>
                </div>
              )}

              {selected && m.id === "card" && (
                <form onSubmit={submitCard} className="pay-method__panel pay-card-form">
                  <h3 className="pay-card-form__title">Ingresá los datos de tu tarjeta</h3>
                  <Field label="Número de tarjeta">
                    <Input value={card.number} onChange={(e) => setCard((c) => ({ ...c, number: formatNumber(e.target.value) }))} inputMode="numeric" autoComplete="cc-number" placeholder="0000 0000 0000 0000" required minLength={19} />
                  </Field>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Fecha expiración">
                      <Input value={card.expiry} onChange={(e) => setCard((c) => ({ ...c, expiry: formatExpiry(e.target.value) }))} inputMode="numeric" autoComplete="cc-exp" placeholder="MM / YY" required minLength={7} />
                    </Field>
                    <Field label="CVV">
                      <Input value={card.cvv} onChange={(e) => setCard((c) => ({ ...c, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) }))} inputMode="numeric" autoComplete="cc-csc" placeholder="CVV / CVC" required minLength={3} />
                    </Field>
                  </div>
                  <Field label="Nombre como aparece en la tarjeta">
                    <Input value={card.holder} onChange={(e) => setCard((c) => ({ ...c, holder: e.target.value }))} autoComplete="cc-name" placeholder="Ej. Francisco Pérez" required />
                  </Field>
                  <Field label="Cuotas disponibles">
                    <Select value={card.installments} onChange={(e) => setCard((c) => ({ ...c, installments: e.target.value }))}>
                      {INSTALLMENTS.map((n) => (
                        <option key={n} value={n}>
                          {n === 1 ? `Total - ${formatPrice(total)}` : `${n} cuotas sin interés de ${formatPrice(Math.round(total / n))}`}
                        </option>
                      ))}
                    </Select>
                  </Field>
                  <Button type="submit" fullWidth loading={loading} loadingText="Procesando…">Pagar</Button>
                </form>
              )}

              {selected && m.id === "cash" && (
                <div className={cn("pay-method__panel", "pay-cash")}>
                  <Field label="¿Dónde querés pagar?">
                    <Select value={cashPlace} onChange={(e) => setCashPlace(e.target.value)}>
                      <option value="" disabled>Elegí una opción</option>
                      <option value="rapipago">Rapipago</option>
                      <option value="pagofacil">Pago Fácil</option>
                    </Select>
                  </Field>
                  <Button onClick={() => onPay("cash")} disabled={!cashPlace} loading={loading} loadingText="Generando…" className="pay-method__cta">Generar cupón de pago</Button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
