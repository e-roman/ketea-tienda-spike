import type { Product } from "@/lib/products"

/** Sello octogonal conforme Ley 27.642 de Etiquetado Frontal (Argentina). Clases de styles/patterns/product-specs.css. */
export function WarningSeal({ text }: { text: string }) {
  const lines = text.toUpperCase().split(" ")
  return (
    <div className="warning-seal" aria-label={`EXCESO EN ${text}`} role="img">
      <span className="warning-seal__line warning-seal__line--lead">EXCESO EN</span>
      {lines.map((line, i) => (
        <span key={i} className="warning-seal__line">{line}</span>
      ))}
    </div>
  )
}

/** Tabla nutricional (Figma: Product Detail / Nutrition table). */
export function NutritionTable({ table }: { table: NonNullable<Product["nutritionTable"]> }) {
  return (
    <div>
      <p className="spec-block__title spec-block__title--table">Tabla Nutricional</p>
      <p className="spec-block__caption">Porción: {table.portion}</p>
      <table className="nutrition-table">
        <thead>
          <tr>
            <th scope="col">Nutriente</th>
            <th scope="col">Por {table.portion}</th>
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row.label}>
              <td>{row.label}</td>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Panel «Descripción» de la ficha. */
export function ProductDescription({ product }: { product: Product }) {
  return (
    <div role="tabpanel" id="panel-descripcion" aria-labelledby="tab-descripcion" className="spec-panel spec-panel--tight">
      <p className="spec-block__text">{product.description}</p>
      {product.ingredients && (
        <div>
          <p className="spec-block__title">Ingredientes</p>
          <p className="spec-block__text">{product.ingredients}</p>
        </div>
      )}
    </div>
  )
}

/** Panel «Especificaciones» de la ficha (Figma: Product / Specs). */
export function ProductSpecs({ product, sku }: { product: Product; sku: string }) {
  const hasWarnings = !!product.legalWarnings && product.legalWarnings.length > 0
  return (
    <div role="tabpanel" id="panel-especificaciones" aria-labelledby="tab-especificaciones" className="spec-panel">
      <div className="spec-meta">
        <div>
          <span className="spec-meta__key">SKU: </span>
          <span className="spec-meta__value">{sku}</span>
        </div>
        <div>
          <span className="spec-meta__key">Contenido: </span>
          <span className="spec-meta__value">{product.packInfo}</span>
        </div>
      </div>

      {product.conservation && (
        <div>
          <p className="spec-block__title">Conservación</p>
          <p className="spec-block__text">{product.conservation}</p>
        </div>
      )}

      {product.nutritionTable && <NutritionTable table={product.nutritionTable} />}

      {hasWarnings && (
        <div>
          <p className="spec-block__legal">Advertencias — Ley 27.642 de Etiquetado Frontal</p>
          <div className="spec-seals">
            {product.legalWarnings!.map((w) => (
              <WarningSeal key={w} text={w} />
            ))}
          </div>
        </div>
      )}

      {!product.conservation && !product.nutritionTable && !hasWarnings && (
        <p className="spec-block__text">No hay especificaciones adicionales para este producto.</p>
      )}
    </div>
  )
}
