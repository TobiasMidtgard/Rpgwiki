/**
 * Global search.
 *
 * Every hit carries the reasons it matched, so a result is never a bare title
 * the user has to guess at.
 */

import { SCHEMAS } from './schema'
import type { Entity, EntityType, Status } from './types'
import { isTbd } from './types'
import type { WorldState } from './store'
import type { WorldIndex } from './relations'

export interface MatchReason {
  label: string
  snippet?: string
}

export interface SearchHit {
  id: string
  entity: Entity
  score: number
  reasons: MatchReason[]
}

export interface SearchFilters {
  q: string
  types: EntityType[]
  statuses: Status[]
  tags: string[]
  /** Entity id — matches entries linked to this place. */
  location?: string
  /** Entity id — matches entries linked to this faction. */
  faction?: string
  biome?: string
  /** Gameplay role: category-ish field values across types. */
  role?: string
  includeArchived?: boolean
}

export const emptyFilters = (): SearchFilters => ({
  q: '',
  types: [],
  statuses: [],
  tags: [],
})

export const hasActiveFilters = (f: SearchFilters) =>
  f.types.length > 0 ||
  f.statuses.length > 0 ||
  f.tags.length > 0 ||
  !!f.location ||
  !!f.faction ||
  !!f.biome ||
  !!f.role ||
  !!f.includeArchived

const tokenize = (s: string) =>
  s
    .toLowerCase()
    .split(/[^a-z0-9']+/)
    .filter(Boolean)

function snippet(text: string, token: string, span = 70): string {
  const i = text.toLowerCase().indexOf(token)
  if (i < 0) return text.slice(0, span).trim()
  const start = Math.max(0, i - Math.floor(span / 3))
  const end = Math.min(text.length, i + token.length + Math.floor(span / 1.5))
  return `${start > 0 ? '…' : ''}${text.slice(start, end).trim()}${end < text.length ? '…' : ''}`
}

/** Field values that read as a "gameplay role" facet. */
const ROLE_KEYS = [
  'itemType',
  'category',
  'machineType',
  'skillType',
  'questType',
  'factionType',
  'creatureType',
  'discipline',
  'foodType',
  'siteType',
  'districtType',
  'conflictType',
  'eventType',
  'routeKind',
  'combatRole',
  'noteKind',
  'kind',
  'tier',
]

export function roleOf(e: Entity): string | undefined {
  for (const k of ROLE_KEYS) {
    const v = e.fields[k]
    if (typeof v === 'string' && v) return v
  }
  return undefined
}

export function biomeOf(e: Entity): string | undefined {
  const v = e.fields.biome
  return typeof v === 'string' && v ? v : undefined
}

/** All distinct values available for each facet, for the filter UI. */
export function facets(world: WorldState) {
  const tags = new Map<string, number>()
  const biomes = new Map<string, number>()
  const roles = new Map<string, number>()
  const types = new Map<EntityType, number>()
  for (const e of Object.values(world.entities)) {
    if (e.archived) continue
    types.set(e.type, (types.get(e.type) ?? 0) + 1)
    for (const t of e.tags ?? []) tags.set(t, (tags.get(t) ?? 0) + 1)
    const b = biomeOf(e)
    if (b) biomes.set(b, (biomes.get(b) ?? 0) + 1)
    const r = roleOf(e)
    if (r) roles.set(r, (roles.get(r) ?? 0) + 1)
  }
  const sorted = <K>(m: Map<K, number>) => [...m.entries()].sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0])))
  return { tags: sorted(tags), biomes: sorted(biomes), roles: sorted(roles), types: sorted(types) }
}

function textFieldsOf(e: Entity): { label: string; text: string }[] {
  const schema = SCHEMAS[e.type]
  if (!schema) return []
  const out: { label: string; text: string }[] = []
  for (const def of schema.fields) {
    const v = e.fields[def.key]
    if (v == null || isTbd(v)) continue
    if (typeof v === 'string') out.push({ label: def.label, text: v })
    else if (typeof v === 'number' || typeof v === 'boolean') out.push({ label: def.label, text: String(v) })
    else if (Array.isArray(v)) {
      const flat = (v as unknown[])
        .map((x) => (typeof x === 'string' ? x : typeof x === 'object' && x ? Object.values(x).join(' ') : ''))
        .filter(Boolean)
        .join(' · ')
      if (flat) out.push({ label: def.label, text: flat })
    }
  }
  for (const c of e.custom ?? []) {
    if (typeof c.value === 'string' && c.value) out.push({ label: c.label, text: c.value })
  }
  return out
}

export function search(world: WorldState, index: WorldIndex, f: SearchFilters, limit = 200): SearchHit[] {
  const tokens = tokenize(f.q)
  const hits: SearchHit[] = []

  for (const e of Object.values(world.entities)) {
    if (e.archived && !f.includeArchived) continue
    if (f.types.length && !f.types.includes(e.type)) continue
    if (f.statuses.length && !f.statuses.includes(e.status)) continue
    if (f.tags.length && !f.tags.every((t) => (e.tags ?? []).includes(t))) continue
    if (f.biome && biomeOf(e) !== f.biome) continue
    if (f.role && roleOf(e) !== f.role) continue

    const reasons: MatchReason[] = []

    if (f.location) {
      const linked = e.id === f.location || (index.neighbours[e.id]?.has(f.location) ?? false)
      if (!linked) continue
      reasons.push({ label: 'Linked to selected location' })
    }
    if (f.faction) {
      const linked = e.id === f.faction || (index.neighbours[e.id]?.has(f.faction) ?? false)
      if (!linked) continue
      reasons.push({ label: 'Linked to selected faction' })
    }

    if (!tokens.length) {
      if (!reasons.length) {
        if (!hasActiveFilters(f)) continue
        reasons.push({ label: 'Matches active filters' })
      }
      hits.push({ id: e.id, entity: e, score: 1, reasons })
      continue
    }

    const name = e.name.toLowerCase()
    const aliases = (e.aka ?? []).join(' ').toLowerCase()
    const summary = (e.summary ?? '').toLowerCase()
    const tagText = (e.tags ?? []).join(' ').toLowerCase()
    const textFields = textFieldsOf(e)

    let score = 0
    let matchedAll = true

    for (const tok of tokens) {
      let tokScore = 0
      if (name === tok) {
        tokScore = 120
        reasons.push({ label: 'Exact name' })
      } else if (name.startsWith(tok)) {
        tokScore = 70
        reasons.push({ label: 'Name starts with', snippet: e.name })
      } else if (name.includes(tok)) {
        tokScore = 45
        reasons.push({ label: 'Name contains', snippet: e.name })
      } else if (aliases.includes(tok)) {
        tokScore = 38
        reasons.push({ label: 'Alias', snippet: (e.aka ?? []).join(', ') })
      } else if (e.id.toLowerCase().includes(tok)) {
        tokScore = 30
        reasons.push({ label: 'Entry id', snippet: e.id })
      } else if (tagText.includes(tok)) {
        const tag = (e.tags ?? []).find((t) => t.toLowerCase().includes(tok))
        tokScore = 26
        reasons.push({ label: 'Tag', snippet: tag })
      } else if (summary.includes(tok)) {
        tokScore = 22
        reasons.push({ label: 'Summary', snippet: snippet(e.summary ?? '', tok) })
      } else {
        const field = textFields.find((x) => x.text.toLowerCase().includes(tok))
        if (field) {
          tokScore = 12
          reasons.push({ label: field.label, snippet: snippet(field.text, tok) })
        } else if (SCHEMAS[e.type]?.label.toLowerCase().includes(tok) || SCHEMAS[e.type]?.plural.toLowerCase().includes(tok)) {
          tokScore = 8
          reasons.push({ label: 'Entry type', snippet: SCHEMAS[e.type].label })
        }
      }
      if (tokScore === 0) {
        matchedAll = false
        break
      }
      score += tokScore
    }

    if (!matchedAll) continue
    // Canon entries edge out drafts when everything else is equal.
    if (e.status === 'canon') score += 3
    if (e.type === 'city') score += 2

    hits.push({ id: e.id, entity: e, score, reasons: dedupeReasons(reasons) })
  }

  return hits.sort((a, b) => b.score - a.score || a.entity.name.localeCompare(b.entity.name)).slice(0, limit)
}

function dedupeReasons(rs: MatchReason[]): MatchReason[] {
  const seen = new Set<string>()
  const out: MatchReason[] = []
  for (const r of rs) {
    const k = `${r.label}|${r.snippet ?? ''}`
    if (seen.has(k)) continue
    seen.add(k)
    out.push(r)
  }
  return out.slice(0, 4)
}

/** Lightweight name-only lookup for the link autocomplete. */
export function quickFind(world: WorldState, q: string, types?: EntityType[], limit = 12): Entity[] {
  const t = q.trim().toLowerCase()
  const pool = Object.values(world.entities).filter(
    (e) => !e.archived && (!types || types.length === 0 || types.includes(e.type)),
  )
  if (!t) return pool.sort((a, b) => a.name.localeCompare(b.name)).slice(0, limit)
  return pool
    .map((e) => {
      const n = e.name.toLowerCase()
      const score = n === t ? 100 : n.startsWith(t) ? 60 : n.includes(t) ? 40 : (e.aka ?? []).some((a) => a.toLowerCase().includes(t)) ? 30 : 0
      return { e, score }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.e.name.localeCompare(b.e.name))
    .slice(0, limit)
    .map((x) => x.e)
}
