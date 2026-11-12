import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Progress } from './progress'

const meta = {
  title: 'UI/Progress',
  component: Progress,
  tags: ['autodocs'],
  args: { value: 60, label: 'Progreso del pedido mínimo' },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    state: { control: 'inline-radio', options: ['neutral', 'success', 'error'] },
    size: { control: 'inline-radio', options: ['md', 'sm'] },
  },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
} satisfies Meta<typeof Progress>
export default meta
type Story = StoryObj<typeof meta>

export const Neutral: Story = {}
export const Success: Story = { args: { value: 100, state: 'success' } }
export const ErrorState: Story = { args: { value: 30, state: 'error' } }
export const Small: Story = { args: { size: 'sm' } }
