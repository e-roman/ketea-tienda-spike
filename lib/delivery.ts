// Opciones de entrega de Ketea. Las usan el drawer del carrito y el checkout: eligen lo mismo y se pueden cambiar en ambos.

export type DeliveryMethod = "standard" | "express" | "pickup"

export const EXPRESS_COST = 25500

export interface DeliveryOption {
  id: DeliveryMethod
  /** home: se envía a domicilio; pickup: se retira en el local. */
  group: "home" | "pickup"
  label: string
  /** Líneas de detalle bajo el título. */
  detail: string[]
  cost: number
}

export const DELIVERY_OPTIONS: Record<DeliveryMethod, DeliveryOption> = {
  standard: { id: "standard", group: "home", label: "Envío Gratis", detail: ["Llega entre 3 y 5 días hábiles"], cost: 0 },
  express: { id: "express", group: "home", label: "Envío Express", detail: [`Tiene un costo de $${EXPRESS_COST.toLocaleString("es-AR")} y llega hoy`], cost: EXPRESS_COST },
  pickup: { id: "pickup", group: "pickup", label: "Ketea Ramos Mejía", detail: ["Cnel. Brandsen 2230, Ramos Mejía", "Lunes a Viernes de 9 a 18hs."], cost: 0 },
}

export const PICKUP_ONLY_NOTICE = "Los productos Automower se retiran por el local."

export const PROVINCES = [
  "Buenos Aires", "Ciudad Autónoma de Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes", "Entre Ríos",
  "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan",
  "San Luis", "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucumán",
]

export const HOME_TYPES = ["Casa", "Departamento", "Oficina", "Otro"]

export const SUPPORT_PHONE = "(+54) 911 3065-5787"

const dayFormat = new Intl.DateTimeFormat("es-AR", { weekday: "long", day: "numeric", month: "long" })

/** Suma días hábiles (lunes a viernes). */
export function addBusinessDays(from: Date, days: number) {
  const d = new Date(from)
  let left = days
  while (left > 0) {
    d.setDate(d.getDate() + 1)
    if (d.getDay() !== 0 && d.getDay() !== 6) left--
  }
  return d
}

/** Texto de llegada según el método elegido (ej. «Llega entre el jueves 20 de noviembre y el lunes 24 de noviembre»). */
export function estimatedDelivery(method: DeliveryMethod, from: Date = new Date()): string {
  if (method === "express") return "Llega hoy"
  if (method === "pickup") return "Te avisamos por email cuando esté listo para retirar"
  const fmt = (d: Date) => dayFormat.format(d).replace(",", "")
  return `Llega entre el ${fmt(addBusinessDays(from, 3))} y el ${fmt(addBusinessDays(from, 5))}`
}
