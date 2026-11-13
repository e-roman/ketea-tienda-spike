"use client"

import Image from "next/image"
import { useState } from "react"
import { Check, Download, FileText, Lightbulb, MessageCircle, Minus, Plus, ShieldCheck, X } from "lucide-react"
import { Tabs } from "@/components/ui/tabs"
import { getProductDetails, type Faq, type ProductDetails } from "@/lib/product-details"
import type { Product } from "@/lib/products"

type TabId = "descripcion" | "especificaciones" | "recursos" | "preguntas" | "garantia"

function Description({ d }: { d: ProductDetails }) {
  return (
    <div className="ptabs__stack">
      <div className="ptabs__prose">
        {d.description.map((p) => <p key={p}>{p}</p>)}
      </div>

      {d.sections.map((s) => (
        <section key={s.title} className="ptabs__section">
          <h3 className="ptabs__heading">{s.title}</h3>
          <ul className="ptabs__list">
            {s.items.map((item, n) => (
              <li key={`${n}-${item.label ?? item.text}`}>
                {item.label && <strong>{item.label}: </strong>}{item.text}
                {item.subitems && (
                  <ul className="ptabs__sublist">
                    {item.subitems.map((sub) => <li key={sub}>{sub}</li>)}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}

      {(d.includes.length > 0 || d.notIncluded.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {d.includes.length > 0 && (
            <div className="ptabs__box">
              <h3 className="ptabs__box-title">Qué incluye</h3>
              <ul className="ptabs__checks">
                {d.includes.map((i) => <li key={i}><Check className="ptabs__icon ptabs__icon--ok" aria-hidden="true" />{i}</li>)}
              </ul>
            </div>
          )}
          {d.notIncluded.length > 0 && (
            <div className="ptabs__box">
              <h3 className="ptabs__box-title">No incluye</h3>
              <ul className="ptabs__checks">
                {d.notIncluded.map((i) => <li key={i}><X className="ptabs__icon" aria-hidden="true" />{i}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}

      {d.tips.length > 0 && (
        <div className="callout callout--rich callout--info">
          <Lightbulb aria-hidden="true" />
          <div>
            <p className="callout__title">Consejos prácticos</p>
            <ul className="ptabs__tips">
              {d.tips.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </div>
      )}

      {d.featureBlocks.map((b, i) => (
        <section key={b.title} className={i % 2 === 0 ? "ptabs__feature" : "ptabs__feature ptabs__feature--flip"}>
          <div className="ptabs__feature-text">
            <h3 className="ptabs__heading">{b.title}</h3>
            {b.text.map((t) => <p key={t}>{t}</p>)}
          </div>
          {b.image && (
            <div className="ptabs__feature-media">
              <Image src={b.image} alt={b.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="ptabs__feature-image" />
            </div>
          )}
        </section>
      ))}
    </div>
  )
}

function Specs({ d }: { d: ProductDetails }) {
  return (
    <div className="ptabs__specs">
      {d.specs.map((g) => (
        <section key={g.group} className="ptabs__spec-group">
          <h3 className="ptabs__heading">{g.group}</h3>
          <dl className="ptabs__table">
            {g.items.map((i) => (
              <div key={i.label} className="ptabs__row">
                <dt>{i.label}</dt>
                <dd>{i.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  )
}

/** Manuales y fichas descargables. Los datos de Ketea traen "#" como enlace provisorio: en ese caso el enlace no navega. */
function Resources({ d }: { d: ProductDetails }) {
  return (
    <ul className="ptabs__resources">
      {d.resources.map((r) => (
        <li key={r.label}>
          <a
            href={r.url}
            onClick={r.url === "#" ? (e) => e.preventDefault() : undefined}
            {...(r.url !== "#" ? { target: "_blank", rel: "noopener noreferrer", download: true } : {})}
            className="ptabs__resource"
          >
            <FileText className="ptabs__resource-icon" aria-hidden="true" />
            <span className="ptabs__resource-label">{r.label}</span>
            <span className="ptabs__resource-type">{r.type}</span>
            <Download className="ptabs__resource-download" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  )
}

function FaqList({ faq }: { faq: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <ul className="ptabs__faq">
      {faq.map((f, i) => {
        const isOpen = open === i
        return (
          <li key={f.q} className="ptabs__faq-item">
            <h3>
              <button type="button" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} aria-controls={`faq-${i}`} className="ptabs__faq-trigger">
                {f.q}
                {isOpen ? <Minus aria-hidden="true" /> : <Plus aria-hidden="true" />}
              </button>
            </h3>
            <p id={`faq-${i}`} hidden={!isOpen} className="ptabs__faq-answer">{f.a}</p>
          </li>
        )
      })}
    </ul>
  )
}

function Warranty({ d }: { d: ProductDetails }) {
  return (
    <div className="ptabs__stack">
      <div className="ptabs__warranty">
        <ShieldCheck aria-hidden="true" />
        <div>
          <h3 className="ptabs__warranty-title">{d.warrantyMonths ? `${d.warrantyMonths} meses de garantía oficial` : "Garantía oficial"}</h3>
          <p>{d.warrantyText}</p>
        </div>
      </div>
      <div className="ptabs__warranty">
        <MessageCircle aria-hidden="true" />
        <div>
          <h3 className="ptabs__warranty-title">Soporte postventa</h3>
          <p>
            ¿Algo no anda como esperabas? Escribinos a <a href="mailto:info@ketea.com.ar" className="ptabs__link">info@ketea.com.ar</a> con tu número de pedido.
          </p>
        </div>
      </div>
    </div>
  )
}

/**
 * Pestañas del detalle (Figma: Product detail / Tabs): Descripción, Especificaciones, Preguntas frecuentes y Garantía y soporte.
 * Muestra lo que cada producto tiene cargado; el resto se completa con contenido genérico por categoría. Clases de styles/patterns/product-tabs.css.
 */
export function ProductTabs({ product }: { product: Product }) {
  const d = getProductDetails(product)
  const items = [
    ...(d.description.length > 0 ? [{ id: "descripcion" as const, label: "Descripción" }] : []),
    { id: "especificaciones" as const, label: "Especificaciones" },
    ...(d.resources.length > 0 ? [{ id: "recursos" as const, label: "Recursos y descargas" }] : []),
    { id: "preguntas" as const, label: "Preguntas frecuentes" },
    { id: "garantia" as const, label: "Garantía y soporte" },
  ]
  const [tab, setTab] = useState<TabId>(items[0].id)

  return (
    <section id="detalles-producto" className="ptabs">
      <Tabs label="Detalles del producto" items={items} value={tab} onChange={setTab} className="ptabs__tabs" />
      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="ptabs__panel">
        {tab === "descripcion" && <Description d={d} />}
        {tab === "especificaciones" && <Specs d={d} />}
        {tab === "recursos" && <Resources d={d} />}
        {tab === "preguntas" && <FaqList faq={d.faq} />}
        {tab === "garantia" && <Warranty d={d} />}
      </div>
    </section>
  )
}
