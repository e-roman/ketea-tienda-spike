import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ProductDescription, ProductSpecs, WarningSeal, NutritionTable } from './product-specs'
import { sampleProduct } from '../../.storybook/fixtures'

const withDetails = {
  ...sampleProduct,
  conservation: 'Mantener refrigerado entre 0 y 5 °C. Consumir dentro de las 48 hs de abierto.',
  nutritionTable: {
    portion: '100 g',
    rows: [
      { label: 'Valor energético', value: '250 kcal' },
      { label: 'Carbohidratos', value: '38 g' },
      { label: 'Proteínas', value: '9 g' },
      { label: 'Grasas totales', value: '6 g' },
    ],
  },
  legalWarnings: ['sodio'],
}

const meta = {
  title: 'Patterns/Product specs',
  component: ProductSpecs,
  tags: ['autodocs'],
  args: { product: withDetails, sku: 'ORA-0001' },
} satisfies Meta<typeof ProductSpecs>
export default meta
type Story = StoryObj<typeof meta>

export const Specs: Story = {}
export const WithoutExtraData: Story = {
  args: { product: { ...sampleProduct, conservation: undefined, nutritionTable: undefined, legalWarnings: undefined } },
}
export const Description: Story = {
  render: () => <ProductDescription product={{ ...sampleProduct, ingredients: 'Harina de trigo, ricota, huevo, sal.' }} />,
}
export const Seal: Story = { render: () => <WarningSeal text="sodio" /> }
export const Nutrition: Story = { render: () => <NutritionTable table={withDetails.nutritionTable} /> }
