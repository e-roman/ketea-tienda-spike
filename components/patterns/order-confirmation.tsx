"use client"

import Link from "next/link"
import { useState } from "react"
import { Check, Copy, MessageCircle, Printer } from "lucide-react"
import { Button, buttonClasses } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heading, Text } from "@/components/ui/text"
import { IconBadge } from "@/components/ui/icon-badge"
import ProductCard from "@/components/patterns/product-card"
import { OrderReview } from "@/components/patterns/order-review"
import { estimatedDelivery, type DeliveryOption } from "@/lib/delivery"
import { isPaymentPending, type PaymentSummary } from "@/lib/checkout"
import { getFeatured, type Product } from "@/lib/products"
import { WHATSAPP_URL } from "@/components/patterns/header/nav-items"
import { cn } from "@/lib/utils"

// Mapas literales: Tailwind purga las clases de @layer components que no encuentra escritas.
const STEP = {
  done: "timeline__item timeline__item--done",
  current: "timeline__item timeline__item--current",
  upcoming: "timeline__item",
} as const

const helpLook = buttonClasses({
  variant: "outline",
  fullWidth: true,
})
const helpCta = cn(helpLook, "confirmation__help-cta")

interface OrderConfirmationProps {
  orderRef: string
  /** Fecha ya formateada («lunes 4 de noviembre de 2026»). */
  dateString: string
  customer: { nombre: string; email: string; telefono: string }
  /** Dirección de envío; no hay si se retira en el local. */
  address?: { line1: string; line2: string }
  delivery: DeliveryOption
  shippingCost: number
  payment: PaymentSummary
  items: { product: Product; quantity: number }[]
  subtotal: number
  total: number
}

/**
 * Pantalla de pedido confirmado (Figma: Checkout / Confirmation): agradecimiento con el número de pedido, aviso de email,
 * próximos pasos con la llegada estimada, datos de entrega, pago y contacto, resumen de la compra y ayuda.
 * Clases de styles/patterns/order-confirmation.css.
 */
export function OrderConfirmation({ orderRef, dateString, customer, address, delivery, shippingCost, payment, items, subtotal, total }: OrderConfirmationProps) {
  const [copied, setCopied] = useState(false)
  const recommendations = getFeatured().slice(0, 5)
  const pickup = delivery.group === "pickup"
  const pending = isPaymentPending(payment)
  const eta = estimatedDelivery(delivery.id)
  const code = orderRef.replace(/\D/g, "").padEnd(12, "7").slice(0, 12).replace(/(.{4})/g, "$1 ").trim()

  async function copyRef() {
    try {
      await navigator.clipboard.writeText(orderRef)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* sin portapapeles: el número igual queda a la vista */
    }
  }

  const steps: { title: string; text: string; state: keyof typeof STEP }[] = [
    { title: "Pedido confirmado", text: dateString.charAt(0).toUpperCase() + dateString.slice(1), state: "done" },
    { title: pending ? "Esperando tu pago" : "Preparamos tu pedido", text: pending ? "Cuando pagues el cupón, empezamos a prepararlo." : "Lo armamos y lo revisamos antes de despacharlo.", state: "current" },
    { title: pickup ? "Listo para retirar" : "Tu pedido está en camino", text: pickup ? "Te avisamos por email cuando puedas pasar a buscarlo." : "Te mandamos el seguimiento por email.", state: "upcoming" },
    { title: pickup ? "Retirado" : "Entregado", text: "¡A disfrutar de tu pileta!", state: "upcoming" },
  ]

  return (
    <div className="page page--subtle">
      <div className="max-w-7xl mx-auto px-4 md:px-6 confirmation__wrap">
        <header className="confirmation__header">
          <IconBadge size="lg" tone="success" className="confirmation__icon">
            <Check className="icon-xl" strokeWidth={2.5} aria-hidden="true" />
          </IconBadge>
          <Heading as="h1" size="title" className="confirmation__title">¡Gracias por tu compra, {customer.nombre}!</Heading>
          <Text tone="secondary">Te enviamos la confirmación a <strong>{customer.email}</strong>.</Text>
          <div className="confirmation__ref">
            <span>Pedido <strong>#{orderRef}</strong></span>
            <button type="button" onClick={copyRef} aria-label="Copiar número de pedido" className="confirmation__copy">
              {copied ? <><Check aria-hidden="true" /> Copiado</> : <><Copy aria-hidden="true" /> Copiar</>}
            </button>
          </div>
        </header>

        <div className="grid md:grid-cols-[8fr_4fr] gap-8 items-start">
          <div className="confirmation__col">
            <Card padding="panel">
              <p className="confirmation__eta">{eta}</p>
              <h2 className="confirmation__section-title">Qué sigue</h2>
              <ol className="timeline">
                {steps.map((s) => (
                  <li key={s.title} className={STEP[s.state]}>
                    <span className="timeline__marker" aria-hidden="true">{s.state === "done" && <Check />}</span>
                    <p className="timeline__title">{s.title}</p>
                    <p className="timeline__text">{s.text}</p>
                  </li>
                ))}
              </ol>
            </Card>

            <Card padding="panel">
              <h2 className="confirmation__section-title">{pickup ? "Retiro en local" : "Envío a domicilio"}</h2>
              <p className="confirmation__strong">{delivery.label}</p>
              {pickup
                ? delivery.detail.map((l) => <p key={l} className="confirmation__line">{l}</p>)
                : address && <><p className="confirmation__line">{address.line1}</p><p className="confirmation__line">{address.line2}</p></>}
              <p className="confirmation__line">{eta}</p>
            </Card>

            <Card padding="panel">
              <h2 className="confirmation__section-title">Pago</h2>
              <p className="confirmation__strong">
                {payment.label}
                <span className={cn("confirmation__status", pending ? "confirmation__status--pending" : "confirmation__status--ok")}>{pending ? "Pendiente de pago" : "Pago aprobado"}</span>
              </p>
              {payment.detail && <p className="confirmation__line">{payment.detail}</p>}
              {pending && (
                <div className="callout callout--rich callout--info confirmation__coupon" role="status">
                  <p className="callout__text">
                    <strong>Tu código de pago: {code}</strong><br />
                    Presentalo en {payment.detail ?? "el punto de pago"} dentro de los próximos 3 días. Si no lo pagás, el pedido se cancela solo.
                  </p>
                </div>
              )}
            </Card>

            <Card padding="panel">
              <h2 className="confirmation__section-title">Contacto</h2>
              <p className="confirmation__strong">{customer.nombre}</p>
              <p className="confirmation__line">{customer.email}</p>
              <p className="confirmation__line">{customer.telefono}</p>
            </Card>
          </div>

          <div className="confirmation__side">
            <OrderReview items={items} subtotal={subtotal} shippingLabel={delivery.label} shippingCost={shippingCost} total={total} />

            <Card padding="panel" className="confirmation__help">
              <h2 className="confirmation__section-title">¿Necesitás ayuda?</h2>
              <p className="confirmation__line">Escribinos con tu número de pedido y te respondemos enseguida.</p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={helpCta}>
                <MessageCircle className="icon-sm" aria-hidden="true" /> Hablar por WhatsApp
              </a>
            </Card>
          </div>
        </div>

        <div className="confirmation__actions">
          <Link href="/productos" className={buttonClasses()}>Seguir comprando</Link>
          <Button variant="neutral" onClick={() => window.print()}>
            <Printer className="icon-sm" aria-hidden="true" /> Imprimir comprobante
          </Button>
        </div>

        {recommendations.length > 0 && (
          <section className="confirmation__more">
            <Heading size="xl" className="confirmation__more-title">Te puede interesar</Heading>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
              {recommendations.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
