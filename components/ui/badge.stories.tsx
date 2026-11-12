import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Badge } from './badge'

const meta = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { variant: 'discount', children: '-20%' },
} satisfies Meta<typeof Badge>
export default meta
type Story = StoryObj<typeof meta>

export const Discount: Story = {}
export const Dietary: Story = { args: { variant: 'dietary', children: 'Vegano' } }
export const Counter: Story = { args: { variant: 'counter', children: '3' } }
export const Outline: Story = { args: { variant: 'outline', children: 'Sin TACC' } }
