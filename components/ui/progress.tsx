import { cn } from "@/lib/utils"

// Mapas literales: Tailwind purga las clases de @layer components que no encuentra escritas.
const STATE = { neutral: "", success: "progress--success", error: "progress--error" } as const
const SIZE = { md: "", sm: "progress--sm" } as const

interface ProgressProps {
  /** 0–100 */
  value: number
  state?: keyof typeof STATE
  size?: keyof typeof SIZE
  label: string
  className?: string
}

/** Barra de progreso — clases de styles/components/progress.css. role="progressbar". */
export function Progress({ value, state = "neutral", size = "md", label, className }: ProgressProps) {
  const pct = Math.min(Math.max(value, 0), 100)
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pct)}
      className={cn("progress", STATE[state], SIZE[size], className)}
    >
      <div className="progress__fill" style={{ width: `${pct}%` }} />
    </div>
  )
}
