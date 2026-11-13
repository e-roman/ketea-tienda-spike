import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Hero from './hero'

const meta = {
  title: 'Components/Hero',
  component: Hero,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Hero>
export default meta
type Story = StoryObj<typeof meta>

/** Carrusel de 3 fotos (cambia cada 5 s). Las imágenes están en public/assets/img/banners. */
export const Default: Story = {}
