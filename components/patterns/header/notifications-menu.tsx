"use client"

import Link from "next/link"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { Bell, Package, Tag, TrendingDown } from "lucide-react"
import { useNotifications, type NotificationType } from "@/lib/notifications-context"
import { iconButtonClasses } from "@/components/ui/icon-button"
import { cn } from "@/lib/utils"

// Mapas literales: Tailwind purga las clases de @layer components que no encuentra escritas.
const ICON: Record<NotificationType, ReactNode> = {
  promo: <Tag aria-hidden="true" />,
  order: <Package aria-hidden="true" />,
  price: <TrendingDown aria-hidden="true" />,
}
const TONE: Record<NotificationType, string> = {
  promo: "notification__icon",
  order: "notification__icon notification__icon--success",
  price: "notification__icon notification__icon--warning",
}
const ITEM = { true: "notification", false: "notification notification--unread" } as const

/**
 * Campana con menú de notificaciones (Figma: Header / Notifications). El punto rojo indica avisos sin leer.
 * Se cierra con Escape, al hacer clic afuera o al abrir un aviso (que además queda leído). Clases de styles/patterns/notifications.css.
 */
export function NotificationsMenu() {
  const { items, unread, markRead, markAllRead } = useNotifications()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <div ref={rootRef} className="notifications">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="notifications-panel"
        aria-label={unread > 0 ? `Notificaciones (${unread} sin leer)` : "Notificaciones"}
        className={iconButtonClasses({ size: "sm" })}
      >
        <Bell className="icon-md" aria-hidden="true" />
        {unread > 0 && <span className="icon-btn__dot" aria-hidden="true" />}
      </button>

      {open && (
        <div id="notifications-panel" role="dialog" aria-label="Notificaciones" className="notifications__panel">
          <div className="notifications__head">
            <h2 className="notifications__title">Notificaciones</h2>
            {unread > 0 && (
              <button type="button" onClick={markAllRead} className="notifications__link">Marcar todas como leídas</button>
            )}
          </div>

          {items.length === 0 ? (
            <p className="notifications__empty">No tenés notificaciones por ahora.</p>
          ) : (
            <ul className="notifications__list">
              {items.map((n) => {
                const body = (
                  <>
                    <span className={TONE[n.type]}>{ICON[n.type]}</span>
                    <span className="notification__text">
                      <span className="notification__title">{n.title}</span>
                      <span className="notification__desc">{n.text}</span>
                      <span className="notification__time">{n.time}</span>
                    </span>
                    {!n.read && <span className="notification__dot" aria-label="Sin leer" />}
                  </>
                )
                const cls = cn(ITEM[String(n.read) as "true" | "false"])
                return (
                  <li key={n.id}>
                    {n.href ? (
                      <Link href={n.href} onClick={() => { markRead(n.id); setOpen(false) }} className={cls}>{body}</Link>
                    ) : (
                      <button type="button" onClick={() => markRead(n.id)} className={cls}>{body}</button>
                    )}
                  </li>
                )
              })}
            </ul>
          )}

          <div className="notifications__foot">
            <Link href="/cuenta" onClick={() => setOpen(false)} className="notifications__link">Ver todas en mi cuenta</Link>
          </div>
        </div>
      )}
    </div>
  )
}
