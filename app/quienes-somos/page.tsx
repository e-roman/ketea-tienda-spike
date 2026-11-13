import Link from "next/link"
import { buttonClasses } from "@/components/ui/button"
import { Store, ShieldCheck, Headset } from "lucide-react"
import { PageHeader } from "@/components/patterns/page-header"
import { FeatureRow } from "@/components/patterns/feature-row"
import { InfoPanel } from "@/components/patterns/info-panel"

export default function QuienesSomosPage() {
  const secciones = [
    {
      icon: Store,
      title: "Piscinas y equipamiento",
      desc: "Robots limpiafondos, bombas de calor, filtros y químicos para tu pileta, de las marcas líderes del mercado.",
    },
    {
      icon: ShieldCheck,
      title: "Garantía oficial",
      desc: "Todos nuestros productos cuentan con garantía oficial de la marca y servicio técnico autorizado.",
    },
    {
      icon: Headset,
      title: "Te acompañamos",
      desc: "Atención por WhatsApp de lunes a viernes de 9 a 18 h, y retiro en nuestro local de Ramos Mejía.",
    },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-14">
      <PageHeader eyebrow="Quiénes somos" title="Todo para tu pileta, en un solo lugar">
        En Ketea te ayudamos a elegir, comprar y mantener el equipamiento de tu pileta.
      </PageHeader>

      <div className="space-y-8 mb-14">
        {secciones.map((v) => (
          <FeatureRow key={v.title} icon={<v.icon className="icon-md" aria-hidden="true" />} title={v.title}>
            {v.desc}
          </FeatureRow>
        ))}
      </div>

      <div className="mb-8">
        <InfoPanel title="Nuestro local">
          Ketea Ramos Mejía: Cnel. Brandsen 2230. Lunes a viernes de 9 a 18 h.
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
