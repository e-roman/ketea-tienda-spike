import type { NavKey } from "@/lib/products"

export type NavSubItem = { key: NavKey; label: string }

// En la tienda de Orali estos grupos se llamaban PASTAS_ITEMS y TAPAS_ITEMS.
// Se conservan los nombres de las constantes para no tocar los componentes del menú.
export const PASTAS_ITEMS: NavSubItem[] = [
  { key: "piscinas-robots",          label: "Robots limpiafondos" },
  { key: "piscinas-bombas-de-calor", label: "Bombas de calor" },
  { key: "piscinas-filtros",         label: "Filtros" },
  { key: "piscinas-valvulas",        label: "Válvulas" },
]

export const TAPAS_ITEMS: NavSubItem[] = [
  { key: "mantenimiento-quimicos",   label: "Químicos" },
  { key: "mantenimiento-cloro",      label: "Cloro" },
  { key: "mantenimiento-accesorios", label: "Accesorios" },
]

export const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=5491130655787"
export const WHATSAPP_LABEL = "(+54) 911 3065-5787"
