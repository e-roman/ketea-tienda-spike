import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Price } from "@/components/ui/price"
import { formatPrice, getDiscountPercent, type Product } from "@/lib/products"

interface SearchResultsProps {
  query: string
  results: Product[]
  /** Se llama al elegir un producto (cierra el panel y limpia la búsqueda). */
  onSelect: () => void
  onSeeAll: () => void
}

/** Resultados de búsqueda desktop: dropdown bajo el input. Clases de styles/patterns/header.css. */
export function SearchResultsDropdown({ query, results, onSelect, onSeeAll }: SearchResultsProps) {
  return (
    <div className="dropdown__panel dropdown__panel--results">
      {results.length === 0 ? (
        <p className="search-empty">No encontramos resultados para &quot;{query}&quot;</p>
      ) : (
        <>
          {results.map((p) => (
            <Link key={p.id} href={`/productos/${p.slug}`} onClick={onSelect} className="menu-item search-result">
              <span className="product-thumb product-thumb--sm">
                <Image src={p.image} alt={p.name} fill />
              </span>
              <span className="search-result__body">
                <span className="search-result__name">{p.name}</span>
                <span className="search-result__meta">{p.packInfo}</span>
                <span className="search-result__price">{formatPrice(p.priceX3)}</span>
              </span>
            </Link>
          ))}
          <div className="dropdown__footer">
            <button onClick={onSeeAll} className="menu-item menu-item--brand">
              Ver todos los resultados para &quot;{query}&quot;
            </button>
          </div>
        </>
      )}
    </div>
  )
}

interface MobileSearchResultsProps extends SearchResultsProps {
  addingId: string | null
  onQuickAdd: (product: Product) => void
}

/** Resultados de búsqueda mobile: panel de pantalla completa bajo la barra de búsqueda. */
export function MobileSearchResults({ query, results, onSelect, onSeeAll, addingId, onQuickAdd }: MobileSearchResultsProps) {
  return (
    <div className="search-panel">
      <div className="search-panel__inner">
        <p className="search-panel__title">Productos para &quot;{query}&quot;</p>
        {results.length === 0 ? (
          <p className="search-empty search-empty--page">No encontramos resultados para &quot;{query}&quot;</p>
        ) : (
          <>
            <div className="divided">
              {results.map((p) => {
                const discountPercent = getDiscountPercent(p)
                return (
                  <div key={p.id} className="search-row">
                    <Link href={`/productos/${p.slug}`} onClick={onSelect} className="product-thumb product-thumb--sm">
                      <Image src={p.image} alt={p.name} fill />
                    </Link>
                    <Link href={`/productos/${p.slug}`} onClick={onSelect} className="search-row__link">
                      <span className="search-result__name">{p.name}</span>
                      <span className="search-result__meta search-result__meta--loose">{p.packInfo}</span>
                      <Price
                        size="sm"
                        current={p.priceX3}
                        previous={discountPercent > 0 ? p.originalPriceX3 : undefined}
                        discountPercent={discountPercent}
                      />
                    </Link>
                    <Button
                      variant="add-to-cart"
                      className="search-row__add"
                      onClick={() => onQuickAdd(p)}
                      loading={addingId === p.id}
                      aria-label={`Agregar ${p.name} al carrito`}
                    >
                      Agregar
                    </Button>
                  </div>
                )
              })}
            </div>
            <Button fullWidth className="search-panel__see-all" onClick={onSeeAll}>
              Ver todos los productos
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
