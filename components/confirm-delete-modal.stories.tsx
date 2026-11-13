import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import ConfirmDeleteModal from './confirm-delete-modal'

const meta = {
  title: 'Components/Confirm delete modal',
  component: ConfirmDeleteModal,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: { open: true, productName: 'Robot limpia piscina Dolphin Liberty 400', onCancel: fn(), onConfirm: fn() },
} satisfies Meta<typeof ConfirmDeleteModal>
export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {}
