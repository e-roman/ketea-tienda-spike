import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Truck } from 'lucide-react'
import { IconBadge } from './icon-badge'

const meta = {
  title: 'UI/Icon badge',
  component: IconBadge,
  tags: ['autodocs'],
  args: { children: <Truck aria-hidden="true" /> },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'xxl', 'control', 'tile'] },
    tone: { control: 'select', options: ['default', 'subtle', 'brand', 'brand-subtle', 'muted', 'plain', 'soft-brand', 'glass', 'success'] },
    shape: { control: 'inline-radio', options: ['round', 'tile'] },
  },
} satisfies Meta<typeof IconBadge>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Brand: Story = { args: { tone: 'brand' } }
export const Success: Story = { args: { tone: 'success' } }
export const Tile: Story = { args: { shape: 'tile', size: 'lg' } }
