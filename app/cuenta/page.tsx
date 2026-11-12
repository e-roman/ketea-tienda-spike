import Link from "next/link"
import { buttonClasses } from "@/components/ui/button"
import { User } from "lucide-react"
import { EmptyState } from "@/components/patterns/empty-state"

export default function CuentaPage() {
  return (
    <EmptyState
      variant="page"
      iconTone="muted"
      className="max-w-lg mx-auto px-4 py-24"
      icon={<User className="icon-xl" aria-hidden="true" />}
      title="Mi cuenta"
      text="Muy pronto vas a poder crear tu cuenta o iniciar sesión para ver tu historial de pedidos. Por ahora, podés registrarte o ingresar al finalizar tu compra."
    >
      <Link href="/productos" className={buttonClasses()}>
        Ver productos
      </Link>
    </EmptyState>
  )
}
