"use client"

import Link from "next/link"
import { useState } from "react"
import { Check } from "lucide-react"
import { Button, buttonClasses } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heading, Text } from "@/components/ui/text"
import { IconBadge } from "@/components/ui/icon-badge"
import { RatingScale } from "@/components/ui/rating-scale"
import ProductCard from "@/components/patterns/product-card"
import { formatPrice, getFeatured, type Product } from "@/lib/products"

interface OrderConfirmationProps {
  orderRef: string
  /** Fecha ya formateada («lunes 4 de noviembre de 2026»). */
  dateString: string
  /** Día y horario de entrega, si el barrio es conocido. */
  entrega?: string
  items: { product: Product; quantity: number }[]
  subtotal: number
  total: number
}

/** Pantalla de pedido confirmado: resumen, encuesta NPS, recomendados y accesos. Clases de Card, Text y RatingScale. */
export function OrderConfirmation({ orderRef, dateString, entrega, items, subtotal, total }: OrderConfirmationProps) {
  const [score, setScore] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const recommendations = getFeatured().slice(0, 3)

  function submitNps() {
    if (score === null || loading) return
    setLoading(true)
    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
    }, 600)
  }

  return (
    <div className="page page--subtle">
      <div className="confirmation__main max-w-2xl mx-auto px-4">
        <div className="confirmation__header">
          <IconBadge size="lg" tone="success" className="confirmation__icon">
            <Check className="icon-xl" strokeWidth={2.5} aria-hidden="true" />
          </IconBadge>
          <Heading as="h1" size="title" className="confirmation__title">¡Tu pedido está confirmado!</Heading>
          <Text size="sm" tone="secondary">
            <Text as="span" size="sm" weight="semibold">#{orderRef}</Text>
            {" — "}
            {dateString.charAt(0).toUpperCase() + dateString.slice(1)}
          </Text>
          {entrega && (
            <Text size="sm" tone="secondary" className="confirmation__extra">
              Entrega: <Text as="strong" size="sm" weight="semibold">{entrega}</Text>
            </Text>
          )}
        </div>

        <Card className="confirmation__summary">
          <div className="card-section">
            <Heading as="h2" size="md">Resumen del pedido</Heading>
          </div>
          <div className="card-section card-section--body confirmation__lines">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="confirmation__line">
                <Text as="span" size="sm" className="confirmation__line-name">{quantity}× {product.shortName}</Text>
                <Text as="span" size="sm" weight="medium" className="confirmation__line-price">{formatPrice(product.priceX3 * quantity)}</Text>
              </div>
            ))}
          </div>
          <div className="card-section confirmation__totals">
            <div className="confirmation__total-row">
              <Text as="span" size="sm" tone="secondary">Subtotal</Text>
              <Text as="span" size="sm" tone="secondary">{formatPrice(subtotal)}</Text>
            </div>
            <div className="confirmation__total-row">
              <Text as="span" size="sm" tone="secondary">Envío</Text>
              <Text as="span" size="sm" weight="medium" tone="shipping-free">Gratis</Text>
            </div>
          </div>
          <div className="card-section confirmation__total-row">
            <Text as="span" weight="semibold">Total</Text>
            <Text as="span" weight="semibold">{formatPrice(total)}</Text>
          </div>
        </Card>

        <Card padding="lg" className="confirmation__survey">
          <Text size="sm" weight="medium" className="confirmation__question">
            Del 1 al 10, ¿qué tan probable es que recomiendes Orali?
          </Text>
          {!submitted ? (
            <>
              <RatingScale value={score} onChange={setScore} className="confirmation__scale" />
              <div className="confirmation__labels">
                <Text as="span" size="xs" tone="secondary">Poco probable</Text>
                <Text as="span" size="xs" tone="secondary">Muy probable</Text>
              </div>
              <Button variant="secondary" size="lg" fullWidth onClick={submitNps} disabled={score === null} loading={loading} loadingText="Enviando…">
                Enviar
              </Button>
            </>
          ) : (
            <Text size="sm" tone="secondary" className="confirmation__thanks">¡Gracias por tu respuesta!</Text>
          )}
        </Card>
      </div>

      {recommendations.length > 0 && (
        <div className="confirmation__more max-w-4xl mx-auto px-4">
          <section>
            <Heading size="lg" className="confirmation__more-title">Te puede interesar</Heading>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {recommendations.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </div>
      )}

      <div className="confirmation__actions max-w-2xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/" className={buttonClasses({ variant: "neutral", fullWidth: true })}>
            Volver al inicio
          </Link>
          <Link href="/productos" className={buttonClasses({ fullWidth: true })}>
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  )
}
