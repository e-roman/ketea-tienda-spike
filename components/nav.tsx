"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { ShoppingCart, Menu, X, User } from "lucide-react"
import { toast } from "sonner"
import { useCart } from "@/lib/cart-context"
import { searchProducts } from "@/lib/products"
import AuthModal from "@/components/auth-modal"
import { Badge } from "@/components/ui/badge"
import { iconButtonClasses } from "@/components/ui/icon-button"
import { UtilityBar } from "@/components/patterns/header/utility-bar"
import { CheckoutHeader } from "@/components/patterns/header/checkout-header"
import { CategoriesMenu } from "@/components/patterns/header/categories-menu"
import { MobileMenu } from "@/components/patterns/header/mobile-menu"
import { SearchField } from "@/components/patterns/header/search-field"
import { SearchResultsDropdown, MobileSearchResults } from "@/components/patterns/header/search-results"
import { Logo } from "@/components/ui/logo"

/**
 * Header del sitio: orquesta el estado (búsqueda, menús, modal de acceso) y compone los patterns de
 * components/patterns/header/*. Estilos en styles/patterns/header.css y styles/components/nav.css.
 */
export default function Nav() {
  const { totalItems, openCart, add } = useCart()
  const router = useRouter()
  const pathname = usePathname()
  const isCheckout = pathname?.startsWith("/checkout")

  const [mobileOpen, setMobileOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)

  const [query, setQuery] = useState("")
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [addingId, setAddingId] = useState<string | null>(null)
  const searchWrapRef = useRef<HTMLDivElement>(null)
  const mobileSearchWrapRef = useRef<HTMLDivElement>(null)

  const results = searchProducts(query, 6)

  function handleQuickAdd(product: Parameters<typeof add>[0]) {
    if (addingId) return
    setAddingId(product.id)
    setTimeout(() => {
      add(product)
      toast.success(`${product.shortName} agregado al carrito`)
      setAddingId(null)
    }, 500)
  }

  function closeMobileMenu() {
    setMobileOpen(false)
  }

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target as Node)) {
        setSearchOpen(false)
      }
      if (mobileSearchWrapRef.current && !mobileSearchWrapRef.current.contains(e.target as Node)) {
        setMobileSearchOpen(false)
      }
    }
    document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [])

  function goToSearch() {
    const q = query.trim()
    if (!q) return
    setSearchOpen(false)
    setMobileOpen(false)
    setMobileSearchOpen(false)
    router.push(`/productos?q=${encodeURIComponent(q)}`)
    setQuery("")
  }

  // El Nav no se desmonta al navegar (vive en el layout), así que si no se
  // resetea a mano el input de búsqueda queda con el texto y el botón X
  // pegados de la última búsqueda, aunque ya estés en otra página.
  useEffect(() => {
    setQuery("")
    setSearchOpen(false)
    setMobileSearchOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") goToSearch()
    if (e.key === "Escape") setSearchOpen(false)
  }

  function onSelectResult() {
    setSearchOpen(false)
    setMobileSearchOpen(false)
    closeMobileMenu()
    setQuery("")
  }

  if (isCheckout) return <CheckoutHeader />

  const cartButton = (flush?: "end") => (
    <button onClick={openCart} aria-label="Abrir carrito" className={iconButtonClasses({ size: "sm", flush })}>
      <ShoppingCart className="icon-md" />
      {totalItems > 0 && <Badge variant="counter" className="icon-btn__badge">{totalItems}</Badge>}
    </button>
  )

  return (
    <>
      <UtilityBar hiddenOnMobile={mobileSearchOpen} />

      <header className="site-header">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          {/* ── Mobile: fila de íconos (menú / logo / usuario + carrito) ── */}
          <div className="header-row-mobile grid grid-cols-3 md:hidden items-center">
            <div className="justify-self-start">
              <button
                className={iconButtonClasses({ size: "sm", flush: "start" })}
                onClick={() => (mobileOpen ? closeMobileMenu() : setMobileOpen(true))}
                aria-label="Menú"
              >
                {mobileOpen ? <X className="icon-md" /> : <Menu className="icon-md" />}
              </button>
            </div>

            <Link href="/" className="header-logo justify-self-center">
              <Logo size="sm" />
            </Link>

            <div className="header-actions justify-self-end">
              <button
                onClick={() => setAuthModalOpen(true)}
                aria-label="Ingresar o registrarse"
                className={iconButtonClasses({ size: "sm" })}
              >
                <User className="icon-md" aria-hidden="true" />
              </button>
              {cartButton("end")}
            </div>
          </div>

          {/* ── Mobile: fila de búsqueda, siempre visible ── */}
          <div ref={mobileSearchWrapRef} className="header-search-mobile md:hidden">
            <SearchField
              variant="mobile"
              value={query}
              onChange={(v) => { setQuery(v); setMobileSearchOpen(true) }}
              onFocus={() => setMobileSearchOpen(true)}
              onKeyDown={handleSearchKeyDown}
              onClear={() => setQuery("")}
              onSubmit={goToSearch}
            />
            {mobileSearchOpen && query.trim() && (
              <MobileSearchResults
                query={query}
                results={results}
                onSelect={onSelectResult}
                onSeeAll={goToSearch}
                addingId={addingId}
                onQuickAdd={handleQuickAdd}
              />
            )}
          </div>

          {/* ── Desktop: logo / búsqueda / acciones ── */}
          <div className="header-row-desktop">
            <Link href="/" className="header-logo">
              <Logo size="lg" />
            </Link>

            <SearchField
              variant="desktop"
              wrapRef={searchWrapRef}
              value={query}
              onChange={(v) => { setQuery(v); setSearchOpen(true) }}
              onFocus={() => setSearchOpen(true)}
              onKeyDown={handleSearchKeyDown}
              onClear={() => setQuery("")}
              onSubmit={goToSearch}
            >
              {searchOpen && query.trim() && (
                <SearchResultsDropdown query={query} results={results} onSelect={onSelectResult} onSeeAll={goToSearch} />
              )}
            </SearchField>

            <div className="header-actions header-actions--wide">
              <button onClick={() => setAuthModalOpen(true)} className={iconButtonClasses({ size: "sm", label: true })}>
                <User className="icon-md" aria-hidden="true" />
                Ingresar
              </button>
              {cartButton()}
            </div>
          </div>
        </div>

        {/* Categories row (desktop) */}
        <div className="site-header__subnav hidden md:block">
          <div className="max-w-7xl mx-auto px-4 md:px-6 header-subnav-row">
            <div className="header-subnav-group">
              <CategoriesMenu />
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/productos" className="nav-link">Novedades</Link>
              <Link href="/productos?nav=ofertas" className="nav-link">Ofertas de la semana</Link>
              <Link href="/productos" className="nav-link">Más vendido</Link>
              <Link href="/contacto" className="nav-link">Sucursales</Link>
              <Link href="/contacto" className="nav-link">Contacto</Link>
            </div>

            <div className="header-subnav-group header-subnav-group--end">
              <button type="button" onClick={() => setAuthModalOpen(true)} className="nav-link nav-link--icon">
                <User className="icon-sm" aria-hidden="true" />
                Mi cuenta / Registrarme
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && <MobileMenu onClose={closeMobileMenu} onOpenAuth={() => setAuthModalOpen(true)} />}
      </header>

      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  )
}
