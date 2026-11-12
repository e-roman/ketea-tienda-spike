// ============================================================
// PRODUCT DATA — Tienda Orali
// Fuente: pastasorali.com — catálogo completo
// ============================================================

export type Category =
  | "pastas-frescas"
  | "tapas-empanadas"
  | "oralitas"
  | "linea-verde"
  | "linea-sin-gluten"
  | "linea-sin-sal"
  | "texturizado-soja"
  | "linea-premium"
  | "alta-cocina"
  | "productos-especiales"
  | "precio-de-fabrica"

export type Badge = "vegano" | "vegetariano" | "sin-tacc" | "integral" | "premium" | "apto-freezer" | "congelado" | "sin-sal"

// Etiquetas de los badges dietarios — usadas en product-card.tsx y en la PDP
// (productos/[slug]/page.tsx). El estilo vive en components/ui/badge.tsx.
export const BADGE_STYLES: Record<Badge, { label: string }> = {
  vegano:        { label: "Vegano" },
  vegetariano:   { label: "Vegetariano" },
  "sin-tacc":    { label: "Sin TACC" },
  integral:      { label: "Integral" },
  premium:       { label: "Premium" },
  "apto-freezer":{ label: "Apto freezer" },
  congelado:     { label: "Congelado" },
  "sin-sal":     { label: "Sin sal" },
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
}

const IMG = "https://pastasorali.com/images/productos"

export const products: Product[] = [

  // ── PASTAS FRESCAS ────────────────────────────────────────────────────────

  {
    id: "ravioles-ricota-500",
    slug: "ravioles-ricota-500",
    name: "Ravioles de Ricota",
    shortName: "Ravioles de Ricota",
    description: "Pasteurizados, envasados en atmósfera modificada. Vida útil 45 días. Producto refrigerado.",
    image: `${IMG}/13.jpg`,
    priceUnit: 4200, priceX3: 12600,
    packInfo: "500 g",
    categories: ["pastas-frescas"],
    badges: ["apto-freezer", "vegetariano"],
    featured: true, inStock: true,
    onSale: true, originalPriceX3: 14900,
    ingredients: "Harina de trigo (GLUTEN), agua, huevos frescos, sal. Relleno: ricota (leche entera, sal), huevos frescos, sal, nuez moscada.",
    conservation: "Conservar refrigerado entre 0 °C y 4 °C. Consumir dentro de los 5 días de elaborado. Apto para freezar hasta 3 meses.",
    nutritionTable: {
      portion: "100 g",
      rows: [
        { label: "Valor energético",  value: "248 kcal / 1037 kJ" },
        { label: "Carbohidratos",     value: "35 g" },
        { label: "Proteínas",         value: "11 g" },
        { label: "Grasas totales",    value: "7 g" },
        { label: "Grasas saturadas",  value: "3 g" },
        { label: "Grasas trans",      value: "0 g" },
        { label: "Fibra alimentaria", value: "1,5 g" },
        { label: "Sodio",             value: "420 mg" },
      ],
    },
    legalWarnings: ["EXCESO EN SODIO"],
  },
  {
    id: "ravioles-ricota-1kg",
    slug: "ravioles-ricota-1kg",
    name: "Ravioles de Ricota 1 kg",
    shortName: "Ravioles Ricota 1 kg",
    description: "Pasteurizados, envasados en atmósfera modificada. Vida útil 45 días. Formato familiar.",
    image: `${IMG}/95.jpg`,
    priceUnit: 7800, priceX3: 23400,
    packInfo: "1 kg",
    categories: ["pastas-frescas"],
    badges: ["apto-freezer", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "ravioles-pollo-500",
    slug: "ravioles-pollo-500",
    name: "Ravioles de Pollo",
    shortName: "Ravioles de Pollo",
    description: "Relleno de pollo tierno con vegetales y especias. Pasteurizados, envasados en atmósfera modificada. Vida útil 45 días.",
    image: `${IMG}/12.jpg`,
    priceUnit: 4200, priceX3: 12600,
    packInfo: "500 g",
    categories: ["pastas-frescas"],
    badges: ["apto-freezer"],
    featured: true, inStock: true,
  },
  {
    id: "ravioles-pollo-1kg",
    slug: "ravioles-pollo-1kg",
    name: "Ravioles de Pollo 1 kg",
    shortName: "Ravioles Pollo 1 kg",
    description: "Relleno de pollo tierno con vegetales y especias. Formato familiar 1 kg.",
    image: `${IMG}/100.jpg`,
    priceUnit: 7800, priceX3: 23400,
    packInfo: "1 kg",
    categories: ["pastas-frescas"],
    badges: ["apto-freezer"],
    featured: false, inStock: true,
  },
  {
    id: "ravioles-espinaca-500",
    slug: "ravioles-espinaca-500",
    name: "Ravioles de Espinaca",
    shortName: "Ravioles de Espinaca",
    description: "Masa al huevo con relleno de espinaca fresca seleccionada. Pasteurizados, envasados en atmósfera modificada. Vida útil 45 días.",
    image: `${IMG}/3.jpg`,
    priceUnit: 4200, priceX3: 12600,
    packInfo: "500 g",
    categories: ["pastas-frescas"],
    badges: ["apto-freezer", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "ravioles-espinaca-1kg",
    slug: "ravioles-espinaca-1kg",
    name: "Ravioles de Espinaca 1 kg",
    shortName: "Ravioles Espinaca 1 kg",
    description: "Masa al huevo con relleno de espinaca fresca. Formato familiar 1 kg.",
    image: `${IMG}/99.jpg`,
    priceUnit: 7800, priceX3: 23400,
    packInfo: "1 kg",
    categories: ["pastas-frescas"],
    badges: ["apto-freezer", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "ravioles-carne-espinaca-500",
    slug: "ravioles-carne-espinaca-500",
    name: "Ravioles de Carne y Espinaca",
    shortName: "Ravioles Carne y Espinaca",
    description: "Combinación clásica de carne magra y espinaca fresca. El favorito de siempre. Pasteurizados, vida útil 45 días.",
    image: `${IMG}/15.jpg`,
    priceUnit: 4200, priceX3: 12600,
    packInfo: "500 g",
    categories: ["pastas-frescas"],
    badges: ["apto-freezer"],
    featured: true, inStock: true,
  },
  {
    id: "ravioles-carne-espinaca-1kg",
    slug: "ravioles-carne-espinaca-1kg",
    name: "Ravioles de Carne y Espinaca 1 kg",
    shortName: "Ravioles Carne y Espinaca 1 kg",
    description: "Combinación clásica de carne y espinaca. Formato familiar 1 kg.",
    image: `${IMG}/94.jpg`,
    priceUnit: 7800, priceX3: 23400,
    packInfo: "1 kg",
    categories: ["pastas-frescas"],
    badges: ["apto-freezer"],
    featured: false, inStock: true,
  },
  {
    id: "ravioles-cuatro-quesos-500",
    slug: "ravioles-cuatro-quesos-500",
    name: "Ravioles Cuatro Quesos",
    shortName: "Ravioles 4 Quesos",
    description: "Blend de cuatro quesos seleccionados en masa fresca al huevo. Sabor intenso y cremoso. Vida útil 45 días.",
    image: `${IMG}/102.jpg`,
    priceUnit: 4200, priceX3: 12600,
    packInfo: "500 g",
    categories: ["pastas-frescas"],
    badges: ["apto-freezer", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "ravioles-cuatro-quesos-1kg",
    slug: "ravioles-cuatro-quesos-1kg",
    name: "Ravioles Cuatro Quesos 1 kg",
    shortName: "Ravioles 4 Quesos 1 kg",
    description: "Blend de cuatro quesos seleccionados. Formato familiar 1 kg.",
    image: `${IMG}/103.jpg`,
    priceUnit: 7800, priceX3: 23400,
    packInfo: "1 kg",
    categories: ["pastas-frescas"],
    badges: ["apto-freezer", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "capellettis-carne-espinaca",
    slug: "capellettis-carne-espinaca",
    name: "Capellettis de Carne y Espinaca",
    shortName: "Capellettis Carne y Espinaca",
    description: "Pasta rellena en forma de sombrero. Carne y espinaca frescos. Pasteurizados, vida útil 45 días.",
    image: `${IMG}/36.jpg`,
    priceUnit: 4500, priceX3: 13500,
    packInfo: "500 g",
    categories: ["pastas-frescas"],
    badges: ["apto-freezer"],
    featured: false, inStock: true,
  },
  {
    id: "fettuccine",
    slug: "fettuccine",
    name: "Fettuccine",
    shortName: "Fettuccine",
    description: "Fino, ancho o mediano. Fettuccine fresco al huevo. Versátil y perfecto con salsas de manteca, crema o boloñesa. Vida útil 45 días.",
    image: `${IMG}/16.jpg`,
    priceUnit: 2200, priceX3: 6600,
    packInfo: "500 g",
    categories: ["pastas-frescas"],
    badges: ["apto-freezer", "vegetariano"],
    featured: true, inStock: true,
  },
  {
    id: "noquis-semola-500",
    slug: "noquis-semola-500",
    name: "Ñoquis de Sémola",
    shortName: "Ñoquis de Sémola",
    description: "Artesanales, elaborados con sémola seleccionada. Vida útil 45 días. Producto refrigerado.",
    image: `${IMG}/17.jpg`,
    priceUnit: 2500, priceX3: 7500,
    packInfo: "500 g",
    categories: ["pastas-frescas"],
    badges: ["apto-freezer", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "noquis-semola-1kg",
    slug: "noquis-semola-1kg",
    name: "Ñoquis de Sémola 1 kg",
    shortName: "Ñoquis Sémola 1 kg",
    description: "Artesanales elaborados con sémola seleccionada. Formato familiar 1 kg.",
    image: `${IMG}/101.jpg`,
    priceUnit: 4600, priceX3: 13800,
    packInfo: "1 kg",
    categories: ["pastas-frescas"],
    badges: ["apto-freezer", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "sorrentinos-calabaza-muzzarella",
    slug: "sorrentinos-calabaza-muzzarella",
    name: "Sorrentinos Calabaza y Muzzarella",
    shortName: "Sorrentinos Calabaza",
    description: "Pasta rellena grande con calabaza y muzzarella. Pasteurizados, vida útil 45 días.",
    image: `${IMG}/132.jpg`,
    priceUnit: 5200, priceX3: 15600,
    packInfo: "500 g",
    categories: ["pastas-frescas"],
    badges: ["apto-freezer", "vegetariano"],
    featured: true, inStock: true,
    onSale: true, originalPriceX3: 18400,
  },
  {
    id: "sorrentinos-cuatro-quesos",
    slug: "sorrentinos-cuatro-quesos",
    name: "Sorrentinos Cuatro Quesos",
    shortName: "Sorrentinos 4 Quesos",
    description: "Pasta rellena grande con blend de cuatro quesos. Pasteurizados, vida útil 45 días.",
    image: `${IMG}/133.jpg`,
    priceUnit: 5200, priceX3: 15600,
    packInfo: "500 g",
    categories: ["pastas-frescas"],
    badges: ["apto-freezer", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "sorrentinos-ricota-espinaca",
    slug: "sorrentinos-ricota-espinaca",
    name: "Sorrentinos Ricota y Espinaca",
    shortName: "Sorrentinos Ricota y Espinaca",
    description: "Pasta rellena grande con ricota y espinaca fresca. Pasteurizados, vida útil 45 días.",
    image: `${IMG}/134.jpg`,
    priceUnit: 5200, priceX3: 15600,
    packInfo: "500 g",
    categories: ["pastas-frescas"],
    badges: ["apto-freezer", "vegetariano"],
    featured: false, inStock: true,
  },

  // ── TAPAS PARA EMPANADAS Y PASCUALINAS ───────────────────────────────────

  {
    id: "tapas-criolla-15u",
    slug: "tapas-criolla-15u",
    name: "Tapas para Empanadas Criolla",
    shortName: "Tapas Criolla",
    description: "Clásicas tapas criollas para empanadas al horno o fritas. Diámetro 12 cm. Vida útil 42 días.",
    image: `${IMG}/18.jpg`,
    priceUnit: 1700, priceX3: 5100,
    packInfo: "375 g · 15 unidades",
    categories: ["tapas-empanadas"],
    badges: ["vegetariano"],
    featured: true, inStock: true,
    ingredients: "Harina de trigo (GLUTEN), agua, grasa vacuna, sal.",
    conservation: "Conservar refrigerado entre 0 °C y 4 °C. Consumir dentro de los 5 días de elaborado. Apto para freezar hasta 2 meses.",
    nutritionTable: {
      portion: "100 g",
      rows: [
        { label: "Valor energético",  value: "320 kcal / 1340 kJ" },
        { label: "Carbohidratos",     value: "48 g" },
        { label: "Proteínas",         value: "8 g" },
        { label: "Grasas totales",    value: "10 g" },
        { label: "Grasas saturadas",  value: "4,5 g" },
        { label: "Grasas trans",      value: "0 g" },
        { label: "Fibra alimentaria", value: "1,5 g" },
        { label: "Sodio",             value: "510 mg" },
      ],
    },
    legalWarnings: ["EXCESO EN SODIO"],
  },
  {
    id: "tapas-hojaldre-12u",
    slug: "tapas-hojaldre-12u",
    name: "Tapas para Empanadas Hojaldre",
    shortName: "Tapas Hojaldre",
    description: "Masa de hojaldre artesanal que se infla al horno. Para empanadas crujientes por fuera y tiernas por dentro. Diámetro 12 cm. Vida útil 42 días.",
    image: `${IMG}/19.jpg`,
    priceUnit: 1700, priceX3: 5100,
    packInfo: "330 g · 12 unidades",
    categories: ["tapas-empanadas"],
    badges: ["vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "tapas-freir-12u",
    slug: "tapas-freir-12u",
    name: "Tapas para Empanadas para Freír",
    shortName: "Tapas para Freír",
    description: "Especiales para frituras. Diámetro 12 cm. Vida útil 42 días. Producto refrigerado.",
    image: `${IMG}/20.jpg`,
    priceUnit: 1700, priceX3: 5100,
    packInfo: "330 g · 12 unidades",
    categories: ["tapas-empanadas"],
    badges: ["vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "tapas-pascualina-criolla",
    slug: "tapas-pascualina-criolla",
    name: "Tapas para Pascualina Criolla",
    shortName: "Pascualina Criolla",
    description: "Tapas criollas para armar pascualinas y tartas caseras. Diámetro 30 cm. 2 tapas por envase. Vida útil 42 días.",
    image: `${IMG}/29.jpg`,
    priceUnit: 2000, priceX3: 6000,
    packInfo: "380 g · 2 unidades",
    categories: ["tapas-empanadas"],
    badges: ["vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "tapas-pascualina-hojaldre",
    slug: "tapas-pascualina-hojaldre",
    name: "Tapas para Pascualina Hojaldre",
    shortName: "Pascualina Hojaldre",
    description: "Hojaldre para pascualinas y tartas crujientes. Diámetro 30 cm. 2 tapas por envase. Vida útil 42 días.",
    image: `${IMG}/30.jpg`,
    priceUnit: 2200, priceX3: 6600,
    packInfo: "400 g · 2 unidades",
    categories: ["tapas-empanadas"],
    badges: ["vegetariano"],
    featured: true, inStock: true,
    onSale: true, originalPriceX3: 7800,
  },
  {
    id: "tapas-pascualina-individual",
    slug: "tapas-pascualina-individual",
    name: "Tapas para Pascualinas Individuales",
    shortName: "Pascualina Individual",
    description: "Tapas para pascualinas individuales. Diámetro 22 cm. 2 tapas por envase. Vida útil 42 días.",
    image: `${IMG}/106.jpg`,
    priceUnit: 1800, priceX3: 5400,
    packInfo: "260 g · 2 unidades",
    categories: ["tapas-empanadas"],
    badges: ["vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "tapas-pastelitos-criolla",
    slug: "tapas-pastelitos-criolla",
    name: "Tapas para Pastelitos Criolla",
    shortName: "Pastelitos Criolla",
    description: "El tamaño perfecto para pastelitos. Medida 9x9 cm. 12 unidades. Vida útil 42 días.",
    image: `${IMG}/27.jpg`,
    priceUnit: 1500, priceX3: 4500,
    packInfo: "165 g · 12 unidades",
    categories: ["tapas-empanadas"],
    badges: ["vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "tapas-pastelitos-hojaldre",
    slug: "tapas-pastelitos-hojaldre",
    name: "Tapas para Pastelitos Hojaldre",
    shortName: "Pastelitos Hojaldre",
    description: "Hojaldre para pastelitos crujientes. Medida 9x9 cm. 12 unidades. Vida útil 42 días.",
    image: `${IMG}/28.jpg`,
    priceUnit: 1600, priceX3: 4800,
    packInfo: "200 g · 12 unidades",
    categories: ["tapas-empanadas"],
    badges: ["vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "tapas-copetin-criolla",
    slug: "tapas-copetin-criolla",
    name: "Tapas para Copetín Criolla",
    shortName: "Copetín Criolla",
    description: "Bocados mini para el copetín. Diámetro 9 cm. 12 unidades. Vida útil 42 días.",
    image: `${IMG}/25.jpg`,
    priceUnit: 1300, priceX3: 3900,
    packInfo: "165 g · 12 unidades",
    categories: ["tapas-empanadas"],
    badges: ["vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "tapas-copetin-hojaldre",
    slug: "tapas-copetin-hojaldre",
    name: "Tapas para Copetín Hojaldre",
    shortName: "Copetín Hojaldre",
    description: "Bocados mini en masa hojaldre para el copetín. Diámetro 9 cm. 12 unidades. Vida útil 42 días.",
    image: `${IMG}/26.jpg`,
    priceUnit: 1400, priceX3: 4200,
    packInfo: "190 g · 12 unidades",
    categories: ["tapas-empanadas"],
    badges: ["vegetariano"],
    featured: false, inStock: true,
  },

  // ── ORALITAS ─────────────────────────────────────────────────────────────

  {
    id: "oralitas-clasicas",
    slug: "oralitas-clasicas",
    name: "Oralitas Clásicas",
    shortName: "Oralitas Clásicas",
    description: "Tortillas de trigo artesanales, suaves y versátiles. Ideales para wraps, burritos o acompañar. 6 unidades. Vida útil 45 días.",
    image: `${IMG}/52.jpg`,
    priceUnit: 1600, priceX3: 4800,
    packInfo: "220 g · 6 unidades",
    categories: ["oralitas"],
    badges: ["vegetariano"],
    featured: true, inStock: true,
    onSale: true, originalPriceX3: 5700,
  },
  {
    id: "oralitas-integrales",
    slug: "oralitas-integrales",
    name: "Oralitas Integrales",
    shortName: "Oralitas Integrales",
    description: "Tortilla con harina integral. Más fibra, mismo sabor artesanal. 6 unidades. Vida útil 45 días.",
    image: `${IMG}/53.jpg`,
    priceUnit: 1700, priceX3: 5100,
    packInfo: "220 g · 6 unidades",
    categories: ["oralitas"],
    badges: ["integral", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "oralitas-cheddar",
    slug: "oralitas-cheddar",
    name: "Oralitas Sabor Cheddar",
    shortName: "Oralitas Cheddar",
    description: "Tortillas con sabor a cheddar. Para los amantes del queso. 6 unidades. Vida útil 45 días.",
    image: `${IMG}/81.jpg`,
    priceUnit: 1700, priceX3: 5100,
    packInfo: "220 g · 6 unidades",
    categories: ["oralitas"],
    badges: ["vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "oralitas-pizza",
    slug: "oralitas-pizza",
    name: "Oralitas Pizza",
    shortName: "Oralitas Pizza",
    description: "Tortillas sabor pizza. Una opción original para snacks y comidas rápidas. 6 unidades. Vida útil 45 días.",
    image: `${IMG}/82.jpg`,
    priceUnit: 1700, priceX3: 5100,
    packInfo: "220 g · 6 unidades",
    categories: ["oralitas"],
    badges: ["vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "oralitas-espinaca",
    slug: "oralitas-espinaca",
    name: "Oralitas de Espinaca",
    shortName: "Oralitas Espinaca",
    description: "Tortillas verdes con espinaca. Coloridas y sabrosas. 6 unidades. Vida útil 45 días.",
    image: `${IMG}/98.jpg`,
    priceUnit: 1700, priceX3: 5100,
    packInfo: "220 g · 6 unidades",
    categories: ["oralitas"],
    badges: ["vegetariano"],
    featured: false, inStock: true,
  },

  // ── LÍNEA VERDE | APTO VEGANO ─────────────────────────────────────────────

  {
    id: "verde-ravioles-espinaca",
    slug: "verde-ravioles-espinaca",
    name: "Ravioles de Espinaca Línea Verde",
    shortName: "Ravioles Espinaca Verde",
    description: "Elaborados con harina integral orgánica, sal del Himalaya y espinaca agroecológica. 100% vegano. Pasteurizados, vida útil 45 días.",
    image: `${IMG}/54.jpg`,
    priceUnit: 3800, priceX3: 11400,
    packInfo: "500 g",
    categories: ["linea-verde"],
    badges: ["vegano", "integral", "apto-freezer", "vegetariano"],
    featured: true, inStock: true,
    onSale: true, originalPriceX3: 13500,
    ingredients: "Harina de trigo integral orgánica (GLUTEN), agua, sal del Himalaya. Relleno: espinaca agroecológica, cebolla, ajo, sal del Himalaya.",
    conservation: "Conservar refrigerado entre 0 °C y 4 °C. Consumir dentro de los 5 días. Apto freezar hasta 3 meses.",
    nutritionTable: {
      portion: "100 g",
      rows: [
        { label: "Valor energético",  value: "210 kcal / 879 kJ" },
        { label: "Carbohidratos",     value: "38 g" },
        { label: "Proteínas",         value: "7 g" },
        { label: "Grasas totales",    value: "2,5 g" },
        { label: "Grasas saturadas",  value: "0,4 g" },
        { label: "Grasas trans",      value: "0 g" },
        { label: "Fibra alimentaria", value: "4 g" },
        { label: "Sodio",             value: "290 mg" },
      ],
    },
    legalWarnings: [],
  },
  {
    id: "verde-ravioles-calabaza-tofu",
    slug: "verde-ravioles-calabaza-tofu",
    name: "Ravioles de Calabaza y Tofu",
    shortName: "Ravioles Calabaza y Tofu",
    description: "Harina integral orgánica, sal del Himalaya y verduras agroecológicas. Relleno de calabaza y tofu sedoso. 100% vegano.",
    image: `${IMG}/55.jpg`,
    priceUnit: 3800, priceX3: 11400,
    packInfo: "500 g",
    categories: ["linea-verde"],
    badges: ["vegano", "integral", "apto-freezer", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "verde-ravioles-remolacha-tofu",
    slug: "verde-ravioles-remolacha-tofu",
    name: "Ravioles de Remolacha y Tofu",
    shortName: "Ravioles Remolacha y Tofu",
    description: "Masa teñida naturalmente con remolacha. Relleno de tofu sedoso y vegetales agroecológicos. 100% vegano.",
    image: `${IMG}/56.jpg`,
    priceUnit: 3800, priceX3: 11400,
    packInfo: "500 g",
    categories: ["linea-verde"],
    badges: ["vegano", "integral", "apto-freezer", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "verde-ravioles-soja",
    slug: "verde-ravioles-soja",
    name: "Ravioles de Texturizado de Soja",
    shortName: "Ravioles de Soja",
    description: "Proteína vegetal de alto valor nutritivo. Harina integral orgánica y verdura agroecológica. 100% vegano.",
    image: `${IMG}/57.jpg`,
    priceUnit: 3800, priceX3: 11400,
    packInfo: "500 g",
    categories: ["linea-verde"],
    badges: ["vegano", "integral", "apto-freezer", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "verde-fettuccine-integral",
    slug: "verde-fettuccine-integral",
    name: "Fettuccine Integrales",
    shortName: "Fettuccine Integral",
    description: "Fettuccine mediano con harina integral orgánica y sal del Himalaya. Más fibra, mismo sabor artesanal. Vegano.",
    image: `${IMG}/58.jpg`,
    priceUnit: 3200, priceX3: 9600,
    packInfo: "500 g",
    categories: ["linea-verde"],
    badges: ["vegano", "integral", "apto-freezer", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "verde-tapas-mix-semillas-12u",
    slug: "verde-tapas-mix-semillas-12u",
    name: "Tapas para Empanadas Mix de Semillas",
    shortName: "Tapas Mix Semillas",
    description: "Harina integral orgánica y sal del Himalaya con chía, lino y avena arrollada. Diámetro 12 cm. Vegano.",
    image: `${IMG}/45.jpg`,
    priceUnit: 2500, priceX3: 7500,
    packInfo: "420 g · 12 unidades",
    categories: ["linea-verde", "tapas-empanadas"],
    badges: ["vegano", "integral", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "verde-tapas-pascualina-semillas",
    slug: "verde-tapas-pascualina-semillas",
    name: "Tapas para Pascualinas Mix de Semillas",
    shortName: "Pascualina Mix Semillas",
    description: "Harina integral orgánica con chía, lino y avena. Diámetro 30 cm. 2 tapas por envase. Vegano.",
    image: `${IMG}/46.jpg`,
    priceUnit: 2700, priceX3: 8100,
    packInfo: "500 g · 2 unidades",
    categories: ["linea-verde", "tapas-empanadas"],
    badges: ["vegano", "integral", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "verde-tapas-pascualina-semillas-ind",
    slug: "verde-tapas-pascualina-semillas-ind",
    name: "Tapas para Pascualinas Individuales Mix Semillas",
    shortName: "Pascualina Individual Semillas",
    description: "Harina integral orgánica con chía, lino y avena. Diámetro 22 cm. 2 tapas por envase. Vegano.",
    image: `${IMG}/97.jpg`,
    priceUnit: 2200, priceX3: 6600,
    packInfo: "260 g · 2 unidades",
    categories: ["linea-verde", "tapas-empanadas"],
    badges: ["vegano", "integral", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "verde-oralitas-sarraceno-zanahoria",
    slug: "verde-oralitas-sarraceno-zanahoria",
    name: "Oralitas Trigo Sarraceno y Zanahoria",
    shortName: "Oralitas Sarraceno",
    description: "Tortillas artesanales de trigo sarraceno y zanahoria. 6 unidades. Vida útil 45 días.",
    image: `${IMG}/123.jpg`,
    priceUnit: 1900, priceX3: 5700,
    packInfo: "220 g · 6 unidades",
    categories: ["linea-verde", "oralitas"],
    badges: ["vegano", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "verde-oralitas-trigo-arvejas",
    slug: "verde-oralitas-trigo-arvejas",
    name: "Oralitas Trigo y Arvejas",
    shortName: "Oralitas Trigo Arvejas",
    description: "Tortillas artesanales de trigo y arvejas. 6 unidades. Vida útil 45 días.",
    image: `${IMG}/124.jpg`,
    priceUnit: 1900, priceX3: 5700,
    packInfo: "220 g · 6 unidades",
    categories: ["linea-verde", "oralitas"],
    badges: ["vegano", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "verde-oralitas-trigo-avena",
    slug: "verde-oralitas-trigo-avena",
    name: "Oralitas Trigo y Avena",
    shortName: "Oralitas Trigo Avena",
    description: "Tortillas artesanales de trigo y avena. 6 unidades. Vida útil 45 días.",
    image: `${IMG}/125.jpg`,
    priceUnit: 1900, priceX3: 5700,
    packInfo: "220 g · 6 unidades",
    categories: ["linea-verde", "oralitas"],
    badges: ["vegano", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "verde-emp-lentejas",
    slug: "verde-emp-lentejas",
    name: "Empanadas Rellenas de Lentejas",
    shortName: "Empanadas Lentejas",
    description: "Elaboradas con harina integral orgánica, lentejas seleccionadas y verdura agroecológica. 4 unidades por caja. Vida útil 12 meses freezadas.",
    image: `${IMG}/116.jpg`,
    priceUnit: 4600, priceX3: 13800,
    packInfo: "320 g · 4 unidades",
    categories: ["linea-verde"],
    badges: ["vegano", "integral", "congelado", "vegetariano"],
    featured: true, inStock: true,
  },
  {
    id: "verde-emp-calabaza",
    slug: "verde-emp-calabaza",
    name: "Empanadas Rellenas de Calabaza",
    shortName: "Empanadas Calabaza",
    description: "Calabaza asada con verduras agroecológicas. 4 unidades. Vida útil 12 meses freezadas.",
    image: `${IMG}/117.jpg`,
    priceUnit: 4600, priceX3: 13800,
    packInfo: "320 g · 4 unidades",
    categories: ["linea-verde"],
    badges: ["vegano", "integral", "congelado", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "verde-emp-vegetales",
    slug: "verde-emp-vegetales",
    name: "Empanadas Rellenas de Vegetales",
    shortName: "Empanadas Vegetales",
    description: "Mix de vegetales agroecológicos seleccionados. 4 unidades. Vida útil 12 meses freezadas.",
    image: `${IMG}/118.jpg`,
    priceUnit: 4600, priceX3: 13800,
    packInfo: "320 g · 4 unidades",
    categories: ["linea-verde"],
    badges: ["vegano", "integral", "congelado", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "verde-emp-soja",
    slug: "verde-emp-soja",
    name: "Empanadas Rellenas de Soja",
    shortName: "Empanadas Soja",
    description: "Rellenas de texturizado de soja. 4 unidades. Vida útil 12 meses freezadas.",
    image: `${IMG}/119.jpg`,
    priceUnit: 4600, priceX3: 13800,
    packInfo: "320 g · 4 unidades",
    categories: ["linea-verde"],
    badges: ["vegano", "congelado", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "verde-emp-humita",
    slug: "verde-emp-humita",
    name: "Empanadas Rellenas de Humita",
    shortName: "Empanadas Humita",
    description: "Vegetales agroecológicos y lácteos tandilenses. Sabor tradicional del norte. 4 unidades. Vida útil 12 meses freezadas.",
    image: `${IMG}/120.jpg`,
    priceUnit: 4600, priceX3: 13800,
    packInfo: "320 g · 4 unidades",
    categories: ["linea-verde"],
    badges: ["vegano", "congelado", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "verde-emp-berenjena",
    slug: "verde-emp-berenjena",
    name: "Empanadas Rellenas de Berenjena",
    shortName: "Empanadas Berenjena",
    description: "Berenjena con vegetales agroecológicos. 4 unidades. Vida útil 12 meses freezadas.",
    image: `${IMG}/122.jpg`,
    priceUnit: 4600, priceX3: 13800,
    packInfo: "320 g · 4 unidades",
    categories: ["linea-verde"],
    badges: ["vegano", "congelado", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "verde-emp-soja-picante",
    slug: "verde-emp-soja-picante",
    name: "Empanadas Rellenas de Soja Picante",
    shortName: "Empanadas Soja Picante",
    description: "Texturizado de soja con toque picante. 4 unidades. Vida útil 12 meses freezadas.",
    image: `${IMG}/121.jpg`,
    priceUnit: 4600, priceX3: 13800,
    packInfo: "320 g · 4 unidades",
    categories: ["linea-verde"],
    badges: ["vegano", "congelado", "vegetariano"],
    featured: false, inStock: true,
  },

  // ── LÍNEA SIN GLUTEN ─────────────────────────────────────────────────────

  {
    id: "sg-tapas-empanadas",
    slug: "sg-tapas-empanadas",
    name: "Tapas para Empanadas Sin Gluten",
    shortName: "Tapas Empanadas Sin Gluten",
    description: "Alimento libre de gluten. Establecimiento con buenas prácticas de manufactura. Diámetro 12 cm. 12 unidades.",
    image: `${IMG}/71.jpg`,
    priceUnit: 2800, priceX3: 8400,
    packInfo: "330 g · 12 unidades",
    categories: ["linea-sin-gluten", "tapas-empanadas"],
    badges: ["sin-tacc", "vegetariano"],
    featured: true, inStock: true,
  },
  {
    id: "sg-tapas-rotiseras",
    slug: "sg-tapas-rotiseras",
    name: "Tapas Rotiseras Sin Gluten",
    shortName: "Tapas Rotiseras Sin Gluten",
    description: "Tapas grandes libres de gluten. Diámetro 14 cm. 12 unidades.",
    image: `${IMG}/75.jpg`,
    priceUnit: 3400, priceX3: 10200,
    packInfo: "460 g · 12 unidades",
    categories: ["linea-sin-gluten", "tapas-empanadas"],
    badges: ["sin-tacc", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "sg-tapas-pascualinas",
    slug: "sg-tapas-pascualinas",
    name: "Tapas para Pascualinas Sin Gluten",
    shortName: "Pascualinas Sin Gluten",
    description: "Tapas para pascualinas libres de gluten. Diámetro 30 cm. 2 unidades.",
    image: `${IMG}/76.jpg`,
    priceUnit: 3000, priceX3: 9000,
    packInfo: "380 g · 2 unidades",
    categories: ["linea-sin-gluten", "tapas-empanadas"],
    badges: ["sin-tacc", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "sg-noquis-espinaca",
    slug: "sg-noquis-espinaca",
    name: "Ñoquis de Espinaca Sin Gluten",
    shortName: "Ñoquis Espinaca Sin Gluten",
    description: "Ñoquis de espinaca libres de gluten. Apto vegano. Vida útil 12 meses freezados. Producto congelado.",
    image: `${IMG}/105.jpg`,
    priceUnit: 3800, priceX3: 11400,
    packInfo: "500 g",
    categories: ["linea-sin-gluten"],
    badges: ["sin-tacc", "vegano", "congelado", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "sg-noquis-papa",
    slug: "sg-noquis-papa",
    name: "Ñoquis de Papa Sin Gluten",
    shortName: "Ñoquis Papa Sin Gluten",
    description: "Ñoquis de papa libres de gluten. Apto vegano. Vida útil 12 meses freezados. Producto congelado.",
    image: `${IMG}/104.jpg`,
    priceUnit: 3800, priceX3: 11400,
    packInfo: "500 g",
    categories: ["linea-sin-gluten"],
    badges: ["sin-tacc", "vegano", "congelado", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "miel-optima-liquida",
    slug: "miel-optima-liquida",
    name: "Miel Óptima Líquida",
    shortName: "Miel Líquida",
    description: "Miel de abeja pura. Producto sin gluten. Vida útil 12 meses. Producto seco.",
    image: `${IMG}/84.jpg`,
    priceUnit: 4500, priceX3: 13500,
    packInfo: "500 g",
    categories: ["linea-sin-gluten"],
    badges: ["sin-tacc", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "miel-optima-cremosa",
    slug: "miel-optima-cremosa",
    name: "Miel Óptima Cremosa",
    shortName: "Miel Cremosa",
    description: "Miel de abeja cremosa. Producto sin gluten. Vida útil 12 meses. Producto seco.",
    image: `${IMG}/85.jpg`,
    priceUnit: 4500, priceX3: 13500,
    packInfo: "500 g",
    categories: ["linea-sin-gluten"],
    badges: ["sin-tacc", "vegetariano"],
    featured: false, inStock: true,
  },

  // ── LÍNEA SIN SAL ─────────────────────────────────────────────────────────

  {
    id: "ss-tapas-empanadas",
    slug: "ss-tapas-empanadas",
    name: "Tapas para Empanadas Criolla Sin Sal",
    shortName: "Tapas Criolla Sin Sal",
    description: "Una alternativa pensada para dietas bajas en sodio. Diámetro 12 cm. 12 unidades. Vida útil 42 días.",
    image: `${IMG}/135.jpg`,
    priceUnit: 1900, priceX3: 5700,
    packInfo: "330 g · 12 unidades",
    categories: ["linea-sin-sal", "tapas-empanadas"],
    badges: ["sin-sal", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "ss-tapas-pascualinas",
    slug: "ss-tapas-pascualinas",
    name: "Tapas para Pascualinas Criollas Sin Sal",
    shortName: "Pascualinas Sin Sal",
    description: "Tapas para pascualinas sin sal. Diámetro 30 cm. 2 unidades. Vida útil 42 días.",
    image: `${IMG}/136.jpg`,
    priceUnit: 2100, priceX3: 6300,
    packInfo: "380 g · 2 unidades",
    categories: ["linea-sin-sal", "tapas-empanadas"],
    badges: ["sin-sal", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "ss-oralitas",
    slug: "ss-oralitas",
    name: "Oralitas Tortillas Sin Sal",
    shortName: "Oralitas Sin Sal",
    description: "Tortillas artesanales sin sal añadida. 6 unidades. Vida útil 45 días.",
    image: `${IMG}/137.jpg`,
    priceUnit: 1800, priceX3: 5400,
    packInfo: "220 g · 6 unidades",
    categories: ["linea-sin-sal", "oralitas"],
    badges: ["sin-sal", "vegetariano"],
    featured: false, inStock: true,
  },

  // ── TEXTURIZADO DE SOJA ───────────────────────────────────────────────────

  {
    id: "magia-carne-250",
    slug: "magia-carne-250",
    name: "Magia — Reemplaza Carne 250 g",
    shortName: "Magia Carne 250 g",
    description: "100% proteína vegetal. Ideal para reemplazar la carne en preparaciones. Producto seco. Vida útil 24 meses.",
    image: `${IMG}/90.jpg`,
    priceUnit: 2800, priceX3: 8400,
    packInfo: "250 g",
    categories: ["texturizado-soja"],
    badges: ["vegano", "vegetariano"],
    featured: true, inStock: true,
  },
  {
    id: "magia-carne-1kg",
    slug: "magia-carne-1kg",
    name: "Magia — Reemplaza Carne 1 kg",
    shortName: "Magia Carne 1 kg",
    description: "100% proteína vegetal. Ideal para reemplazar la carne. Formato familiar. Vida útil 24 meses.",
    image: `${IMG}/91.jpg`,
    priceUnit: 9500, priceX3: 28500,
    packInfo: "1 kg",
    categories: ["texturizado-soja"],
    badges: ["vegano", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "magia-pollo-250",
    slug: "magia-pollo-250",
    name: "Magia — Reemplaza Pollo 250 g",
    shortName: "Magia Pollo 250 g",
    description: "100% proteína vegetal. Ideal para reemplazar el pollo en preparaciones. Producto seco. Vida útil 24 meses.",
    image: `${IMG}/92.jpg`,
    priceUnit: 2800, priceX3: 8400,
    packInfo: "250 g",
    categories: ["texturizado-soja"],
    badges: ["vegano", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "magia-pollo-1kg",
    slug: "magia-pollo-1kg",
    name: "Magia — Reemplaza Pollo 1 kg",
    shortName: "Magia Pollo 1 kg",
    description: "100% proteína vegetal. Ideal para reemplazar el pollo. Formato familiar. Vida útil 24 meses.",
    image: `${IMG}/93.jpg`,
    priceUnit: 9500, priceX3: 28500,
    packInfo: "1 kg",
    categories: ["texturizado-soja"],
    badges: ["vegano", "vegetariano"],
    featured: false, inStock: true,
  },

  // ── LÍNEA PREMIUM ─────────────────────────────────────────────────────────

  {
    id: "premium-tapas-criolla",
    slug: "premium-tapas-criolla",
    name: "Tapas para Empanadas Criolla Premium",
    shortName: "Tapas Criolla Premium",
    description: "Mayor calidad artesanal. Diámetro 13 cm. Horno. 12 unidades. Vida útil 42 días.",
    image: `${IMG}/31.jpg`,
    priceUnit: 2200, priceX3: 6600,
    packInfo: "420 g · 12 unidades",
    categories: ["linea-premium", "tapas-empanadas"],
    badges: ["premium", "vegetariano"],
    featured: true, inStock: true,
  },
  {
    id: "premium-tapas-hojaldre",
    slug: "premium-tapas-hojaldre",
    name: "Tapas para Empanadas Hojaldre Premium",
    shortName: "Tapas Hojaldre Premium",
    description: "Hojaldre de mayor calidad artesanal. Diámetro 13 cm. Horno. 12 unidades. Vida útil 42 días.",
    image: `${IMG}/32.jpg`,
    priceUnit: 2200, priceX3: 6600,
    packInfo: "420 g · 12 unidades",
    categories: ["linea-premium", "tapas-empanadas"],
    badges: ["premium", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "premium-pascualina-criolla",
    slug: "premium-pascualina-criolla",
    name: "Tapas para Pascualina Criolla Premium",
    shortName: "Pascualina Criolla Premium",
    description: "Tapas para pascualinas de mayor tamaño y calidad artesanal. Diámetro 30 cm. 2 unidades.",
    image: `${IMG}/38.jpg`,
    priceUnit: 2500, priceX3: 7500,
    packInfo: "500 g · 2 unidades",
    categories: ["linea-premium", "tapas-empanadas"],
    badges: ["premium", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "premium-pascualina-hojaldre",
    slug: "premium-pascualina-hojaldre",
    name: "Tapas para Pascualina Hojaldre Premium",
    shortName: "Pascualina Hojaldre Premium",
    description: "Hojaldre premium para pascualinas. Diámetro 30 cm. 2 unidades. Vida útil 42 días.",
    image: `${IMG}/83.jpg`,
    priceUnit: 2500, priceX3: 7500,
    packInfo: "500 g · 2 unidades",
    categories: ["linea-premium", "tapas-empanadas"],
    badges: ["premium", "vegetariano"],
    featured: false, inStock: true,
  },

  // ── ALTA COCINA ───────────────────────────────────────────────────────────

  {
    id: "ac-rotiseras-criolla",
    slug: "ac-rotiseras-criolla",
    name: "Tapas Rotiseras Criolla Alta Cocina",
    shortName: "Rotiseras Criolla",
    description: "Tapas rotiseras de alta calidad. Diámetro 14 cm. Horno o freír. 12 unidades. Vida útil 42 días.",
    image: `${IMG}/47.jpg`,
    priceUnit: 3000, priceX3: 9000,
    packInfo: "625 g · 12 unidades",
    categories: ["alta-cocina", "tapas-empanadas"],
    badges: ["premium", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "ac-rotiseras-hojaldre",
    slug: "ac-rotiseras-hojaldre",
    name: "Tapas Rotiseras Hojaldre Alta Cocina",
    shortName: "Rotiseras Hojaldre",
    description: "Tapas rotiseras hojaldre de alta calidad. Diámetro 14 cm. Horno. 12 unidades. Vida útil 42 días.",
    image: `${IMG}/48.jpg`,
    priceUnit: 3000, priceX3: 9000,
    packInfo: "625 g · 12 unidades",
    categories: ["alta-cocina", "tapas-empanadas"],
    badges: ["premium", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "ac-emp-carne-cuchillo",
    slug: "ac-emp-carne-cuchillo",
    name: "Empanadas Carne Ahumada Cortada a Cuchillo",
    shortName: "Empanadas Carne Ahumada",
    description: "Elaboradas con carne pastoril cortada a cuchillo y vegetales agroecológicos. 4 unidades. Vida útil 12 meses freezadas.",
    image: `${IMG}/126.jpg`,
    priceUnit: 7500, priceX3: 22500,
    packInfo: "320 g · 4 unidades",
    categories: ["alta-cocina"],
    badges: ["premium", "congelado"],
    featured: true, inStock: true,
  },
  {
    id: "ac-emp-pollo",
    slug: "ac-emp-pollo",
    name: "Empanadas de Pollo Alta Cocina",
    shortName: "Empanadas Pollo",
    description: "Elaboradas con pollo pastoril y vegetales agroecológicos. 4 unidades. Vida útil 12 meses freezadas.",
    image: `${IMG}/127.jpg`,
    priceUnit: 7500, priceX3: 22500,
    packInfo: "320 g · 4 unidades",
    categories: ["alta-cocina"],
    badges: ["premium", "congelado"],
    featured: false, inStock: true,
  },
  {
    id: "ac-emp-espinaca-bechamel",
    slug: "ac-emp-espinaca-bechamel",
    name: "Empanadas Espinaca, Parmesano y Salsa Bechamel",
    shortName: "Empanadas Espinaca Bechamel",
    description: "Vegetales agroecológicos y lácteos tandilenses. Elaboración artesanal. 4 unidades. Vida útil 12 meses freezadas.",
    image: `${IMG}/128.jpg`,
    priceUnit: 7000, priceX3: 21000,
    packInfo: "320 g · 4 unidades",
    categories: ["alta-cocina"],
    badges: ["congelado", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "ac-emp-humita",
    slug: "ac-emp-humita",
    name: "Empanadas de Humita Alta Cocina",
    shortName: "Empanadas Humita",
    description: "Vegetales agroecológicos y lácteos tandilenses. Sabor tradicional. 4 unidades. Vida útil 12 meses freezadas.",
    image: `${IMG}/129.jpg`,
    priceUnit: 7000, priceX3: 21000,
    packInfo: "320 g · 4 unidades",
    categories: ["alta-cocina"],
    badges: ["congelado", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "ac-emp-cabutia-muzzarella",
    slug: "ac-emp-cabutia-muzzarella",
    name: "Empanadas Cabutia y Muzzarella",
    shortName: "Empanadas Cabutia",
    description: "Cabutia asada y muzzarella con vegetales agroecológicos. 4 unidades. Vida útil 12 meses freezadas.",
    image: `${IMG}/130.jpg`,
    priceUnit: 7000, priceX3: 21000,
    packInfo: "320 g · 4 unidades",
    categories: ["alta-cocina"],
    badges: ["congelado", "vegetariano"],
    featured: false, inStock: true,
  },

  // ── PRODUCTOS ESPECIALES ──────────────────────────────────────────────────

  {
    id: "pionono",
    slug: "pionono",
    name: "Pionono",
    shortName: "Pionono",
    description: "Masa esponjosa y versátil para enrollados salados o dulces. Vida útil 90 días. Producto seco.",
    image: `${IMG}/64.jpg`,
    priceUnit: 2900, priceX3: 8700,
    packInfo: "180 g",
    categories: ["productos-especiales"],
    badges: ["vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "levadura-fresca",
    slug: "levadura-fresca",
    name: "Levadura Fresca Prensada",
    shortName: "Levadura Fresca",
    description: "Levadura fresca prensada para panificación. Vida útil 30 días. Producto refrigerado.",
    image: `${IMG}/73.jpg`,
    priceUnit: 1500, priceX3: 4500,
    packInfo: "500 g",
    categories: ["productos-especiales"],
    badges: ["vegetariano"],
    featured: false, inStock: true,
  },

  // ── PRECIO DE FÁBRICA ─────────────────────────────────────────────────────

  {
    id: "pf-ravioles-pollo-espinaca-450",
    slug: "pf-ravioles-pollo-espinaca-450",
    name: "Ravioles de Pollo y Espinaca",
    shortName: "Ravioles Pollo Espinaca",
    description: "Ravioles de pollo y espinaca. Calidad Orali al mejor precio. Vida útil 45 días.",
    image: `${IMG}/107.jpg`,
    priceUnit: 3200, priceX3: 9600,
    packInfo: "450 g",
    categories: ["precio-de-fabrica"],
    badges: ["apto-freezer"],
    featured: true, inStock: true,
    onSale: true, originalPriceX3: 11300,
  },
  {
    id: "pf-ravioles-pollo-espinaca-900",
    slug: "pf-ravioles-pollo-espinaca-900",
    name: "Ravioles de Pollo y Espinaca 900 g",
    shortName: "Ravioles Pollo Espinaca 900 g",
    description: "Ravioles de pollo y espinaca. Formato familiar 900 g. Vida útil 45 días.",
    image: `${IMG}/109.jpg`,
    priceUnit: 5900, priceX3: 17700,
    packInfo: "900 g",
    categories: ["precio-de-fabrica"],
    badges: ["apto-freezer"],
    featured: false, inStock: true,
  },
  {
    id: "pf-ravioles-ricota-450",
    slug: "pf-ravioles-ricota-450",
    name: "Ravioles de Ricota 450 g",
    shortName: "Ravioles Ricota 450 g",
    description: "Ravioles de ricota. Calidad Orali al mejor precio. Vida útil 45 días.",
    image: `${IMG}/110.jpg`,
    priceUnit: 3200, priceX3: 9600,
    packInfo: "450 g",
    categories: ["precio-de-fabrica"],
    badges: ["apto-freezer", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "pf-ravioles-ricota-900",
    slug: "pf-ravioles-ricota-900",
    name: "Ravioles de Ricota 900 g",
    shortName: "Ravioles Ricota 900 g",
    description: "Ravioles de ricota. Formato familiar 900 g. Vida útil 45 días.",
    image: `${IMG}/111.jpg`,
    priceUnit: 5900, priceX3: 17700,
    packInfo: "900 g",
    categories: ["precio-de-fabrica"],
    badges: ["apto-freezer", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "pf-ravioles-espinaca-450",
    slug: "pf-ravioles-espinaca-450",
    name: "Ravioles de Espinaca 450 g",
    shortName: "Ravioles Espinaca 450 g",
    description: "Ravioles de espinaca. Calidad Orali al mejor precio. Vida útil 45 días.",
    image: `${IMG}/112.jpg`,
    priceUnit: 3200, priceX3: 9600,
    packInfo: "450 g",
    categories: ["precio-de-fabrica"],
    badges: ["apto-freezer", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "pf-ravioles-espinaca-900",
    slug: "pf-ravioles-espinaca-900",
    name: "Ravioles de Espinaca 900 g",
    shortName: "Ravioles Espinaca 900 g",
    description: "Ravioles de espinaca. Formato familiar 900 g. Vida útil 45 días.",
    image: `${IMG}/113.jpg`,
    priceUnit: 5900, priceX3: 17700,
    packInfo: "900 g",
    categories: ["precio-de-fabrica"],
    badges: ["apto-freezer", "vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "pf-tapas-criolla",
    slug: "pf-tapas-criolla",
    name: "Tapas para Empanadas Criollas",
    shortName: "Tapas Criolla",
    description: "Tapas criollas para empanadas. Diámetro 12 cm. 12 unidades. Vida útil 42 días.",
    image: `${IMG}/114.jpg`,
    priceUnit: 1400, priceX3: 4200,
    packInfo: "300 g · 12 unidades",
    categories: ["precio-de-fabrica", "tapas-empanadas"],
    badges: ["vegetariano"],
    featured: false, inStock: true,
  },
  {
    id: "pf-tapas-pascualinas",
    slug: "pf-tapas-pascualinas",
    name: "Tapas para Pascualinas Criollas",
    shortName: "Pascualinas Criollas",
    description: "Tapas para pascualinas. Diámetro 30 cm. 2 unidades. Vida útil 42 días.",
    image: `${IMG}/115.jpg`,
    priceUnit: 1700, priceX3: 5100,
    packInfo: "380 g · 2 unidades",
    categories: ["precio-de-fabrica", "tapas-empanadas"],
    badges: ["vegetariano"],
    featured: false, inStock: true,
  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

export const CATEGORIES = [
  { id: "pastas-frescas",       label: "Pastas Frescas",                     emoji: "🍝", desc: "Ravioles, sorrentinos, fettuccine y ñoquis" },
  { id: "tapas-empanadas",      label: "Tapas para Empanadas y Pascualinas", emoji: "🫓", desc: "Criolla, hojaldre, pascualinas" },
  { id: "oralitas",             label: "Oralitas",                           emoji: "🌮", desc: "Tortillas artesanales" },
  { id: "linea-verde",          label: "Línea Verde | Apto vegano",          emoji: "🌱", desc: "Sin ingredientes de origen animal" },
  { id: "linea-sin-gluten",     label: "Línea Sin Gluten",                   emoji: "🌾", desc: "Certificadas sin TACC" },
  { id: "linea-sin-sal",        label: "Línea Sin Sal",                      emoji: "🧂", desc: "Para dietas bajas en sodio" },
  { id: "texturizado-soja",     label: "Texturizado de soja",                emoji: "🫘", desc: "Proteína vegetal de alto valor" },
  { id: "linea-premium",        label: "Línea Premium",                      emoji: "⭐", desc: "Calidad artesanal superior" },
  { id: "alta-cocina",          label: "Alta Cocina",                        emoji: "👨‍🍳", desc: "Rotiseras y empanadas gourmet" },
  { id: "productos-especiales", label: "Productos Especiales",               emoji: "✨", desc: "Pionono, levadura y más" },
  { id: "precio-de-fabrica",    label: "Precio de Fábrica",                  emoji: "🏭", desc: "Calidad Orali al mejor precio" },
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
// La IA del navbar agrupa por tipo de producto (no por línea), cruzando
// categorías existentes. Se clasifica por nombre + categoría.

export type NavKey =
  | "pastas-ravioles"
  | "pastas-sorrentinos-capeletti"
  | "pastas-noquis"
  | "pastas-fideos"
  | "pastas-todos"
  | "tapas-empanadas"
  | "tapas-copetin-pastelitos"
  | "tapas-pascualinas"
  | "tapas-tortillas"
  | "tapas-todos"
  | "empanadas-rellenas"
  | "especiales"

export const NAV_LABELS: Record<NavKey, string> = {
  "pastas-ravioles":              "Ravioles",
  "pastas-sorrentinos-capeletti": "Sorrentinos y Capeletti",
  "pastas-noquis":                "Ñoquis",
  "pastas-fideos":                "Fideos",
  "pastas-todos":                 "Pastas",
  "tapas-empanadas":              "Para empanadas",
  "tapas-copetin-pastelitos":     "Para copetín y pastelitos",
  "tapas-pascualinas":            "Para pascualinas",
  "tapas-tortillas":              "Tortillas",
  "tapas-todos":                  "Tapas",
  "empanadas-rellenas":           "Empanadas rellenas",
  "especiales":                   "Especiales",
}

// Padre de cada subcategoría, para armar breadcrumbs (Catálogo > Padre > Actual)
export const NAV_PARENT: Partial<Record<NavKey, NavKey>> = {
  "pastas-ravioles":              "pastas-todos",
  "pastas-sorrentinos-capeletti": "pastas-todos",
  "pastas-noquis":                "pastas-todos",
  "pastas-fideos":                "pastas-todos",
  "tapas-empanadas":              "tapas-todos",
  "tapas-copetin-pastelitos":     "tapas-todos",
  "tapas-pascualinas":            "tapas-todos",
  "tapas-tortillas":              "tapas-todos",
}

const isRavioles             = (p: Product) => /ravioles/i.test(p.name)
const isSorrentinoCapelletti = (p: Product) => /sorrentino|capellett/i.test(p.name)
const isNoquis                = (p: Product) => /ñoqui|noqui/i.test(p.name)
const isFideos                = (p: Product) => /fettuccine/i.test(p.name)
const isPastaFamily           = (p: Product) =>
  isRavioles(p) || isSorrentinoCapelletti(p) || isNoquis(p) || isFideos(p) || p.categories.includes("pastas-frescas")

const isTapaParaEmpanadas = (p: Product) =>
  /tapas?.*(empanadas?|rotiser)/i.test(p.name) && !/pascualina|copet[ií]n|pastelito/i.test(p.name)
const isTapaCopetinPastelito = (p: Product) => /copet[ií]n|pastelito/i.test(p.name)
const isTapaPascualina       = (p: Product) => /pascualina/i.test(p.name)
const isTortilla              = (p: Product) => p.categories.includes("oralitas")
const isTapaFamily            = (p: Product) =>
  isTapaParaEmpanadas(p) || isTapaCopetinPastelito(p) || isTapaPascualina(p) || isTortilla(p)

const isEmpanadaRellena = (p: Product) =>
  p.id.startsWith("verde-emp-") || p.id.startsWith("ac-emp-") || p.categories.includes("texturizado-soja")
const isEspecial = (p: Product) =>
  p.categories.includes("productos-especiales") || /^miel-/.test(p.id)

export function getProductsByNavKey(key: NavKey): Product[] {
  switch (key) {
    case "pastas-ravioles":              return products.filter(isRavioles)
    case "pastas-sorrentinos-capeletti": return products.filter(isSorrentinoCapelletti)
    case "pastas-noquis":                return products.filter(isNoquis)
    case "pastas-fideos":                return products.filter(isFideos)
    case "pastas-todos":                 return products.filter(isPastaFamily)
    case "tapas-empanadas":              return products.filter(isTapaParaEmpanadas)
    case "tapas-copetin-pastelitos":     return products.filter(isTapaCopetinPastelito)
    case "tapas-pascualinas":            return products.filter(isTapaPascualina)
    case "tapas-tortillas":              return products.filter(isTortilla)
    case "tapas-todos":                  return products.filter(isTapaFamily)
    case "empanadas-rellenas":           return products.filter(isEmpanadaRellena)
    case "especiales":                   return products.filter(isEspecial)
    default:                              return []
  }
}

// ── Buscador ──────────────────────────────────────────────────────────────────

function normalize(s: string) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
}

export function searchProducts(query: string, limit?: number): Product[] {
  const q = normalize(query.trim())
  if (!q) return []
  const results = products.filter((p) =>
    normalize(p.name).includes(q) ||
    normalize(p.shortName).includes(q) ||
    normalize(p.description).includes(q)
  )
  return typeof limit === "number" ? results.slice(0, limit) : results
}
