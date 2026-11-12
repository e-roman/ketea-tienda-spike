import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Heading, Text } from './text'

const meta = {
  title: 'UI/Text',
  component: Text,
  tags: ['autodocs'],
  args: { children: 'Pastas frescas, la calidad que vos te merecés.' },
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] },
    tone: { control: 'select', options: ['primary', 'secondary', 'tertiary', 'brand', 'accent', 'success', 'error', 'inverse', 'inverse-muted', 'shipping-free'] },
    weight: { control: 'inline-radio', options: ['regular', 'medium', 'semibold', 'bold'] },
  },
} satisfies Meta<typeof Text>
export default meta
type Story = StoryObj<typeof meta>

export const Body: Story = {}
export const Secondary: Story = { args: { tone: 'secondary', size: 'sm' } }
export const Eyebrow: Story = { args: { eyebrow: true, size: 'xs', tone: 'brand', children: 'Nuevo' } }
export const Headings: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      {(['display', 'headline', 'title', 'subtitle', 'label', 'section', 'page'] as const).map((s) => (
        <Heading key={s} size={s}>{s}</Heading>
      ))}
    </div>
  ),
}
