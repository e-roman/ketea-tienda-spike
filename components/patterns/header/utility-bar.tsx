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
          Hasta 12 cuotas sin interés y hasta 50% OFF en productos seleccionados.{" "}
          <a href="https://ketea.emilianoroman.com.ar/Descuentos" target="_blank" rel="noopener noreferrer" className="utility-link">
            Ver productos
          </a>
        </p>
      </div>
    </section>
  )
}
