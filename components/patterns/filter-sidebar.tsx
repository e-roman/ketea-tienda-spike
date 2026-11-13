"use client"

import { ArrowUpDown, SlidersHorizontal, X } from "lucide-react"
import BottomSheet from "@/components/bottom-sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { appliedChips, removeFilter, toggleValue, EMPTY_FILTERS, type Facets, type FacetOption, type Filters } from "@/lib/filters"

interface FilterSidebarProps {
  title: string
  resultCount: number
  filters: Filters
  facets: Facets
  onChange: (next: Filters) => void
  /** Mobile y tablet: los filtros se abren en un bottom sheet. */
  sheetOpen: boolean
  onSheetOpenChange: (open: boolean) => void
  /** Etiqueta del orden vigente y acción para cambiarlo (se abre en otro sheet, del listado). */
  sortLabel: string
  onOpenSort: () => void
}

function FilterGroup<T extends string | number>({ title, options, selected, onToggle }: {
  title: string
  options: FacetOption<T>[]
  selected: T[]
  onToggle: (value: T) => void
}) {
  if (options.length === 0) return null
  return (
    <fieldset className="filter-group">
      <legend className="filter-group__title">{title}</legend>
      <div className="filter-group__options">
        {options.map((o) => (
          <Checkbox key={String(o.value)} label={o.label} count={o.count} checked={selected.includes(o.value)} onChange={() => onToggle(o.value)} />
        ))}
      </div>
    </fieldset>
  )
}

/** Contenido de los filtros: se dibuja en la columna (escritorio) y dentro del bottom sheet (mobile y tablet). */
function FilterBody({ filters, facets, onChange, showClear }: {
  filters: Filters
  facets: Facets
  onChange: (next: Filters) => void
  /** Link "Borrar filtros" al final; en el sheet el botón vive en el pie. */
  showClear: boolean
}) {
  const chips = appliedChips(filters)
  const { switches } = facets
  const showSwitches = switches.freeShipping > 0 || switches.express > 0 || switches.pickup > 0 || filters.freeShipping || filters.express || filters.pickup

  return (
    <>
      {showSwitches && (
        <div className="filters__switches">
          {(switches.freeShipping > 0 || filters.freeShipping) && (
            <Switch label="Envío gratis" checked={filters.freeShipping} onChange={(e) => onChange({ ...filters, freeShipping: e.target.checked })} />
          )}
          {(switches.express > 0 || filters.express) && (
            <Switch label="Envío Express" checked={filters.express} onChange={(e) => onChange({ ...filters, express: e.target.checked })} />
          )}
          {(switches.pickup > 0 || filters.pickup) && (
            <Switch label="Retiro inmediato" checked={filters.pickup} onChange={(e) => onChange({ ...filters, pickup: e.target.checked })} />
          )}
        </div>
      )}

      {chips.length > 0 && (
        <section className="applied" aria-label="Filtros aplicados">
          <div className="applied__head">
            <h2 className="applied__title">Filtros aplicados:</h2>
            <button type="button" onClick={() => onChange(EMPTY_FILTERS)} className="filters__link">Borrar</button>
          </div>
          <ul className="applied__list">
            {chips.map((chip) => (
              <li key={chip.id}>
                <span className="filter-chip">
                  {chip.label}
                  <button type="button" onClick={() => onChange(removeFilter(filters, chip))} aria-label={`Quitar filtro ${chip.label}`} className="filter-chip__remove">
                    <X aria-hidden="true" />
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <FilterGroup title="Categoría" options={facets.categories} selected={filters.categories} onToggle={(v) => onChange({ ...filters, categories: toggleValue(filters.categories, v) })} />
      <FilterGroup title="Marca" options={facets.brands} selected={filters.brands} onToggle={(v) => onChange({ ...filters, brands: toggleValue(filters.brands, v) })} />
      <FilterGroup title="Accionamiento" options={facets.drives} selected={filters.drives} onToggle={(v) => onChange({ ...filters, drives: toggleValue(filters.drives, v) })} />
      <FilterGroup title="Descuentos" options={facets.discounts} selected={filters.discounts} onToggle={(v) => onChange({ ...filters, discounts: toggleValue(filters.discounts, v) })} />
      <FilterGroup title="Cantidad de cuotas" options={facets.installments} selected={filters.installments} onToggle={(v) => onChange({ ...filters, installments: toggleValue(filters.installments, v) })} />

      <fieldset className="filter-group">
        <legend className="filter-group__title">Precio</legend>
        <div className="filter-price">
          <Input type="number" min={0} inputMode="numeric" placeholder="Mínimo" aria-label="Precio mínimo" value={filters.priceMin} onChange={(e) => onChange({ ...filters, priceMin: e.target.value })} />
          <span aria-hidden="true">-</span>
          <Input type="number" min={0} inputMode="numeric" placeholder="Máximo" aria-label="Precio máximo" value={filters.priceMax} onChange={(e) => onChange({ ...filters, priceMax: e.target.value })} />
        </div>
      </fieldset>

      {showClear && chips.length > 0 && (
        <button type="button" onClick={() => onChange(EMPTY_FILTERS)} className="filters__link filters__clear">Borrar filtros</button>
      )}
    </>
  )
}

/**
 * Filtros del listado (Figma: Listing / Filters).
 * Escritorio: columna con título, cantidad y los filtros. Mobile y tablet: título y cantidad, dos botones del mismo tamaño
 * ("Filtrar" y el orden) y los filtros en un bottom sheet con pie ("Borrar filtros" y "Ver resultados").
 * Clases de styles/patterns/filters.css.
 */
export function FilterSidebar({ title, resultCount, filters, facets, onChange, sheetOpen, onSheetOpenChange, sortLabel, onOpenSort }: FilterSidebarProps) {
  const activeCount = appliedChips(filters).length

  return (
    <aside className="filters" aria-label="Filtros">
      <div className="filters__head">
        <h1 className="filters__title">{title}</h1>
        <p className="filters__count"><strong>{resultCount}</strong> resultado{resultCount !== 1 ? "s" : ""}</p>
      </div>

      <div className="filters__actions">
        <Button variant="neutral" fullWidth onClick={() => onSheetOpenChange(true)}>
          <SlidersHorizontal className="icon-sm" aria-hidden="true" />
          Filtrar
          {activeCount > 0 && <Badge variant="counter">{activeCount}</Badge>}
        </Button>
        <Button variant="neutral" fullWidth onClick={onOpenSort}>
          <ArrowUpDown className="icon-sm" aria-hidden="true" />
          {sortLabel}
        </Button>
      </div>

      <div className="filters__body">
        <FilterBody filters={filters} facets={facets} onChange={onChange} showClear />
      </div>

      <BottomSheet
        open={sheetOpen}
        title="Filtros"
        tall
        onClose={() => onSheetOpenChange(false)}
        footer={
          <>
            <Button variant="outline" fullWidth onClick={() => onChange(EMPTY_FILTERS)} disabled={activeCount === 0}>Borrar filtros</Button>
            <Button fullWidth onClick={() => onSheetOpenChange(false)}>Ver resultados ({resultCount})</Button>
          </>
        }
      >
        <div className="filters__sheet">
          <FilterBody filters={filters} facets={facets} onChange={onChange} showClear={false} />
        </div>
      </BottomSheet>
    </aside>
  )
}
