import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PageHeader } from './page-header'

const meta = {
  title: 'Patterns/Page header',
  component: PageHeader,
  tags: ['autodocs'],
  args: { eyebrow: 'Nosotros', title: 'Quiénes somos', children: 'Elaboramos pastas frescas desde hace más de 20 años.' },
} satisfies Meta<typeof PageHeader>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Tight: Story = { args: { tight: true } }
export const TitleOnly: Story = { args: { eyebrow: undefined, children: undefined } }
