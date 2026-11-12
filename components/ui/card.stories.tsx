import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Card } from './card'

const meta = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  args: { padding: 'md', children: 'Contenido de la tarjeta' },
  argTypes: {
    tone: { control: 'inline-radio', options: ['default', 'subtle', 'muted', 'brand'] },
    radius: { control: 'inline-radio', options: ['md', 'lg', 'xl'] },
    padding: { control: 'select', options: ['none', 'sm', 'md', 'lg', 'panel'] },
  },
} satisfies Meta<typeof Card>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Subtle: Story = { args: { tone: 'subtle' } }
export const Muted: Story = { args: { tone: 'muted' } }
export const Brand: Story = { args: { tone: 'brand' } }
export const WithShadow: Story = { args: { shadow: true, radius: 'lg' } }
export const Borderless: Story = { args: { borderless: true } }
