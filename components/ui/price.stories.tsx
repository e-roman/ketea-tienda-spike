import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Price } from './price'

const meta = {
  title: 'UI/Price',
  component: Price,
  tags: ['autodocs'],
  args: { current: 8500 },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
} satisfies Meta<typeof Price>
export default meta
type Story = StoryObj<typeof meta>

export const Simple: Story = {}
export const WithDiscount: Story = { args: { current: 8500, previous: 10625, discountPercent: 20 } }
export const WithUnitPrice: Story = { args: { current: 8500, previous: 10625, discountPercent: 20, unit: 850, size: 'lg' } }
