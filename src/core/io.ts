/**
 * Import / export.
 *
 * JSON is lossless and round-trips the whole world. Markdown is a one-way
 * export for reading outside the app or diffing in git.
 */

import { SCHEMAS } from './schema'
import type { Entity, FieldValue, TableRow } from './types'
import { isTbd, RELATION_META } from './types'
import type { WorldState } from './store'
import { emptyWorld } from './store'
import { buildIndex } from './relations'

export const EXPORT_FORMAT = 'rpgwiki/world'
export const EXPORT_VERSION = 1

export interface WorldFile {
  format: string
  version: number
  exportedAt: string
  world: WorldState
}

export function exportJson(world: WorldState): string {
  const payload: WorldFile = {
    format: EXPORT_FORMAT,
    version: EXPORT_VERSION,
    exportedAt: new Date().toISOString(),
    world,
  }
  return JSON.stringify(payload, null, 2)
}

export interface ImportResult {
  ok: boolean
  world?: WorldState
  error?: string
  stats?: { entities: number; relations: number }
}

export function importJson(text: string): ImportResult {
  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch (err) {
    return { ok: false, error: `Not valid JSON — ${(err as Error).message}` }
  }
  const file = parsed as Partial<WorldFile> & Partial<WorldState>
  const world = (file as WorldFile).world ?? (file as WorldState)
  if (!world || typeof world !== 'object' || !('entities' in world)) {
    return { ok: false, error: 'No `entities` found. Expected a world export from this wiki.' }
  }
  const base = emptyWorld()
  const merged: WorldState = {
    entities: (world.entities as Record<string, Entity>) ?? {},
    relations: world.relations ?? {},
    atlas: {
      regions: world.atlas?.regions ?? [],
      routes: world.atlas?.routes ?? [],
      zones: world.atlas?.zones ?? [],
      positions: world.atlas?.positions ?? {},
    },
    revisions: world.revisions ?? {},
    meta: { ...base.meta, ...world.meta, touched: true, updatedAt: Date.now() },
  }
  const badIds = Object.entries(merged.entities).filter(([id, e]) => !e || e.id !== id)
  if (badIds.length) return { ok: false, error: `${badIds.length} entries have an id that does not match their key.` }

  return {
    ok: true,
    world: merged,
    stats: { entities: Object.keys(merged.entities).length, relations: Object.keys(merged.relations).length },
  }
}

/* ------------------------------------------------------------------ */
/* Markdown                                                            */
/* ------------------------------------------------------------------ */

function valueToMd(v: FieldValue, nameOf: (id: string) => string, isRefs: boolean): string | null {
  if (v == null || v === '') return null
  if (isTbd(v)) return `**TBD**${v.q ? ` — open question: ${v.q}` : ''}`
  if (typeof v === 'boolean') return v ? 'Yes' : 'No'
  if (typeof v === 'number') return String(v)
  if (typeof v === 'string') return v
  if (Array.isArray(v)) {
    if (v.length === 0) return null
    if (typeof v[0] === 'object') {
      const rows = v as TableRow[]
      const cols = [...new Set(rows.flatMap((r) => Object.keys(r)))]
      const head = `| ${cols.join(' | ')} |`
      const sep = `| ${cols.map(() => '---').join(' | ')} |`
      const body = rows.map((r) => `| ${cols.map((c) => (r[c] ?? '').replace(/\|/g, '\\|')).join(' | ')} |`).join('\n')
      return `${head}\n${sep}\n${body}`
    }
    const items = (v as string[]).map((x) => (isRefs ? `[[${x}|${nameOf(x)}]]` : x))
    return items.map((x) => `- ${x}`).join('\n')
  }
  return null
}

export function entityToMarkdown(e: Entity, world: WorldState): string {
  const schema = SCHEMAS[e.type]
  const nameOf = (id: string) => world.entities[id]?.name ?? id
  const index = buildIndex(world)
  const lines: string[] = []

  lines.push('---')
  lines.push(`id: ${e.id}`)
  lines.push(`type: ${e.type}`)
  lines.push(`name: ${JSON.stringify(e.name)}`)
  lines.push(`status: ${e.status}`)
  if (e.workingTitle) lines.push('workingTitle: true')
  if (e.aka?.length) lines.push(`aka: ${JSON.stringify(e.aka)}`)
  if (e.tags?.length) lines.push(`tags: ${JSON.stringify(e.tags)}`)
  lines.push('---', '')
  lines.push(`# ${e.name}`, '')
  if (e.summary) lines.push(`> ${e.summary}`, '')

  for (const group of schema?.groups ?? []) {
    const fields = (schema?.fields ?? []).filter((x) => x.group === group.key)
    const rendered = fields
      .map((def) => ({ def, md: valueToMd(e.fields[def.key], nameOf, def.kind === 'refs') }))
      .filter((x) => x.md !== null)
    const customHere = (e.custom ?? []).filter((c) => c.group === group.key)
    if (!rendered.length && !customHere.length) continue
    lines.push(`## ${group.label}`, '')
    for (const { def, md } of rendered) {
      lines.push(`### ${def.label}`, '', md as string, '')
    }
    for (const c of customHere) {
      lines.push(`### ${c.label}`, '', String(valueToMd(c.value, nameOf, false) ?? ''), '')
    }
  }

  const outEdges = (index.out[e.id] ?? []).filter((x) => x.origin === 'relation')
  if (outEdges.length) {
    lines.push('## Links', '')
    for (const edge of outEdges) {
      lines.push(`- **${RELATION_META[edge.kind].label}** → [[${edge.to}|${nameOf(edge.to)}]]${edge.note ? ` — ${edge.note}` : ''}`)
    }
    lines.push('')
  }
  const inEdges = index.in[e.id] ?? []
  if (inEdges.length) {
    lines.push('## Referenced by', '')
    const seen = new Set<string>()
    for (const edge of inEdges) {
      if (seen.has(edge.from)) continue
      seen.add(edge.from)
      lines.push(`- [[${edge.from}|${nameOf(edge.from)}]] — ${edge.label}`)
    }
    lines.push('')
  }

  return lines.join('\n')
}

export function worldToMarkdown(world: WorldState): string {
  const byType = new Map<string, Entity[]>()
  for (const e of Object.values(world.entities)) {
    if (e.archived) continue
    const list = byType.get(e.type) ?? []
    list.push(e)
    byType.set(e.type, list)
  }
  const parts: string[] = ['# World export', '', `Exported ${new Date().toISOString()}`, '']
  for (const type of Object.keys(SCHEMAS)) {
    const list = byType.get(type)
    if (!list?.length) continue
    parts.push(`\n\n---\n\n# ${SCHEMAS[type as keyof typeof SCHEMAS].plural}\n`)
    for (const e of list.sort((a, b) => a.name.localeCompare(b.name))) {
      parts.push(entityToMarkdown(e, world), '\n---\n')
    }
  }
  return parts.join('\n')
}

/* ------------------------------------------------------------------ */

export function download(filename: string, content: string, mime = 'application/json') {
  const blob = new Blob([content], { type: `${mime};charset=utf-8` })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader()
    fr.onload = () => resolve(String(fr.result ?? ''))
    fr.onerror = () => reject(fr.error)
    fr.readAsText(file)
  })
}

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader()
    fr.onload = () => resolve(String(fr.result ?? ''))
    fr.onerror = () => reject(fr.error)
    fr.readAsDataURL(file)
  })
}
