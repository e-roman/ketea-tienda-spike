"use client"

import { useState, useMemo, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Check, ChevronDown, Search } from "lucide-react"
import ProductCard, { ProductCardSkeleton } from "@/components/patterns/product-card"
import BottomSheet from "@/components/bottom-sheet"
import { FilterSidebar } from "@/components/patterns/filter-sidebar"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/input"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { EmptyState } from "@/components/patterns/empty-state"
import { Text } from "@/components/ui/text"
import {
  products, CATEGORIES, NAV_LABELS, NAV_PARENT, getProductsByNavKey, searchProducts,
  type Category, type NavKey,
} from "@/lib/products"
import { applyFilters, buildFacets, EMPTY_FILTERS, type Filters } from "@/lib/filters"

const SORT_OPTIONS = [
  { value: "default",     label: "Destacados" },
  { value: "price-asc",   label: "Menor precio" },
  { value: "price-desc",  label: "Mayor precio" },
  { value: "name-asc",    label: "A → Z" },
]

function CatalogContent() {
  const searchParams = useSearchParams()
  const initialCat = searchParams.get("cat") as Category | null
  const initialNav = searchParams.get("nav") as NavKey | null
  const initialQuery = searchParams.get("q") ?? ""

  const [activeCategory, setActiveCategory] = useState<Category | null>(initialNav ? null : initialCat)
  const [activeNav, setActiveNav] = useState<NavKey | null>(initialNav)
  const [activeQuery, setActiveQuery] = useState<string>(initialQuery)
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS)
  const [filtersSheetOpen, setFiltersSheetOpen] = useState(false)
  const [sortSheetOpen, setSortSheetOpen] = useState(false)
  const [sort, setSort] = useState("default")

  // Next.js no remonta el componente al navegar de /productos?nav=X a
  // /productos?nav=Y (misma ruta) — hay que resincronizar el estado cada vez
  // que cambian los parámetros de la URL (p. ej. al clickear el navbar).
  useEffect(() => {
    setActiveCategory(initialNav ? null : initialCat)
    setActiveNav(initialNav)
    setActiveQuery(initialQuery)
    setFilters(EMPTY_FILTERS)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCat, initialNav, initialQuery])

  // Delay artificial de carga (mínimo 1s) para que se alcance a ver el
  // skeleton al buscar/navegar entre categorías.
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setIsLoading(true)
    const t = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(t)
  }, [initialCat, initialNav, initialQuery])

  // Lista base según nav / cat / búsqueda (antes de aplicar los filtros de la columna)
  const baseList = useMemo(() => {
    if (activeQuery.trim())  return searchProducts(activeQuery)
    if (activeNav)           return getProductsByNavKey(activeNav)
    if (activeCategory)      return products.filter((p) => p.categories.includes(activeCategory))
    return products
  }, [activeQuery, activeNav, activeCategory])

  const facets = useMemo(() => buildFacets(baseList, filters), [baseList, filters])

  const filtered = useMemo(() => {
    const list = applyFilters(baseList, filters)
    switch (sort) {
      case "price-asc":  return [...list].sort((a, b) => a.priceX3 - b.priceX3)
      case "price-desc": return [...list].sort((a, b) => b.priceX3 - a.priceX3)
      case "name-asc":   return [...list].sort((a, b) => a.name.localeCompare(b.name))
      default:           return list
    }
  }, [baseList, filters, sort])

  const activeCatLabel = CATEGORIES.find((c) => c.id === activeCategory)?.label
  const pageTitle = activeQuery.trim()
    ? activeQuery.trim().charAt(0).toUpperCase() + activeQuery.trim().slice(1)
    : activeNav
      ? NAV_LABELS[activeNav]
      : activeCatLabel ?? "Todos los productos"

  const parentNavKey = activeNav ? NAV_PARENT[activeNav] : undefined
  const showBreadcrumbs = !activeQuery.trim() && (activeNav || activeCategory)

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      {showBreadcrumbs && (
        <Breadcrumb
          className="mb-6"
          items={[
            { label: "Catálogo", href: "/productos" },
            ...(parentNavKey ? [{ label: NAV_LABELS[parentNavKey], href: `/productos?nav=${parentNavKey}` }] : []),
            { label: pageTitle },
          ]}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_7fr] gap-6 lg:gap-10">
        <FilterSidebar
          title={pageTitle}
          resultCount={filtered.length}
          filters={filters}
          facets={facets}
          onChange={setFilters}
          sheetOpen={filtersSheetOpen}
          onSheetOpenChange={setFiltersSheetOpen}
          sortLabel={SORT_OPTIONS.find((o) => o.value === sort)?.label ?? SORT_OPTIONS[0].label}
          onOpenSort={() => setSortSheetOpen(true)}
        />

        <div>
          <div className="listing__sort">
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
          </div>

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
              <Button size="md" onClick={() => setFilters(EMPTY_FILTERS)}>
                Borrar filtros
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
      </div>

      <BottomSheet open={sortSheetOpen} title="Ordenar por" onClose={() => setSortSheetOpen(false)}>
        <div className="space-y-1">
          {SORT_OPTIONS.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => { setSort(o.value); setSortSheetOpen(false) }}
              aria-pressed={sort === o.value}
              className="option-row"
            >
              <span>{o.label}</span>
              {sort === o.value && <Check className="option-row__check" aria-hidden="true" />}
            </button>
          ))}
        </div>
      </BottomSheet>
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
