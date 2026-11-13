import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { BrandsStrip } from './brands-strip'

const meta = {
  title: 'Patterns/Brands strip',
  component: BrandsStrip,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof BrandsStrip>
export default meta
type Story = StoryObj<typeof meta>

/** Logos en gris que se deslizan de costado; con flechas desde 768 px. */
export const Default: Story = {}
export const Mobile: Story = { globals: { viewport: { value: 'mobile1', isRotated: false } } }
