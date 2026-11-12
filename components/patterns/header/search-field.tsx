"use client"

import type { KeyboardEvent } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { iconButtonClasses } from "@/components/ui/icon-button"
import { cn } from "@/lib/utils"

// Mapas literales: Tailwind purga las clases de @layer components que no encuentra escritas.
const VARIANT = { mobile: "search-field search-field--mobile", desktop: "search-field search-field--desktop" } as const

interface SearchFieldProps {
  variant: keyof typeof VARIANT
  value: string
  onChange: (value: string) => void
  onFocus: () => void
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
  onClear: () => void
  onSubmit: () => void
  /** Contenedor para detectar clics afuera. */
  wrapRef?: React.RefObject<HTMLDivElement>
  /** Resultados u otro contenido debajo del input. */
  children?: React.ReactNode
}

/** Buscador del header. Mobile: limpiar + buscar a la vez. Desktop: una acción (limpiar si hay texto). Clases de header-layout.css. */
export function SearchField({ variant, value, onChange, onFocus, onKeyDown, onClear, onSubmit, wrapRef, children }: SearchFieldProps) {
  const hasQuery = value.length > 0
  const clearBtn = (
    <button type="button" onClick={onClear} aria-label="Limpiar búsqueda" className={iconButtonClasses({ variant: "subtle", size: "sm", className: "search-field__action search-field__clear" })}>
      <X className={variant === "mobile" ? "icon-xs" : "icon-sm"} />
    </button>
  )
  const submitBtn = (
    <button type="button" onClick={onSubmit} aria-label="Buscar" className={iconButtonClasses({ variant: "primary", size: "sm", className: "search-field__action search-field__submit" })}>
      <Search className="icon-sm" />
    </button>
  )
  return (
    <div ref={wrapRef} className={cn(VARIANT[variant], hasQuery && "search-field--query")}>
      <div className="search-field__input-wrap">
        <Input
          variant="pill"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          placeholder="Buscar producto o categoría"
          aria-label="Buscar productos"
          className={variant === "desktop" ? "input--strong" : undefined}
        />
        {variant === "mobile" ? <>{hasQuery && clearBtn}{submitBtn}</> : hasQuery ? clearBtn : submitBtn}
      </div>
      {children}
    </div>
  )
}
