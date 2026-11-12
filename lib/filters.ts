import type { Product } from "./products"

/** Filtros del listado. Dentro de un grupo se combinan con "o"; entre grupos, con "y". */
export interface Filters {
  freeShipping: boolean
  express: boolean
  pickup: boolean
  categories: string[]
  brands: string[]
  drives: string[]
  /** Umbrales de descuento elegidos (25 = "Desde 25% OFF"). Rige el más bajo. */
  discounts: number[]
  /** Cantidad de cuotas sin interés elegidas. */
  installments: number[]
  priceMin: string
  priceMax: string
}

export const EMPTY_FILTERS: Filters = {
  freeShipping: false, express: false, pickup: false,
  categories: [], brands: [], drives: [], discounts: [], installments: [],
  priceMin: "", priceMax: "",
}

export const DISCOUNT_STEPS = [25, 15, 10]

type GroupKey = "freeShipping" | "express" | "pickup" | "categories" | "brands" | "drives" | "discounts" | "installments" | "price"

function toNumber(v: string) {
  const n = Number(v.replace(/\./g, "").replace(",", "."))
  return v.trim() === "" || Number.isNaN(n) ? null : n
}

function matches(p: Product, f: Filters, skip?: GroupKey): boolean {
  if (skip !== "freeShipping" && f.freeShipping && !p.freeShipping) return false
  if (skip !== "express" && f.express && !p.arrivesFast) return false
  if (skip !== "pickup" && f.pickup && !p.pickupToday) return false
  if (skip !== "categories" && f.categories.length && !f.categories.some((c) => p.facetCategories.includes(c))) return false
  if (skip !== "brands" && f.brands.length && !f.brands.includes(p.brand)) return false
  if (skip !== "drives" && f.drives.length && !(p.drive && f.drives.includes(p.drive))) return false
  if (skip !== "discounts" && f.discounts.length && p.discount < Math.min(...f.discounts)) return false
  if (skip !== "installments" && f.installments.length && !(p.installmentCount && f.installments.includes(p.installmentCount))) return false
  if (skip !== "price") {
    const min = toNumber(f.priceMin)
    const max = toNumber(f.priceMax)
    if (min !== null && p.priceX3 < min) return false
    if (max !== null && p.priceX3 > max) return false
  }
  return true
}

export function applyFilters(list: Product[], f: Filters, skip?: GroupKey) {
  return list.filter((p) => matches(p, f, skip))
}

export interface FacetOption<T extends string | number = string> {
  value: T
  label: string
  count: number
}

export interface Facets {
  switches: { freeShipping: number; express: number; pickup: number }
  categories: FacetOption[]
  brands: FacetOption[]
  drives: FacetOption[]
  discounts: FacetOption<number>[]
  installments: FacetOption<number>[]
}

function countBy<T extends string | number>(list: Product[], f: Filters, group: GroupKey, values: T[], has: (p: Product, v: T) => boolean, label: (v: T) => string, selected: T[]): FacetOption<T>[] {
  const base = applyFilters(list, f, group)
  return values
    .map((value) => ({ value, label: label(value), count: base.filter((p) => has(p, value)).length }))
    .filter((o) => o.count > 0 || selected.includes(o.value))
}

/** Opciones de cada grupo con su cantidad de productos. Cada cantidad ignora el propio grupo, así se ve cuánto sumaría elegirla. */
export function buildFacets(list: Product[], f: Filters): Facets {
  const uniq = <T,>(xs: (T | undefined)[]) => Array.from(new Set(xs.filter((x): x is T => x !== undefined && x !== "" as unknown)))
  const byCount = <T extends string | number>(opts: FacetOption<T>[]) => [...opts].sort((a, b) => b.count - a.count)

  return {
    switches: {
      freeShipping: applyFilters(list, f, "freeShipping").filter((p) => p.freeShipping).length,
      express: applyFilters(list, f, "express").filter((p) => p.arrivesFast).length,
      pickup: applyFilters(list, f, "pickup").filter((p) => p.pickupToday).length,
    },
    categories: byCount(countBy(list, f, "categories", uniq(list.flatMap((p) => p.facetCategories)), (p, v) => p.facetCategories.includes(v), (v) => v, f.categories)),
    brands: byCount(countBy(list, f, "brands", uniq(list.map((p) => p.brand)), (p, v) => p.brand === v, (v) => v, f.brands)),
    drives: byCount(countBy(list, f, "drives", uniq(list.map((p) => p.drive)), (p, v) => p.drive === v, (v) => v, f.drives)),
    discounts: countBy(list, f, "discounts", DISCOUNT_STEPS, (p, v) => p.discount >= v, (v) => `Desde ${v}% OFF`, f.discounts),
    installments: countBy(list, f, "installments", uniq(list.map((p) => p.installmentCount)).sort((a, b) => b - a), (p, v) => p.installmentCount === v, (v) => `${v} cuotas sin interés`, f.installments),
  }
}

export interface AppliedChip {
  id: string
  label: string
  group: GroupKey
  value?: string | number
}

/** Un chip por cada filtro aplicado, en el mismo orden que la columna. */
export function appliedChips(f: Filters): AppliedChip[] {
  const chips: AppliedChip[] = []
  if (f.freeShipping) chips.push({ id: "freeShipping", label: "Envío gratis", group: "freeShipping" })
  if (f.express) chips.push({ id: "express", label: "Envío Express", group: "express" })
  if (f.pickup) chips.push({ id: "pickup", label: "Retiro inmediato", group: "pickup" })
  f.categories.forEach((v) => chips.push({ id: `categories:${v}`, label: v, group: "categories", value: v }))
  f.brands.forEach((v) => chips.push({ id: `brands:${v}`, label: v, group: "brands", value: v }))
  f.drives.forEach((v) => chips.push({ id: `drives:${v}`, label: v, group: "drives", value: v }))
  f.discounts.forEach((v) => chips.push({ id: `discounts:${v}`, label: `Desde ${v}% OFF`, group: "discounts", value: v }))
  f.installments.forEach((v) => chips.push({ id: `installments:${v}`, label: `${v} cuotas sin interés`, group: "installments", value: v }))
  const min = toNumber(f.priceMin)
  const max = toNumber(f.priceMax)
  if (min !== null || max !== null) {
    const fmt = (n: number) => `$${n.toLocaleString("es-AR")}`
    chips.push({ id: "price", label: min !== null && max !== null ? `${fmt(min)} - ${fmt(max)}` : min !== null ? `Desde ${fmt(min)}` : `Hasta ${fmt(max as number)}`, group: "price" })
  }
  return chips
}

export function removeFilter(f: Filters, chip: AppliedChip): Filters {
  switch (chip.group) {
    case "freeShipping": return { ...f, freeShipping: false }
    case "express": return { ...f, express: false }
    case "pickup": return { ...f, pickup: false }
    case "price": return { ...f, priceMin: "", priceMax: "" }
    case "categories": return { ...f, categories: f.categories.filter((x) => x !== chip.value) }
    case "brands": return { ...f, brands: f.brands.filter((x) => x !== chip.value) }
    case "drives": return { ...f, drives: f.drives.filter((x) => x !== chip.value) }
    case "discounts": return { ...f, discounts: f.discounts.filter((x) => x !== chip.value) }
    case "installments": return { ...f, installments: f.installments.filter((x) => x !== chip.value) }
  }
}

export function toggleValue<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((x) => x !== value) : [...list, value]
}
