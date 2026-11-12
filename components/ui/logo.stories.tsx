import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Logo } from './logo'

const meta = {
  title: 'UI/Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'checkout'] } },
} satisfies Meta<typeof Logo>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Large: Story = { args: { size: 'lg' } }
export const Checkout: Story = { args: { size: 'checkout' } }
