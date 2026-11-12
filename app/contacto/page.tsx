import Link from "next/link"
import { Phone, Instagram, Facebook, MapPin, Clock } from "lucide-react"
import { linkClasses } from "@/components/ui/link"
import { iconButtonClasses } from "@/components/ui/icon-button"
import { PageHeader } from "@/components/patterns/page-header"
import { FeatureRow } from "@/components/patterns/feature-row"

export default function ContactoPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-14">
      <PageHeader eyebrow="Contacto" title="¿Necesitás ayuda?">
        Escribinos y te respondemos a la brevedad. También podés revisar nuestras{" "}
        <Link href="/preguntas-frecuentes" className={linkClasses()}>
          preguntas frecuentes
        </Link>{" "}
        antes de escribir, capaz ya está resuelta ahí.
      </PageHeader>

      <div className="space-y-4 mb-14">
        <FeatureRow variant="card" href="https://api.whatsapp.com/send?phone=5491130655787" icon={<Phone className="icon-md" aria-hidden="true" />} title="WhatsApp">
          (+54) 911 3065-5787
        </FeatureRow>
        <FeatureRow variant="card" icon={<Clock className="icon-md" aria-hidden="true" />} title="Horario de atención">
          Lunes a viernes de 9 a 18 hs
        </FeatureRow>
        <FeatureRow variant="card" icon={<MapPin className="icon-md" aria-hidden="true" />} title="Zona de entrega">
          Envío gratis en CABA · GBA: consultanos al (+54) 911 3065-5787
        </FeatureRow>
      </div>

      <div className="actions-row">
        <a
          href="https://www.instagram.com/orali.argentina/"
          target="_blank"
          rel="noopener noreferrer"
          className={iconButtonClasses({ variant: "subtle", size: "lg" })}
          aria-label="Instagram"
        >
          <Instagram className="icon-md" />
        </a>
        <a
          href="https://www.facebook.com/pastasorali"
          target="_blank"
          rel="noopener noreferrer"
          className={iconButtonClasses({ variant: "subtle", size: "lg" })}
          aria-label="Facebook"
        >
          <Facebook className="icon-md" />
        </a>
      </div>
    </div>
  )
}
