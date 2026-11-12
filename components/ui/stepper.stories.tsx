import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Stepper } from './stepper'

const meta = {
  title: 'UI/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  args: { value: 1, label: 'Ravioles de ricota', onDecrement: () => {}, onIncrement: () => {} },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
} satisfies Meta<typeof Stepper>
export default meta
type Story = StoryObj<typeof meta>

function Interactive() {
  const [value, setValue] = useState(1)
  return (
    <Stepper
      label="Ravioles de ricota"
      value={value}
      onDecrement={() => setValue((v) => v - 1)}
      onIncrement={() => setValue((v) => v + 1)}
    />
  )
}

export const Default: Story = { render: () => <Interactive /> }
export const AtMinimum: Story = { args: { value: 0 } }
export const AtMaximum: Story = { args: { value: 5, max: 5 } }
export const LoadingIncrement: Story = { args: { value: 2, loading: 'inc' } }
export const Large: Story = { args: { size: 'lg', value: 3 } }
