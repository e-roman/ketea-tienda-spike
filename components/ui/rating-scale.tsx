import { cn } from "@/lib/utils"

// Mapa literal: Tailwind purga las clases de @layer components que no encuentra escritas.
const OPTION_STATE = {
  true: "rating-scale__option rating-scale__option--selected",
  false: "rating-scale__option",
} as const

interface RatingScaleProps {
  min?: number
  max?: number
  value: number | null
  onChange: (n: number) => void
  className?: string
}

/** Escala de puntaje — clases de styles/components/rating-scale.css. Cada opción usa aria-pressed. */
export function RatingScale({ min = 1, max = 10, value, onChange, className }: RatingScaleProps) {
  const options = Array.from({ length: max - min + 1 }, (_, i) => min + i)
  return (
    <div role="group" className={cn("rating-scale", className)}>
      {options.map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-pressed={value === n}
          className={OPTION_STATE[String(value === n) as "true" | "false"]}
        >
          {n}
        </button>
      ))}
    </div>
  )
}
