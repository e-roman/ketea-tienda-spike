import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import AuthModal from './auth-modal'

const meta = {
  title: 'Components/Auth modal',
  component: AuthModal,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { open: true, onClose: fn() },
} satisfies Meta<typeof AuthModal>
export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {}
