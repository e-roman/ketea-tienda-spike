import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { CreditCard, Headphones, ShieldCheck, Truck } from 'lucide-react'
import { TrustStrip } from './trust-strip'

const meta = {
  title: 'Patterns/Trust strip',
  component: TrustStrip,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    items: [
      { icon: <ShieldCheck aria-hidden="true" />, title: 'Compra segura', desc: 'Tus datos protegidos' },
      { icon: <CreditCard aria-hidden="true" />, title: 'Pagá como quieras', desc: 'Tarjetas y Mercado Pago' },
      { icon: <Truck aria-hidden="true" />, title: 'Envío gratis', desc: 'En CABA' },
      { icon: <Headphones aria-hidden="true" />, title: 'Te ayudamos', desc: 'Por WhatsApp' },
    ],
  },
} satisfies Meta<typeof TrustStrip>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
