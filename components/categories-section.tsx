"use client"

import Link from "next/link"
import { linkClasses } from "@/components/ui/link"
import { useState } from "react"
import {
  UtensilsCrossed, Layers, Sandwich, Leaf, Wheat,
  ShieldCheck, Bean, Award, ChefHat, Sparkles, Tag, ChevronDown,
} from "lucide-react"
import { CATEGORIES } from "@/lib/products"
import { SectionHeader } from "@/components/patterns/section-header"

const CAT_ICONS: Record<string, React.ReactNode> = {
  "pastas-frescas":       <UtensilsCrossed className="icon-lg" />,
  "tapas-empanadas":      <Layers className="icon-lg" />,
  "oralitas":             <Sandwich className="icon-lg" />,
  "linea-verde":          <Leaf className="icon-lg" />,
  "linea-sin-gluten":     <Wheat className="icon-lg" />,
  "linea-sin-sal":        <ShieldCheck className="icon-lg" />,
  "texturizado-soja":     <Bean className="icon-lg" />,
  "linea-premium":        <Award className="icon-lg" />,
  "alta-cocina":          <ChefHat className="icon-lg" />,
  "productos-especiales": <Sparkles className="icon-lg" />,
  "precio-de-fabrica":    <Tag className="icon-lg" />,
}

// Primary 8 shown by default; rest hidden behind "Ver más"
const PRIMARY_COUNT = 8

export default function CategoriesSection() {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? CATEGORIES : CATEGORIES.slice(0, PRIMARY_COUNT)

  return (
    <section className="categories max-w-7xl mx-auto px-4 md:px-6">
      <SectionHeader title="¿Qué querés cocinar hoy?" />
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {visible.map((cat) => (
          <Link
            key={cat.id}
            href={`/productos?cat=${cat.id}`}
            className="category-card"
          >
            <span className="category-card__icon">
              {CAT_ICONS[cat.id]}
            </span>
            <span className="category-card__label">
              {cat.label}
            </span>
          </Link>
        ))}
      </div>
      {!showAll && CATEGORIES.length > PRIMARY_COUNT && (
        <div className="categories__more">
          <button
            onClick={() => setShowAll(true)}
            className={linkClasses({ variant: "subtle", size: "sm", icon: true })}
          >
            Ver {CATEGORIES.length - PRIMARY_COUNT} categorías más <ChevronDown className="icon-sm" aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  )
}
