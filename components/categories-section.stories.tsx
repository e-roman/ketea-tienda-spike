import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import CategoriesSection from './categories-section'

const meta = {
  title: 'Components/Categories section',
  component: CategoriesSection,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof CategoriesSection>
export default meta
type Story = StoryObj<typeof meta>

/** Muestra 8 categorías; «Ver … categorías más» despliega el resto. */
export const Default: Story = {}
