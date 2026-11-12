import Image from "next/image"
import { cn } from "@/lib/utils"

// Mapa literal: Tailwind purga las clases de @layer components que no encuentra escritas.
const SIZE = { sm: "logo--sm", md: "logo--md", lg: "logo--lg", checkout: "logo--checkout" } as const

/** Logotipo — clases de styles/components/logo.css. */
export function Logo({ size = "md", className }: { size?: keyof typeof SIZE; className?: string }) {
  return (
    <Image src="/assets/img/logo/logo-ketea.svg" alt="Ketea" width={164} height={43} priority className={cn("logo", SIZE[size], className)} />
  )
}
