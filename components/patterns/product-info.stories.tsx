import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { ProductInfo } from './product-info'
import { sampleProduct, saleProduct } from '../../.storybook/fixtures'

const meta = {
  title: 'Patterns/Product info',
  component: ProductInfo,
  tags: ['autodocs'],
  args: { product: sampleProduct, onViewSpecs: fn() },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
} satisfies Meta<typeof ProductInfo>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const OnSale: Story = { args: { product: saleProduct } }
