import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { StepIndicator } from './step-indicator'

const steps = [
  { id: 'cuenta', label: 'Cuenta' },
  { id: 'envio', label: 'Envío' },
  { id: 'pago', label: 'Pago' },
]

const meta = {
  title: 'Patterns/Step indicator',
  component: StepIndicator,
  tags: ['autodocs'],
  args: { steps, current: 'envio', onStepClick: fn() },
} satisfies Meta<typeof StepIndicator>
export default meta
type Story = StoryObj<typeof meta>

export const First: Story = { args: { current: 'cuenta' } }
export const Middle: Story = {}
export const Last: Story = { args: { current: 'pago' } }
