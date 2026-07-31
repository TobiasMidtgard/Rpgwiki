/**
 * Derived relational index.
 *
 * Links live in three places — explicit `Relation` edges, `refs` fields, and
 * inline `[[id]]` mentions inside prose. This module folds all three into one
 * graph so backlinks, orphan detection and broken-reference checks see the
 * same picture.
 */

import { SCHEMAS } from './schema'
import type { Entity, Relation, RelationKind } from './types'
import { RELATION_META } from './types'
import type { WorldState } from './store'

export interface Edge {
  from: string
  to: string
  kind: RelationKind
  /** Where the edge came from — relations are editable, field/inline are derived. */
  origin: 'relation' | 'field' | 'inline'
  relationId?: string
  /** Field key when `origin === 'field'`. */
  fieldKey?: string
  label: string
  note?: string
  secret?: boolean
  hostile?: boolean
}

export interface BrokenRef {
  from: string
  to: string
  where: string
  origin: Edge['origin']
}

export interface WorldIndex {
  out: Record<string, Edge[]>
  in: Record<string, Edge[]>
  broken: BrokenRef[]
  orphans: string[]
  byType: Record<string, string[]>
  /** Undirected adjacency for the graph view. */
  neighbours: Record<string, Set<string>>
}

const INLINE_LINK = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g

export function extractInlineIds(text: string): string[] {
  const out: string[] = []
  let m: RegExpExecArray | null
  INLINE_LINK.lastIndex = 0
  while ((m = INLINE_LINK.exec(text))) out.push(m[1].trim())
  return out
}

/** Relation kind implied by a `refs` field, so backlinks read naturally. */
function kindForField(entityType: string, fieldKey: string): RelationKind {
  const map: Record<string, RelationKind> = {
    region: 'located_in',
    city: 'located_in',
    home: 'located_in',
    currentLocation: 'located_in',
    startLocation: 'located_in',
    location: 'located_in',
    habitat: 'inhabits',
    grownIn: 'located_in',
    sourceRegion: 'located_in',
    questGiver: 'gives_quest',
    ruler: 'leads',
    exports: 'produces',
    imports: 'consumes',
    localResources: 'produces',
    buildMaterials: 'consumes',
    staples: 'consumes',
    inputs: 'requires',
    outputs: 'produces',
    materials: 'requires',
    components: 'requires',
    itemsRequired: 'requires',
    itemsConsumed: 'consumes',
    recipe: 'crafted_at',
    machine: 'crafted_at',
    machines: 'crafted_at',
    keyMachines: 'contains',
    recipes: 'contains',
    requiredSkills: 'requires',
    recommendedSkills: 'requires',
    skills: 'requires',
    upgradesTo: 'unlocks',
    yields: 'produces',
    goods: 'produces',
    cultures: 'related_to',
    flora: 'inhabits',
    fauna: 'inhabits',
    inventory: 'used_by',
    mechanics: 'related_to',
    material: 'produces',
    controlledMaterials: 'controls',
    resources: 'produces',
  }
  return map[fieldKey] ?? (entityType === 'quest' ? 'involves' : 'related_to')
}

function edgeFromRelation(r: Relation): Edge {
  const meta = RELATION_META[r.kind] ?? RELATION_META.related_to
  return {
    from: r.from,
    to: r.to,
    kind: r.kind,
    origin: 'relation',
    relationId: r.id,
    label: meta.label,
    note: r.note,
    secret: r.secret,
    hostile: meta.hostile,
  }
}

let cacheKey: WorldState | null = null
let cacheValue: WorldIndex | null = null

export function buildIndex(world: WorldState): WorldIndex {
  if (cacheKey === world && cacheValue) return cacheValue

  const out: Record<string, Edge[]> = {}
  const inn: Record<string, Edge[]> = {}
  const broken: BrokenRef[] = []
  const byType: Record<string, string[]> = {}
  const neighbours: Record<string, Set<string>> = {}

  const exists = (id: string) => Object.prototype.hasOwnProperty.call(world.entities, id)

  const push = (e: Edge) => {
    ;(out[e.from] ??= []).push(e)
    ;(inn[e.to] ??= []).push(e)
    ;(neighbours[e.from] ??= new Set()).add(e.to)
    ;(neighbours[e.to] ??= new Set()).add(e.from)
  }

  for (const e of Object.values(world.entities)) {
    ;(byType[e.type] ??= []).push(e.id)
    neighbours[e.id] ??= new Set()
  }

  for (const r of Object.values(world.relations)) {
    if (!exists(r.from)) {
      broken.push({ from: r.from, to: r.to, where: 'relation source', origin: 'relation' })
      continue
    }
    if (!exists(r.to)) {
      broken.push({ from: r.from, to: r.to, where: RELATION_META[r.kind]?.label ?? r.kind, origin: 'relation' })
      continue
    }
    push(edgeFromRelation(r))
  }

  for (const e of Object.values(world.entities)) {
    const schema = SCHEMAS[e.type]
    if (!schema) continue
    for (const def of schema.fields) {
      if (def.kind !== 'refs') continue
      const val = e.fields[def.key]
      if (!Array.isArray(val)) continue
      for (const target of val as string[]) {
        if (typeof target !== 'string') continue
        if (!exists(target)) {
          broken.push({ from: e.id, to: target, where: def.label, origin: 'field' })
          continue
        }
        const kind = kindForField(e.type, def.key)
        push({
          from: e.id,
          to: target,
          kind,
          origin: 'field',
          fieldKey: def.key,
          label: def.label,
          hostile: RELATION_META[kind]?.hostile,
        })
      }
    }
    // Inline [[id]] mentions in prose.
    const prose: string[] = []
    if (e.summary) prose.push(e.summary)
    for (const def of schema.fields) {
      if (def.kind !== 'longtext') continue
      const v = e.fields[def.key]
      if (typeof v === 'string') prose.push(v)
    }
    for (const text of prose) {
      for (const target of extractInlineIds(text)) {
        if (!exists(target)) {
          broken.push({ from: e.id, to: target, where: 'inline mention', origin: 'inline' })
          continue
        }
        push({ from: e.id, to: target, kind: 'related_to', origin: 'inline', label: 'Mentions' })
      }
    }
  }

  const orphans = Object.values(world.entities)
    .filter((e) => !e.archived && (neighbours[e.id]?.size ?? 0) === 0)
    .map((e) => e.id)

  cacheKey = world
  cacheValue = { out, in: inn, broken, orphans, byType, neighbours }
  return cacheValue
}

/** Backlinks grouped by the heading they belong under. */
export function backlinkGroups(index: WorldIndex, id: string): { group: string; edges: Edge[] }[] {
  const edges = index.in[id] ?? []
  const groups = new Map<string, Edge[]>()
  for (const e of edges) {
    const g = e.origin === 'relation' ? RELATION_META[e.kind].backlinkGroup : backlinkGroupForField(e)
    const list = groups.get(g) ?? []
    if (!list.some((x) => x.from === e.from && x.kind === e.kind)) list.push(e)
    groups.set(g, list)
  }
  return [...groups.entries()]
    .map(([group, es]) => ({ group, edges: es }))
    .sort((a, b) => a.group.localeCompare(b.group))
}

function backlinkGroupForField(e: Edge): string {
  switch (e.kind) {
    case 'located_in':
      return 'Found in'
    case 'requires':
      return 'Required for'
    case 'produces':
      return 'Produced by'
    case 'consumes':
      return 'Consumed by'
    case 'crafted_at':
      return 'Crafts'
    case 'gives_quest':
      return 'Quest giver for'
    case 'inhabits':
      return 'Local creatures'
    case 'involves':
      return 'Involved in'
    case 'affects':
      return 'Affected by'
    case 'controls':
      return 'Controlled by'
    case 'unlocks':
      return 'Unlocked by'
    case 'leads':
      return 'Leadership'
    default:
      return 'Referenced by'
  }
}

export function relatedEntities(index: WorldIndex, id: string, kinds?: RelationKind[]): string[] {
  const seen = new Set<string>()
  for (const e of index.out[id] ?? []) if (!kinds || kinds.includes(e.kind)) seen.add(e.to)
  for (const e of index.in[id] ?? []) if (!kinds || kinds.includes(e.kind)) seen.add(e.from)
  return [...seen]
}

/** Outgoing targets of a given kind, e.g. every faction a city is controlled by. */
export function targetsOf(index: WorldIndex, id: string, kind: RelationKind): string[] {
  return (index.out[id] ?? []).filter((e) => e.kind === kind).map((e) => e.to)
}

export function sourcesOf(index: WorldIndex, id: string, kind: RelationKind): string[] {
  return (index.in[id] ?? []).filter((e) => e.kind === kind).map((e) => e.from)
}

export function entitiesOfType(world: WorldState, type: string): Entity[] {
  return Object.values(world.entities)
    .filter((e) => e.type === type && !e.archived)
    .sort((a, b) => a.name.localeCompare(b.name))
}
