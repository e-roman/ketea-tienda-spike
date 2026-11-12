import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Package, ShoppingCart, Truck } from 'lucide-react'
import { HowItWorks } from './how-it-works'

const meta = {
  title: 'Patterns/How it works',
  component: HowItWorks,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: {
    steps: [
      { number: '01', icon: <ShoppingCart aria-hidden="true" />, title: 'Elegí tus productos', text: 'Armá tu pedido con los packs que quieras.' },
      { number: '02', icon: <Package aria-hidden="true" />, title: 'Pedido mínimo de 4 packs', text: 'Llegá a 4 packs para finalizar la compra.', featured: true, progress: { current: 3, total: 4 } },
      { number: '03', icon: <Truck aria-hidden="true" />, title: 'Recibilo en casa', text: 'Envío gratis en CABA el día de tu zona.' },
    ],
  },
} satisfies Meta<typeof HowItWorks>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
