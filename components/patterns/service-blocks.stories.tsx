import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ServiceBlocks } from './service-blocks'

const meta = {
  title: 'Patterns/Service blocks',
  component: ServiceBlocks,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    items: [
      { image: '/assets/svg/icons/icon1.svg', title: 'Soporte 24/7', desc: 'Contáctanos las 24 horas, los 7 días de la semana.' },
      { image: '/assets/svg/icons/icon2.svg', title: '30 días de devolución', desc: 'Reembolso completo dentro de los 30 días posteriores a la compra.' },
      { image: '/assets/svg/icons/icon3.svg', title: 'Envío gratuito', desc: 'Recibe automáticamente envío estándar gratuito en cada pedido.' },
    ],
  },
} satisfies Meta<typeof ServiceBlocks>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
