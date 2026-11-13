"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useDelivery } from "@/lib/delivery-context"
import { EMPTY_PERSONAL, billingEmailOf, type PersonalData, type PaymentMethod } from "@/lib/checkout"
import { buttonClasses } from "@/components/ui/button"
import { EmptyState } from "@/components/patterns/empty-state"
import { OrderConfirmation } from "@/components/patterns/order-confirmation"
import { OrderReview, RecapCard } from "@/components/patterns/order-review"
import { PaymentMethods } from "@/components/patterns/payment-methods"
import { PersonalForm } from "@/components/patterns/personal-form"
import { ShippingForm, type ShippingData } from "@/components/patterns/shipping-form"
import { StepIndicator, type StepItem } from "@/components/patterns/step-indicator"

type Step = "datos" | "entrega" | "pago" | "confirmacion"

// En Ketea se compra sin registrarse: el primer paso pide los datos personales y un email.
const STEPS: StepItem<Step>[] = [
  { id: "datos",   label: "Datos Personales" },
  { id: "entrega", label: "Domicilio y Entrega" },
  { id: "pago",    label: "Método de pago" },
]

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart()
  const { option, shippingCost } = useDelivery()

  const [step, setStep] = useState<Step>("datos")
  const [personal, setPersonal] = useState<PersonalData>(EMPTY_PERSONAL)
  const [personalDone, setPersonalDone] = useState(false)
  const [shipping, setShipping] = useState<ShippingData | null>(null)

  // — Confirmación —
  const [orderId] = useState(() => String(Math.floor(Math.random() * 90000) + 10000))
  const [confirmedItems, setConfirmedItems] = useState<typeof items>([])
  const [confirmedSubtotal, setConfirmedSubtotal] = useState(0)

  // — Estados de carga (simulan la demora de un servidor) —
  const [envioLoading, setEnvioLoading] = useState(false)
  const [payLoading, setPayLoading] = useState(false)

  const total = subtotal + shippingCost
  const currentStepIndex = STEPS.findIndex((s) => s.id === step)

  function handlePersonalSubmit(data: PersonalData) {
    setPersonal(data)
    setPersonalDone(true)
    setStep("entrega")
  }

  function handleEnvioSubmit(data: ShippingData) {
    if (envioLoading) return
    setEnvioLoading(true)
    setTimeout(() => {
      setShipping(data)
      setStep("pago")
      setEnvioLoading(false)
    }, 700)
  }

  // Pago simulado: cualquier método confirma la compra
  function handlePay(_method: PaymentMethod) {
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

  // Datos para el paso de entrega: si la dirección es la misma, se parte de la de facturación
  const shippingDefaults = shipping ?? (personal.sameAddress ? { calle: personal.calle, numero: personal.numero, piso: personal.depto } : undefined)

  return (
    <div className="page page--subtle">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <StepIndicator steps={STEPS} current={step} onStepClick={setStep} />

        <div className="grid md:grid-cols-[8fr_4fr] gap-8 items-start">
          {/* ── Columna izquierda: formulario del paso actual ── */}
          <div>
            {step === "datos" && <PersonalForm defaultValues={personal} onSubmit={handlePersonalSubmit} />}

            {step === "entrega" && <ShippingForm defaultValues={shippingDefaults} loading={envioLoading} onSubmit={handleEnvioSubmit} />}

            {step === "pago" && <PaymentMethods total={total} loading={payLoading} onPay={handlePay} />}
          </div>

          {/* ── Columna derecha: resumen sticky ── */}
          <div className="lg:sticky lg:top-36 space-y-4">
            <OrderReview items={items} subtotal={subtotal} shippingLabel={option.label} shippingCost={shippingCost} total={total} />

            {currentStepIndex > 0 && personalDone && (
              <RecapCard title="Datos Personales" editLabel="Editar datos personales" onEdit={() => setStep("datos")}>
                <p><strong>Nombre:</strong> {personal.nombre} {personal.apellido}</p>
                <p><strong>Email:</strong> {billingEmailOf(personal)}</p>
                <p><strong>Teléfono:</strong> {personal.telefono}</p>
              </RecapCard>
            )}

            {currentStepIndex > 1 && shipping && (
              <RecapCard title="Datos de entrega" editLabel="Editar datos de entrega" onEdit={() => setStep("entrega")}>
                <p><strong>Calle:</strong> {shipping.calle}</p>
                <p><strong>Número:</strong> {shipping.numero}</p>
                <p><strong>Código postal:</strong> {shipping.cp}</p>
                <p><strong>Provincia:</strong> {shipping.provincia}</p>
                <p><strong>Ciudad:</strong> {shipping.ciudad}</p>
              </RecapCard>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
