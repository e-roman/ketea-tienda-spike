// Detalle completo de un producto para las pestañas de la ficha. Lee productDetails.json (la tienda actual de Ketea)
// y completa con contenido genérico por categoría. Pocos productos tienen ficha completa; el resto muestra lo que tiene.
import rawDetails from "./data/productDetails.json"
import type { Product } from "./products"

export interface SpecGroup {
  group: string
  items: { label: string; value: string }[]
}

export interface FeatureSection {
  title: string
  items: { label?: string; text: string; subitems?: string[] }[]
}

export interface FeatureBlock {
  title: string
  text: string[]
  image?: string
}

export interface Faq {
  q: string
  a: string
}

export interface ProductDetails {
  description: string[]
  sections: FeatureSection[]
  includes: string[]
  notIncluded: string[]
  tips: string[]
  featureBlocks: FeatureBlock[]
  specs: SpecGroup[]
  faq: Faq[]
  warrantyMonths: number | null
  warrantyText: string
}

type Raw = {
  shortDescription?: string
  description?: string[]
  sections?: FeatureSection[]
  includes?: string[]
  notIncluded?: string[]
  tips?: string[]
  featureBlocks?: FeatureBlock[]
  specs?: SpecGroup[]
  faq?: Faq[]
  warrantyMonths?: number
  warrantyText?: string
}

const GENERIC_FAQ: Faq[] = [
  { q: "¿Cuánto tarda el envío?", a: "Los envíos se despachan dentro de las 48 h hábiles. Si el producto tiene Envío Express, llega en el día en zonas seleccionadas." },
  { q: "¿Puedo retirarlo en una sucursal?", a: "Sí, podés elegir retiro gratis en sucursal al finalizar la compra." },
]

const CATEGORY_DEFAULTS: Record<string, { warrantyMonths?: number; faq: Faq[] }> = {
  Robots: {
    warrantyMonths: 12,
    faq: [
      { q: "¿Cada cuánto conviene usar el robot?", a: "Para uso residencial recomendamos 2 o 3 ciclos por semana en temporada y uno semanal fuera de temporada." },
      { q: "¿Qué mantenimiento necesita?", a: "Lavar el filtro después de cada uso y guardar el robot a la sombra, con el cable sin dobleces." },
    ],
  },
  "Bombas de Calor": {
    warrantyMonths: 12,
    faq: [{ q: "¿Necesita instalación profesional?", a: "Sí, recomendamos instalarla con un técnico matriculado para conservar la garantía." }],
  },
  Químicos: {
    faq: [{ q: "¿Cómo debo almacenarlo?", a: "En un lugar fresco, seco y ventilado, fuera del alcance de niños y lejos de otros productos químicos." }],
  },
}

const WARRANTY_TEXT =
  "Todos nuestros productos cuentan con garantía oficial de la marca. Ante cualquier falla, nuestro equipo de soporte gestiona la revisión con el servicio técnico autorizado."

const all = rawDetails as unknown as Record<string, Raw>

export function getProductDetails(product: Product): ProductDetails {
  const own = all[product.slug] ?? {}
  const category = product.breadcrumb[product.breadcrumb.length - 1] ?? ""
  const defaults = CATEGORY_DEFAULTS[category]

  const basic: SpecGroup = {
    group: "Información general",
    items: [
      { label: "Marca", value: product.brand },
      { label: "Categoría", value: category },
      { label: "Accionamiento", value: product.drive ?? "" },
      { label: "Código", value: product.sku },
    ].filter((i) => i.value),
  }

  return {
    description: own.description?.length ? own.description : own.shortDescription ? [own.shortDescription] : [],
    sections: own.sections ?? [],
    includes: own.includes ?? [],
    notIncluded: own.notIncluded ?? [],
    tips: own.tips ?? [],
    featureBlocks: own.featureBlocks ?? [],
    specs: [...(own.specs ?? []), basic],
    faq: [...(own.faq ?? []), ...(defaults?.faq ?? []), ...GENERIC_FAQ],
    warrantyMonths: own.warrantyMonths ?? defaults?.warrantyMonths ?? null,
    warrantyText: own.warrantyText ?? WARRANTY_TEXT,
  }
}
