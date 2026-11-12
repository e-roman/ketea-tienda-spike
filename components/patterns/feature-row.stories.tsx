import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Phone } from 'lucide-react'
import { FeatureRow } from './feature-row'

const meta = {
  title: 'Patterns/Feature row',
  component: FeatureRow,
  tags: ['autodocs'],
  args: {
    icon: <Phone aria-hidden="true" />,
    title: 'WhatsApp',
    children: 'Escribinos de lunes a sábado de 9 a 18 hs.',
  },
  argTypes: { variant: { control: 'inline-radio', options: ['plain', 'card'] } },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
} satisfies Meta<typeof FeatureRow>
export default meta
type Story = StoryObj<typeof meta>

export const Plain: Story = {}
export const Card: Story = { args: { variant: 'card' } }
export const CardLink: Story = { args: { variant: 'card', href: 'https://example.com' } }
