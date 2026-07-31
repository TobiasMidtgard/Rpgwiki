/**
 * Seed integrity check.
 *
 * Content modules are hand-authored data, so they drift from the schema unless
 * something checks them. This validates every entry against its type's schema,
 * every relation against the model, and every reference against the entry set.
 *
 *   npx tsx scripts/validate-seed.ts
 *   npx tsx scripts/validate-seed.ts --fix-unknown-fields
 */

import { readdirSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import path from 'node:path'
import { SCHEMAS } from '../src/core/schema'
import { ENTITY_TYPES, RELATION_KINDS, STATUSES, isTbd } from '../src/core/types'
import type { SeedEntity, SeedRelation } from '../src/world/kit'

const WORLD_DIR = path.resolve(import.meta.dirname, '../src/world')
const MACHINERY = new Set(['kit.ts', 'registry.ts', 'geo.ts', 'seed.ts'])

interface Problem {
  level: 'error' | 'warn'
  module: string
  entry: string
  message: string
}

const problems: Problem[] = []
const err = (module: string, entry: string, message: string) => problems.push({ level: 'error', module, entry, message })
const warn = (module: string, entry: string, message: string) => problems.push({ level: 'warn', module, entry, message })

const files = readdirSync(WORLD_DIR)
  .filter((f) => f.endsWith('.ts') && !MACHINERY.has(f))
  .sort()

const allEntities: { mod: string; e: SeedEntity }[] = []
const allRelations: { mod: string; r: SeedRelation }[] = []

for (const file of files) {
  const mod = (await import(pathToFileURL(path.join(WORLD_DIR, file)).href)) as {
    entities?: SeedEntity[]
    relations?: SeedRelation[]
  }
  if (!Array.isArray(mod.entities)) {
    err(file, '-', 'module does not export an `entities` array')
    continue
  }
  for (const e of mod.entities) allEntities.push({ mod: file, e })
  for (const r of mod.relations ?? []) allRelations.push({ mod: file, r })
}

const ids = new Map<string, string>()
for (const { mod, e } of allEntities) {
  if (ids.has(e.id)) err(mod, e.id, `duplicate id, first declared in ${ids.get(e.id)}`)
  else ids.set(e.id, mod)
}

const known = (id: string) => ids.has(id)

for (const { mod, e } of allEntities) {
  if (!ENTITY_TYPES.includes(e.type)) {
    err(mod, e.id, `unknown entity type "${e.type}"`)
    continue
  }
  if (!e.id.startsWith(`${e.type}.`)) warn(mod, e.id, `id does not start with "${e.type}."`)
  if (!e.name?.trim()) err(mod, e.id, 'missing name')
  if (e.status && !STATUSES.includes(e.status)) err(mod, e.id, `unknown status "${e.status}"`)
  if (!e.summary?.trim()) warn(mod, e.id, 'no summary — it will show as blank in cards and search')

  const schema = SCHEMAS[e.type]
  const defs = new Map(schema.fields.map((d) => [d.key, d]))
  const groups = new Set(schema.groups.map((g) => g.key))

  for (const g of schema.groups) {
    if (schema.tabs && g.tab && !schema.tabs.some((t) => t.key === g.tab)) {
      err(mod, e.id, `group "${g.key}" points at tab "${g.tab}" which does not exist`)
    }
  }
  for (const d of schema.fields) {
    if (!groups.has(d.group)) err(mod, e.id, `field "${d.key}" is in unknown group "${d.group}"`)
  }

  for (const [key, value] of Object.entries(e.fields ?? {})) {
    // `cityMap`, `flow` and `node` are structured payloads consumed by views,
    // not schema fields, so they are expected to be absent from the schema.
    if (['cityMap', 'flow', 'node'].includes(key)) continue

    const def = defs.get(key)
    if (!def) {
      err(mod, e.id, `field "${key}" is not in the ${e.type} schema — it will never be displayed`)
      continue
    }
    if (value == null || isTbd(value)) continue

    switch (def.kind) {
      case 'select':
        if (typeof value !== 'string') err(mod, e.id, `field "${key}" should be a string`)
        else if (def.options && !def.options.includes(value))
          err(mod, e.id, `field "${key}" = "${value}" is not one of: ${def.options.join(', ')}`)
        break
      case 'refs': {
        if (!Array.isArray(value)) {
          err(mod, e.id, `field "${key}" must be an array of entry ids`)
          break
        }
        for (const target of value as unknown[]) {
          if (typeof target !== 'string') {
            err(mod, e.id, `field "${key}" contains a non-string entry`)
            continue
          }
          if (!known(target)) err(mod, e.id, `field "${key}" references missing entry "${target}"`)
          else if (def.refTypes?.length) {
            const targetType = target.split('.')[0]
            if (!def.refTypes.includes(targetType as never))
              warn(mod, e.id, `field "${key}" points at a ${targetType}; expected ${def.refTypes.join('/')}`)
          }
        }
        break
      }
      case 'table': {
        if (!Array.isArray(value)) {
          err(mod, e.id, `field "${key}" must be an array of rows`)
          break
        }
        const cols = new Set((def.columns ?? []).map((c) => c.key))
        for (const row of value as Record<string, unknown>[]) {
          if (typeof row !== 'object' || row === null) {
            err(mod, e.id, `field "${key}" contains a non-object row`)
            continue
          }
          for (const k of Object.keys(row)) {
            if (!cols.has(k)) err(mod, e.id, `field "${key}" row has unknown column "${k}" (expected ${[...cols].join(', ')})`)
          }
        }
        break
      }
      case 'list':
      case 'tags':
      case 'multiselect':
        if (!Array.isArray(value)) err(mod, e.id, `field "${key}" must be an array`)
        break
      case 'number':
        if (typeof value !== 'number' || !Number.isFinite(value)) err(mod, e.id, `field "${key}" must be a finite number`)
        break
      case 'bool':
        if (typeof value !== 'boolean') err(mod, e.id, `field "${key}" must be a boolean`)
        break
      default:
        if (typeof value !== 'string') err(mod, e.id, `field "${key}" must be a string`)
    }
  }

  // Inline [[links]] in prose.
  for (const [key, value] of Object.entries(e.fields ?? {})) {
    if (typeof value !== 'string') continue
    for (const m of value.matchAll(/\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/g)) {
      const target = m[1].trim()
      if (!known(target)) err(mod, e.id, `inline link in "${key}" points at missing entry "${target}"`)
    }
  }
  if (e.summary) {
    for (const m of e.summary.matchAll(/\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/g)) {
      if (!known(m[1].trim())) err(mod, e.id, `inline link in summary points at missing entry "${m[1].trim()}"`)
    }
  }
}

for (const { mod, r } of allRelations) {
  if (!RELATION_KINDS.includes(r.kind)) err(mod, `${r.from}→${r.to}`, `unknown relation kind "${r.kind}"`)
  if (!known(r.from)) err(mod, `${r.from}→${r.to}`, `relation source "${r.from}" does not exist`)
  if (!known(r.to)) err(mod, `${r.from}→${r.to}`, `relation target "${r.to}" does not exist`)
}

/* ------------------------------------------------------------------ */

const byType = new Map<string, number>()
for (const { e } of allEntities) byType.set(e.type, (byType.get(e.type) ?? 0) + 1)

const errors = problems.filter((p) => p.level === 'error')
const warnings = problems.filter((p) => p.level === 'warn')

console.log(`Modules:   ${files.length}`)
console.log(`Entries:   ${allEntities.length}`)
console.log(`Relations: ${allRelations.length}`)
console.log(
  `By type:   ${[...byType.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([t, n]) => `${t}=${n}`)
    .join(' ')}`,
)

const missingTypes = ENTITY_TYPES.filter((t) => !byType.has(t))
if (missingTypes.length) console.log(`\nTypes with no entries yet: ${missingTypes.join(', ')}`)

if (errors.length) {
  console.log(`\n--- ${errors.length} ERRORS ---`)
  for (const p of errors.slice(0, 200)) console.log(`  [${p.module}] ${p.entry}: ${p.message}`)
  if (errors.length > 200) console.log(`  … and ${errors.length - 200} more`)
}
if (warnings.length) {
  console.log(`\n--- ${warnings.length} warnings ---`)
  const shown = warnings.slice(0, 60)
  for (const p of shown) console.log(`  [${p.module}] ${p.entry}: ${p.message}`)
  if (warnings.length > shown.length) console.log(`  … and ${warnings.length - shown.length} more`)
}

console.log(errors.length === 0 ? '\nSEED VALID' : `\nSEED HAS ${errors.length} ERRORS`)
process.exit(errors.length === 0 ? 0 : 1)
