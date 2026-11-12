// Falla si el TSX usa una clase de componente (con __ o --, o de los helpers icon-/gap-/align-/justify-/skeleton-)
// que no existe en el CSS generado. Detecta typos y clases olvidadas.
// Uso: npx tailwindcss --postcss -i app/globals.css -o <tmp>.css && node scripts/check-class-defs.mjs <tmp>.css
import { readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"

const cssFile = process.argv[2]
if (!cssFile) { console.error("Uso: node scripts/check-class-defs.mjs <css generado>"); process.exit(2) }
const css = readFileSync(cssFile, "utf8")

const walk = (d) => readdirSync(d).flatMap((n) => {
  const p = join(d, n)
  return statSync(p).isDirectory() ? walk(p) : /\.tsx?$/.test(n) ? [p] : []
})

const missing = new Map()
for (const f of [...walk("app"), ...walk("components")]) {
  const s = readFileSync(f, "utf8")
  for (const m of s.matchAll(/(["`])((?:(?!\1).)*)\1/g)) {
    for (const t of m[2].split(/\s+/)) {
      if (!/^[a-z0-9]+(?:[-_]{1,2}[a-z0-9]+)*$/.test(t)) continue
      if (!(/__|--/.test(t) || /^(icon|gap|align|justify|skeleton)-/.test(t))) continue
      if (/^(aria|data)-/.test(t)) continue
      const esc = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      if (!new RegExp("\\." + esc + "(?![\\w-])").test(css)) {
        if (!missing.has(t)) missing.set(t, new Set())
        missing.get(t).add(f)
      }
    }
  }
}
for (const [k, v] of missing) console.log(`✗ .${k}  (${[...v].slice(0, 2).join(", ")})`)
if (missing.size) process.exit(1)
console.log("✓ todas las clases de componente usadas tienen definición en el CSS")
