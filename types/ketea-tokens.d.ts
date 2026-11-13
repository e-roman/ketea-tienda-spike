// El preset de Tailwind de @ketea/tokens se genera en JS sin tipos.
declare module "@ketea/tokens/tailwind" {
  import type { Config } from "tailwindcss"
  const preset: Partial<Config>
  export default preset
}
