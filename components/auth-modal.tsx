"use client"

import { toast } from "sonner"
import { Modal } from "@/components/patterns/modal"
import { AccountAccessForm } from "@/components/patterns/account-access-form"

export default function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} label="Ingresá o registrate" size="md" layer="top" scrim="strong" closeButton>
      <AccountAccessForm
        onSuccess={({ mode }) => {
          toast.success(mode === "register" ? "¡Cuenta creada con éxito!" : "¡Sesión iniciada!")
          onClose()
        }}
      />
    </Modal>
  )
}
