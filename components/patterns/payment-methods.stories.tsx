import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PaymentMethods } from './payment-methods'

const meta = {
  title: 'Patterns/Payment methods',
  component: PaymentMethods,
  tags: ['autodocs'],
  args: { total: 2597960, loading: false, onPay: () => {} },
  decorators: [(Story) => <div style={{ maxWidth: 640 }}><Story /></div>],
  parameters: { docs: { description: { component: 'Paso de pago **simulado** del checkout: MODO, Mercado Pago, tarjeta (con cuotas) y efectivo. No procesa pagos; para cobrar hay que reemplazarlo por el componente del proveedor.' } } },
} satisfies Meta<typeof PaymentMethods>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Loading: Story = { args: { loading: true } }
