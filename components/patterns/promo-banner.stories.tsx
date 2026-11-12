import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Tag } from 'lucide-react'
import { PromoBanner } from './promo-banner'
import { sampleProduct } from '../../.storybook/fixtures'

const meta = {
  title: 'Patterns/Promo banner',
  component: PromoBanner,
  tags: ['autodocs'],
  args: {
    image: sampleProduct.image,
    imageAlt: sampleProduct.name,
    icon: <Tag aria-hidden="true" />,
    title: 'Ofertas de la semana',
    text: 'Hasta 20% off en packs seleccionados.',
    href: '/ofertas',
  },
  decorators: [(Story) => <div style={{ maxWidth: 560 }}><Story /></div>],
} satisfies Meta<typeof PromoBanner>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const CustomCta: Story = { args: { cta: 'Aprovechar ahora' } }
