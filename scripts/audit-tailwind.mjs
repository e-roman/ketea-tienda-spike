// Auditoría: Tailwind queda SOLO para la grilla de página: grid, grid-cols, col-*, gap, contenedor
// (max-w, mx-auto, px), visibilidad responsive y sticky. Todo lo demás (color, tipografía, flex, márgenes,
// paddings, tamaños, tamaños de íconos, posición) vive en styles/**/*.css y se aplica con clases de
// componente/pattern. En app/ (la composición de páginas) se permiten además márgenes y paddings.
// Uso: node scripts/audit-tailwind.mjs [--list]   → resumen por archivo (con --list, cada hit)
import { readdirSync, readFileSync, statSync } from "node:fs"
import { join } from "node:path"

const ROOTS = ["app", "components"]
const LIST = process.argv.includes("--list")

// Utilidades PROHIBIDAS (se evalúan sin el prefijo de variante: md:, hover:, group-hover:, etc.)
const FORBIDDEN = [
  /^text-(xs|sm|base|lg|xl|[2-9]xl|heading-\w+|display|caption|body-\w+|label|primary|secondary|tertiary|brand|inverse|inverse-muted|success|error|warning|info|accent|disabled|link|price-\w+|shipping-free|on-brand|white|black|transparent|current|\[.*\])(\/\d+)?$/,
  /^font-(thin|light|normal|medium|semibold|bold|extrabold|black|sans|mono|\w+)$/,
  /^leading-/, /^tracking-/, /^(uppercase|lowercase|capitalize|italic|underline|no-underline|line-through)$/,
  /^underline-offset-/, /^decoration-/,
  /^bg-(?!none$)/, /^from-/, /^via-/, /^to-/,
  /^border($|-)/, /^divide-/, /^outline($|-)/, /^ring($|-)/,
  /^rounded($|-)/, /^shadow($|-)/, /^opacity-/,
  /^transition($|-)/, /^duration-/, /^ease-/, /^delay-/, /^animate-/,
  /^backdrop-/, /^blur($|-)/, /^fill-/, /^stroke-/,
  /^(scale|rotate)-/, /^-rotate-/,
  // Layout interno de componentes: va en el CSS del componente
  /^(flex|inline-flex|flex-\w+|shrink|shrink-\d|grow|grow-\d|justify-(start|end|center|between|around|evenly))$/,
  /^(relative|absolute|fixed|inset-\S+|-?(top|bottom|left|right)-\S+)$/,
  /^-?translate-[xy]-\S+$/,
  /^(w|h|min-w|min-h|max-h|size|aspect)-\S+$/, /^(overflow|truncate|line-clamp|whitespace|pointer-events|cursor|object|resize|list)(-\S+)?$/,
  /^(text-(center|left|right))$/,
]
// Solo se prohíben en components/: la composición de páginas (app/) puede espaciar sus bloques
const FORBIDDEN_IN_COMPONENTS = [/^-?(m[trblxy]?|space-[xy])-\S+$/, /^p[trblxy]?-\S+$/]
// Excepciones: alineación de texto y recorte son layout
const ALLOWED = [/^px-(4|6)$/, /^mx-auto$/, /^border-(0)$/, /^bg-none$/, /^w-full$/, /^top-\S+$/, /^-?translate-[xy]-\S+$/, /^(max-w-\S+)$/, /^min-w-0$/]
// top-* solo acompaña a sticky; max-w-* y w-full son del contenedor; translate/inset: ver nota en CLAUDE

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name)
    return statSync(p).isDirectory() ? walk(p) : /\.tsx$/.test(name) ? [p] : []
  })
}

const stripVariant = (t) => t.replace(/^(?:[\w-]+:|\[[^\]]+\]:)+/, "").replace(/^!/, "")
const isForbidden = (t, file) => {
  const b = stripVariant(t)
  if (ALLOWED.some((r) => r.test(b))) return false
  if (FORBIDDEN.some((r) => r.test(b))) return true
  return file.startsWith("components") && FORBIDDEN_IN_COMPONENTS.some((r) => r.test(b))
}

const byFile = {}
let total = 0
for (const root of ROOTS) {
  for (const file of walk(root)) {
    const lines = readFileSync(file, "utf8").split(/\r?\n/)
    lines.forEach((line, i) => {
      const code = line.replace(/\{\/\*.*?\*\/\}/g, "").replace(/\/\*.*?\*\//g, "")
      if (/^\s*(\/\/|\*|\/\*)/.test(code)) return
      if (!/className|cn\(|Classes\(|class=/.test(code)) return
      for (const m of code.matchAll(/(["'`])((?:(?!\1).)*)\1/g)) {
        const bad = m[2].split(/\s+/).filter((t) => t && /^[\w:\[\]\/.!#%()-]+$/.test(t) && isForbidden(t, file))
        if (bad.length) {
          total += bad.length
          ;(byFile[file] ||= []).push({ line: i + 1, bad })
        }
      }
    })
  }
}

const files = Object.entries(byFile).sort((a, b) => b[1].reduce((n, x) => n + x.bad.length, 0) - a[1].reduce((n, x) => n + x.bad.length, 0))
for (const [f, hits] of files) {
  console.log(`${String(hits.reduce((n, x) => n + x.bad.length, 0)).padStart(4)}  ${f}`)
  if (LIST) for (const h of hits) console.log(`        L${h.line}: ${h.bad.join(" ")}`)
}
console.log(`\n${total} utilidades visuales en ${files.length} archivos`)
process.exit(total ? 1 : 0)
