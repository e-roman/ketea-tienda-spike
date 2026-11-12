import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { SearchField } from './search-field'

const meta = {
  title: 'Patterns/Header/Search field',
  component: SearchField,
  tags: ['autodocs'],
  args: {
    variant: 'desktop',
    value: '',
    onChange: fn(),
    onFocus: fn(),
    onKeyDown: fn(),
    onClear: fn(),
    onSubmit: fn(),
  },
  argTypes: { variant: { control: 'inline-radio', options: ['desktop', 'mobile'] } },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
} satisfies Meta<typeof SearchField>
export default meta
type Story = StoryObj<typeof meta>

function Interactive({ variant }: { variant: 'desktop' | 'mobile' }) {
  const [value, setValue] = useState('')
  return (
    <SearchField
      variant={variant}
      value={value}
      onChange={setValue}
      onFocus={() => {}}
      onKeyDown={() => {}}
      onClear={() => setValue('')}
      onSubmit={() => {}}
    />
  )
}

export const Desktop: Story = { render: () => <Interactive variant="desktop" /> }
export const Mobile: Story = { render: () => <Interactive variant="mobile" /> }
export const DesktopWithQuery: Story = { args: { value: 'ravioles' } }
export const MobileWithQuery: Story = { args: { variant: 'mobile', value: 'ravioles' } }
