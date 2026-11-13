import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Nav from './nav'
import { SeedCart, sampleProducts } from '../.storybook/fixtures'

const meta = {
  title: 'Components/Nav',
  component: Nav,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen', nextjs: { navigation: { pathname: '/' } } },
} satisfies Meta<typeof Nav>
export default meta
type Story = StoryObj<typeof meta>

/** Escribí en el buscador y abrí «Todas las categorías» para ver los desplegables. */
export const Desktop: Story = {}
export const WithItemsInCart: Story = {
  decorators: [(Story) => <SeedCart items={[{ product: sampleProducts[0], quantity: 3 }]}><Story /></SeedCart>],
}
export const Mobile: Story = {
  globals: { viewport: { value: 'mobile1', isRotated: false } },
}
/** En checkout el header se simplifica. */
export const Checkout: Story = {
  parameters: { nextjs: { navigation: { pathname: '/checkout' } } },
}
