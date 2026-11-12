import type { Config } from "tailwindcss"
import oraliTokens from "@orali/design-tokens/tailwind"

/**
 * Colores, radios y tipografía vienen de @orali/design-tokens (preset generado con Style Dictionary).
 * No agregar colores acá: si falta uno, se crea el token en el repo de tokens.
 */
const config: Config = {
  presets: [oraliTokens],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [],
}
export default config
