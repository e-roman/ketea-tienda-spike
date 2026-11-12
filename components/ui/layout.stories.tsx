import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Row, Stack } from './layout'

const box = { padding: 12, background: 'rgba(127,127,127,.2)', borderRadius: 6 }
const meta = { title: 'UI/Layout', tags: ['autodocs'] } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const RowExample: Story = {
  render: () => (
    <Row gap={4} align="center" justify="between">
      <div style={box}>Uno</div><div style={box}>Dos</div><div style={box}>Tres</div>
    </Row>
  ),
}
export const StackExample: Story = {
  render: () => (
    <Stack gap={3}>
      <div style={box}>Uno</div><div style={box}>Dos</div><div style={box}>Tres</div>
    </Stack>
  ),
}
