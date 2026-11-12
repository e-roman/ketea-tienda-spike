import Link from "next/link"
import { buttonClasses } from "@/components/ui/button"
import { X } from "lucide-react"
import { EmptyState } from "@/components/patterns/empty-state"

export default function NotFound() {
  return (
    <EmptyState
      variant="page"
      iconTone="soft-brand"
      iconSize="xxl"
      className="max-w-lg mx-auto px-4 py-24"
      icon={<X className="icon-3xl" strokeWidth={2.5} aria-hidden="true" />}
      title="Página no encontrada"
      text="La página que buscás no existe, pero nuestros productos sí."
    >
      <Link href="/" className={buttonClasses()}>
        Volver al inicio
      </Link>
    </EmptyState>
  )
}
