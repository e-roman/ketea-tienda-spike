"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export default function RouteProgressBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [visible, setVisible] = useState(false)
  const [width, setWidth] = useState(0)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const isFirstRender = useRef(true)

  function clearTimeouts() {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
  }

  // Detecta el click en un link interno y arranca la barra
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const anchor = (e.target as HTMLElement)?.closest("a")
      if (!anchor) return
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return

      const href = anchor.getAttribute("href")
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return

      let url: URL
      try {
        url = new URL(href, window.location.href)
      } catch {
        return
      }
      if (url.origin !== window.location.origin) return
      if (url.pathname === window.location.pathname && url.search === window.location.search) return

      clearTimeouts()
      setVisible(true)
      setWidth(20)
      timeoutsRef.current.push(setTimeout(() => setWidth(55), 100))
      timeoutsRef.current.push(setTimeout(() => setWidth(78), 350))
    }

    document.addEventListener("click", onClick)
    return () => {
      document.removeEventListener("click", onClick)
      clearTimeouts()
    }
  }, [])

  // Cuando la ruta efectivamente cambió, completa la barra y la esconde
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    clearTimeouts()
    setVisible(true)
    setWidth(100)
    const t = setTimeout(() => {
      setVisible(false)
      setWidth(0)
    }, 250)
    timeoutsRef.current.push(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams])

  if (!visible) return null

  return (
    <div className="route-progress">
      <div
        className="route-progress__bar"
        style={{
          width: `${width}%`,
          transition: `width ${width === 100 ? 200 : 400}ms ease-out, opacity 200ms ease-out`,
        }}
      />
    </div>
  )
}
