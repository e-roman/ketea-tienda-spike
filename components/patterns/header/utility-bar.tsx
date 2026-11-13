import Link from "next/link"
import { cn } from "@/lib/utils"

/**
 * Barra superior (Figma: Header / Desktop). Clases de styles/patterns/header.css.
 * En mobile se oculta mientras la búsqueda está activa, así el header queda pegado arriba
 * y el panel de resultados calza justo debajo.
 */
export function UtilityBar({ hiddenOnMobile = false }: { hiddenOnMobile?: boolean }) {
  return (
    <section aria-label="Envíos y contacto" className={cn("utility-bar", hiddenOnMobile && "hidden md:block")}>
      <div className="utility-bar__inner max-w-7xl mx-auto px-4 md:px-6">
        <p className="utility-bar__message">
          Hasta 12 cuotas sin interés
        </p>
        <div className="utility-bar__links">
          <Link href="/contacto" className="utility-link">
            ¿Necesitás ayuda?
          </Link>
          <Link href="/como-comprar" className="utility-link">
            ¿Cómo comprar?
          </Link>
        </div>
      </div>
    </section>
  )
}
