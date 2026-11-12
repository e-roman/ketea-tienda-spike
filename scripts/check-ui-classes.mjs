// Falla si un componente usa utilidades arbitrarias de Tailwind con tokens, p. ej. bg-[color:var(--x)].
// Los estilos con tokens van en styles/components/*.css; en components/ solo nombres de clase y layout.
import { readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"

const ROOT = "components"
const PATTERN = /\[[^\]\s]*var\(--[^\]\s]*\]/g

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name)
    return statSync(p).isDirectory() ? walk(p) : /\.(tsx?|jsx?)$/.test(name) ? [p] : []
  })
}

const hits = []
for (const file of walk(ROOT)) {
  readFileSync(file, "utf8").split(/\r?\n/).forEach((line, i) => {
    for (const m of line.matchAll(PATTERN)) hits.push(`${file}:${i + 1}  ${m[0]}`)
  })
}

if (hits.length) {
  console.error(`✗ ${hits.length} utilidades arbitrarias con tokens en ${ROOT}/ (mover a styles/components/*.css):\n` + hits.join("\n"))
  process.exit(1)
}
console.log(`✓ ${ROOT}/ sin utilidades arbitrarias con tokens`)
