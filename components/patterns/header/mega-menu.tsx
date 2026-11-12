import Link from "next/link"
import { ChevronDown } from "lucide-react"
import type { NavKey } from "@/lib/products"
import type { NavSubItem } from "./nav-items"

interface MegaMenuProps {
  label: string
  items: NavSubItem[]
  verTodosKey: NavKey
  open: boolean
  onToggle: () => void
  onItemClick: () => void
}

/** Disparador + dropdown de categoría en la barra desktop (Figma: Header / Desktop, menú abierto). */
export function MegaMenu({ label, items, verTodosKey, open, onToggle, onItemClick }: MegaMenuProps) {
  return (
    <div className="mega-menu">
      <button onClick={onToggle} aria-expanded={open} className="nav-link">
        {label}
        <ChevronDown className="accordion__chevron" aria-hidden="true" />
      </button>
      {open && (
        <div className="dropdown">
          <div className="dropdown__panel">
            {items.map((item) => (
              <Link key={item.key} href={`/productos?nav=${item.key}`} onClick={onItemClick} className="menu-item">
                {item.label}
              </Link>
            ))}
            <div className="dropdown__footer">
              <Link href={`/productos?nav=${verTodosKey}`} onClick={onItemClick} className="menu-item menu-item--brand">
                Ver todos
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
