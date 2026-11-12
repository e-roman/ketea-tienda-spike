import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import NewsletterBanner from './newsletter-banner'

const meta = {
  title: 'Components/Newsletter banner',
  component: NewsletterBanner,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof NewsletterBanner>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
