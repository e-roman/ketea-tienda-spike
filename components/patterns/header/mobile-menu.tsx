"use client"

import Link from "next/link"
import { useState, type ReactNode } from "react"
import {
  ArrowLeft, ChevronDown, ChevronRight, ChefHat, HelpCircle, Mail, Sandwich, Star, Tag, User, Utensils,
} from "lucide-react"
import { linkClasses } from "@/components/ui/link"
import type { NavKey } from "@/lib/products"
import { PASTAS_ITEMS, TAPAS_ITEMS, type NavSubItem } from "./nav-items"

// Mapas literales: Tailwind purga las clases de @layer components que no encuentra escritas.
const ICON = {
  brand: "menu-row__icon",
  neutral: "menu-row__icon menu-row__icon--neutral",
  promo: "menu-row__icon menu-row__icon--brand",
} as const
const LABEL = { default: "menu-row__label", brand: "menu-row__label menu-row__label--brand" } as const

function RowLabel({ icon, tone = "brand", label = "default", children }: {
  icon: ReactNode
  tone?: keyof typeof ICON
  label?: keyof typeof LABEL
  children: ReactNode
}) {
  return (
    <span className={LABEL[label]}>
      <span className={ICON[tone]}>{icon}</span>
      {children}
    </span>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <p className="menu-section">{title}</p>
      <div className="divided">{children}</div>
    </>
  )
}

function AccordionRow({ label, icon, items, verTodosKey, onNavigate }: {
  label: string
  icon: ReactNode
  items: NavSubItem[]
  verTodosKey: NavKey
  onNavigate: () => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button onClick={() => setOpen((v) => !v)} aria-expanded={open} className="accordion__trigger accordion__trigger--compact">
        <RowLabel icon={icon}>{label}</RowLabel>
        <ChevronDown className="accordion__chevron" aria-hidden="true" />
      </button>
      {open && (
        <div className="accordion__panel accordion__panel--nested accordion__panel--list">
          {items.map((item) => (
            <Link key={item.key} href={`/productos?nav=${item.key}`} onClick={onNavigate} className="menu-sublink">
              {item.label}
            </Link>
          ))}
          <Link href={`/productos?nav=${verTodosKey}`} onClick={onNavigate} className="menu-sublink menu-sublink--brand">
            Ver todos
          </Link>
        </div>
      )}
    </div>
  )
}

function LinkRow({ href, icon, tone, label, onNavigate, children }: {
  href: string
  icon: ReactNode
  tone?: keyof typeof ICON
  label?: keyof typeof LABEL
  onNavigate: () => void
  children: ReactNode
}) {
  return (
    <Link href={href} onClick={onNavigate} className="menu-row">
      <RowLabel icon={icon} tone={tone} label={label}>{children}</RowLabel>
      <ChevronRight className="menu-row__chevron" aria-hidden="true" />
    </Link>
  )
}

/**
 * Menú mobile de pantalla completa (Figma: Header / Mobile menu). Se monta solo cuando está abierto,
 * así los acordeones arrancan cerrados cada vez. Clases de styles/patterns/header.css y nav.css.
 */
export function MobileMenu({ onClose, onOpenAuth }: { onClose: () => void; onOpenAuth: () => void }) {
  const icon = "w-4 h-4"
  return (
    <div className="mobile-menu md:hidden">
      <div className="mobile-menu__bar">
        <button onClick={onClose} className={linkClasses({ size: "sm", icon: true, className: "mobile-menu__back" })}>
          <ArrowLeft className="icon-sm" aria-hidden="true" /> Volver
        </button>
      </div>

      <div className="mobile-menu__body">
        <div className="divided">
          <AccordionRow label="Equipamiento" icon={<Utensils className={icon} />} items={PASTAS_ITEMS} verTodosKey="piscinas-todos" onNavigate={onClose} />
          <AccordionRow label="Mantenimiento" icon={<Sandwich className={icon} />} items={TAPAS_ITEMS} verTodosKey="mantenimiento-todos" onNavigate={onClose} />
          <LinkRow href="/productos?nav=empanadas-rellenas" icon={<ChefHat className={icon} />} onNavigate={onClose}>
            Empanadas rellenas
          </LinkRow>
          <LinkRow href="/productos?nav=especiales" icon={<Star className={icon} />} onNavigate={onClose}>
            Especiales
          </LinkRow>
        </div>

        <Section title="Promociones">
          <LinkRow href="/ofertas" icon={<Tag className={icon} />} tone="promo" label="brand" onNavigate={onClose}>
            Ofertas de la semana
          </LinkRow>
        </Section>

        <Section title="Mi cuenta">
          <button onClick={() => { onClose(); onOpenAuth() }} className="menu-row">
            <RowLabel icon={<User className={icon} />} tone="neutral">Ingresar / Registrarme</RowLabel>
            <ChevronRight className="menu-row__chevron" aria-hidden="true" />
          </button>
        </Section>

        <Section title="Otros">
          <LinkRow href="/contacto" icon={<Mail className={icon} />} tone="neutral" onNavigate={onClose}>
            Contacto
          </LinkRow>
          <LinkRow href="/preguntas-frecuentes" icon={<HelpCircle className={icon} />} tone="neutral" onNavigate={onClose}>
            Preguntas frecuentes
          </LinkRow>
        </Section>
      </div>
    </div>
  )
}
