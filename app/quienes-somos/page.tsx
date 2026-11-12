import Link from "next/link"
import { buttonClasses } from "@/components/ui/button"
import { Clock, Target, HeartHandshake } from "lucide-react"
import { PageHeader } from "@/components/patterns/page-header"
import { FeatureRow } from "@/components/patterns/feature-row"
import { InfoPanel } from "@/components/patterns/info-panel"

export default function QuienesSomosPage() {
  const secciones = [
    {
      icon: Clock,
      title: "Nuestra historia",
      desc: "En 1967 Don Julio González comenzó a distribuir prepizzas en el barrio, en su Chevrolet 38. Al poco tiempo alquiló una panadería y estableció una fábrica artesanal donde empezó a elaborar las tapas para empanada y para pascualina, y luego las pastas frescas. Hoy su hijo Julio, y sus sobrinos José y Gustavo, llevan adelante este proyecto familiar que pasó de ser una pequeña fábrica que cortaba los discos a mano, a ser una empresa reconocida en todo el país.",
    },
    {
      icon: Target,
      title: "Nuestra misión",
      desc: "Ofrecer productos de la mejor calidad para las familias que cada día nos eligen en su mesa, manteniendo un sólido equilibrio de la relación precio–calidad y buscando la mejora constante en los procesos de producción.",
    },
    {
      icon: HeartHandshake,
      title: "Nuestros valores",
      desc: "Trabajamos con esfuerzo, humildad y sobre todo, con responsabilidad social. Nuestro compromiso con la comunidad se refleja en la confianza que construimos durante más de 55 años junto a quienes forman parte de esta gran familia.",
    },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-14">
      <PageHeader eyebrow="Quiénes somos" title="Desde 1967, en la mesa de las familias argentinas">
        Somos una pyme familiar. Elaboramos pastas frescas, tapas para empanadas y pascualinas, y también tortillas, panificados, texturizado de soja, línea apta vegana y línea sin TACC. Nuestro orgullo es que los argentinos nos sigan eligiendo desde hace más de 55 años.
      </PageHeader>

      <div className="space-y-8 mb-14">
        {secciones.map((v) => (
          <FeatureRow key={v.title} icon={<v.icon className="icon-md" aria-hidden="true" />} title={v.title}>
            {v.desc}
          </FeatureRow>
        ))}
      </div>

      <div className="mb-8">
        <InfoPanel title="Nuestros productos">
          Ravioles, sorrentinos, capeletti, ñoquis, fideos, tapas para empanadas, pascualinas, tortillas y empanadas rellenas. Todo elaborado bajo el mismo estándar de calidad que nos identifica desde el origen.
        </InfoPanel>
      </div>

      <div className="text-center-block">
        <Link href="/productos" className={buttonClasses()}>
          Ver catálogo
        </Link>
      </div>
    </div>
  )
}
