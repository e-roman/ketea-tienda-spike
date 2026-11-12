// ============================================================
// PRODUCT DATA — Tienda Ketea (spike)
// Adaptador mínimo: lee los JSON de la tienda actual de Ketea
// (src/data/products.json y productDetails.json, copiados en lib/data/)
// y los expone con la forma que espera la tienda de Orali.
// No es una capa de datos nueva: es solo una traducción de campos.
// ============================================================
import rawProducts from "./data/products.json"
import rawDetails from "./data/productDetails.json"

export type Category = string

export type Badge = "envio-gratis" | "cuotas" | "llega-hoy"

export const BADGE_STYLES: Record<Badge, { label: string }> = {
  "envio-gratis": { label: "Envío gratis" },
  cuotas:         { label: "Cuotas sin interés" },
  "llega-hoy":    { label: "Llega hoy" },
}

export interface NutritionRow {
  label: string
  value: string
}

export interface Product {
  id: string
  slug: string
  name: string
  shortName: string
  description: string
  image: string
  /** Orali vende por pack de 3: en Ketea ambos precios son el de la unidad. */
  priceUnit: number
  priceX3: number
  packInfo: string
  categories: Category[]
  badges: Badge[]
  featured?: boolean
  inStock?: boolean
  onSale?: boolean
  originalPriceX3?: number
  ingredients?: string
  conservation?: string
  nutritionTable?: {
    portion: string
    rows: NutritionRow[]
  }
  legalWarnings?: string[]
  installments?: string
}

type RawProduct = (typeof rawProducts)[number]
type RawDetail = {
  shortDescription?: string
  warrantyMonths?: number
  specs?: { group: string; items: { label: string; value: string }[] }[]
}

const details = rawDetails as unknown as Record<string, RawDetail>
const img = (p: string) => encodeURI(p.replace("../assets", "/assets"))

function adapt(p: RawProduct): Product {
  const d = details[p.slug]
  const badges: Badge[] = []
  if (p.envioGratis) badges.push("envio-gratis")
  if (p.cuotasSinInteres) badges.push("cuotas")
  if (p.llegaHoy) badges.push("llega-hoy")
  const rows = d?.specs?.flatMap((g) => g.items.map((i) => ({ label: i.label, value: i.value }))) ?? []
  return {
    id: String(p.id),
    slug: p.slug,
    name: p.title,
    shortName: p.title,
    description: d?.shortDescription ?? "",
    image: img(p.image),
    priceUnit: p.price,
    priceX3: p.price,
    packInfo: p.Marca,
    categories: p.categories,
    badges,
    featured: p.isFeatured || p.categories.includes("destacados"),
    inStock: p.stock,
    onSale: !!p.discount,
    originalPriceX3: p.oldPrice || undefined,
    ingredients: d?.shortDescription,
    conservation: d?.warrantyMonths ? `Garantía oficial de ${d.warrantyMonths} meses.` : undefined,
    nutritionTable: rows.length ? { portion: "Especificaciones técnicas", rows } : undefined,
    installments: p.installmentsLabel,
  }
}

export const products: Product[] = (rawProducts as RawProduct[]).map(adapt)

// ── Helpers ───────────────────────────────────────────────────────────────────

export const CATEGORIES = [
  { id: "Robots",          label: "Robots limpiafondos", emoji: "", desc: "Limpian fondo y paredes solos" },
  { id: "Bombas de Calor", label: "Bombas de calor",     emoji: "", desc: "Climatizá tu pileta todo el año" },
  { id: "Filtros",         label: "Filtros",             emoji: "", desc: "Agua cristalina" },
  { id: "Químicos",        label: "Químicos",            emoji: "", desc: "Cloro, algicidas y más" },
  { id: "Accesorios",      label: "Accesorios",          emoji: "", desc: "Todo para el mantenimiento" },
  { id: "Válvulas",        label: "Válvulas",            emoji: "", desc: "Control del flujo" },
] as const

export function getProductsByCategory(cat: Category) {
  return products.filter((p) => p.categories.includes(cat))
}

export function getFeatured() {
  return products.filter((p) => p.featured && p.inStock)
}

export function getOnSaleProducts() {
  return products.filter((p) => p.onSale && p.inStock)
}

export function getDiscountPercent(p: Product) {
  if (!p.onSale || !p.originalPriceX3) return 0
  return Math.round((1 - p.priceX3 / p.originalPriceX3) * 100)
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug) ?? null
}

export function formatPrice(n: number) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n)
}

// ── Navbar taxonomy ──────────────────────────────────────────────────────────

export type NavKey =
  | "piscinas-robots"
  | "piscinas-bombas-de-calor"
  | "piscinas-filtros"
  | "piscinas-valvulas"
  | "piscinas-todos"
  | "mantenimiento-quimicos"
  | "mantenimiento-cloro"
  | "mantenimiento-accesorios"
  | "mantenimiento-todos"
  | "ofertas"

export const NAV_LABELS: Record<NavKey, string> = {
  "piscinas-robots":          "Robots limpiafondos",
  "piscinas-bombas-de-calor": "Bombas de calor",
  "piscinas-filtros":         "Filtros",
  "piscinas-valvulas":        "Válvulas",
  "piscinas-todos":           "Equipamiento",
  "mantenimiento-quimicos":   "Químicos",
  "mantenimiento-cloro":      "Cloro",
  "mantenimiento-accesorios": "Accesorios",
  "mantenimiento-todos":      "Mantenimiento",
  ofertas:                    "Ofertas",
}

export const NAV_PARENT: Partial<Record<NavKey, NavKey>> = {
  "piscinas-robots":          "piscinas-todos",
  "piscinas-bombas-de-calor": "piscinas-todos",
  "piscinas-filtros":         "piscinas-todos",
  "piscinas-valvulas":        "piscinas-todos",
  "mantenimiento-quimicos":   "mantenimiento-todos",
  "mantenimiento-cloro":      "mantenimiento-todos",
  "mantenimiento-accesorios": "mantenimiento-todos",
}

const has = (p: Product, c: string) => p.categories.includes(c)
const EQUIPAMIENTO = ["Robots", "Bombas de Calor", "Filtros", "Válvulas"]
const MANTENIMIENTO = ["Químicos", "Cloro", "Accesorios"]

export function getProductsByNavKey(key: NavKey): Product[] {
  switch (key) {
    case "piscinas-robots":          return products.filter((p) => has(p, "Robots"))
    case "piscinas-bombas-de-calor": return products.filter((p) => has(p, "Bombas de Calor"))
    case "piscinas-filtros":         return products.filter((p) => has(p, "Filtros"))
    case "piscinas-valvulas":        return products.filter((p) => has(p, "Válvulas"))
    case "piscinas-todos":           return products.filter((p) => EQUIPAMIENTO.some((c) => has(p, c)))
    case "mantenimiento-quimicos":   return products.filter((p) => has(p, "Químicos"))
    case "mantenimiento-cloro":      return products.filter((p) => has(p, "Cloro"))
    case "mantenimiento-accesorios": return products.filter((p) => has(p, "Accesorios"))
    case "mantenimiento-todos":      return products.filter((p) => MANTENIMIENTO.some((c) => has(p, c)))
    case "ofertas":                  return products.filter((p) => p.onSale)
    default:                         return []
  }
}

// ── Buscador ──────────────────────────────────────────────────────────────────

function normalize(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
}

export function searchProducts(query: string, limit?: number): Product[] {
  const q = normalize(query.trim())
  if (!q) return []
  const results = products.filter((p) =>
    normalize(p.name).includes(q) ||
    normalize(p.packInfo).includes(q) ||
    normalize(p.description).includes(q)
  )
  return typeof limit === "number" ? results.slice(0, limit) : results
}
