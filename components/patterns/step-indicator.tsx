import { Check } from "lucide-react"

// Mapas literales: Tailwind purga las clases de @layer components que no encuentra escritas.
const MARKER = {
  past: "step-indicator__marker step-indicator__marker--past",
  current: "step-indicator__marker step-indicator__marker--current",
  upcoming: "step-indicator__marker",
} as const
const LABEL = {
  current: "step-indicator__label step-indicator__label--current",
  other: "step-indicator__label hidden sm:inline",
} as const
const CONNECTOR = {
  past: "step-indicator__connector step-indicator__connector--past",
  upcoming: "step-indicator__connector",
} as const

export interface StepItem<T extends string> {
  id: T
  label: string
}

/** Indicador de pasos del checkout (Figma: Header / Checkout). Solo se puede volver a pasos anteriores. */
export function StepIndicator<T extends string>({ steps, current, onStepClick }: {
  steps: StepItem<T>[]
  current: T
  onStepClick: (step: T) => void
}) {
  const idx = steps.findIndex((s) => s.id === current)
  return (
    <ol aria-label="Pasos del checkout" className="step-indicator max-w-2xl mx-auto">
      {steps.map((step, i) => {
        const isPast = i < idx
        const clickable = i < idx
        const state = isPast ? "past" : i === idx ? "current" : "upcoming"
        return (
          <li key={step.id} className="step-indicator__item">
            <button
              type="button"
              onClick={() => clickable && onStepClick(step.id)}
              disabled={!clickable}
              aria-current={i === idx ? "step" : undefined}
              className="step-indicator__button"
            >
              <div aria-hidden="true" className={MARKER[state]}>
                {isPast ? <Check className="icon-sm" /> : i + 1}
              </div>
              <span aria-hidden="true" className={i === idx ? LABEL.current : LABEL.other}>{step.label}</span>
              <span className="sr-only">{step.label}</span>
            </button>
            {i < steps.length - 1 && (
              <div aria-hidden="true" className={CONNECTOR[isPast ? "past" : "upcoming"]} />
            )}
          </li>
        )
      })}
    </ol>
  )
}
