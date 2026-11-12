import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { RatingScale } from './rating-scale'

const meta = {
  title: 'UI/Rating scale',
  component: RatingScale,
  tags: ['autodocs'],
  args: { value: null, onChange: () => {} },
} satisfies Meta<typeof RatingScale>
export default meta
type Story = StoryObj<typeof meta>

function Interactive(props: { max?: number }) {
  const [value, setValue] = useState<number | null>(null)
  return <RatingScale {...props} value={value} onChange={setValue} />
}

export const Default: Story = { render: () => <Interactive /> }
export const OneToFive: Story = { render: () => <Interactive max={5} /> }
export const Preselected: Story = { args: { value: 8 } }
