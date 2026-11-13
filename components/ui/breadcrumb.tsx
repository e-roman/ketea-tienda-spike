import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Fragment } from "react"
import { cn } from "@/lib/utils"

export interface BreadcrumbItem {
  label: string
  /** Sin href = página actual. */
  href?: string
}

/** Breadcrumb — clases `.breadcrumb*` de styles/components/breadcrumb.css. El último ítem es la página actual. */
export function Breadcrumb({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className={cn("breadcrumb")}>
        {items.map((item, i) => (
          <Fragment key={item.label}>
            {i > 0 && <ChevronRight className="breadcrumb__sep" aria-hidden="true" />}
            <li>
              {item.href ? (
                <Link href={item.href} className="breadcrumb__link">{item.label}</Link>
              ) : (
                <span className="breadcrumb__current" aria-current="page">{item.label}</span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  )
}
