// Datos del checkout y sus reglas de validación. En Ketea se compra sin registrarse: solo se pide un email.

export interface PersonalData {
  /** Email de contacto: acá llegan la confirmación y el seguimiento. */
  email: string
  newsletter: boolean
  nombre: string
  apellido: string
  /** Email de facturación; mientras no se edite, repite el de contacto. */
  billingEmail: string | null
  telefono: string
  calle: string
  numero: string
  depto: string
  /** La dirección de envío es la misma que la de facturación. */
  sameAddress: boolean
}

export const EMPTY_PERSONAL: PersonalData = {
  email: "", newsletter: true, nombre: "", apellido: "", billingEmail: null,
  telefono: "", calle: "", numero: "", depto: "", sameAddress: true,
}

export type PersonalField = "email" | "nombre" | "apellido" | "billingEmail" | "telefono" | "calle" | "numero"

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Email de facturación vigente (el de contacto si no se editó). */
export const billingEmailOf = (d: PersonalData) => d.billingEmail ?? d.email

/** Mensaje de error por campo; un campo sin mensaje es válido. */
export function validatePersonal(d: PersonalData): Partial<Record<PersonalField, string>> {
  const errors: Partial<Record<PersonalField, string>> = {}
  if (!EMAIL.test(d.email.trim())) errors.email = "Ingresá un email válido."
  if (!d.nombre.trim()) errors.nombre = "Ingresá tu nombre."
  if (!d.apellido.trim()) errors.apellido = "Ingresá tu apellido."
  if (!EMAIL.test(billingEmailOf(d).trim())) errors.billingEmail = "Ingresá un email válido."
  if (d.telefono.replace(/\D/g, "").length < 8) errors.telefono = "Ingresá tu teléfono."
  if (!d.calle.trim()) errors.calle = "Ingresá tu calle."
  if (!d.numero.trim()) errors.numero = "Ingresá el número."
  return errors
}

export const PAYMENT_METHODS = ["modo", "mercadopago", "card", "cash"] as const
export type PaymentMethod = (typeof PAYMENT_METHODS)[number]

export interface PaymentSummary {
  method: PaymentMethod
  label: string
  /** Dato visible del pago (ej. «Tarjeta terminada en 3704 · 3 cuotas sin interés»). */
  detail?: string
}

const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  modo: "MODO",
  mercadopago: "Mercado Pago",
  card: "Tarjeta de crédito, débito o prepaga",
  cash: "Efectivo",
}

export const paymentSummary = (method: PaymentMethod, detail?: string): PaymentSummary => ({ method, label: PAYMENT_LABELS[method], detail })

/** En efectivo el pedido queda pendiente hasta que se paga el cupón; en el resto se acredita al instante. */
export const isPaymentPending = (p: PaymentSummary) => p.method === "cash"
