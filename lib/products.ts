// ============================================================
// PRODUCT DATA — Tienda Ketea (spike)
// Adaptador mínimo: lee los JSON de la tienda actual de Ketea
// (src/data/products.json y productDetails.json, copiados en lib/data/)
// y los expone con la forma que usan los componentes de la tienda.
// No es una capa de datos nueva: es solo una traducción de campos.
// ============================================================
import rawProducts from "./data/products.json"
import rawDetails from "./data/productDetails.json"
import { getProductImages } from "./data/product-photos"

export type Category = string

export type Badge = "envio-gratis" | "cuotas" | "llega-hoy"

export const BADGE_STYLES: Record<Badge, { label: string }> = {
  "envio-gratis": { label: "Envío gratis" },
  cuotas:         { label: "Cuotas sin interés" },
  "llega-hoy":    { label: "Llega hoy" },
}

export interface SpecRow {
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
  /** En Ketea se vende por unidad: ambos precios son el de la unidad. */
  priceUnit: number
  priceX3: number
  packInfo: string
  categories: Category[]
  badges: Badge[]
  featured?: boolean
  inStock?: boolean
  onSale?: boolean
  originalPriceX3?: number
  /** Cuotas, ej. "3x $509.973 sin interés". */
  installments?: string
  /** Fotos para la vista rápida (la principal va primero). */
  images: string[]
  /** Dato técnico destacado bajo el título, ej. "Ciclo: 2,5 horas". */
  highlight?: string
  /** Datos clave para la vista rápida (hasta 5). */
  keySpecs: SpecRow[]
  pickupToday?: boolean
  freeShipping?: boolean
  /** Solo se retira por el local (ej. cortacésped Automower). */
  pickupOnly?: boolean
  /** Llega hoy o mañana con Envío Express. */
  arrivesFast?: boolean
  brand: string
  /** Accionamiento (eléctrico, a batería…). */
  drive?: string
  /** Descuento en %, tal como figura en los datos. */
  discount: number
  /** Cantidad de cuotas sin interés (si las tiene). */
  installmentCount?: number
  /** Categorías visibles para filtrar (sin ofertas, destacados ni premium). */
  facetCategories: string[]
  /** Código/SKU que se muestra en la ficha. */
  sku: string
  warrantyMonths?: number
  /** Cuotas sin el texto "sin interés", ej. "12x $66.625". */
  installmentsShort?: string
  /** Fotos de la galería de la ficha: la principal y las de detalle. */
  gallery: string[]
  /** Migas de pan sin el inicio: [categoría general, categoría del producto]. */
  breadcrumb: string[]
}

type RawProduct = (typeof rawProducts)[number]
type RawDetail = {
  sku?: string
  shortDescription?: string
  warrantyMonths?: number
  specs?: { group: string; items: { label: string; value: string }[] }[]
}

// Dato técnico destacado en la card, por categoría (misma regla que la tienda actual de Ketea).
const CARD_SPEC_BY_CATEGORY: Record<string, { spec: string; short?: string }[]> = {
  Robots: [{ spec: "Tiempo de ciclo", short: "Ciclo" }, { spec: "Superficie de corte", short: "Superficie" }, { spec: "Alimentación" }],
  "Bombas de Calor": [{ spec: "Volumen de piscina", short: "Piscinas" }],
  Filtros: [{ spec: "Caudal" }],
  Químicos: [{ spec: "Presentación" }],
  Válvulas: [{ spec: "Conexión" }, { spec: "Volumen de piscina", short: "Piscinas" }],
  Accesorios: [{ spec: "Largo" }, { spec: "Ancho" }, { spec: "Capacidad" }, { spec: "Contenido" }],
}

const details = rawDetails as unknown as Record<string, RawDetail>
const img = (p: string) => encodeURI(p.replace("../assets", "/assets"))

const HIDDEN_CATEGORIES = ["ofertas", "destacados", "premium"]

function breadcrumbOf(p: RawProduct): string[] {
  const cats = p.categories.filter((c) => !HIDDEN_CATEGORIES.includes(c.toLowerCase()))
  const detail = p.categoryDetail?.[0]
  const parent = cats.find((c) => c !== detail)
  return [parent, detail].filter((c): c is string => !!c)
}

function adapt(p: RawProduct): Product {
  const d = details[p.slug]
  const badges: Badge[] = []
  if (p.envioGratis) badges.push("envio-gratis")
  if (p.cuotasSinInteres) badges.push("cuotas")
  if (p.llegaHoy) badges.push("llega-hoy")
  const rows = d?.specs?.flatMap((g) => g.items.map((i) => ({ label: i.label, value: i.value }))) ?? []
  const category = p.categoryDetail?.[0] ?? ""
  let highlight: string | undefined
  for (const { spec, short } of CARD_SPEC_BY_CATEGORY[category] ?? []) {
    const found = rows.find((r) => r.label === spec)
    if (found) { highlight = `${short ?? spec}: ${found.value}`; break }
  }
  const keySpecs = [
    ...rows.filter((r) => r.label !== "Código"),
    { label: "Marca", value: p.Marca },
    { label: "Categoría", value: category },
    ...(p.accionamiento ? [{ label: "Accionamiento", value: p.accionamiento }] : []),
  ].filter((r) => r.value).slice(0, 5)
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
    installments: p.installmentsLabel ? `${p.installmentsLabel} sin interés` : undefined,
    images: getProductImages(String(p.id), img(p.image)),
    highlight,
    keySpecs,
    pickupToday: p.retiroInmediato,
    freeShipping: p.envioGratis,
    pickupOnly: /automower/i.test(p.title),
    arrivesFast: p.llegaHoy || p.llegaManana,
    brand: p.Marca,
    drive: p.accionamiento || undefined,
    discount: p.discount || 0,
    installmentCount: p.cuotasSinInteres ? p.cuotas : undefined,
    facetCategories: p.categories.filter((c) => !HIDDEN_CATEGORIES.includes(c.toLowerCase())),
    sku: d?.sku ?? p.code ?? "",
    warrantyMonths: d?.warrantyMonths,
    installmentsShort: p.installmentsLabel || undefined,
    gallery: Array.from(new Set([img(p.image), ...(p.images ?? []).map(img)])).slice(0, 5),
    breadcrumb: breadcrumbOf(p),
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
