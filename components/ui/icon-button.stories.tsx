import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Heart, ShoppingCart } from 'lucide-react'
import { iconButtonClasses, type IconButtonSize, type IconButtonVariant } from './icon-button'

const VARIANTS: IconButtonVariant[] = ['ghost', 'subtle', 'primary', 'success', 'plain']
const SIZES: IconButtonSize[] = ['sm', 'md', 'lg', 'xl']

const meta = { title: 'UI/Icon button', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      {VARIANTS.map((v) => (
        <button key={v} type="button" aria-label={v} className={iconButtonClasses({ variant: v })}><Heart aria-hidden="true" /></button>
      ))}
    </div>
  ),
}
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {SIZES.map((s) => (
        <button key={s} type="button" aria-label={s} className={iconButtonClasses({ size: s })}><ShoppingCart aria-hidden="true" /></button>
      ))}
    </div>
  ),
}
export const WithLabel: Story = {
  render: () => (
    <button type="button" className={iconButtonClasses({ label: true })}><Heart aria-hidden="true" />Favoritos</button>
  ),
}
