import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SectionHeader } from './section-header'

const meta = {
  title: 'Patterns/Section header',
  component: SectionHeader,
  tags: ['autodocs'],
  args: { title: 'Destacados', href: '/productos' },
} satisfies Meta<typeof SectionHeader>
export default meta
type Story = StoryObj<typeof meta>

export const WithLink: Story = {}
export const CustomLinkLabel: Story = { args: { linkLabel: 'Ver todas las ofertas' } }
export const TitleOnly: Story = { args: { href: undefined } }
