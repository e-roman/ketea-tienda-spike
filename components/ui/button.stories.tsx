import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Button } from './button'

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Comprar' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'add-to-cart', 'secondary', 'outline', 'neutral', 'inverse', 'outline-inverse', 'link'],
    },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl'] },
    shape: { control: 'inline-radio', options: ['default', 'pill'] },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
export const AddToCart: Story = { args: { variant: 'add-to-cart', children: 'Agregar al carrito' } }
export const Secondary: Story = { args: { variant: 'secondary' } }
export const Outline: Story = { args: { variant: 'outline' } }
export const Pill: Story = { args: { shape: 'pill' } }
export const Loading: Story = { args: { loading: true, loadingText: 'Procesando…' } }
export const Disabled: Story = { args: { disabled: true } }
export const Inverse: Story = {
  args: { variant: 'inverse' },
  parameters: { backgrounds: { default: 'dark' } },
}
