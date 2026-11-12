import type { ReactNode } from "react"
import { ArrowDown, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { IconBadge } from "@/components/ui/icon-badge"
import { Progress } from "@/components/ui/progress"
import { Text } from "@/components/ui/text"

export interface HowStep {
  number: string
  icon: ReactNode
  title: string
  text: string
  /** El paso destacado (el mínimo de 4 packs) lleva fondo de marca. */
  featured?: boolean
  /** Barra de ejemplo (p. ej. 3 de 4 packs) que ilustra el texto del paso. Es decorativa. */
  progress?: { current: number; total: number }
}

function StepProgress({ progress }: { progress: NonNullable<HowStep["progress"]> }) {
  const label = `${progress.current} de ${progress.total} packs`
  return (
    <div className="how-progress" aria-hidden="true">
      <Progress value={(progress.current / progress.total) * 100} state="error" label={label} className="fill" />
      <Text as="span" size="xs" weight="semibold" className="noshrink">{label}</Text>
    </div>
  )
}

/**
 * «¿Cómo funciona?». Los numerales (01, 02, 03) salen de un contador CSS: son decorativos y el <ol> ya numera.
 *: en desktop una fila con conectores donde el paso destacado es más ancho;
 * en mobile una secuencia vertical. Se arma con Card, IconBadge y Text.
 */
export function HowItWorks({ steps }: { steps: HowStep[] }) {
  return (
    <>
      {/* Desktop: fila con conectores */}
      <ol className="how-list hidden md:grid grid-cols-[1fr_28px_1.15fr_28px_1fr] items-center">
        {steps.map((step, i) => (
          <DesktopStep key={step.number} step={step} last={i === steps.length - 1} />
        ))}
      </ol>

      {/* Mobile: secuencia vertical, el paso destacado mantiene mayor jerarquía */}
      <ol className="how-list how-list-mobile md:hidden">
        {steps.map((step, i) => (
          <MobileStep key={step.number} step={step} last={i === steps.length - 1} />
        ))}
      </ol>
    </>
  )
}

function DesktopStep({ step, last }: { step: HowStep; last: boolean }) {
  return (
    <>
      <Card as="li" radius="xl" padding="lg" tone={step.featured ? "brand" : "default"} className="how-card">
        <div className="how-card__head">
          <span className="how-card__number" aria-hidden="true" />
          <IconBadge size="md" tone={step.featured ? "brand" : "subtle"}>{step.icon}</IconBadge>
        </div>
        <Text size="md" weight="semibold">{step.title}</Text>
        <Text size="sm" tone="secondary">{step.text}</Text>
        {step.progress && <StepProgress progress={step.progress} />}
      </Card>
      {!last && (
        <li aria-hidden="true" className="how-connector justify-self-center">
          <ArrowRight className="icon-md how-arrow" />
        </li>
      )}
    </>
  )
}

function MobileStep({ step, last }: { step: HowStep; last: boolean }) {
  return (
    <>
      <Card as="li" radius="xl" padding="md" tone={step.featured ? "brand" : "default"} className="how-card how-card--row">
        <span className="how-card__number how-card__number--small" aria-hidden="true" />
        <div>
          <Text size="md" weight="semibold" className="how-card__title">{step.title}</Text>
          <Text size="sm" tone="secondary">{step.text}</Text>
          {step.progress && <StepProgress progress={step.progress} />}
        </div>
      </Card>
      {!last && (
        <li aria-hidden="true" className="how-connector how-connector--down">
          <ArrowDown className="icon-sm how-arrow" />
        </li>
      )}
    </>
  )
}
