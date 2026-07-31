/**
 * Production chains.
 *
 * One directed graph that follows a thing from the ground to a market stall:
 * deposits, regions and creatures give up materials; machines and recipes
 * turn them into components; components become finished items; settlements
 * export, import and consume the result; routes carry it away.
 *
 * Two views over the same graph:
 *   • `ProductionPage` — the board: chain picker, city filter, diagram,
 *     selection panel, and a plain table reading of the same set.
 *   • `MiniChain`      — a compact one-step strip embedded on material,
 *     machine and item pages.
 *
 * Every edge is derived from user-editable data, so the graph is validated
 * before it is laid out: references that do not resolve are dropped, loops
 * are detected and reported rather than followed, and a world with nothing
 * joined up yet says so instead of drawing an empty canvas.
 */

import { Fragment, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { EntityLink, entityPath } from '../components/EntityLink'
import { EmptyState, ErrorState, StatusBadge, TypeChip } from '../components/ui'
import { buildIndex } from '../core/relations'
import type { Edge } from '../core/relations'
import { useWorld } from '../core/store'
import type { WorldState } from '../core/store'
import { SCHEMAS } from '../core/schema'
import type { Entity, EntityType, FieldValue, RelationKind } from '../core/types'
import { isTbd } from '../core/types'

/* ------------------------------------------------------------------ */
/* Geometry                                                            */
/* ------------------------------------------------------------------ */

const NW = 172 // node slot width
const NH = 46 // node slot height
const GAP_X = 108
const GAP_Y = 22
const PITCH_X = NW + GAP_X
const PITCH_Y = NH + GAP_Y
const PAD_X = 28
const PAD_TOP = 46
const PAD_BOTTOM = 26

const MIN_ZOOM = 0.24
const MAX_ZOOM = 2.2

/* ------------------------------------------------------------------ */
/* What counts as part of a chain                                      */
/* ------------------------------------------------------------------ */

/** Only these types are drawn. Everything else is another view's business. */
const CHAIN_TYPES: EntityType[] = [
  'region',
  'creature',
  'deposit',
  'material',
  'machine',
  'recipe',
  'food',
  'item',
  'city',
  'route',
]
const IS_CHAIN = new Set<EntityType>(CHAIN_TYPES)

/** Types that can only ever be the far left of a chain. */
const IS_ORIGIN = new Set<EntityType>(['region', 'creature', 'deposit'])
/** Types that can only ever be the far right of a chain. */
const IS_SINK = new Set<EntityType>(['city', 'route'])

type FlowKind = 'source' | 'input' | 'output' | 'craft' | 'trade' | 'assoc'

const FLOW: Record<FlowKind, { colour: string; dash?: string; label: string; hint: string }> = {
  source: {
    colour: 'var(--t-region)',
    label: 'Extraction',
    hint: 'A raw material leaving the ground, the water or a carcass.',
  },
  input: { colour: 'var(--brass-dim)', label: 'Input', hint: 'Something a machine, recipe or item takes in.' },
  output: {
    colour: 'var(--brass)',
    label: 'Output',
    hint: 'What comes back out. Yield and time are shown where the entry records them.',
  },
  craft: { colour: 'var(--t-item)', label: 'Crafted', hint: 'A recipe becoming a finished item, or an upgrade path.' },
  trade: { colour: 'var(--steel)', label: 'Trade', hint: 'Goods reaching a settlement, a workshop floor or a route.' },
  assoc: {
    colour: 'var(--line-strong)',
    dash: '4 3',
    label: 'Stated link',
    hint: 'A link the data states without a direction. It does not order the columns.',
  },
}

const FLOW_ORDER: FlowKind[] = ['source', 'input', 'output', 'craft', 'trade', 'assoc']

interface Rule {
  label: string
  flow: FlowKind
  /** The field points the wrong way down the chain; swap the ends. */
  reverse?: boolean
  /** Structural edges order the columns. Associations do not. */
  loose?: boolean
}

/**
 * How each `refs` field reads as a step in a chain. The key is the field key,
 * so both the field itself and its inverse resolve to one edge.
 */
const FIELD_RULES: Record<string, Rule> = {
  material: { label: 'seam', flow: 'source' }, // deposit → material
  resources: { label: 'yields', flow: 'source' }, // region → material
  sourceRegion: { label: 'found in', flow: 'source', reverse: true },
  sourceCreature: { label: 'cut from', flow: 'source', reverse: true },
  yields: { label: 'harvest', flow: 'source' }, // creature → material
  grownIn: { label: 'grown in', flow: 'source', reverse: true },

  inputs: { label: 'input', flow: 'input', reverse: true },
  outputs: { label: 'output', flow: 'output' },
  materials: { label: 'made from', flow: 'input', reverse: true },
  recipe: { label: 'crafts', flow: 'craft', reverse: true },
  upgradesTo: { label: 'upgrades to', flow: 'craft' },

  machines: { label: 'processed at', flow: 'assoc', loose: true },
  machine: { label: 'worked at', flow: 'assoc', loose: true },
  recipes: { label: 'recipe', flow: 'assoc', loose: true },

  location: { label: 'sited at', flow: 'trade' }, // machine → city
  keyMachines: { label: 'sited at', flow: 'trade', reverse: true },
  exports: { label: 'export', flow: 'trade', reverse: true },
  imports: { label: 'import', flow: 'trade', reverse: true },
  localResources: { label: 'local', flow: 'trade', reverse: true },
  buildMaterials: { label: 'building', flow: 'trade', reverse: true },
  staples: { label: 'staple', flow: 'trade', reverse: true },
  goods: { label: 'carried', flow: 'trade', reverse: true },
}

/** Explicit relations that mean something in a chain. */
const KIND_RULES: Partial<Record<RelationKind, Rule>> = {
  refines_into: { label: 'refines into', flow: 'output' },
  produces: { label: 'produces', flow: 'output' },
  consumes: { label: 'consumed by', flow: 'input', reverse: true },
  requires: { label: 'required by', flow: 'input', reverse: true },
  crafted_at: { label: 'crafted at', flow: 'assoc', loose: true },
  sold_by: { label: 'sold by', flow: 'trade' },
}

/* ------------------------------------------------------------------ */
/* Silhouettes                                                         */
/* ------------------------------------------------------------------ */

const RECT = `M 0 0 H ${NW} V ${NH} H 0 Z`

/** Drawn in the 172 × 46 slot; sharp everywhere, one silhouette per type. */
const SHAPE: Partial<Record<EntityType, string>> = {
  region: RECT,
  creature: `M 0 14 L 14 0 H ${NW} V ${NH} H 0 Z`,
  deposit: `M 22 0 H ${NW} V ${NH} H 22 L 0 23 Z`,
  material: `M 12 0 H 160 L ${NW} 23 L 160 ${NH} H 12 L 0 23 Z`,
  food: `M 0 0 H 158 L ${NW} 12 V ${NH} H 14 L 0 34 Z`,
  machine: `M 0 7 H 14 V 0 H 48 V 7 H 124 V 0 H 158 V 7 H ${NW} V 39 H 158 V ${NH} H 124 V 39 H 48 V ${NH} H 14 V 39 H 0 Z`,
  recipe: RECT,
  item: `M 0 0 H 158 L ${NW} 23 L 158 ${NH} H 0 Z`,
  city: `M 18 0 H 154 L ${NW} ${NH} H 0 Z`,
  route: `M 16 0 H ${NW} L 156 ${NH} H 0 Z`,
}

/** Left and right edge-attachment x, so arrows do not float off a slope. */
const ANCHOR: Partial<Record<EntityType, [number, number]>> = {
  city: [9, 163],
  route: [8, 164],
  food: [7, 165],
}

/** Text inset, wider where the silhouette narrows at the left. */
const TEXT_PAD: Partial<Record<EntityType, number>> = { deposit: 24, material: 16, city: 22, route: 20 }

/** Fields worth reading in the selection panel, per type. */
const PANEL_FIELDS: Partial<Record<EntityType, string[]>> = {
  material: ['origin', 'rarity', 'tradeValue', 'extraction', 'refinement', 'uses'],
  machine: ['machineType', 'energy', 'productionTime', 'operator', 'failureRisks'],
  recipe: ['tier', 'yield', 'time'],
  item: ['itemType', 'rarity', 'value', 'origin'],
  food: ['foodType', 'season', 'value'],
  city: ['mainProduction', 'settlementType', 'wealth'],
  route: ['routeKind', 'endpoints', 'travelTime'],
  deposit: ['yieldTier', 'workedBy'],
  region: ['biome', 'travel'],
  creature: ['threat', 'size'],
}

/* ------------------------------------------------------------------ */
/* Reading user data                                                   */
/* ------------------------------------------------------------------ */

/** A field rendered as one short line, or undefined when there is nothing to say. */
function fieldText(v: FieldValue): string | undefined {
  if (v === null || v === undefined) return undefined
  if (isTbd(v)) return undefined
  if (typeof v === 'string') return v.trim() || undefined
  if (typeof v === 'number') return Number.isFinite(v) ? String(v) : undefined
  if (typeof v === 'boolean') return v ? 'Yes' : undefined
  if (Array.isArray(v)) {
    const parts = v.filter((x): x is string => typeof x === 'string' && x.trim().length > 0)
    return parts.length ? parts.join(', ') : undefined
  }
  return undefined
}

function clip(s: string, max: number): string {
  if (s.length <= max) return s
  return `${s.slice(0, Math.max(1, max - 1)).trimEnd()}…`
}

function labelOf(type: EntityType, key: string): string {
  return SCHEMAS[type]?.fields.find((f) => f.key === key)?.label ?? key
}

/** First of these that has a value becomes the qualifier under a node's name. */
const DETAIL_FIELDS: Partial<Record<EntityType, string[]>> = {
  material: ['rarity', 'origin'],
  machine: ['machineType'],
  recipe: ['tier'],
  item: ['itemType', 'rarity'],
  food: ['foodType'],
  city: ['settlementType'],
  route: ['routeKind'],
  deposit: ['yieldTier'],
  region: ['biome'],
  creature: ['threat'],
}

/** The one-line qualifier under a node name: rarity, tier, kind and so on. */
function nodeDetail(e: Entity): string | undefined {
  for (const k of DETAIL_FIELDS[e.type] ?? []) {
    const t = fieldText(e.fields[k])
    if (t) return t
  }
  return undefined
}

/** Yield and time carried on the producing entry, shown on its output edges. */
function outputData(src: Entity): string | undefined {
  if (src.type === 'recipe') {
    const parts = [fieldText(src.fields.yield), fieldText(src.fields.time)].filter(Boolean) as string[]
    return parts.length ? clip(parts.join(' · '), 22) : undefined
  }
  if (src.type === 'machine') {
    const t = fieldText(src.fields.productionTime)
    return t ? clip(t, 22) : undefined
  }
  return undefined
}

/* ------------------------------------------------------------------ */
/* Graph                                                               */
/* ------------------------------------------------------------------ */

interface ChainEdge {
  key: string
  from: string
  to: string
  label: string
  flow: FlowKind
  structural: boolean
  /** Yield, time or an authored note, drawn on the edge. */
  data?: string
}

interface ChainGraph {
  nodes: Map<string, Entity>
  edges: ChainEdge[]
  out: Map<string, ChainEdge[]>
  inc: Map<string, ChainEdge[]>
  /** Production entries that exist but join nothing yet. */
  loose: { type: EntityType; count: number }[]
  /** References from production entries pointing at ids that do not exist. */
  brokenRefs: number
  /** Total live production entries, linked or not. */
  total: number
}

function push<K, V>(m: Map<K, V[]>, k: K, v: V) {
  const list = m.get(k)
  if (list) list.push(v)
  else m.set(k, [v])
}

/** One index edge read as a chain step, or null when it is not one. */
function asChainEdge(e: Edge, world: WorldState): ChainEdge | null {
  const a = world.entities[e.from]
  const b = world.entities[e.to]
  if (!a || !b || a.archived || b.archived) return null
  if (!IS_CHAIN.has(a.type) || !IS_CHAIN.has(b.type)) return null
  if (a.id === b.id) return null

  const rule = e.origin === 'field' && e.fieldKey ? FIELD_RULES[e.fieldKey] : KIND_RULES[e.kind]
  if (!rule) return null

  // `grownIn` on a settlement duplicates the city's own trade fields, and a
  // machine sited in a whole region is a placement, not a step in a chain.
  if (e.origin === 'field' && e.fieldKey === 'grownIn' && b.type !== 'region') return null
  if (e.origin === 'field' && e.fieldKey === 'location' && b.type !== 'city') return null

  let from = rule.reverse ? b : a
  let to = rule.reverse ? a : b
  let structural = !rule.loose

  if (structural) {
    // Origins never receive and sinks never send, whichever way the data reads.
    // This is what stops a city both exporting a material and being said to
    // produce it, which would otherwise read as a two-node loop.
    if (IS_ORIGIN.has(to.type) && !IS_ORIGIN.has(from.type)) [from, to] = [to, from]
    else if (IS_SINK.has(from.type) && !IS_SINK.has(to.type)) [from, to] = [to, from]
    // Two origins, or two sinks, have no direction we can trust.
    if (IS_ORIGIN.has(from.type) && IS_ORIGIN.has(to.type)) structural = false
    if (IS_SINK.has(from.type) && IS_SINK.has(to.type)) structural = false
  }

  const data = rule.flow === 'output' ? outputData(from) : undefined
  const note = e.note && e.note.trim() ? clip(e.note.trim(), 22) : undefined

  return {
    key: `${from.id}|${to.id}`,
    from: from.id,
    to: to.id,
    label: rule.label,
    flow: rule.flow,
    structural,
    data: data ?? note,
  }
}

/**
 * Two fields can state the same step — a city's `exports` and its
 * `localResources`, say. One line is drawn, carrying both readings.
 */
function mergeEdges(prev: ChainEdge, next: ChainEdge): ChainEdge {
  const sameLabel = prev.label === next.label || prev.label.includes(next.label)
  const structural = prev.structural || next.structural
  const flow = prev.structural === next.structural ? prev.flow : prev.structural ? prev.flow : next.flow
  return {
    key: prev.key,
    from: prev.from,
    to: prev.to,
    // Two readings is context; three is noise.
    label: sameLabel || prev.label.includes(' / ') ? prev.label : `${prev.label} / ${next.label}`,
    flow,
    structural,
    data: prev.data ?? next.data,
  }
}

let chainKey: WorldState | null = null
let chainValue: ChainGraph | null = null

/** Folds every production reference in the world into one graph. Cached per world object. */
function chainGraph(world: WorldState): ChainGraph {
  if (chainKey === world && chainValue) return chainValue

  const index = buildIndex(world)
  const byKey = new Map<string, ChainEdge>()

  for (const list of Object.values(index.out)) {
    if (!Array.isArray(list)) continue
    for (const e of list) {
      const ce = asChainEdge(e, world)
      if (!ce) continue
      const prev = byKey.get(ce.key)
      byKey.set(ce.key, prev ? mergeEdges(prev, ce) : ce)
    }
  }

  /**
   * A stated link with no direction — a recipe naming its machine and that
   * machine naming the recipe — arrives twice, once from each end. Keep one,
   * chosen by id so the pick does not move between renders. Two *structural*
   * edges pointing both ways are a real loop and are left alone for the
   * ranking pass to catch and report.
   */
  for (const e of [...byKey.values()]) {
    if (e.structural) continue
    const rev = byKey.get(`${e.to}|${e.from}`)
    if (!rev) continue
    if (rev.structural || e.key > rev.key) byKey.delete(e.key)
  }

  const edges = [...byKey.values()].sort((x, y) => x.key.localeCompare(y.key))
  const out = new Map<string, ChainEdge[]>()
  const inc = new Map<string, ChainEdge[]>()
  const nodes = new Map<string, Entity>()

  for (const e of edges) {
    const a = world.entities[e.from]
    const b = world.entities[e.to]
    if (!a || !b) continue
    nodes.set(a.id, a)
    nodes.set(b.id, b)
    push(out, e.from, e)
    push(inc, e.to, e)
  }

  const looseCount = new Map<EntityType, number>()
  let total = 0
  for (const e of Object.values(world.entities)) {
    if (e.archived || !IS_CHAIN.has(e.type)) continue
    total += 1
    if (!nodes.has(e.id)) looseCount.set(e.type, (looseCount.get(e.type) ?? 0) + 1)
  }

  let brokenRefs = 0
  for (const b of index.broken) {
    const src = world.entities[b.from]
    if (src && IS_CHAIN.has(src.type)) brokenRefs += 1
  }

  chainKey = world
  chainValue = {
    nodes,
    edges,
    out,
    inc,
    loose: CHAIN_TYPES.filter((t) => (looseCount.get(t) ?? 0) > 0).map((t) => ({ type: t, count: looseCount.get(t) ?? 0 })),
    brokenRefs,
    total,
  }
  return chainValue
}

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

interface Placed {
  id: string
  entity: Entity
  stage: number
  x: number
  y: number
}

/** A link dropped because it closes a loop, with the run of entries it closed. */
interface CutLink {
  edge: ChainEdge
  loop: string[]
}

interface Layout {
  nodes: Placed[]
  byId: Map<string, Placed>
  edges: ChainEdge[]
  cut: CutLink[]
  cols: number
  /** One descriptive word per column, taken from what stands in it. */
  colWords: string[]
  w: number
  h: number
}

/**
 * Every edge that closes a loop, found by depth-first search: an edge landing
 * on a node still open on the search stack is a back edge and nothing else.
 *
 * The traversal is iterative — user data can nest deeply and a recursive walk
 * would blow the stack — and it visits roots and edges in a fixed order, so
 * the same world always loses the same links.
 */
function findBackEdges(ids: string[], outAdj: Map<string, ChainEdge[]>): Map<ChainEdge, string[]> {
  /** Cut edge → the run of entries it closes, so the note can name the loop. */
  const cut = new Map<ChainEdge, string[]>()
  const OPEN = 1
  const SHUT = 2
  const mark = new Map<string, number>()
  const depth = new Map<string, number>()

  for (const root of ids) {
    if (mark.get(root)) continue
    mark.set(root, OPEN)
    depth.set(root, 0)
    const stack: { id: string; i: number }[] = [{ id: root, i: 0 }]
    while (stack.length) {
      const frame = stack[stack.length - 1]
      const list = outAdj.get(frame.id) ?? []
      if (frame.i >= list.length) {
        mark.set(frame.id, SHUT)
        depth.delete(frame.id)
        stack.pop()
        continue
      }
      const e = list[frame.i]
      frame.i += 1
      const state = mark.get(e.to)
      if (state === OPEN) {
        // The open stack from the target up to here is the loop itself.
        const at = depth.get(e.to) ?? 0
        cut.set(e, stack.slice(at).map((f) => f.id))
      } else if (state === SHUT) {
        continue // settled on an earlier branch; not a loop
      } else {
        mark.set(e.to, OPEN)
        depth.set(e.to, stack.length)
        stack.push({ id: e.to, i: 0 })
      }
    }
  }
  return cut
}

/**
 * Stage per node: the longest path from a raw source, so nothing ever sits to
 * the left of something that feeds it. Loops are cut first and reported to the
 * reader rather than followed, which is what stops malformed data hanging the
 * page.
 */
function rankStages(ids: string[], edges: ChainEdge[]): { stage: Map<string, number>; cut: CutLink[] } {
  const present = new Set(ids)
  const structural = edges.filter((e) => e.structural && present.has(e.from) && present.has(e.to))

  const outAdj = new Map<string, ChainEdge[]>()
  for (const e of structural) push(outAdj, e.from, e)

  const back = findBackEdges(ids, outAdj)
  const kept = structural.filter((e) => !back.has(e))

  const keptOut = new Map<string, ChainEdge[]>()
  const left = new Map<string, number>(ids.map((id) => [id, 0]))
  for (const e of kept) {
    push(keptOut, e.from, e)
    left.set(e.to, (left.get(e.to) ?? 0) + 1)
  }

  const stage = new Map<string, number>(ids.map((id) => [id, 0]))
  const queue = ids.filter((id) => (left.get(id) ?? 0) === 0)
  let head = 0
  while (head < queue.length) {
    const id = queue[head]
    head += 1
    for (const e of keptOut.get(id) ?? []) {
      stage.set(e.to, Math.max(stage.get(e.to) ?? 0, (stage.get(id) ?? 0) + 1))
      const n = (left.get(e.to) ?? 1) - 1
      left.set(e.to, n)
      if (n === 0) queue.push(e.to)
    }
  }

  return { stage, cut: [...back.entries()].map(([edge, loop]) => ({ edge, loop })) }
}

/** Median-of-parents sweeps, four passes, no randomness — the same data lays out the same way. */
function orderRows(columns: string[][], edges: ChainEdge[]) {
  const parents = new Map<string, string[]>()
  const children = new Map<string, string[]>()
  for (const e of edges) {
    if (!e.structural) continue
    push(parents, e.to, e.from)
    push(children, e.from, e.to)
  }

  const pos = new Map<string, number>()
  const reindex = () => {
    for (const col of columns) col.forEach((id, i) => pos.set(id, i))
  }
  reindex()

  for (let pass = 0; pass < 4; pass++) {
    const forward = pass % 2 === 0
    const order = forward
      ? columns.map((_, i) => i).slice(1)
      : columns
          .map((_, i) => i)
          .slice(0, -1)
          .reverse()
    for (const c of order) {
      const col = columns[c]
      if (!col || col.length < 2) continue
      const rel = forward ? parents : children
      const keyed = col.map((id, i) => {
        const ns = (rel.get(id) ?? []).map((n) => pos.get(n)).filter((v): v is number => typeof v === 'number')
        return { id, i, b: ns.length ? ns.reduce((a, x) => a + x, 0) / ns.length : i }
      })
      keyed.sort((a, b) => a.b - b.b || a.i - b.i)
      columns[c] = keyed.map((k) => k.id)
      reindex()
    }
  }
}

const TIER: Record<string, number> = {
  region: 0,
  creature: 0,
  deposit: 0,
  material: 1,
  machine: 2,
  recipe: 2,
  food: 3,
  item: 3,
  city: 4,
  route: 5,
}

const TIER_WORD = ['Sources', 'Materials', 'Processing', 'Goods', 'Settlements', 'Routes']

/**
 * A column is named after what is actually standing in it, not after its
 * position. A cut loop can push a recipe far to the right, and calling that
 * column "Carried" because it happens to be the sixth would be a lie.
 */
function columnWord(entities: Entity[]): string {
  if (!entities.length) return ''
  const tally = new Map<number, number>()
  for (const e of entities) {
    const t = TIER[e.type] ?? 0
    tally.set(t, (tally.get(t) ?? 0) + 1)
  }
  let best = 0
  let bestN = -1
  for (const [t, n] of [...tally.entries()].sort((a, b) => a[0] - b[0])) {
    if (n > bestN) {
      best = t
      bestN = n
    }
  }
  return TIER_WORD[best] ?? ''
}

function layoutChain(graph: ChainGraph, visible: Set<string>): Layout {
  const ids = [...visible].filter((id) => graph.nodes.has(id))
  ids.sort((a, b) => {
    const ea = graph.nodes.get(a)
    const eb = graph.nodes.get(b)
    if (!ea || !eb) return 0
    return (TIER[ea.type] ?? 9) - (TIER[eb.type] ?? 9) || ea.name.localeCompare(eb.name)
  })

  const edges = graph.edges.filter((e) => visible.has(e.from) && visible.has(e.to))
  const { stage, cut } = rankStages(ids, edges)

  const cols = ids.reduce((m, id) => Math.max(m, (stage.get(id) ?? 0) + 1), 0)
  const columns: string[][] = Array.from({ length: cols }, () => [])
  for (const id of ids) columns[stage.get(id) ?? 0]?.push(id)
  orderRows(columns, edges)

  const maxRows = columns.reduce((m, c) => Math.max(m, c.length), 0)
  const h = PAD_TOP + PAD_BOTTOM + Math.max(1, maxRows) * NH + Math.max(0, maxRows - 1) * GAP_Y
  const w = PAD_X * 2 + Math.max(1, cols) * NW + Math.max(0, cols - 1) * GAP_X

  const nodes: Placed[] = []
  const byId = new Map<string, Placed>()
  columns.forEach((col, c) => {
    const span = col.length * NH + Math.max(0, col.length - 1) * GAP_Y
    const top = PAD_TOP + (h - PAD_TOP - PAD_BOTTOM - span) / 2
    col.forEach((id, r) => {
      const entity = graph.nodes.get(id)
      if (!entity) return
      const p: Placed = { id, entity, stage: c, x: PAD_X + c * PITCH_X, y: top + r * PITCH_Y }
      nodes.push(p)
      byId.set(id, p)
    })
  })

  const colWords = columns.map((col) =>
    columnWord(col.map((id) => graph.nodes.get(id)).filter((e): e is Entity => !!e)),
  )
  const cutSet = new Set(cut.map((c) => c.edge))
  return { nodes, byId, edges: edges.filter((e) => !cutSet.has(e)), cut, cols, colWords, w, h }
}

/* ------------------------------------------------------------------ */
/* Traversal                                                           */
/* ------------------------------------------------------------------ */

type Scope = 'both' | 'up' | 'down'

/** Everything reachable from `id`, following edges up, down or both ways. */
function connected(graph: ChainGraph, id: string, scope: Scope): Set<string> {
  const seen = new Set<string>()
  if (!graph.nodes.has(id)) return seen
  const walk = (dir: 'up' | 'down') => {
    const stack = [id]
    const local = new Set<string>([id])
    while (stack.length) {
      const cur = stack.pop()
      if (cur === undefined) continue
      seen.add(cur)
      const list = dir === 'down' ? graph.out.get(cur) : graph.inc.get(cur)
      for (const e of list ?? []) {
        const next = dir === 'down' ? e.to : e.from
        if (local.has(next)) continue
        local.add(next)
        stack.push(next)
      }
    }
  }
  if (scope !== 'down') walk('up')
  if (scope !== 'up') walk('down')
  seen.add(id)
  return seen
}

/* ------------------------------------------------------------------ */
/* Node                                                                */
/* ------------------------------------------------------------------ */

type NodeState = 'normal' | 'lit' | 'dim'

function ChainNodeShape({
  p,
  state,
  selected,
  onActivate,
  onReveal,
}: {
  p: Placed
  state: NodeState
  selected: boolean
  onActivate: (id: string, viaKeyboard: boolean) => void
  /** Tabbing to a node off the edge of the pane should bring it into view. */
  onReveal: (p: Placed) => void
}) {
  const type = p.entity.type
  const schema = SCHEMAS[type]
  const colour = p.entity.accent ?? `var(${schema?.accentVar ?? '--t-note'})`
  const pad = TEXT_PAD[type] ?? 14
  const budget = Math.floor((NW - pad - 12) / 6.1)
  const detail = nodeDetail(p.entity)
  const sub = [schema?.label ?? type, detail].filter(Boolean).join(' · ')

  return (
    <g
      className="pc-node"
      transform={`translate(${p.x} ${p.y})`}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      aria-label={`${p.entity.name}. ${sub}. ${selected ? 'Selected.' : 'Select to see its inputs and outputs.'}`}
      opacity={state === 'dim' ? 0.3 : 1}
      onFocus={() => onReveal(p)}
      onClick={() => onActivate(p.id, false)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault()
          e.stopPropagation()
          onActivate(p.id, true)
        }
      }}
    >
      <path
        d={SHAPE[type] ?? RECT}
        fill={selected ? 'var(--s3)' : 'var(--s1)'}
        stroke={colour}
        strokeWidth={selected ? 2.2 : 1.2}
        strokeDasharray={type === 'region' ? '5 3' : undefined}
      />
      {/* A doubled left rule is what tells a recipe apart from a plain box. */}
      {type === 'recipe' ? (
        <>
          <rect x={5} y={1} width={2} height={NH - 2} fill={colour} />
          <rect x={9} y={1} width={2} height={NH - 2} fill={colour} opacity={0.55} />
        </>
      ) : null}
      <text className="node-label pc-name" x={pad} y={19}>
        {clip(p.entity.name, budget)}
      </text>
      <text className="node-sub" x={pad} y={33}>
        <tspan fill={colour}>{schema?.glyph ?? '·'}</tspan> {clip(sub, budget + 2)}
      </text>
      <title>{p.entity.summary ? `${p.entity.name} — ${p.entity.summary}` : p.entity.name}</title>
    </g>
  )
}

/* ------------------------------------------------------------------ */
/* Edge                                                                */
/* ------------------------------------------------------------------ */

function anchors(p: Placed): { l: number; r: number } {
  const a = ANCHOR[p.entity.type] ?? [0, NW]
  return { l: p.x + a[0], r: p.x + a[1] }
}

function ChainEdgeLine({
  e,
  a,
  b,
  state,
  uid,
  showData,
}: {
  e: ChainEdge
  a: Placed
  b: Placed
  state: NodeState
  uid: string
  /** Yield and time chips are hidden on very large networks to keep them readable. */
  showData: boolean
}) {
  const style = FLOW[e.flow]
  const y1 = a.y + NH / 2
  const y2 = b.y + NH / 2

  // Same-column links can only be stated associations. They get a bracket off
  // the right-hand side rather than a curl through the column behind them.
  const sameCol = a.stage === b.stage
  const forward = b.stage > a.stage
  const from = sameCol ? anchors(a).r : forward ? anchors(a).r : anchors(a).l
  const to = sameCol ? anchors(b).r : forward ? anchors(b).l : anchors(b).r
  const dx = sameCol ? 54 : Math.max(34, Math.abs(to - from) * 0.42)
  const c1 = sameCol || forward ? from + dx : from - dx
  const c2 = sameCol ? to + dx : forward ? to - dx : to + dx
  const d = `M ${from} ${y1} C ${c1} ${y1}, ${c2} ${y2}, ${to} ${y2}`

  const lit = state === 'lit'
  const colour = lit ? 'var(--brass-lit)' : style.colour
  // With symmetric control points the curve's midpoint is the chord midpoint.
  const mx = sameCol ? from + dx * 0.75 : (from + to) / 2
  const my = (y1 + y2) / 2
  const caption = lit ? (e.data ? `${e.label} · ${e.data}` : e.label) : showData ? e.data : undefined

  return (
    <g opacity={state === 'dim' ? 0.16 : 1}>
      <path
        d={d}
        fill="none"
        stroke={colour}
        strokeWidth={lit ? 1.8 : 1.1}
        strokeDasharray={style.dash}
        markerEnd={`url(#pca-${uid}-${lit ? 'lit' : e.flow})`}
      />
      {caption ? (
        <g>
          <rect
            x={mx - (caption.length * 5.5 + 8) / 2}
            y={my - 8}
            width={caption.length * 5.5 + 8}
            height={16}
            fill="var(--bg-deep)"
            stroke={lit ? 'var(--brass-dim)' : 'var(--line)'}
          />
          <text className="pc-elabel" x={mx} y={my + 3.5} textAnchor="middle" fill={lit ? 'var(--text)' : 'var(--text-3)'}>
            {caption}
          </text>
        </g>
      ) : null}
    </g>
  )
}

/* ------------------------------------------------------------------ */
/* Arrow markers                                                       */
/* ------------------------------------------------------------------ */

function ArrowDefs({ uid }: { uid: string }) {
  const marks: { id: string; c: string }[] = [
    ...FLOW_ORDER.map((f) => ({ id: f, c: FLOW[f].colour })),
    { id: 'lit', c: 'var(--brass-lit)' },
  ]
  return (
    <defs>
      {marks.map((m) => (
        <marker
          key={m.id}
          id={`pca-${uid}-${m.id}`}
          viewBox="0 0 10 10"
          refX={9}
          refY={5}
          markerWidth={7}
          markerHeight={7}
          markerUnits="userSpaceOnUse"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={m.c} />
        </marker>
      ))}
    </defs>
  )
}

/* ------------------------------------------------------------------ */
/* Selection panel                                                     */
/* ------------------------------------------------------------------ */

function EdgeList({
  title,
  edges,
  side,
  graph,
  onPick,
  empty,
}: {
  title: string
  edges: ChainEdge[]
  side: 'from' | 'to'
  graph: ChainGraph
  onPick: (id: string) => void
  empty: string
}) {
  return (
    <div className="pc-block">
      <h4 className="label">{title}</h4>
      {edges.length === 0 ? (
        <p className="dim" style={{ fontSize: 'var(--fs-sm)', margin: 0 }}>
          {empty}
        </p>
      ) : (
        <ul className="gr-edges">
          {edges.map((e) => {
            const other = side === 'from' ? e.from : e.to
            const ent = graph.nodes.get(other)
            return (
              <li className="gr-edge" key={e.key}>
                <span className="rel">
                  {e.label}
                  {e.data ? ` · ${e.data}` : ''}
                </span>
                <span className="who">
                  <button type="button" className="gr-pick" onClick={() => onPick(other)}>
                    {ent?.name ?? other}
                  </button>
                  {ent ? (
                    <span className="gr-open">
                      <EntityLink id={other} label="open" glyph={false} />
                    </span>
                  ) : null}
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

function SelectionPanel({
  entity,
  graph,
  onPick,
  onFocus,
}: {
  entity: Entity
  graph: ChainGraph
  onPick: (id: string) => void
  onFocus: (id: string) => void
}) {
  const outs = graph.out.get(entity.id) ?? []
  const ins = graph.inc.get(entity.id) ?? []
  const keys = PANEL_FIELDS[entity.type] ?? []
  const rows = keys
    .map((k) => ({ k, label: labelOf(entity.type, k), value: fieldText(entity.fields[k]) }))
    .filter((r): r is { k: string; label: string; value: string } => !!r.value)

  return (
    <div className="panel pc-side">
      <div className="panel-head">
        <h3>{entity.name}</h3>
      </div>
      <div className="panel-body">
        <div className="btn-row" style={{ marginBottom: 'var(--sp-2)' }}>
          <TypeChip type={entity.type} />
          <StatusBadge status={entity.status} />
        </div>
        {entity.summary ? (
          <p className="dim" style={{ fontSize: 'var(--fs-sm)', marginTop: 0 }}>
            {clip(entity.summary, 220)}
          </p>
        ) : null}

        {rows.length ? (
          <dl className="kv" style={{ gridTemplateColumns: 'minmax(84px, 118px) 1fr' }}>
            {rows.map((r) => (
              <Fragment key={r.k}>
                <dt>{r.label}</dt>
                <dd>{clip(r.value, 200)}</dd>
              </Fragment>
            ))}
          </dl>
        ) : (
          <p className="dim" style={{ fontSize: 'var(--fs-sm)' }}>
            No production detail has been filled in on this entry yet.
          </p>
        )}

        <EdgeList
          title="Takes in"
          edges={ins}
          side="from"
          graph={graph}
          onPick={onPick}
          empty="Nothing feeds this. It reads as a raw source."
        />
        <EdgeList
          title="Sends out"
          edges={outs}
          side="to"
          graph={graph}
          onPick={onPick}
          empty="Nothing is made from this yet."
        />

        <div className="btn-row" style={{ marginTop: 'var(--sp-3)' }}>
          <button type="button" className="btn sm" onClick={() => onFocus(entity.id)}>
            Show only this chain
          </button>
          <EntityLink id={entity.id} label="Open the full entry" />
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function ProductionPage() {
  const world = useWorld()
  const [params, setParams] = useSearchParams()
  const uid = useId().replace(/:/g, '')

  const stageRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{ x: number; y: number; vx: number; vy: number; moved: boolean } | null>(null)
  const movedRef = useRef(false)
  const lastFit = useRef('')

  const [size, setSize] = useState({ w: 0, h: 0 })
  const [view, setView] = useState({ k: 1, x: 0, y: 0 })
  const [panning, setPanning] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const [mode, setMode] = useState<'diagram' | 'table'>('diagram')

  const focus = params.get('focus') ?? ''
  const cityId = params.get('city') ?? ''
  const rawScope = params.get('scope')
  const scope: Scope = rawScope === 'up' || rawScope === 'down' ? rawScope : 'both'

  /**
   * `setSearchParams` — including its function form — builds on the query
   * string captured by the current render, so two controls changed before
   * React commits would silently undo each other. The last written value is
   * shadowed here until the router catches up.
   */
  const paramsRef = useRef(params)
  const pendingRef = useRef<URLSearchParams | null>(null)
  useEffect(() => {
    paramsRef.current = params
    pendingRef.current = null
  }, [params])

  const setParam = useCallback(
    (patch: Record<string, string>) => {
      const next = new URLSearchParams(pendingRef.current ?? paramsRef.current)
      for (const [k, v] of Object.entries(patch)) {
        if (v) next.set(k, v)
        else next.delete(k)
      }
      pendingRef.current = next
      setParams(next, { replace: true })
    },
    [setParams],
  )

  const graph = useMemo(() => {
    if (!world) return null
    try {
      return chainGraph(world)
    } catch {
      return null
    }
  }, [world])

  const visible = useMemo(() => {
    if (!graph) return new Set<string>()
    let set = new Set(graph.nodes.keys())
    if (focus && graph.nodes.has(focus)) set = connected(graph, focus, scope)
    if (cityId && graph.nodes.has(cityId)) {
      const around = connected(graph, cityId, 'both')
      set = new Set([...set].filter((id) => around.has(id)))
    }
    return set
  }, [graph, focus, cityId, scope])

  const layout = useMemo(() => (graph ? layoutChain(graph, visible) : null), [graph, visible])

  /* --- viewport ---------------------------------------------------- */
  useEffect(() => {
    const el = stageRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect()
      setSize({ w: r.width, h: r.height })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [mode])

  const setViewFor = useCallback(
    (intent: 'fit' | 'auto') => {
      if (!layout || !size.w || !size.h || !layout.w || !layout.h) return
      const whole = Math.min((size.w - 20) / layout.w, (size.h - 20) / layout.h)
      // `fit` shows everything however small that makes the type. `auto` is the
      // opening view: never shrink names past reading size — pan instead.
      const k = intent === 'fit' ? Math.max(MIN_ZOOM, Math.min(1.2, whole)) : Math.max(0.82, Math.min(1.1, whole))
      const fitsX = layout.w * k <= size.w
      const fitsY = layout.h * k <= size.h
      setView({
        k,
        x: fitsX ? (size.w - layout.w * k) / 2 : 14,
        y: fitsY ? (size.h - layout.h * k) / 2 : 14,
      })
    },
    [layout, size.w, size.h],
  )
  const fit = useCallback(() => setViewFor('fit'), [setViewFor])

  const fitKey = `${focus}|${cityId}|${scope}|${layout?.w ?? 0}x${layout?.h ?? 0}|${Math.round(size.w)}x${Math.round(size.h)}`
  useEffect(() => {
    if (!size.w || !size.h || lastFit.current === fitKey) return
    lastFit.current = fitKey
    setViewFor('auto')
  }, [fitKey, setViewFor, size.w, size.h])

  const zoomAt = useCallback((factor: number, cx: number, cy: number) => {
    setView((v) => {
      const k = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, v.k * factor))
      const f = k / v.k
      return { k, x: cx - (cx - v.x) * f, y: cy - (cy - v.y) * f }
    })
  }, [])

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const onWheel = (ev: WheelEvent) => {
      ev.preventDefault()
      const r = el.getBoundingClientRect()
      zoomAt(ev.deltaY > 0 ? 1 / 1.12 : 1.12, ev.clientX - r.left, ev.clientY - r.top)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [zoomAt, mode])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.button !== 1) return
    movedRef.current = false
    drag.current = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y, moved: false }
    setPanning(true)
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d) return
    const dx = e.clientX - d.x
    const dy = e.clientY - d.y
    if (!d.moved && Math.abs(dx) + Math.abs(dy) < 4) return
    d.moved = true
    movedRef.current = true
    setView((v) => ({ ...v, x: d.vx + dx, y: d.vy + dy }))
  }
  const endPointer = () => {
    drag.current = null
    setPanning(false)
  }

  const onKeyDown = (e: React.KeyboardEvent<SVGSVGElement>) => {
    const step = e.shiftKey ? 160 : 56
    const moves: Record<string, () => void> = {
      ArrowLeft: () => setView((v) => ({ ...v, x: v.x + step })),
      ArrowRight: () => setView((v) => ({ ...v, x: v.x - step })),
      ArrowUp: () => setView((v) => ({ ...v, y: v.y + step })),
      ArrowDown: () => setView((v) => ({ ...v, y: v.y - step })),
      '+': () => zoomAt(1.18, size.w / 2, size.h / 2),
      '=': () => zoomAt(1.18, size.w / 2, size.h / 2),
      '-': () => zoomAt(1 / 1.18, size.w / 2, size.h / 2),
      _: () => zoomAt(1 / 1.18, size.w / 2, size.h / 2),
      '0': () => fit(),
    }
    const fn = moves[e.key]
    if (fn) {
      e.preventDefault()
      fn()
    }
  }

  const activate = useCallback((id: string, viaKeyboard: boolean) => {
    if (!viaKeyboard && movedRef.current) return
    setSelected((prev) => (prev === id ? null : id))
  }, [])

  /** Pan the smallest distance that puts a newly focused node inside the pane. */
  const reveal = useCallback(
    (p: Placed) => {
      if (!size.w || !size.h) return
      setView((v) => {
        const m = 26
        const sx = p.x * v.k + v.x
        const sy = p.y * v.k + v.y
        const nw = NW * v.k
        const nh = NH * v.k
        let x = v.x
        let y = v.y
        if (sx < m) x = v.x + (m - sx)
        else if (sx + nw > size.w - m) x = v.x - (sx + nw - (size.w - m))
        if (sy < m) y = v.y + (m - sy)
        else if (sy + nh > size.h - m) y = v.y - (sy + nh - (size.h - m))
        return x === v.x && y === v.y ? v : { ...v, x, y }
      })
    },
    [size.w, size.h],
  )

  useEffect(() => {
    setSelected((prev) => (prev && visible.has(prev) ? prev : null))
  }, [visible])

  /* --- picker sources ---------------------------------------------- */
  const pickable = useMemo(() => {
    const groups: { label: string; type: EntityType; items: Entity[] }[] = [
      { label: 'Materials', type: 'material', items: [] },
      { label: 'Items', type: 'item', items: [] },
      { label: 'Food', type: 'food', items: [] },
      { label: 'Machines', type: 'machine', items: [] },
      { label: 'Recipes', type: 'recipe', items: [] },
    ]
    if (!graph) return groups
    for (const e of graph.nodes.values()) {
      const g = groups.find((x) => x.type === e.type)
      if (g) g.items.push(e)
    }
    for (const g of groups) g.items.sort((a, b) => a.name.localeCompare(b.name))
    return groups.filter((g) => g.items.length > 0)
  }, [graph])

  const cities = useMemo(() => {
    if (!graph) return []
    return [...graph.nodes.values()].filter((e) => e.type === 'city').sort((a, b) => a.name.localeCompare(b.name))
  }, [graph])

  /* --- guards ------------------------------------------------------ */
  if (!world) {
    return (
      <div className="main-pad">
        <EmptyState title="The world has not finished loading">Give it a moment, then reload the page.</EmptyState>
      </div>
    )
  }

  if (!graph) {
    return (
      <div className="main-pad">
        <div className="page-head">
          <h1>Production chains</h1>
        </div>
        <ErrorState title="The chain could not be read" onRetry={() => window.location.reload()}>
          Something in the world data stopped the production index from being built. Check the most recent import or edit on the
          Data page.
        </ErrorState>
      </div>
    )
  }

  const head = (
    <div className="page-head">
      <div>
        <h1>Production chains</h1>
        <p className="lede">
          Raw material to refining, machine to component, component to finished item, and on to the settlements that trade it.
          Columns are ordered by how far a thing sits from the ground it came out of.
        </p>
      </div>
    </div>
  )

  if (graph.edges.length === 0) {
    return (
      <div className="main-pad">
        {head}
        <EmptyState title="No complete production chain has been recorded yet">
          {graph.total === 0 ? (
            <>
              Nothing has been written yet for materials, machines, recipes or items. A chain draws itself as soon as one entry
              names another — a machine listing its <span className="mono">inputs</span> and{' '}
              <span className="mono">outputs</span>, a recipe its <span className="mono">inputs</span>, or an item its{' '}
              <span className="mono">materials</span>.
            </>
          ) : (
            <>
              {graph.total} production {graph.total === 1 ? 'entry exists' : 'entries exist'}, but none of them name each other
              yet, so there is nothing to join up.
              {graph.brokenRefs > 0 ? (
                <>
                  {' '}
                  {graph.brokenRefs} reference{graph.brokenRefs === 1 ? '' : 's'} from those entries point at ids that have no
                  entry — the materials and machines the settlements list have not been written yet.
                </>
              ) : null}
            </>
          )}
        </EmptyState>
      </div>
    )
  }

  const selectedEntity = selected ? graph.nodes.get(selected) : undefined
  const nothingMatches = !!layout && layout.nodes.length === 0
  const focusMissing = !!focus && !graph.nodes.has(focus)
  const litIds = new Set<string>()
  if (selected && layout) {
    litIds.add(selected)
    for (const e of layout.edges) {
      if (e.from === selected) litIds.add(e.to)
      if (e.to === selected) litIds.add(e.from)
    }
  }

  const nodeState = (id: string): NodeState => (!selected ? 'normal' : litIds.has(id) ? 'lit' : 'dim')
  const edgeState = (e: ChainEdge): NodeState =>
    !selected ? 'normal' : e.from === selected || e.to === selected ? 'lit' : 'dim'

  const showEdgeData = !!layout && layout.nodes.length <= 70
  const typeCounts = CHAIN_TYPES.map((t) => ({
    type: t,
    n: (layout?.nodes ?? []).filter((p) => p.entity.type === t).length,
  })).filter((c) => c.n > 0)

  return (
    <div className="main-pad">
      {head}

      {/* Controls -------------------------------------------------- */}
      <div className="panel" style={{ marginBottom: 'var(--sp-3)' }}>
        <div className="panel-body">
          <div className="gr-controls">
            <div className="gr-control">
              <label className="field-label" htmlFor="pc-focus">
                Chain
              </label>
              <select
                id="pc-focus"
                className="select"
                value={focus}
                onChange={(e) => setParam({ focus: e.target.value })}
              >
                <option value="">Show the whole network</option>
                {pickable.map((g) => (
                  <optgroup key={g.type} label={g.label}>
                    {g.items.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div className="gr-control">
              <label className="field-label" htmlFor="pc-city">
                Settlement
              </label>
              <select id="pc-city" className="select" value={cityId} onChange={(e) => setParam({ city: e.target.value })}>
                <option value="">Every settlement</option>
                {cities.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              {cities.length === 0 ? (
                <p className="field-help">No settlement has linked goods yet.</p>
              ) : null}
            </div>

            <div className="gr-control" style={{ flex: '0 0 auto' }}>
              <span className="field-label" id="pc-scope-label">
                Direction
              </span>
              <div className="mode-toggle" role="group" aria-labelledby="pc-scope-label">
                <button
                  type="button"
                  aria-pressed={scope === 'up'}
                  disabled={!focus}
                  onClick={() => setParam({ scope: 'up' })}
                  title="Only what feeds the chosen entry"
                >
                  Upstream
                </button>
                <button type="button" aria-pressed={scope === 'both'} disabled={!focus} onClick={() => setParam({ scope: '' })}>
                  Both
                </button>
                <button
                  type="button"
                  aria-pressed={scope === 'down'}
                  disabled={!focus}
                  onClick={() => setParam({ scope: 'down' })}
                  title="Only what the chosen entry becomes"
                >
                  Downstream
                </button>
              </div>
            </div>

            <div className="gr-control gr-actions" style={{ flex: '0 0 auto' }}>
              <span className="field-label" id="pc-mode-label">
                View
              </span>
              <div className="mode-toggle" role="group" aria-labelledby="pc-mode-label">
                <button type="button" aria-pressed={mode === 'diagram'} onClick={() => setMode('diagram')}>
                  Diagram
                </button>
                <button type="button" aria-pressed={mode === 'table'} onClick={() => setMode('table')}>
                  Table
                </button>
              </div>
            </div>
          </div>

          {focus || cityId ? (
            <div className="btn-row" style={{ marginTop: 'var(--sp-3)' }}>
              <button type="button" className="btn sm" onClick={() => setParam({ focus: '', city: '', scope: '' })}>
                Show the whole network
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {/* Notes ------------------------------------------------------ */}
      <p className="gr-note">
        {layout ? layout.nodes.length : 0} of {graph.nodes.size} linked entries shown &middot; {layout ? layout.edges.length : 0}{' '}
        connections &middot; {layout ? layout.cols : 0} stage{layout && layout.cols === 1 ? '' : 's'}
      </p>

      {layout && layout.cut.length > 0 ? (
        <div className="gr-note warn">
          <p style={{ margin: 0 }}>
            {layout.cut.length === 1 ? 'One run of links feeds' : `${layout.cut.length} runs of links feed`} back into
            {layout.cut.length === 1 ? ' its' : ' their'} own source, so {layout.cut.length === 1 ? 'it has' : 'they have'} no
            first stage. The closing link is left out of the diagram so the columns could be ordered:
          </p>
          <ul className="pc-loops">
            {layout.cut.slice(0, 4).map((c) => (
              <li key={c.edge.key}>
                {[...c.loop, c.edge.to].map((n) => graph.nodes.get(n)?.name ?? n).join(' → ')}
                <span className="dimmer">
                  {' '}
                  (dropped: {graph.nodes.get(c.edge.from)?.name ?? c.edge.from} → {graph.nodes.get(c.edge.to)?.name ?? c.edge.to}
                  )
                </span>
              </li>
            ))}
            {layout.cut.length > 4 ? <li className="dimmer">and {layout.cut.length - 4} more.</li> : null}
          </ul>
        </div>
      ) : null}

      {graph.brokenRefs > 0 ? (
        <p className="gr-note">
          {graph.brokenRefs} reference{graph.brokenRefs === 1 ? '' : 's'} in the production entries point at ids with no entry
          yet, so those steps are missing from the diagram.
        </p>
      ) : null}

      {focusMissing ? (
        <p className="gr-note warn">
          The chain in the address bar (<span className="mono">{focus}</span>) has no linked entry, so the whole network is shown
          instead.
        </p>
      ) : null}

      {nothingMatches ? (
        <EmptyState title="Nothing matches that combination">
          The chosen chain and the chosen settlement do not touch each other. Clear one of them, or pick a good the settlement
          actually handles.
        </EmptyState>
      ) : mode === 'table' ? (
        <ChainTable layout={layout} graph={graph} />
      ) : (
        <div className="pc-board">
          <div className="panel">
            <div className="panel-head">
              <h3>{focus ? (graph.nodes.get(focus)?.name ?? 'Chain') : 'Whole network'}</h3>
              <span className="spacer" />
              <div className="btn-row">
                <span className="mono dim pc-pct" style={{ fontSize: 'var(--fs-micro)' }} aria-hidden="true">
                  {Math.round(view.k * 100)}%
                </span>
                <button type="button" className="btn sm" onClick={() => zoomAt(1 / 1.2, size.w / 2, size.h / 2)} aria-label="Zoom out">
                  &minus;
                </button>
                <button type="button" className="btn sm" onClick={() => zoomAt(1.2, size.w / 2, size.h / 2)} aria-label="Zoom in">
                  +
                </button>
                <button type="button" className="btn sm" onClick={fit} title="Show the whole diagram">
                  Fit
                </button>
              </div>
            </div>

            <div
              ref={stageRef}
              className={`canvas-panel pc-stage${panning ? ' dragging' : ''}`}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endPointer}
              onPointerCancel={endPointer}
              onPointerLeave={endPointer}
            >
              <svg
                width="100%"
                height="100%"
                tabIndex={0}
                role="application"
                aria-label="Production chain diagram. Arrow keys pan, plus and minus zoom, 0 fits the diagram. Tab moves between entries."
                onKeyDown={onKeyDown}
              >
                <ArrowDefs uid={uid} />
                <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>
                  {layout
                    ? Array.from({ length: layout.cols }, (_, c) => (
                        <g key={c}>
                          {c % 2 === 0 ? (
                            <rect x={PAD_X + c * PITCH_X - 10} y={0} width={NW + 20} height={layout.h} fill="var(--s1)" opacity={0.5} />
                          ) : null}
                          <text className="pc-col" x={PAD_X + c * PITCH_X} y={22}>
                            {`STAGE ${c + 1}${layout.colWords[c] ? ` · ${layout.colWords[c]}` : ''}`}
                          </text>
                        </g>
                      ))
                    : null}

                  {layout?.edges.map((e) => {
                    const a = layout.byId.get(e.from)
                    const b = layout.byId.get(e.to)
                    if (!a || !b) return null
                    return (
                      <ChainEdgeLine key={e.key} e={e} a={a} b={b} state={edgeState(e)} uid={uid} showData={showEdgeData} />
                    )
                  })}

                  {layout?.nodes.map((p) => (
                    <ChainNodeShape
                      key={p.id}
                      p={p}
                      state={nodeState(p.id)}
                      selected={selected === p.id}
                      onActivate={activate}
                      onReveal={reveal}
                    />
                  ))}
                </g>
              </svg>
            </div>

            <div className="flow-legend">
              {FLOW_ORDER.map((f) => (
                <span className="flow-key" key={f} title={FLOW[f].hint}>
                  <svg width="22" height="8" aria-hidden="true">
                    <line x1="0" y1="4" x2="22" y2="4" stroke={FLOW[f].colour} strokeWidth="1.6" strokeDasharray={FLOW[f].dash} />
                  </svg>
                  {FLOW[f].label}
                </span>
              ))}
              <span className="flow-key">Shape and colour follow the entry type.</span>
            </div>
          </div>

          {selectedEntity ? (
            <SelectionPanel
              entity={selectedEntity}
              graph={graph}
              onPick={(id) => setSelected(id)}
              onFocus={(id) => setParam({ focus: id, scope: '' })}
            />
          ) : (
            <div className="panel pc-side">
              <div className="panel-head">
                <h3>Nothing selected</h3>
              </div>
              <div className="panel-body">
                <p className="dim" style={{ fontSize: 'var(--fs-sm)', marginTop: 0 }}>
                  Pick an entry in the diagram — click it, or Tab to it and press Enter — to read its inputs, outputs and the
                  fields that matter to production.
                </p>
                <ul className="pc-counts">
                  {typeCounts.map((c) => (
                    <li key={c.type}>
                      <span style={{ color: `var(${SCHEMAS[c.type]?.accentVar ?? '--t-note'})` }} aria-hidden="true">
                        {SCHEMAS[c.type]?.glyph ?? '·'}
                      </span>
                      <span className="n">{c.n}</span>
                      {SCHEMAS[c.type]?.label ?? c.type}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {graph.loose.length > 0 ? (
        <p className="gr-note" style={{ marginTop: 'var(--sp-3)' }}>
          Not on the diagram because nothing references {graph.loose.length === 1 ? 'it' : 'them'} yet:{' '}
          {graph.loose.map((l) => `${l.count} ${(SCHEMAS[l.type]?.label ?? l.type).toLowerCase()}`).join(', ')}.
        </p>
      ) : null}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Table reading                                                       */
/* ------------------------------------------------------------------ */

function ChainTable({ layout, graph }: { layout: Layout | null; graph: ChainGraph }) {
  if (!layout || layout.nodes.length === 0) {
    return <EmptyState title="Nothing to list">No entries match the current chain and settlement.</EmptyState>
  }
  const rows = [...layout.nodes].sort((a, b) => a.stage - b.stage || a.entity.name.localeCompare(b.entity.name))
  const names = (list: ChainEdge[], side: 'from' | 'to') =>
    list
      .map((e) => graph.nodes.get(side === 'from' ? e.from : e.to)?.name)
      .filter((n): n is string => !!n)
      .join(', ')

  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Stage</th>
            <th scope="col">Entry</th>
            <th scope="col">Type</th>
            <th scope="col">Takes in</th>
            <th scope="col">Sends out</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => {
            const ins = (graph.inc.get(p.id) ?? []).filter((e) => layout.byId.has(e.from))
            const outs = (graph.out.get(p.id) ?? []).filter((e) => layout.byId.has(e.to))
            return (
              <tr key={p.id}>
                <td className="mono">
                  {p.stage + 1}
                  {layout.colWords[p.stage] ? ` · ${layout.colWords[p.stage]}` : ''}
                </td>
                <td>
                  <EntityLink id={p.id} />
                </td>
                <td className="dim">{SCHEMAS[p.entity.type]?.label ?? p.entity.type}</td>
                <td className="dim">{names(ins, 'from') || '—'}</td>
                <td className="dim">{names(outs, 'to') || '—'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* MiniChain — one step either side, for entity pages                  */
/* ------------------------------------------------------------------ */

const MW = 154 // mini node width
const MH = 32
const MGAP_X = 62
const MGAP_Y = 10
const MPAD = 8
const MAX_SIDE = 6

export function MiniChain({ id, height }: { id: string; height?: number }) {
  const world = useWorld()
  const navigate = useNavigate()
  const box = height && Number.isFinite(height) ? Math.max(120, height) : 200

  const graph = useMemo(() => {
    if (!world) return null
    try {
      return chainGraph(world)
    } catch {
      return null
    }
  }, [world])

  const self = graph?.nodes.get(id)
  const ins = useMemo(() => (graph ? (graph.inc.get(id) ?? []) : []), [graph, id])
  const outs = useMemo(() => (graph ? (graph.out.get(id) ?? []) : []), [graph, id])

  if (!world || !graph || !self) {
    return (
      <EmptyState title="Not joined to a production chain yet">
        This entry does not name any material, machine, recipe or item, and nothing names it. Fill in its inputs and outputs and
        the chain will draw itself.
      </EmptyState>
    )
  }

  const left = ins.slice(0, MAX_SIDE)
  const right = outs.slice(0, MAX_SIDE)
  const rows = Math.max(1, left.length, right.length)
  const h = MPAD * 2 + rows * MH + (rows - 1) * MGAP_Y
  const w = MPAD * 2 + MW * 3 + MGAP_X * 2
  const colX = [MPAD, MPAD + MW + MGAP_X, MPAD + (MW + MGAP_X) * 2]

  const yFor = (count: number, i: number) => {
    const span = count * MH + (count - 1) * MGAP_Y
    return MPAD + (h - MPAD * 2 - span) / 2 + i * (MH + MGAP_Y)
  }

  const go = (target: string) => {
    const ent = graph.nodes.get(target)
    if (ent) navigate(entityPath(ent))
  }

  const cell = (entity: Entity, x: number, y: number, interactive: boolean) => {
    const colour = entity.accent ?? `var(${SCHEMAS[entity.type]?.accentVar ?? '--t-note'})`
    return (
      <g
        key={`${x}-${entity.id}`}
        transform={`translate(${x} ${y})`}
        className={interactive ? 'pc-mini-node' : undefined}
        role={interactive ? 'link' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={interactive ? `Open ${entity.name}` : undefined}
        onClick={interactive ? () => go(entity.id) : undefined}
        onKeyDown={
          interactive
            ? (ev) => {
                if (ev.key === 'Enter' || ev.key === ' ' || ev.key === 'Spacebar') {
                  ev.preventDefault()
                  go(entity.id)
                }
              }
            : undefined
        }
      >
        <rect
          width={MW}
          height={MH}
          fill={interactive ? 'var(--s1)' : 'var(--s3)'}
          stroke={interactive ? 'var(--line-strong)' : colour}
          strokeWidth={interactive ? 1 : 1.6}
        />
        <rect width={3} height={MH} fill={colour} />
        <text className="node-label" x={10} y={14}>
          {clip(entity.name, 23)}
        </text>
        <text className="node-sub" x={10} y={26}>
          {clip(SCHEMAS[entity.type]?.label ?? entity.type, 24)}
        </text>
        <title>{entity.summary ? `${entity.name} — ${entity.summary}` : entity.name}</title>
      </g>
    )
  }

  const midY = yFor(1, 0)

  return (
    <div className="pc-mini">
      <div className="pc-mini-scroll" style={{ maxHeight: box }}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} role="img" aria-label={`Production steps either side of ${self.name}`}>
          {left.map((e, i) => {
            const ent = graph.nodes.get(e.from)
            if (!ent) return null
            const y = yFor(left.length, i)
            return (
              <g key={e.key}>
                <path
                  d={`M ${colX[0] + MW} ${y + MH / 2} C ${colX[0] + MW + 26} ${y + MH / 2}, ${colX[1] - 26} ${midY + MH / 2}, ${colX[1]} ${midY + MH / 2}`}
                  fill="none"
                  stroke={FLOW[e.flow].colour}
                  strokeWidth="1.1"
                  strokeDasharray={FLOW[e.flow].dash}
                />
                {cell(ent, colX[0], y, true)}
              </g>
            )
          })}

          {right.map((e, i) => {
            const ent = graph.nodes.get(e.to)
            if (!ent) return null
            const y = yFor(right.length, i)
            return (
              <g key={e.key}>
                <path
                  d={`M ${colX[1] + MW} ${midY + MH / 2} C ${colX[1] + MW + 26} ${midY + MH / 2}, ${colX[2] - 26} ${y + MH / 2}, ${colX[2]} ${y + MH / 2}`}
                  fill="none"
                  stroke={FLOW[e.flow].colour}
                  strokeWidth="1.1"
                  strokeDasharray={FLOW[e.flow].dash}
                />
                {cell(ent, colX[2], y, true)}
              </g>
            )
          })}

          {cell(self, colX[1], midY, false)}
        </svg>
      </div>

      <p className="pc-mini-foot">
        {ins.length === 0 && outs.length === 0 ? (
          <>Nothing feeds this and nothing is made from it yet. </>
        ) : (
          <>
            {ins.length} in, {outs.length} out
            {ins.length > MAX_SIDE || outs.length > MAX_SIDE ? ' — the strip shows the first six of each side' : ''}.{' '}
          </>
        )}
        <Link to={`/production?focus=${encodeURIComponent(id)}`}>Open the full chain</Link>
      </p>
    </div>
  )
}
