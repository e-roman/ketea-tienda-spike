import type { Config } from "tailwindcss"
import keteaTokens from "@ketea/tokens/tailwind"

/**
 * Colores, radios y tipografía vienen de @ketea/tokens (preset generado con Style Dictionary).
 * No agregar colores acá: si falta uno, se crea el token en el repo de tokens.
 */
const config: Config = {
  presets: [keteaTokens],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [],
}
export default config
