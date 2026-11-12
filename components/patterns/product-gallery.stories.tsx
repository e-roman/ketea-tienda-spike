import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ProductGallery } from './product-gallery'
import { sampleProduct } from '../../.storybook/fixtures'

const meta = {
  title: 'Patterns/Product gallery',
  component: ProductGallery,
  tags: ['autodocs'],
  args: { product: sampleProduct },
  decorators: [(Story) => <div style={{ maxWidth: 480, height: 480 }}><Story /></div>],
} satisfies Meta<typeof ProductGallery>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
