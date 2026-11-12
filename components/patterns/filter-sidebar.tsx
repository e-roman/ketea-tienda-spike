"use client"

import { SlidersHorizontal, X } from "lucide-react"
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
  /** Solo mobile y tablet: la columna se pliega detrás de un botón. */
  open: boolean
  onToggle: () => void
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

/**
 * Columna de filtros del listado (Figma: Listing / Filters): título y cantidad, interruptores de entrega,
 * "Filtros aplicados" con chips que se quitan de a uno, y grupos de checkboxes con precio al final.
 * Clases de styles/patterns/filters.css.
 */
export function FilterSidebar({ title, resultCount, filters, facets, onChange, open, onToggle }: FilterSidebarProps) {
  const chips = appliedChips(filters)
  const { switches } = facets
  const showSwitches = switches.freeShipping > 0 || switches.express > 0 || switches.pickup > 0 || filters.freeShipping || filters.express || filters.pickup

  return (
    <aside className={open ? "filters filters--open" : "filters"} aria-label="Filtros">
      <div className="filters__head">
        <h1 className="filters__title">{title}</h1>
        <p className="filters__count"><strong>{resultCount}</strong> resultado{resultCount !== 1 ? "s" : ""}</p>
      </div>

      <Button variant="neutral" onClick={onToggle} aria-expanded={open} className="filters__toggle">
        <SlidersHorizontal className="icon-sm" aria-hidden="true" />
        Filtros
        {chips.length > 0 && <Badge variant="counter">{chips.length}</Badge>}
      </Button>

      <div className="filters__body">
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

      {chips.length > 0 && (
        <button type="button" onClick={() => onChange(EMPTY_FILTERS)} className="filters__link filters__clear">Borrar filtros</button>
      )}
      </div>
    </aside>
  )
}
