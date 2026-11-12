import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import MinimumProgressBar from './minimum-progress-bar'
import { SeedCart, sampleProduct } from '../.storybook/fixtures'

const meta = {
  title: 'Components/Minimum progress bar',
  component: MinimumProgressBar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen', nextjs: { navigation: { pathname: '/productos' } } },
} satisfies Meta<typeof MinimumProgressBar>
export default meta
type Story = StoryObj<typeof meta>

const withPacks = (quantity: number): NonNullable<Story['decorators']> => [
  (Story) => <SeedCart items={[{ product: sampleProduct, quantity }]}><Story /></SeedCart>,
]

/** Con el carrito vacío la barra no se muestra. */
export const InProgress: Story = { decorators: withPacks(2) }
export const MinimumMet: Story = { decorators: withPacks(4) }
