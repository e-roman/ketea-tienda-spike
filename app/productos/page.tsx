"use client"

import { chipClasses } from "@/components/ui/chip"
import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ChevronRight, ChevronDown, Search, X, SlidersHorizontal, Check } from "lucide-react"
import { Suspense } from "react"
import ProductCard, { ProductCardSkeleton } from "@/components/patterns/product-card"
import BottomSheet from "@/components/bottom-sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select } from "@/components/ui/input"
import {
  products, CATEGORIES, NAV_LABELS, NAV_PARENT, getProductsByNavKey, searchProducts,
  type Category, type NavKey, type Badge as DietaryBadge,
} from "@/lib/products"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { PageHeader } from "@/components/patterns/page-header"
import { EmptyState } from "@/components/patterns/empty-state"
import { Text } from "@/components/ui/text"
import { Row, Stack } from "@/components/ui/layout"

const SORT_OPTIONS = [
  { value: "default",     label: "Más pedidos" },
  { value: "price-asc",   label: "Menor precio" },
  { value: "price-desc",  label: "Mayor precio" },
  { value: "name-asc",    label: "A → Z" },
]

const DIETARY_CHIPS: { key: DietaryBadge; label: string }[] = [
  { key: "sin-tacc",    label: "Sin TACC" },
  { key: "vegano",      label: "Vegano" },
  { key: "vegetariano", label: "Vegetariano" },
  { key: "integral",    label: "Integral" },
  { key: "sin-sal",     label: "Sin sal" },
]

function CatalogContent() {
  const searchParams = useSearchParams()
  const initialCat = searchParams.get("cat") as Category | null
  const initialNav = searchParams.get("nav") as NavKey | null
  const initialQuery = searchParams.get("q") ?? ""

  const [activeCategory, setActiveCategory] = useState<Category | null>(initialNav ? null : initialCat)
  const [activeNav, setActiveNav] = useState<NavKey | null>(initialNav)
  const [activeQuery, setActiveQuery] = useState<string>(initialQuery)
  const [activeBadges, setActiveBadges] = useState<DietaryBadge[]>([])
  const [sort, setSort] = useState("default")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [mobileSortOpen, setMobileSortOpen] = useState(false)

  // Next.js no remonta el componente al navegar de /productos?nav=X a
  // /productos?nav=Y (misma ruta) — hay que resincronizar el estado cada vez
  // que cambian los parámetros de la URL (p. ej. al clickear el navbar).
  useEffect(() => {
    setActiveCategory(initialNav ? null : initialCat)
    setActiveNav(initialNav)
    setActiveQuery(initialQuery)
    setActiveBadges([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCat, initialNav, initialQuery])

  // Delay artificial de carga (mínimo 1s) para que se alcance a ver el
  // skeleton al buscar/navegar entre categorías — sin esto la data es
  // sincrónica y el resultado aparece instantáneo, sin sensación de carga.
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setIsLoading(true)
    const t = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(t)
  }, [initialCat, initialNav, initialQuery])

  // Lista base según nav / cat / búsqueda (antes de aplicar los chips dietarios)
  const baseList = useMemo(() => {
    if (activeQuery.trim())  return searchProducts(activeQuery)
    if (activeNav)           return getProductsByNavKey(activeNav)
    if (activeCategory)      return products.filter((p) => p.categories.includes(activeCategory))
    return products
  }, [activeQuery, activeNav, activeCategory])

  // Solo se muestran los chips dietarios que realmente aplican a esta categoría
  const availableChips = useMemo(() => {
    const present = new Set<DietaryBadge>()
    baseList.forEach((p) => p.badges.forEach((b) => present.add(b)))
    return DIETARY_CHIPS.filter((c) => present.has(c.key))
  }, [baseList])

  // Si cambia la categoría, se descartan los chips que ya no aplican
  useEffect(() => {
    setActiveBadges((prev) => prev.filter((b) => availableChips.some((c) => c.key === b)))
  }, [availableChips])

  const filtered = useMemo(() => {
    let list = [...baseList]
    if (activeBadges.length) list = list.filter((p) => activeBadges.every((b) => p.badges.includes(b)))
    switch (sort) {
      case "price-asc":  list.sort((a, b) => a.priceX3 - b.priceX3); break
      case "price-desc": list.sort((a, b) => b.priceX3 - a.priceX3); break
      case "name-asc":   list.sort((a, b) => a.name.localeCompare(b.name)); break
    }
    return list
  }, [baseList, activeBadges, sort])

  function toggleBadge(b: DietaryBadge) {
    setActiveBadges((prev) => prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b])
  }

  function clearAllFilters() {
    setActiveCategory(null)
    setActiveNav(null)
    setActiveQuery("")
    setActiveBadges([])
  }

  const activeCatLabel = CATEGORIES.find((c) => c.id === activeCategory)?.label
  const pageTitle = activeQuery.trim()
    ? `Resultados para "${activeQuery.trim()}"`
    : activeNav
      ? NAV_LABELS[activeNav]
      : activeCatLabel ?? "Todos los productos"

  const parentNavKey = activeNav ? NAV_PARENT[activeNav] : undefined
  const showBreadcrumbs = !activeQuery.trim() && (activeNav || activeCategory)
  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label ?? SORT_OPTIONS[0].label

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      {/* Breadcrumbs */}
      {showBreadcrumbs && (
        <Breadcrumb
          className="mb-3"
          items={[
            { label: "Catálogo", href: "/productos" },
            ...(parentNavKey ? [{ label: NAV_LABELS[parentNavKey], href: `/productos?nav=${parentNavKey}` }] : []),
            { label: pageTitle },
          ]}
        />
      )}

      {/* Page header */}
      <PageHeader title={pageTitle} tight>
        {filtered.length} productos
      </PageHeader>

      {/* Chips dietarios + orden — desktop */}
      <Row align="center" gap={3} className="hidden-mobile mb-8">
        <Row align="center" gap={2} className="scroll-x fill">
          <button
            onClick={() => setActiveBadges([])}
            aria-pressed={activeBadges.length === 0}
            className={chipClasses(activeBadges.length === 0)}
          >
            Todos
          </button>
          {availableChips.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => toggleBadge(key)}
              aria-pressed={activeBadges.includes(key)}
            className={chipClasses(activeBadges.includes(key))}
            >
              {label}
            </button>
          ))}
          {activeBadges.length > 0 && (
            <button
              onClick={() => setActiveBadges([])}
              className="chip-clear"
            >
              <X className="chip-clear__icon" aria-hidden="true" /> Eliminar filtros
            </button>
          )}
        </Row>

        <Row align="center" gap={2} className="push-end noshrink">
          <Text as="span" size="sm" tone="secondary" weight="medium">Ordenar por</Text>
          <div className="select-wrap">
            <Select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Ordenar productos"
              size="md"
              className="select--auto"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </Select>
            <ChevronDown className="input-icon icon-sm" aria-hidden="true" />
          </div>
        </Row>
      </Row>

      {/* Filtro + orden — mobile: dos botones que abren un modal desde abajo */}
      <Row align="center" gap={3} className="only-mobile mb-8">
        <Button variant="neutral" className="fill" onClick={() => setMobileFiltersOpen(true)}>
          <SlidersHorizontal className="icon-sm" aria-hidden="true" />
          Filtros
          {activeBadges.length > 0 && (
            <Badge variant="counter">{activeBadges.length}</Badge>
          )}
        </Button>
        <Button variant="neutral" className="fill" onClick={() => setMobileSortOpen(true)}>
          <ChevronDown className="icon-sm" aria-hidden="true" />
          {currentSortLabel}
        </Button>
      </Row>

      <BottomSheet open={mobileFiltersOpen} title="Filtros" onClose={() => setMobileFiltersOpen(false)}>
        <Row wrap gap={2} className="mb-5">
          <button
            onClick={() => setActiveBadges([])}
            aria-pressed={activeBadges.length === 0}
            className={chipClasses(activeBadges.length === 0)}
          >
            Todos
          </button>
          {availableChips.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => toggleBadge(key)}
              aria-pressed={activeBadges.includes(key)}
            className={chipClasses(activeBadges.includes(key))}
            >
              {label}
            </button>
          ))}
        </Row>
        <Stack gap={3}>
          {activeBadges.length > 0 && (
            <Button variant="outline" fullWidth onClick={() => setActiveBadges([])}>
              <X className="icon-sm" aria-hidden="true" /> Eliminar filtros
            </Button>
          )}
          <Button fullWidth onClick={() => setMobileFiltersOpen(false)}>
            Ver {filtered.length} producto{filtered.length !== 1 ? "s" : ""}
          </Button>
        </Stack>
      </BottomSheet>

      <BottomSheet open={mobileSortOpen} title="Ordenar por" onClose={() => setMobileSortOpen(false)}>
        <div className="space-y-1">
          {SORT_OPTIONS.map((o) => (
            <button
              key={o.value}
              onClick={() => { setSort(o.value); setMobileSortOpen(false) }}
              aria-pressed={sort === o.value}
              className="option-row"
            >
              <span>{o.label}</span>
              {sort === o.value && <Check className="option-row__check" aria-hidden="true" />}
            </button>
          ))}
        </div>
      </BottomSheet>

      {/* Product grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          className="py-20"
          icon={<Search className="icon-xl" aria-hidden="true" />}
          title="No encontramos productos"
          text="Probá con otros filtros o explorá todas las categorías."
        >
          <Button size="md" onClick={clearAllFilters}>
            Eliminar filtros
          </Button>
        </EmptyState>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} titleAs="h2" />
          ))}
        </div>
      )}
    </div>
  )
}

export default function ProductosPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      </div>
    }>
      <CatalogContent />
    </Suspense>
  )
}
