import Link from "next/link"
import { SECTION_LINKS } from "./nav-items"

/**
 * Navegación general del header mobile (Figma: Header / Mobile nav): fila de links que se desliza hacia los costados,
 * debajo del buscador. No es sticky: se va con el scroll para dejar lugar al contenido. Clases de styles/patterns/mobile-menu.css.
 */
export function MobileNav() {
  return (
    <nav aria-label="Secciones" className="mobile-nav md:hidden">
      <ul className="mobile-nav__list">
        {SECTION_LINKS.map(([label, href]) => (
          <li key={label}><Link href={href} className="mobile-nav__link">{label}</Link></li>
        ))}
      </ul>
    </nav>
  )
}
