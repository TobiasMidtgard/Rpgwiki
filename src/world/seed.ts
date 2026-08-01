/**
 * Seed assembly.
 *
 * Content modules are discovered automatically: any file in this directory
 * that exports `entities` (and optionally `relations`) is picked up. Adding a
 * new section of the world is a matter of dropping in a file.
 */

import type { Entity, Point, Relation } from '../core/types'
import { emptyWorld, type WorldState } from '../core/store'
import { toEntity, type SeedEntity, type SeedRelation } from './kit'
import { CITY_POS, placeInRegion } from './geo'
import { CITY_REGION } from './registry'
import { REGION_SHAPES, ALL_ROUTES, ZONES } from './geo'

import { SEED_VERSION } from './seedMeta'

export { SEED_VERSION }

interface ContentModule {
  entities?: SeedEntity[]
  relations?: SeedRelation[]
}

const modules = import.meta.glob<ContentModule>('./*.ts', { eager: true })

/** Files that are machinery rather than content. */
const NOT_CONTENT = new Set(['./kit.ts', './registry.ts', './geo.ts', './seed.ts'])

function collect(): { entities: SeedEntity[]; relations: SeedRelation[] } {
  const entities: SeedEntity[] = []
  const relations: SeedRelation[] = []
  for (const path of Object.keys(modules).sort()) {
    if (NOT_CONTENT.has(path)) continue
    const mod = modules[path]
    if (Array.isArray(mod?.entities)) entities.push(...mod.entities)
    if (Array.isArray(mod?.relations)) relations.push(...mod.relations)
  }
  return { entities, relations }
}

/**
 * Map placement. Settlements are hand-sited; everything that belongs to a
 * region is scattered inside it deterministically; quests pin to where they
 * start. Any of it can be dragged afterwards.
 */
function placeMarkers(entities: Entity[]): Record<string, Point> {
  const pos: Record<string, Point> = {}
  const byId = new Map(entities.map((e) => [e.id, e]))

  for (const e of entities) {
    if (e.type === 'city') {
      pos[e.id] = CITY_POS[e.id] ?? placeInRegion(CITY_REGION[e.id] ?? 'region.ascent-basin', e.id)
    }
  }

  const firstRef = (e: Entity, keys: string[]): string | undefined => {
    for (const k of keys) {
      const v = e.fields[k]
      if (Array.isArray(v) && typeof v[0] === 'string') return v[0] as string
    }
    return undefined
  }

  for (const e of entities) {
    if (pos[e.id]) continue
    if (e.type === 'site' || e.type === 'deposit') {
      const ref = firstRef(e, ['region', 'sourceRegion', 'habitat', 'grownIn'])
      const region = ref && byId.get(ref)?.type === 'region' ? ref : undefined
      pos[e.id] = placeInRegion(region ?? 'region.ascent-basin', e.id)
    } else if (e.type === 'quest') {
      const start = firstRef(e, ['startLocation'])
      const anchor = start ? pos[start] ?? CITY_POS[start] : undefined
      if (anchor) {
        // Offset so a city's quest pins do not stack on the settlement marker.
        let n = 0
        for (const k of Object.keys(pos)) if (byId.get(k)?.type === 'quest') n++
        const a = (n % 8) * (Math.PI / 4)
        pos[e.id] = [Math.round(anchor[0] + Math.cos(a) * 46), Math.round(anchor[1] + Math.sin(a) * 34)]
      }
    } else if (e.type === 'creature') {
      const hab = firstRef(e, ['habitat'])
      if (hab && byId.get(hab)?.type === 'region') pos[e.id] = placeInRegion(hab, e.id)
    }
  }
  return pos
}

/** Cities without uploaded art fall back to their generated vista. */
function ensureArt(e: Entity): Entity {
  if (e.type !== 'city') return e
  if (e.images && e.images.length) return e
  return {
    ...e,
    images: [
      {
        id: `${e.id}.vista`,
        src: 'gen:vista',
        caption: `${e.name} — generated vista`,
        credit: 'Procedural placeholder art. Replace with project artwork when available.',
      },
    ],
  }
}

let relCounter = 0
const relId = () => `rel.seed.${(relCounter++).toString(36)}`

export function buildSeed(): WorldState {
  const now = Date.now()
  const raw = collect()

  const entities: Record<string, Entity> = {}
  const duplicates: string[] = []
  for (const s of raw.entities) {
    if (entities[s.id]) {
      duplicates.push(s.id)
      continue
    }
    entities[s.id] = ensureArt(toEntity(s, now))
  }
  if (duplicates.length && import.meta.env.DEV) {
    console.warn(`[seed] ${duplicates.length} duplicate ids ignored:`, duplicates.slice(0, 12))
  }

  const relations: Record<string, Relation> = {}
  const seen = new Set<string>()
  for (const r of raw.relations) {
    const key = `${r.from}|${r.kind}|${r.to}`
    if (seen.has(key)) continue
    seen.add(key)
    const id = relId()
    relations[id] = { id, from: r.from, to: r.to, kind: r.kind, note: r.note, secret: r.secret }
  }

  const world = emptyWorld()
  world.entities = entities
  world.relations = relations
  world.atlas = {
    regions: REGION_SHAPES,
    routes: ALL_ROUTES,
    zones: ZONES,
    positions: placeMarkers(Object.values(entities)),
  }
  world.meta.seedVersion = SEED_VERSION
  world.meta.createdAt = now
  world.meta.updatedAt = now
  world.meta.touched = false
  return world
}
