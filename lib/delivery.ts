// Zonas de entrega: cada barrio de CABA tiene un día fijo, siempre de 9 a 15 h.
// Para mover un barrio de día, cambialo de lista acá — el checkout lo toma solo.

export const DELIVERY_HOURS = "de 9 a 15 h"
export const SUPPORT_PHONE = "(+54) 911 3065-6942"

type Dia = "lunes" | "martes" | "miércoles" | "jueves" | "viernes"

const BARRIOS_POR_DIA: Record<Dia, string[]> = {
  lunes: [
    "San Telmo", "La Boca", "Barracas", "Constitución", "Monserrat", "San Nicolás",
    "Puerto Madero", "Retiro", "Parque Patricios", "Nueva Pompeya",
  ],
  martes: [
    "Palermo", "Recoleta", "Belgrano", "Colegiales", "Núñez", "Saavedra", "Coghlan",
  ],
  miércoles: [
    "Almagro", "Balvanera", "Boedo", "San Cristóbal", "Caballito", "Villa Crespo",
    "Chacarita", "Parque Chacabuco",
  ],
  jueves: [
    "Villa Urquiza", "Villa Ortúzar", "Agronomía", "Parque Chas", "Villa Pueyrredón",
    "Villa Devoto", "Villa del Parque", "Villa Santa Rita", "La Paternal", "Villa General Mitre",
  ],
  viernes: [
    "Flores", "Floresta", "Vélez Sársfield", "Villa Luro", "Liniers", "Mataderos",
    "Parque Avellaneda", "Monte Castro", "Versalles", "Villa Real", "Villa Lugano",
    "Villa Riachuelo", "Villa Soldati",
  ],
}

const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim()

// Nombres más largos primero para que "Villa Crespo" no matchee con otro más corto
const BARRIOS = Object.entries(BARRIOS_POR_DIA)
  .flatMap(([dia, barrios]) => barrios.map((barrio) => ({ barrio, dia: dia as Dia, key: normalize(barrio).replace(/^la /, "") })))
  .sort((a, b) => b.key.length - a.key.length)

const CABA_GENERICO = ["caba", "capital federal", "capital", "ciudad autonoma de buenos aires", "ciudad de buenos aires"]

export type DeliveryZone =
  | { kind: "caba"; barrio: string; dia: Dia }
  | { kind: "caba-sin-barrio" } // CP de CABA pero sin barrio reconocible en "Localidad"
  | { kind: "fuera" }           // GBA u otra zona: se coordina por teléfono
  | { kind: "pendiente" }       // todavía no hay datos suficientes

export function isCabaCp(cp: string) {
  const n = parseInt(cp)
  return cp.length >= 4 && n >= 1000 && n <= 1499
}

export function getDeliveryZone(localidad: string, cp: string): DeliveryZone {
  const loc = normalize(localidad)
  const match = loc && BARRIOS.find((b) => loc.includes(b.key))
  if (match) return { kind: "caba", barrio: match.barrio, dia: match.dia }

  const soloCaba = !loc || CABA_GENERICO.some((g) => loc.replace(/[.,]/g, "").trim() === g)
  if (!soloCaba) return { kind: "fuera" }
  if (isCabaCp(cp)) return { kind: "caba-sin-barrio" }
  if (cp.length >= 4) return { kind: "fuera" }
  return { kind: "pendiente" }
}
