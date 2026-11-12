import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { BuyBox } from './buy-box'
import { sampleProduct, saleProduct } from '../../.storybook/fixtures'

const meta = {
  title: 'Patterns/Buy box',
  component: BuyBox,
  tags: ['autodocs'],
  args: { product: sampleProduct },
  decorators: [(Story) => <div style={{ maxWidth: 420 }}><Story /></div>],
} satisfies Meta<typeof BuyBox>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const OnSale: Story = { args: { product: saleProduct } }
export const FreezerFriendly: Story = {
  args: { product: { ...sampleProduct, badges: [...sampleProduct.badges, 'apto-freezer'] } },
}
