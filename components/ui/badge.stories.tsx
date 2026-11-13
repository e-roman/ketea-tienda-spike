import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Badge } from './badge'

const meta = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { variant: 'discount', children: '-25% OFF' },
} satisfies Meta<typeof Badge>
export default meta
type Story = StoryObj<typeof meta>

export const Discount: Story = {}
export const Counter: Story = { args: { variant: 'counter', children: '3' } }
export const Outline: Story = { args: { variant: 'outline', children: '2 productos' } }
