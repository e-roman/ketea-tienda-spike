"use client"

import { useRef, type KeyboardEvent } from "react"
import { cn } from "@/lib/utils"

// Mapa literal: Tailwind purga las clases de @layer components que no encuentra escritas.
const TAB_STATE = { true: "tabs__tab tabs__tab--active", false: "tabs__tab" } as const

export interface TabItem<T extends string> {
  id: T
  label: string
}

interface TabsProps<T extends string> {
  items: readonly TabItem<T>[]
  value: T
  onChange: (id: T) => void
  label: string
  className?: string
}

/**
 * Tabs — clases de styles/components/tabs.css. role=tablist/tab, aria-selected,
 * roving tabindex y navegación con ←/→/Home/End. El panel lo arma quien usa el componente
 * con id `panel-${id}` y role="tabpanel" aria-labelledby=`tab-${id}`.
 */
export function Tabs<T extends string>({ items, value, onChange, label, className }: TabsProps<T>) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})

  function onKeyDown(e: KeyboardEvent, index: number) {
    const last = items.length - 1
    const next =
      e.key === "ArrowRight" ? (index === last ? 0 : index + 1)
      : e.key === "ArrowLeft" ? (index === 0 ? last : index - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null
    if (next === null) return
    e.preventDefault()
    const id = items[next].id
    onChange(id)
    refs.current[id]?.focus()
  }

  return (
    <div role="tablist" aria-label={label} className={cn("tabs", className)}>
      {items.map((item, i) => {
        const selected = item.id === value
        return (
          <button
            key={item.id}
            ref={(el) => { refs.current[item.id] = el }}
            type="button"
            role="tab"
            id={`tab-${item.id}`}
            aria-selected={selected}
            aria-controls={`panel-${item.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(item.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={TAB_STATE[String(selected) as "true" | "false"]}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
