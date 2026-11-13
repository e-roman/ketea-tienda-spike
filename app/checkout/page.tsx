"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { buttonClasses } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FormHeader } from "@/components/ui/form-parts"
import { Heading, Text } from "@/components/ui/text"
import { AccountAccessForm } from "@/components/patterns/account-access-form"
import { EmptyState } from "@/components/patterns/empty-state"
import { OrderConfirmation } from "@/components/patterns/order-confirmation"
import { OrderReview, RecapCard } from "@/components/patterns/order-review"
import { PaymentPanel } from "@/components/patterns/payment-panel"
import { ShippingForm, type ShippingData } from "@/components/patterns/shipping-form"
import { StepIndicator, type StepItem } from "@/components/patterns/step-indicator"
import { useDelivery } from "@/lib/delivery-context"

type Step = "cuenta" | "envio" | "pago" | "confirmacion"

const STEPS: StepItem<Step>[] = [
  { id: "cuenta", label: "Cuenta" },
  { id: "envio",  label: "Forma de entrega" },
  { id: "pago",   label: "Método de pago" },
]

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart()
  const { option, shippingCost } = useDelivery()

  const [step, setStep] = useState<Step>("cuenta")

  // — Cuenta —
  const [email, setEmail] = useState("")
  const [authProvider, setAuthProvider] = useState<"google" | "apple" | null>(null)

  // — Envío —
  const [shipping, setShipping] = useState<ShippingData | null>(null)

  // — Confirmación —
  const [orderId] = useState(() => String(Math.floor(Math.random() * 90000) + 10000))
  const [confirmedItems, setConfirmedItems] = useState<typeof items>([])
  const [confirmedSubtotal, setConfirmedSubtotal] = useState(0)

  // — Loading states (simulan latencia de backend) —
  const [envioLoading, setEnvioLoading] = useState(false)
  const [payLoading, setPayLoading] = useState(false)

  const total = subtotal + shippingCost
  const currentStepIndex = STEPS.findIndex((s) => s.id === step)

  function handleEnvioSubmit(data: ShippingData) {
    if (envioLoading) return
    setEnvioLoading(true)
    setTimeout(() => {
      setShipping(data)
      setStep("pago")
      setEnvioLoading(false)
    }, 700)
  }

  function handleConfirmar() {
    if (payLoading) return
    setPayLoading(true)
    setTimeout(() => {
      setConfirmedItems(items)
      setConfirmedSubtotal(subtotal)
      clear()
      setStep("confirmacion")
      setPayLoading(false)
    }, 900)
  }

  if (items.length === 0 && step !== "confirmacion") {
    return (
      <div className="page page--subtle">
        <EmptyState
          variant="page"
          className="max-w-lg mx-auto px-4 py-24"
          icon={<ShoppingCart className="icon-xl" aria-hidden="true" />}
          title="Tu carrito está vacío"
        >
          <Link href="/productos" className={buttonClasses()}>
            Ver productos
          </Link>
        </EmptyState>
      </div>
    )
  }

  if (step === "confirmacion") {
    return (
      <OrderConfirmation
        orderRef={`ORD-${new Date().getFullYear()}-${orderId}`}
        dateString={new Date().toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        entrega={option.label}
        items={confirmedItems}
        subtotal={confirmedSubtotal}
        total={confirmedSubtotal + shippingCost}
      />
    )
  }

  return (
    <div className="page page--subtle">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <StepIndicator steps={STEPS} current={step} onStepClick={setStep} />

        <div className="grid md:grid-cols-[8fr_4fr] gap-8 items-start">
          {/* ── Columna izquierda: formulario del paso actual ── */}
          <div>
            {step === "cuenta" && (
              <Card padding="panel">
                <AccountAccessForm
                  submitLabels={{ register: "Crear cuenta y continuar", login: "Iniciar sesión y continuar" }}
                  onSuccess={({ email, provider }) => {
                    setEmail(email)
                    setAuthProvider(provider)
                    setStep("envio")
                  }}
                />
              </Card>
            )}

            {step === "envio" && (
              <ShippingForm defaultValues={shipping ?? undefined} loading={envioLoading} onSubmit={handleEnvioSubmit} />
            )}

            {step === "pago" && (
              <Card padding="panel">
                <FormHeader title="Pagá con Mercado Pago" />
                <PaymentPanel total={total} loading={payLoading} onPay={handleConfirmar} />
              </Card>
            )}
          </div>

          {/* ── Columna derecha: resumen sticky ── */}
          <div className="lg:sticky lg:top-36 space-y-4">
            <OrderReview items={items} subtotal={subtotal} shippingCost={shippingCost} total={total} />

            {/* Código de descuento: oculto por ahora. Para activarlo: <CouponField className="py-4" /> */}

            {currentStepIndex > 0 && email && (
              <RecapCard title="Cuenta" editLabel="Editar cuenta" onEdit={() => setStep("cuenta")}>
                <p>{email}</p>
                {authProvider && (
                  <p className="recap-card__small">Conectado con {authProvider === "google" ? "Google" : "Apple"}</p>
                )}
              </RecapCard>
            )}

            {currentStepIndex > 1 && shipping && (
              <RecapCard title="Entrega" editLabel="Editar envío" onEdit={() => setStep("envio")}>
                <p>{shipping.calle} {shipping.numero}{shipping.piso ? `, ${shipping.piso}` : ""}</p>
                <p className="recap-card__muted">{shipping.ciudad}, {shipping.provincia} ({shipping.cp})</p>
                <p className="recap-card__small">{option.label}</p>
              </RecapCard>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
