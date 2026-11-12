import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PromoBanner } from './promo-banner'
import { sampleProduct } from '../../.storybook/fixtures'

const meta = {
  title: 'Patterns/Promo banner',
  component: PromoBanner,
  tags: ['autodocs'],
  args: {
    image: sampleProduct.image,
    imageAlt: sampleProduct.name,
    title: 'Bombas de calor para piscinas',
    href: '/productos',
  },
  decorators: [(Story) => <div style={{ maxWidth: 560 }}><Story /></div>],
} satisfies Meta<typeof PromoBanner>
export default meta
type Story = StoryObj<typeof meta>

export const Small: Story = { args: { size: 'sm', title: 'Dosificadores' } }
export const Medium: Story = { args: { size: 'md', title: 'Filtros para piscinas', text: 'Descuento del mes' } }
export const Large: Story = { args: { size: 'lg', eyebrow: '¡Nuevos ingresos!' } }
