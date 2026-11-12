import type { NavKey } from "@/lib/products"

export type NavSubItem = { key: NavKey; label: string }

export const PASTAS_ITEMS: NavSubItem[] = [
  { key: "pastas-ravioles",              label: "Ravioles" },
  { key: "pastas-sorrentinos-capeletti", label: "Sorrentinos y Capeletti" },
  { key: "pastas-noquis",                label: "Ñoquis" },
  { key: "pastas-fideos",                label: "Fideos" },
]

export const TAPAS_ITEMS: NavSubItem[] = [
  { key: "tapas-empanadas",          label: "Para empanadas" },
  { key: "tapas-copetin-pastelitos", label: "Para copetín y pastelitos" },
  { key: "tapas-pascualinas",        label: "Para pascualinas" },
  { key: "tapas-tortillas",          label: "Tortillas" },
]

export const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=5491130656942"
export const WHATSAPP_LABEL = "(+54) 911 3065-6942"
