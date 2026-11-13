import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'
import { Switch } from './switch'

const meta = {
  title: 'UI/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: { label: 'Envío gratis' },
} satisfies Meta<typeof Switch>
export default meta
type Story = StoryObj<typeof meta>

export const Off: Story = {}
export const On: Story = { args: { defaultChecked: true } }
export const Disabled: Story = { args: { disabled: true } }
export const Controlled: Story = {
  render: (args) => {
    const [on, setOn] = useState(false)
    return <Switch {...args} checked={on} onChange={(e) => setOn(e.target.checked)} />
  },
}
