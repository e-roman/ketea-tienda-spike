import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { SearchResultsDropdown, MobileSearchResults } from './search-results'
import { sampleProducts } from '../../../.storybook/fixtures'

const meta = {
  title: 'Patterns/Header/Search results',
  component: SearchResultsDropdown,
  tags: ['autodocs'],
  args: { query: 'ravioles', results: sampleProducts, onSelect: fn(), onSeeAll: fn() },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
} satisfies Meta<typeof SearchResultsDropdown>
export default meta
type Story = StoryObj<typeof meta>

export const Dropdown: Story = {}
export const DropdownEmpty: Story = { args: { query: 'xyz', results: [] } }

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile1', isRotated: false } },
  parameters: { layout: 'fullscreen' },
  render: (args) => <MobileSearchResults {...args} addingId={null} onQuickAdd={fn()} />,
}
export const MobileAdding: Story = {
  globals: { viewport: { value: 'mobile1', isRotated: false } },
  parameters: { layout: 'fullscreen' },
  render: (args) => <MobileSearchResults {...args} addingId={sampleProducts[0].id} onQuickAdd={fn()} />,
}
export const MobileEmpty: Story = {
  globals: { viewport: { value: 'mobile1', isRotated: false } },
  parameters: { layout: 'fullscreen' },
  render: (args) => <MobileSearchResults {...args} query="xyz" results={[]} addingId={null} onQuickAdd={fn()} />,
}
