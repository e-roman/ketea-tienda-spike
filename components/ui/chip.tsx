import { cn } from "@/lib/utils"

/**
 * Chip de filtro — clases de styles/components/chip.css (tokens `chip.*`). Alto 36px (`size.control.sm`), siempre pill.
 * Usar con `aria-pressed` para comunicar el estado seleccionado.
 */
export function chipClasses(selected: boolean, className?: string) {
  return cn("chip", selected && "chip--selected", className)
}
