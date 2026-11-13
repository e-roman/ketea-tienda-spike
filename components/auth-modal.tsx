"use client"

import { toast } from "sonner"
import { Modal } from "@/components/patterns/modal"
import { AccountAccessForm } from "@/components/patterns/account-access-form"
import { useAuth } from "@/lib/auth-context"

export default function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { login } = useAuth()
  return (
    <Modal open={open} onClose={onClose} label="Ingresá o registrate" size="md" layer="top" scrim="strong" closeButton>
      <AccountAccessForm
        onSuccess={({ mode, email }) => {
          login(email)
          toast.success(mode === "register" ? "¡Cuenta creada con éxito!" : "¡Sesión iniciada!")
          onClose()
        }}
      />
    </Modal>
  )
}
