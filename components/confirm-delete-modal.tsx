"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/patterns/modal"
import { toastRemoved } from "@/components/ui/toaster"

export default function ConfirmDeleteModal({
  open, productName, onCancel, onConfirm,
}: {
  open: boolean
  productName: string
  onCancel: () => void
  onConfirm: () => void
}) {
  const [loading, setLoading] = useState(false)

  function handleConfirm() {
    if (loading) return
    setLoading(true)
    setTimeout(() => {
      onConfirm()
      setLoading(false)
      toastRemoved("Producto eliminado del carrito")
    }, 500)
  }

  return (
    <Modal open={open} onClose={onCancel} role="alertdialog" label="¿Eliminar producto?" size="sm">
      <div className="modal__icon">
        <Trash2 aria-hidden="true" />
      </div>
      <h3 className="modal__title">¿Eliminar producto?</h3>
      <p className="modal__text">
        Se va a quitar <strong>{productName}</strong> de tu carrito.
      </p>
      <div className="modal__actions">
        <Button variant="neutral" fullWidth onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="danger" fullWidth onClick={handleConfirm} loading={loading} loadingText="Eliminando…">
          Eliminar
        </Button>
      </div>
    </Modal>
  )
}
