import type { HTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

/** Piezas de formulario — clases de styles/components/form-parts.css. */

export function FormHeader({ title, subtitle, as: Title = "h2", className }: {
  title: ReactNode
  subtitle?: ReactNode
  as?: "h1" | "h2" | "h3"
  className?: string
}) {
  return (
    <div className={cn("form-header", className)}>
      <Title className="form-header__title">{title}</Title>
      {subtitle && <p className="form-header__subtitle">{subtitle}</p>}
    </div>
  )
}

export function FormDivider({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("form-divider", className)} {...props}>{children}</div>
}

export function FormFootnote({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("form-footnote", className)} {...props}>{children}</p>
}
