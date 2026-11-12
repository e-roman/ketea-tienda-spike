import Link from "next/link"
import { buttonClasses } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { EmptyState } from "@/components/patterns/empty-state"

export default function FavoritosPage() {
  return (
    <EmptyState
      variant="page"
      iconTone="muted"
      className="max-w-lg mx-auto px-4 py-24"
      icon={<Heart className="icon-xl" aria-hidden="true" />}
      title="Tus favoritos"
      text="Muy pronto vas a poder guardar tus productos favoritos para encontrarlos más rápido."
    >
      <Link href="/productos" className={buttonClasses()}>
        Ver productos
      </Link>
    </EmptyState>
  )
}
