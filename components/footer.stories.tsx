import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Footer from './footer'

const meta = {
  title: 'Components/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen', nextjs: { navigation: { pathname: '/' } } },
} satisfies Meta<typeof Footer>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
/** En checkout el footer no lleva margen superior. */
export const Checkout: Story = {
  parameters: { nextjs: { navigation: { pathname: '/checkout' } } },
}
