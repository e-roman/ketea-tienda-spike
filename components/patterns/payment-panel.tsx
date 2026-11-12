import { Button } from "@/components/ui/button"
import { Heading, Text } from "@/components/ui/text"
import { IconBadge } from "@/components/ui/icon-badge"
import { formatPrice } from "@/lib/products"

/** Paso de pago: redirección a Mercado Pago con el total. Clases de styles/patterns/page-parts.css. */
export function PaymentPanel({ total, loading, onPay }: { total: number; loading: boolean; onPay: () => void }) {
  return (
    <div className="payment-panel">
      <IconBadge size="xl" tone="muted" className="payment-panel__logo icon-badge--square">
        {/* TODO: reemplazar por el asset "Payment method icon" de Figma */}
        <Text as="span" size="xl" weight="bold">MP</Text>
      </IconBadge>
      <Text size="sm" tone="secondary" className="payment-panel__text">
        Serás redirigido a Mercado Pago para completar el pago de forma segura.
      </Text>
      <Heading as="p" size="2xl" weight="bold" className="payment-panel__total">{formatPrice(total)}</Heading>
      <Button fullWidth onClick={onPay} loading={loading} loadingText="Redirigiendo…">
        Pagar con Mercado Pago
      </Button>
      <Text size="xs" tone="secondary" className="payment-panel__note">Tarjetas, cuotas sin interés y saldo MP</Text>
    </div>
  )
}
