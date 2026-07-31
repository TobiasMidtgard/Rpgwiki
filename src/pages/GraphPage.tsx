/**
 * Connection graph.
 *
 * Every entry in the world and every link between them, laid out by a small
 * hand-rolled force simulation (Fruchterman–Reingold with a cooling
 * temperature). Starting positions are derived from a hash of each entity id,
 * so the same world always produces the same picture — nothing here uses
 * Math.random.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { entityPath } from '../components/EntityLink'
import { EmptyState, ErrorState, StatusBadge, TypeGlyph, useLocalState } from '../components/ui'
import { buildIndex } from '../core/relations'
import type { Edge, WorldIndex } from '../core/relations'
import { SCHEMAS } from '../core/schema'
import { useWorld } from '../core/store'
import type { WorldState } from '../core/store'
import { ENTITY_TYPES, RELATION_META } from '../core/types'
import type { Entity, EntityType, Status } from '../core/types'

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

const LAYOUT_W = 1600
const LAYOUT_H = 1100
const CX = LAYOUT_W / 2
const CY = LAYOUT_H / 2

/** Hard ceiling on drawn nodes. Anything above this is reported, not dropped silently. */
const MAX_NODES = 320

const TEMP_START = 150
const TEMP_MIN = 0.6
const COOL = 0.972
const TICKS_PER_FRAME = 6
const GRAVITY = 0.14
/** Vertical pull is stronger, so the settled blob is wide rather than round
    and fills a landscape canvas instead of being zoomed out to fit. */
const GRAVITY_Y = GRAVITY * 2.4
/** Repulsion is ignored beyond this multiple of the ideal edge length. */
const CUTOFF_MULT = 6

const DEFAULT_ASPECT = 0.62
const MIN_VIEW_W = LAYOUT_W / 14
const MAX_VIEW_W = LAYOUT_W * 2.2

/** Depth value that means "no hop limit". */
const DEPTH_ANY = 99
const DEPTH_OPTIONS = [1, 2, 3, 4, DEPTH_ANY]

const clamp = (n: number, lo: number, hi: number) => (n < lo ? lo : n > hi ? hi : n)

/* ------------------------------------------------------------------ */
/* Deterministic seeding                                               */
/* ------------------------------------------------------------------ */

/** FNV-1a. Same id, same seed, every load. */
function hash32(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** Seed position on a disc, angle and radius both taken from the id hash. */
function seedPosition(id: string): [number, number] {
  const h = hash32(id)
  const angle = ((h % 4096) / 4096) * Math.PI * 2
  const radius = (0.18 + (((h >>> 12) % 1024) / 1024) * 0.82) * Math.min(CX, CY) * 0.92
  return [CX + Math.cos(angle) * radius, CY + Math.sin(angle) * radius]
}

/* ------------------------------------------------------------------ */
/* Graph model                                                         */
/* ------------------------------------------------------------------ */

interface GNode {
  id: string
  type: EntityType
  name: string
  status: Status
  colour: string
  deg: number
  /** Hops from the focus entry; 0 when there is no focus. */
  hops: number
  r: number
  x: number
  y: number
  /** Reused as the per-tick displacement accumulator. */
  vx: number
  vy: number
  pinned: boolean
  label: boolean
}

interface GLink {
  a: number
  b: number
  hostile: boolean
  covert: boolean
  /** How many distinct edges the pair carries. */
  n: number
}

interface GraphData {
  nodes: GNode[]
  links: GLink[]
  /** Ideal edge length for the simulation. */
  k: number
  /** Entries that matched the filters but were not drawn. */
  hidden: number
  matched: number
  totalAlive: number
}

interface RawPair {
  a: string
  b: string
  hostile: boolean
  covert: boolean
  n: number
}

const isDrawable = (e: Entity | undefined): e is Entity =>
  !!e && typeof e.id === 'string' && typeof e.name === 'string' && !!SCHEMAS[e.type] && !e.archived

/** True when an edge should count, given the "include derived links" toggle. */
const edgeCounts = (e: Edge, derived: boolean) => (derived ? true : e.origin === 'relation')

function collectPairs(index: WorldIndex, alive: Set<string>, derived: boolean): Map<string, RawPair> {
  const pairs = new Map<string, RawPair>()
  const buckets = index.out && typeof index.out === 'object' ? Object.values(index.out) : []
  for (const list of buckets) {
    if (!Array.isArray(list)) continue
    for (const e of list) {
      if (!e || typeof e.from !== 'string' || typeof e.to !== 'string') continue
      if (e.from === e.to) continue
      if (!edgeCounts(e, derived)) continue
      if (!alive.has(e.from) || !alive.has(e.to)) continue
      const meta = RELATION_META[e.kind]
      const hostile = !!e.hostile || !!meta?.hostile
      const covert = !!meta?.covert || !!e.secret
      const key = e.from < e.to ? `${e.from} ${e.to}` : `${e.to} ${e.from}`
      const cur = pairs.get(key)
      if (cur) {
        cur.hostile = cur.hostile || hostile
        cur.covert = cur.covert || covert
        cur.n += 1
      } else {
        pairs.set(key, { a: e.from, b: e.to, hostile, covert, n: 1 })
      }
    }
  }
  return pairs
}

function buildGraph(
  world: WorldState,
  index: WorldIndex,
  opts: {
    types: Set<string>
    focus: string
    depth: number
    derived: boolean
    pins: Map<string, [number, number]>
  },
): GraphData {
  const entities = world.entities && typeof world.entities === 'object' ? Object.values(world.entities) : []
  const alive = new Map<string, Entity>()
  for (const e of entities) if (isDrawable(e)) alive.set(e.id, e)

  const pairs = collectPairs(index, new Set(alive.keys()), opts.derived)

  /* Type filter. The focus entry is always kept so the view never goes blank
     just because its own type is switched off. */
  const kept = new Set<string>()
  for (const [id, e] of alive) if (opts.types.has(e.type)) kept.add(id)
  if (opts.focus && alive.has(opts.focus)) kept.add(opts.focus)

  const adj = new Map<string, string[]>()
  const degree = new Map<string, number>()
  const livePairs: RawPair[] = []
  for (const p of pairs.values()) {
    if (!kept.has(p.a) || !kept.has(p.b)) continue
    livePairs.push(p)
    ;(adj.get(p.a) ?? adj.set(p.a, []).get(p.a)!).push(p.b)
    ;(adj.get(p.b) ?? adj.set(p.b, []).get(p.b)!).push(p.a)
    degree.set(p.a, (degree.get(p.a) ?? 0) + 1)
    degree.set(p.b, (degree.get(p.b) ?? 0) + 1)
  }

  /* Depth-limited neighbourhood around the focus entry. */
  const hops = new Map<string, number>()
  if (opts.focus && kept.has(opts.focus) && opts.depth < DEPTH_ANY) {
    hops.set(opts.focus, 0)
    let frontier = [opts.focus]
    for (let d = 1; d <= opts.depth && frontier.length; d++) {
      const next: string[] = []
      for (const id of frontier) {
        for (const nb of adj.get(id) ?? []) {
          if (hops.has(nb)) continue
          hops.set(nb, d)
          next.push(nb)
        }
      }
      frontier = next
    }
  } else {
    for (const id of kept) hops.set(id, 0)
  }

  const candidates = [...hops.keys()].filter((id) => alive.has(id))
  candidates.sort((a, b) => {
    const ha = hops.get(a) ?? 0
    const hb = hops.get(b) ?? 0
    if (ha !== hb) return ha - hb
    const da = degree.get(a) ?? 0
    const db = degree.get(b) ?? 0
    if (da !== db) return db - da
    return a.localeCompare(b)
  })

  const matched = candidates.length
  const drawn = candidates.slice(0, MAX_NODES)

  /* Labels stay legible: only the best-connected entries get one by default. */
  const labelled = new Set(
    [...drawn]
      .sort((a, b) => (degree.get(b) ?? 0) - (degree.get(a) ?? 0) || a.localeCompare(b))
      .slice(0, 55),
  )

  /* Ideal edge length. Node radii ride on it, so a graph of eight entries and
     a graph of three hundred read at roughly the same density once fitted. */
  const k = clamp(Math.sqrt((LAYOUT_W * LAYOUT_H) / Math.max(1, drawn.length)) * 0.86, 52, 200)
  const rScale = clamp(k / 90, 0.85, 2.4)

  const nodes: GNode[] = drawn.map((id) => {
    const e = alive.get(id)!
    const deg = degree.get(id) ?? 0
    const pin = opts.pins.get(id)
    const seed = seedPosition(id)
    const x = pin ? pin[0] : seed[0]
    const y = pin ? pin[1] : seed[1]
    return {
      id,
      type: e.type,
      name: e.name || id,
      status: e.status,
      colour: `var(${SCHEMAS[e.type].accentVar})`,
      deg,
      hops: hops.get(id) ?? 0,
      r: (7 + Math.min(15, Math.sqrt(deg) * 3.3)) * rScale,
      x: Number.isFinite(x) ? x : CX,
      y: Number.isFinite(y) ? y : CY,
      vx: 0,
      vy: 0,
      pinned: !!pin,
      label: labelled.has(id) || id === opts.focus,
    }
  })

  const idx = new Map<string, number>()
  nodes.forEach((n, i) => idx.set(n.id, i))

  const links: GLink[] = []
  for (const p of livePairs) {
    const a = idx.get(p.a)
    const b = idx.get(p.b)
    if (a === undefined || b === undefined) continue
    links.push({ a, b, hostile: p.hostile, covert: p.covert, n: p.n })
  }

  return { nodes, links, k, hidden: matched - drawn.length, matched, totalAlive: alive.size }
}

/* ------------------------------------------------------------------ */
/* Force simulation                                                    */
/* ------------------------------------------------------------------ */

function tickLayout(nodes: GNode[], links: GLink[], k: number, temp: number) {
  const n = nodes.length
  const k2 = k * k
  const cutoff = k * CUTOFF_MULT
  const cutoff2 = cutoff * cutoff

  for (let i = 0; i < n; i++) {
    nodes[i].vx = 0
    nodes[i].vy = 0
  }

  for (let i = 0; i < n; i++) {
    const a = nodes[i]
    for (let j = i + 1; j < n; j++) {
      const b = nodes[j]
      let dx = a.x - b.x
      let dy = a.y - b.y
      let d2 = dx * dx + dy * dy
      if (d2 > cutoff2) continue
      if (d2 < 0.02) {
        // Deterministic nudge for coincident nodes — never Math.random here.
        dx = ((i % 7) - 3) * 0.4 + 0.11
        dy = ((j % 5) - 2) * 0.4 + 0.07
        d2 = dx * dx + dy * dy
      }
      const d = Math.sqrt(d2)
      const f = k2 / d
      const ux = (dx / d) * f
      const uy = (dy / d) * f
      a.vx += ux
      a.vy += uy
      b.vx -= ux
      b.vy -= uy
    }
  }

  for (const l of links) {
    const a = nodes[l.a]
    const b = nodes[l.b]
    if (!a || !b) continue
    const dx = a.x - b.x
    const dy = a.y - b.y
    const d = Math.max(0.02, Math.sqrt(dx * dx + dy * dy))
    const f = (d * d) / (k * Math.min(3, l.n))
    const ux = (dx / d) * f
    const uy = (dy / d) * f
    a.vx -= ux
    a.vy -= uy
    b.vx += ux
    b.vy += uy
  }

  for (const nd of nodes) {
    if (nd.pinned) continue
    nd.vx += (CX - nd.x) * GRAVITY
    nd.vy += (CY - nd.y) * GRAVITY_Y
    const d = Math.hypot(nd.vx, nd.vy)
    if (d > 0.0001) {
      const m = Math.min(d, temp) / d
      nd.x += nd.vx * m
      nd.y += nd.vy * m
    }
    if (!Number.isFinite(nd.x)) nd.x = CX
    if (!Number.isFinite(nd.y)) nd.y = CY
    nd.x = clamp(nd.x, -LAYOUT_W * 0.4, LAYOUT_W * 1.4)
    nd.y = clamp(nd.y, -LAYOUT_H * 0.4, LAYOUT_H * 1.4)
  }
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

interface PanelEdge {
  dir: 'out' | 'in'
  other: string
  label: string
  note?: string
  hostile: boolean
  covert: boolean
  origin: Edge['origin']
}

export default function GraphPage() {
  const world = useWorld()
  const [params, setParams] = useSearchParams()

  const [hiddenTypes, setHiddenTypes] = useLocalState<string[]>('graph.hiddenTypes', [])
  const [depth, setDepth] = useLocalState<number>('graph.depth', 2)
  const [derived, setDerived] = useLocalState<boolean>('graph.derived', true)

  const [focus, setFocus] = useState(() => params.get('focus') ?? '')
  const [selected, setSelected] = useState('')
  const [query, setQuery] = useState('')
  const [view, setView] = useState({ x: 0, y: 0, w: LAYOUT_W })
  const [stage, setStage] = useState({ w: 0, h: 0 })
  const [dragging, setDragging] = useState(false)
  const [, setFrame] = useState(0)

  const stageRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const pinsRef = useRef<Map<string, [number, number]>>(new Map())
  const runner = useRef({ raf: 0, temp: 0 })
  const dragRef = useRef<{ idx: number; ox: number; oy: number; moved: boolean } | null>(null)
  const panRef = useRef<{ cx: number; cy: number; vx: number; vy: number } | null>(null)
  const movedRef = useRef(false)
  const fitPending = useRef(true)

  /* --- keep the focus in step with ?focus= ------------------------- */
  const urlFocus = params.get('focus') ?? ''
  useEffect(() => {
    setFocus(urlFocus)
  }, [urlFocus])

  const applyFocus = useCallback(
    (id: string) => {
      setFocus(id)
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          if (id) next.set('focus', id)
          else next.delete('focus')
          return next
        },
        { replace: true },
      )
    },
    [setParams],
  )

  /* --- data -------------------------------------------------------- */
  /* Indexing is shared code over user-editable data; a malformed import can
     throw there, and a broken graph must not take the page down with it. */
  const index = useMemo(() => {
    if (!world) return null
    try {
      return buildIndex(world)
    } catch {
      return null
    }
  }, [world])

  const typeCounts = useMemo(() => {
    const counts = new Map<EntityType, number>()
    if (!world) return counts
    for (const e of Object.values(world.entities)) {
      if (!isDrawable(e)) continue
      counts.set(e.type, (counts.get(e.type) ?? 0) + 1)
    }
    return counts
  }, [world])

  const activeTypes = useMemo(() => {
    const hidden = new Set(Array.isArray(hiddenTypes) ? hiddenTypes : [])
    return new Set<string>(ENTITY_TYPES.filter((t) => !hidden.has(t)))
  }, [hiddenTypes])

  const focusId = focus && world?.entities[focus] ? focus : ''
  const focusUnknown = !!focus && !focusId

  /* Stored preferences can be stale or corrupt — fall back to a valid option. */
  const depthValue = DEPTH_OPTIONS.includes(depth as number) ? (depth as number) : 2

  const graph = useMemo(() => {
    if (!world || !index) return { nodes: [], links: [], k: 90, hidden: 0, matched: 0, totalAlive: 0 } as GraphData
    return buildGraph(world, index, {
      types: activeTypes,
      focus: focusId,
      depth: depthValue,
      derived: !!derived,
      pins: pinsRef.current,
    })
  }, [world, index, activeTypes, focusId, depthValue, derived])

  /* --- viewport ---------------------------------------------------- */
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const measure = () => {
      const r = el.getBoundingClientRect()
      setStage({ w: r.width, h: r.height })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const aspect = stage.w > 0 ? stage.h / stage.w : DEFAULT_ASPECT
  const viewH = view.w * aspect
  const scale = stage.w > 0 ? stage.w / view.w : 1
  /** Screen-constant length, expressed in layout units. */
  const px = useCallback((n: number) => n / (scale || 1), [scale])

  const fitView = useCallback((nodes: GNode[]) => {
    const rect = stageRef.current?.getBoundingClientRect()
    const asp = rect && rect.width > 0 ? rect.height / rect.width : DEFAULT_ASPECT
    if (!nodes.length) {
      setView({ x: 0, y: 0, w: LAYOUT_W })
      return
    }
    let minX = Infinity
    let minY = Infinity
    let maxX = -Infinity
    let maxY = -Infinity
    for (const n of nodes) {
      minX = Math.min(minX, n.x - n.r)
      minY = Math.min(minY, n.y - n.r)
      maxX = Math.max(maxX, n.x + n.r)
      maxY = Math.max(maxY, n.y + n.r)
    }
    if (!Number.isFinite(minX) || !Number.isFinite(minY)) {
      setView({ x: 0, y: 0, w: LAYOUT_W })
      return
    }
    const bw = Math.max(80, maxX - minX)
    const bh = Math.max(80, maxY - minY)
    const w = clamp(Math.max(bw, bh / (asp || DEFAULT_ASPECT)) * 1.16, MIN_VIEW_W, MAX_VIEW_W)
    setView({ x: (minX + maxX) / 2 - w / 2, y: (minY + maxY) / 2 - (w * (asp || DEFAULT_ASPECT)) / 2, w })
  }, [])

  /* --- simulation -------------------------------------------------- */
  const step = useCallback(() => {
    const st = runner.current
    for (let i = 0; i < TICKS_PER_FRAME && st.temp > TEMP_MIN; i++) {
      tickLayout(graph.nodes, graph.links, graph.k, st.temp)
      st.temp *= COOL
    }
    setFrame((f) => f + 1)
    if (st.temp > TEMP_MIN) {
      st.raf = requestAnimationFrame(step)
    } else {
      st.raf = 0
      if (fitPending.current) {
        fitPending.current = false
        fitView(graph.nodes)
      }
    }
  }, [graph, fitView])

  useEffect(() => {
    const st = runner.current
    if (st.raf) cancelAnimationFrame(st.raf)
    st.temp = TEMP_START
    fitPending.current = true
    st.raf = requestAnimationFrame(step)
    return () => {
      if (st.raf) cancelAnimationFrame(st.raf)
      st.raf = 0
    }
  }, [step])

  const reheat = useCallback(
    (temp: number) => {
      const st = runner.current
      st.temp = Math.max(st.temp, temp)
      if (!st.raf) st.raf = requestAnimationFrame(step)
    },
    [step],
  )

  /* --- pointer / keyboard ------------------------------------------ */
  const toWorld = useCallback(
    (clientX: number, clientY: number): [number, number] => {
      const rect = stageRef.current?.getBoundingClientRect()
      if (!rect || rect.width === 0 || rect.height === 0) return [CX, CY]
      return [
        view.x + ((clientX - rect.left) / rect.width) * view.w,
        view.y + ((clientY - rect.top) / rect.height) * (view.w * (rect.height / rect.width)),
      ]
    },
    [view],
  )

  const zoomBy = useCallback(
    (factor: number, anchor?: [number, number]) => {
      setView((v) => {
        const rect = stageRef.current?.getBoundingClientRect()
        const asp = rect && rect.width > 0 ? rect.height / rect.width : DEFAULT_ASPECT
        const nw = clamp(v.w * factor, MIN_VIEW_W, MAX_VIEW_W)
        const ax = anchor ? anchor[0] : v.x + v.w / 2
        const ay = anchor ? anchor[1] : v.y + (v.w * asp) / 2
        const tx = (ax - v.x) / v.w
        const ty = (ay - v.y) / (v.w * asp)
        return { x: ax - nw * tx, y: ay - nw * asp * ty, w: nw }
      })
    },
    [],
  )

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      zoomBy(e.deltaY > 0 ? 1.14 : 1 / 1.14, toWorld(e.clientX, e.clientY))
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [zoomBy, toWorld])

  const centreOn = useCallback(
    (id: string) => {
      const n = graph.nodes.find((x) => x.id === id)
      if (!n) return
      setView((v) => {
        const rect = stageRef.current?.getBoundingClientRect()
        const asp = rect && rect.width > 0 ? rect.height / rect.width : DEFAULT_ASPECT
        return { x: n.x - v.w / 2, y: n.y - (v.w * asp) / 2, w: v.w }
      })
    },
    [graph],
  )

  const nodeIdAt = (target: EventTarget | null): string | null => {
    if (!(target instanceof Element)) return null
    return target.closest('[data-node]')?.getAttribute('data-node') ?? null
  }

  const onPointerDown = (e: React.PointerEvent) => {
    movedRef.current = false
    const id = nodeIdAt(e.target)
    if (id) {
      const idx = graph.nodes.findIndex((n) => n.id === id)
      if (idx >= 0) {
        const [wx, wy] = toWorld(e.clientX, e.clientY)
        dragRef.current = { idx, ox: graph.nodes[idx].x - wx, oy: graph.nodes[idx].y - wy, moved: false }
        svgRef.current?.setPointerCapture(e.pointerId)
        e.preventDefault()
        return
      }
    }
    if (e.button !== 0 && e.button !== 1) return
    panRef.current = { cx: e.clientX, cy: e.clientY, vx: view.x, vy: view.y }
    setDragging(true)
    svgRef.current?.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const drag = dragRef.current
    if (drag) {
      const node = graph.nodes[drag.idx]
      if (!node) return
      const [wx, wy] = toWorld(e.clientX, e.clientY)
      const nx = wx + drag.ox
      const ny = wy + drag.oy
      if (Math.hypot(nx - node.x, ny - node.y) > px(2)) drag.moved = true
      node.x = nx
      node.y = ny
      node.pinned = true
      setFrame((f) => f + 1)
      return
    }
    const pan = panRef.current
    if (!pan) return
    const rect = stageRef.current?.getBoundingClientRect()
    if (!rect || rect.width === 0) return
    const dx = ((e.clientX - pan.cx) / rect.width) * view.w
    const dy = ((e.clientY - pan.cy) / rect.width) * view.w
    setView((v) => ({ ...v, x: pan.vx - dx, y: pan.vy - dy }))
  }

  const endPointer = () => {
    const drag = dragRef.current
    if (drag) {
      const node = graph.nodes[drag.idx]
      if (node && drag.moved) {
        pinsRef.current.set(node.id, [node.x, node.y])
        movedRef.current = true
        reheat(9)
      }
      dragRef.current = null
    }
    panRef.current = null
    setDragging(false)
  }

  const releasePins = () => {
    pinsRef.current.clear()
    for (const n of graph.nodes) n.pinned = false
    reheat(TEMP_START * 0.4)
  }

  const focusNodeBy = (fromId: string, delta: number) => {
    const layer = svgRef.current
    if (!layer) return
    const els = [...layer.querySelectorAll<SVGGElement>('[data-node]')]
    const at = els.findIndex((el) => el.getAttribute('data-node') === fromId)
    const next = els[clamp(at + delta, 0, els.length - 1)]
    next?.focus()
  }

  const onStageKeyDown = (e: React.KeyboardEvent) => {
    const stepFrac = e.shiftKey ? 0.24 : 0.08
    const map: Record<string, () => void> = {
      ArrowLeft: () => setView((v) => ({ ...v, x: v.x - v.w * stepFrac })),
      ArrowRight: () => setView((v) => ({ ...v, x: v.x + v.w * stepFrac })),
      ArrowUp: () => setView((v) => ({ ...v, y: v.y - v.w * aspect * stepFrac })),
      ArrowDown: () => setView((v) => ({ ...v, y: v.y + v.w * aspect * stepFrac })),
      '+': () => zoomBy(1 / 1.25),
      '=': () => zoomBy(1 / 1.25),
      '-': () => zoomBy(1.25),
      '0': () => fitView(graph.nodes),
    }
    const fn = map[e.key]
    if (fn) {
      e.preventDefault()
      fn()
    }
  }

  /* --- selection details ------------------------------------------- */
  const selectedEntity = selected ? world?.entities[selected] : undefined

  const panelEdges = useMemo<PanelEdge[]>(() => {
    if (!index || !selected) return []
    const rows: PanelEdge[] = []
    const seen = new Set<string>()
    const add = (e: Edge, dir: 'out' | 'in') => {
      if (!edgeCounts(e, !!derived)) return
      const other = dir === 'out' ? e.to : e.from
      if (other === selected) return
      const meta = RELATION_META[e.kind]
      const label = dir === 'out' ? e.label : (meta?.inverse ?? e.label)
      const key = `${dir}|${other}|${label}`
      if (seen.has(key)) return
      seen.add(key)
      rows.push({
        dir,
        other,
        label,
        note: e.note,
        hostile: !!e.hostile || !!meta?.hostile,
        covert: !!meta?.covert || !!e.secret,
        origin: e.origin,
      })
    }
    for (const e of index.out[selected] ?? []) add(e, 'out')
    for (const e of index.in[selected] ?? []) add(e, 'in')
    return rows
  }, [index, selected, derived])

  const searchHits = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!world || q.length < 1) return []
    const hits: Entity[] = []
    for (const e of Object.values(world.entities)) {
      if (!isDrawable(e)) continue
      const hay = `${e.name} ${e.id} ${(e.aka ?? []).join(' ')}`.toLowerCase()
      if (hay.includes(q)) hits.push(e)
      if (hits.length >= 40) break
    }
    return hits.sort((a, b) => a.name.localeCompare(b.name)).slice(0, 8)
  }, [world, query])

  const topConnected = useMemo(
    () => [...graph.nodes].sort((a, b) => b.deg - a.deg || a.name.localeCompare(b.name)).slice(0, 10),
    [graph],
  )

  const selectNode = (id: string) => {
    setSelected(id)
  }

  const usedTypes = ENTITY_TYPES.filter((t) => (typeCounts.get(t) ?? 0) > 0)

  /* --- render ------------------------------------------------------ */
  if (!world) {
    return (
      <div className="main-pad">
        <EmptyState title="The world has not finished loading">Give it a moment, then reload the page.</EmptyState>
      </div>
    )
  }

  if (!index) {
    return (
      <div className="main-pad">
        <div className="page-head">
          <h1>Connection graph</h1>
        </div>
        <ErrorState title="The links could not be read" onRetry={() => window.location.reload()}>
          Something in the world data stopped the link index from being built. Check the most recent import or edit on the Data
          page.
        </ErrorState>
      </div>
    )
  }

  const noEntries = graph.totalAlive === 0
  const noMatches = !noEntries && graph.nodes.length === 0

  const linkStroke = (l: GLink, on: boolean) => {
    if (on) return 'var(--brass)'
    if (l.hostile) return 'var(--crimson)'
    if (l.covert) return 'var(--violet)'
    return 'var(--line-strong)'
  }

  const selIdx = selected ? graph.nodes.findIndex((n) => n.id === selected) : -1
  const rovingId = selected && selIdx >= 0 ? selected : (graph.nodes[0]?.id ?? '')

  /* Neighbours of the selection, so the per-node dimming stays O(1). */
  const selNeighbours = new Set<string>()
  if (selIdx >= 0) {
    for (const l of graph.links) {
      if (l.a === selIdx) selNeighbours.add(graph.nodes[l.b]?.id ?? '')
      else if (l.b === selIdx) selNeighbours.add(graph.nodes[l.a]?.id ?? '')
    }
  }

  return (
    <div className="main-pad">
      <div className="page-head">
        <h1>Connection graph</h1>
        <p className="lede">
          Every entry and every link between them. Drag a node to pin it, scroll or use the zoom buttons to move around, and
          pick an entry to see what it touches.
        </p>
      </div>

      {/* Controls -------------------------------------------------- */}
      <div className="panel" style={{ marginBottom: 'var(--sp-3)' }}>
        <div className="panel-body">
          <div className="gr-controls">
            <div className="gr-control">
              <label className="field-label" htmlFor="gr-search">
                Focus entry
              </label>
              <input
                id="gr-search"
                className="input"
                type="search"
                placeholder="Type a name"
                value={query}
                onChange={(ev) => setQuery(ev.target.value)}
                onKeyDown={(ev) => {
                  if (ev.key !== 'Enter' || !searchHits[0]) return
                  ev.preventDefault()
                  applyFocus(searchHits[0].id)
                  selectNode(searchHits[0].id)
                  setQuery('')
                }}
                autoComplete="off"
              />
              {searchHits.length > 0 ? (
                <ul className="gr-hits">
                  {searchHits.map((e) => (
                    <li key={e.id}>
                      <button
                        type="button"
                        className="gr-hit"
                        onClick={() => {
                          applyFocus(e.id)
                          selectNode(e.id)
                          setQuery('')
                        }}
                      >
                        <TypeGlyph type={e.type} size={10} /> {e.name}
                        <span className="dimmer"> · {SCHEMAS[e.type].label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
              {query.trim() && searchHits.length === 0 ? <div className="field-help">No entry matches that name.</div> : null}
            </div>

            <div className="gr-control">
              <label className="field-label" htmlFor="gr-depth">
                Depth from focus
              </label>
              <select
                id="gr-depth"
                className="select"
                value={String(depthValue)}
                onChange={(ev) => setDepth(Number(ev.target.value))}
                disabled={!focusId}
              >
                {DEPTH_OPTIONS.map((d) => (
                  <option key={d} value={String(d)}>
                    {d === DEPTH_ANY ? 'Any distance' : `${d} hop${d === 1 ? '' : 's'}`}
                  </option>
                ))}
              </select>
              <div className="field-help">
                {focusId ? `Centred on ${world.entities[focusId]?.name ?? focusId}.` : 'Pick a focus entry to limit the graph.'}
              </div>
            </div>

            <div className="gr-control">
              <span className="field-label">Links counted</span>
              <label className="check">
                <input type="checkbox" checked={!!derived} onChange={(ev) => setDerived(ev.target.checked)} />
                Include reference fields and inline mentions
              </label>
              <div className="field-help">Unticked, only relations recorded on the entry itself are drawn.</div>
            </div>

            <div className="gr-control gr-actions">
              <span className="field-label">View</span>
              <div className="btn-row">
                <button type="button" className="btn sm" onClick={() => fitView(graph.nodes)}>
                  Fit
                </button>
                <button type="button" className="btn sm" onClick={releasePins} disabled={pinsRef.current.size === 0}>
                  Release pins
                </button>
                {focusId ? (
                  <button type="button" className="btn sm" onClick={() => applyFocus('')}>
                    Clear focus
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 'var(--sp-3)' }}>
            <span className="field-label">Entry types</span>
            <div className="gr-types">
              {usedTypes.map((t) => {
                const on = activeTypes.has(t)
                return (
                  <button
                    key={t}
                    type="button"
                    className="gr-type"
                    aria-pressed={on}
                    style={{ borderLeftColor: `var(${SCHEMAS[t].accentVar})` }}
                    onClick={() =>
                      setHiddenTypes((prev) => {
                        const set = new Set(Array.isArray(prev) ? prev : [])
                        if (set.has(t)) set.delete(t)
                        else set.add(t)
                        return [...set]
                      })
                    }
                  >
                    {SCHEMAS[t].label}
                    <span className="n">{typeCounts.get(t) ?? 0}</span>
                  </button>
                )
              })}
              <button type="button" className="btn sm" onClick={() => setHiddenTypes([])}>
                All
              </button>
              <button type="button" className="btn sm" onClick={() => setHiddenTypes(usedTypes.map(String))}>
                None
              </button>
            </div>
          </div>
        </div>
      </div>

      {focusUnknown ? (
        <p className="gr-note warn">
          No entry has the id <span className="mono">{focus}</span>, so the whole world is shown instead.
        </p>
      ) : null}

      {graph.hidden > 0 ? (
        <p className="gr-note warn">
          Showing {graph.nodes.length} of {graph.matched} matching entries. The {graph.hidden} with the fewest connections are
          left out to keep the drawing readable — narrow the type filter, or set a focus entry and a smaller depth, to see them.
        </p>
      ) : null}

      {/* Graph + side panel ---------------------------------------- */}
      {noEntries ? (
        <EmptyState title="The world has no entries yet">
          Once entries exist they appear here with the links between them.
        </EmptyState>
      ) : noMatches ? (
        <EmptyState
          title="No entries match the current filters"
          action={
            <button
              type="button"
              className="btn"
              onClick={() => {
                setHiddenTypes([])
                applyFocus('')
              }}
            >
              Reset filters
            </button>
          }
        >
          Every entry type is switched off, or the focus entry has nothing within the chosen depth.
        </EmptyState>
      ) : (
        <div className="graph-body">
          <div className="canvas-panel">
            <div ref={stageRef} className={`graph-stage${dragging ? ' dragging' : ''}`}>
              <svg
                ref={svgRef}
                viewBox={`${view.x} ${view.y} ${view.w} ${viewH || view.w * DEFAULT_ASPECT}`}
                role="group"
                tabIndex={0}
                aria-label={`Connection graph, ${graph.nodes.length} entries. Arrow keys pan, plus and minus zoom, 0 fits the graph. Tab into the nodes to select one.`}
                onKeyDown={onStageKeyDown}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endPointer}
                onPointerCancel={endPointer}
                onDoubleClick={(e) => {
                  const id = nodeIdAt(e.target)
                  if (!id) return
                  selectNode(id)
                  centreOn(id)
                }}
              >
                <g strokeLinecap="round">
                  {graph.links.map((l, i) => {
                    const a = graph.nodes[l.a]
                    const b = graph.nodes[l.b]
                    if (!a || !b) return null
                    const on = selIdx >= 0 && (l.a === selIdx || l.b === selIdx)
                    return (
                      <line
                        key={`${a.id}|${b.id}|${i}`}
                        x1={a.x}
                        y1={a.y}
                        x2={b.x}
                        y2={b.y}
                        stroke={linkStroke(l, on)}
                        strokeWidth={on ? 1.8 : l.hostile ? 1.3 : 1}
                        strokeDasharray={l.covert ? '4 3' : undefined}
                        strokeOpacity={on ? 0.95 : selIdx >= 0 ? 0.22 : l.hostile || l.covert ? 0.75 : 0.5}
                        vectorEffect="non-scaling-stroke"
                      />
                    )
                  })}
                </g>

                <g>
                  {graph.nodes.map((n) => {
                    const isSel = n.id === selected
                    const isFocus = n.id === focusId
                    const dim = selIdx >= 0 && !isSel && !selNeighbours.has(n.id)
                    // Floor in screen pixels: a node never shrinks below a visible dot.
                    const rr = Math.max(n.r, px(4.5))
                    return (
                      <g
                        key={n.id}
                        data-node={n.id}
                        className="gr-node"
                        role="button"
                        tabIndex={n.id === rovingId ? 0 : -1}
                        aria-label={
                          `${n.name}, ${SCHEMAS[n.type].label}, ${n.deg} link${n.deg === 1 ? '' : 's'}` +
                          (focusId && !isFocus ? `, ${n.hops} hop${n.hops === 1 ? '' : 's'} away` : '') +
                          (n.status === 'deprecated' ? ', deprecated' : '') +
                          (n.pinned ? ', pinned' : '')
                        }
                        aria-pressed={isSel}
                        opacity={dim ? 0.32 : n.status === 'deprecated' ? 0.55 : 1}
                        onClick={() => {
                          if (movedRef.current) {
                            movedRef.current = false
                            return
                          }
                          selectNode(n.id)
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            selectNode(n.id)
                            centreOn(n.id)
                          } else if (e.key === ' ' || e.key === 'Spacebar') {
                            e.preventDefault()
                            selectNode(n.id)
                          } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                            e.preventDefault()
                            e.stopPropagation()
                            focusNodeBy(n.id, 1)
                          } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                            e.preventDefault()
                            e.stopPropagation()
                            focusNodeBy(n.id, -1)
                          }
                        }}
                      >
                        {/* Generous, invisible hit area so nodes are tappable. */}
                        <circle cx={n.x} cy={n.y} r={Math.max(rr + px(6), px(13))} fill="none" pointerEvents="all" />
                        {isFocus ? (
                          <circle
                            cx={n.x}
                            cy={n.y}
                            r={rr + px(5)}
                            fill="none"
                            stroke="var(--brass)"
                            strokeWidth={1}
                            strokeDasharray="3 3"
                            vectorEffect="non-scaling-stroke"
                          />
                        ) : null}
                        <circle
                          cx={n.x}
                          cy={n.y}
                          r={rr}
                          fill={n.colour}
                          fillOpacity={isSel ? 0.95 : 0.55}
                          stroke={isSel ? 'var(--brass-lit)' : n.colour}
                          strokeWidth={isSel ? 2 : 1.1}
                          vectorEffect="non-scaling-stroke"
                        />
                        {n.pinned ? (
                          <circle cx={n.x} cy={n.y} r={Math.max(1.5, px(2))} fill="var(--bg-deep)" />
                        ) : null}
                        {n.label || isSel || isFocus ? (
                          <text
                            className="gr-label"
                            x={n.x + rr + px(5)}
                            y={n.y + px(4)}
                            style={{ fontSize: px(11), strokeWidth: px(3) }}
                          >
                            {n.name.length > 26 ? `${n.name.slice(0, 25)}…` : n.name}
                          </text>
                        ) : null}
                      </g>
                    )
                  })}
                </g>
              </svg>

              <div className="map-overlay tr">
                <div className="zoom-stack map-panel">
                  <button type="button" onClick={() => zoomBy(1 / 1.3)} aria-label="Zoom in">
                    +
                  </button>
                  <button type="button" onClick={() => zoomBy(1.3)} aria-label="Zoom out">
                    −
                  </button>
                  <button type="button" onClick={() => fitView(graph.nodes)} aria-label="Fit the graph to the view">
                    ⤢
                  </button>
                </div>
              </div>
            </div>

            <div className="flow-legend">
              <span className="flow-key">
                <svg width="22" height="6" aria-hidden="true">
                  <line x1="0" y1="3" x2="22" y2="3" stroke="var(--line-strong)" strokeWidth="1.4" />
                </svg>
                Ordinary link
              </span>
              <span className="flow-key">
                <svg width="22" height="6" aria-hidden="true">
                  <line x1="0" y1="3" x2="22" y2="3" stroke="var(--crimson)" strokeWidth="1.8" />
                </svg>
                Hostile
              </span>
              <span className="flow-key">
                <svg width="22" height="6" aria-hidden="true">
                  <line x1="0" y1="3" x2="22" y2="3" stroke="var(--violet)" strokeWidth="1.6" strokeDasharray="4 3" />
                </svg>
                Covert or secret
              </span>
              <span className="flow-key">Node size follows the number of links. Colour follows the entry type.</span>
              <span className="flow-key">{graph.links.length} links drawn</span>
            </div>
          </div>

          {/* Side panel -------------------------------------------- */}
          <aside className="panel graph-side" aria-label="Selected entry">
            {selectedEntity ? (
              <>
                <div className="panel-head">
                  <TypeGlyph type={selectedEntity.type} />
                  <h3>{selectedEntity.name}</h3>
                </div>
                <div className="panel-body">
                  <div className="btn-row" style={{ marginBottom: 'var(--sp-2)' }}>
                    <span className="chip" style={{ borderLeft: `2px solid var(${SCHEMAS[selectedEntity.type].accentVar})` }}>
                      {SCHEMAS[selectedEntity.type].label}
                    </span>
                    <StatusBadge status={selectedEntity.status} />
                  </div>
                  {selectedEntity.summary ? (
                    <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-2)' }}>{selectedEntity.summary}</p>
                  ) : (
                    <p className="dim" style={{ fontSize: 'var(--fs-sm)' }}>
                      No summary written yet.
                    </p>
                  )}
                  <div className="btn-row" style={{ marginBottom: 'var(--sp-3)' }}>
                    <Link className="btn sm" to={entityPath(selectedEntity)}>
                      Open entry
                    </Link>
                    <button type="button" className="btn sm" onClick={() => applyFocus(selectedEntity.id)}>
                      Focus here
                    </button>
                    <button type="button" className="btn sm" onClick={() => centreOn(selectedEntity.id)}>
                      Centre
                    </button>
                    {pinsRef.current.has(selectedEntity.id) ? (
                      <button
                        type="button"
                        className="btn sm"
                        onClick={() => {
                          pinsRef.current.delete(selectedEntity.id)
                          const n = graph.nodes.find((x) => x.id === selectedEntity.id)
                          if (n) n.pinned = false
                          reheat(12)
                        }}
                      >
                        Unpin
                      </button>
                    ) : null}
                  </div>

                  {selIdx < 0 ? (
                    <p className="gr-note warn" style={{ marginBottom: 'var(--sp-3)' }}>
                      This entry is not drawn at the moment — the type filter or the depth limit excludes it. Focus on it to bring
                      it back.
                    </p>
                  ) : null}

                  <span className="field-label">Links ({panelEdges.length})</span>
                  {panelEdges.length === 0 ? (
                    <p className="dim" style={{ fontSize: 'var(--fs-sm)' }}>
                      This entry has no links under the current settings.
                    </p>
                  ) : (
                    <ul className="gr-edges">
                      {panelEdges.slice(0, 40).map((r, i) => {
                        const other = world.entities[r.other]
                        return (
                          <li key={`${r.dir}-${r.other}-${r.label}-${i}`} className="gr-edge">
                            <span className="rel">
                              {r.dir === 'out' ? '→' : '←'} {r.label}
                            </span>
                            <span className="who">
                              <button type="button" className="gr-pick" onClick={() => selectNode(r.other)}>
                                {other ? other.name : r.other}
                              </button>
                              {other ? (
                                <Link to={entityPath(other)} className="gr-open" aria-label={`Open the entry for ${other.name}`}>
                                  ↗
                                </Link>
                              ) : null}
                              {r.hostile ? <span className="gr-tag hostile">hostile</span> : null}
                              {r.covert ? <span className="gr-tag covert">covert</span> : null}
                              {r.origin !== 'relation' ? <span className="gr-tag">derived</span> : null}
                              {r.note ? <span className="dimmer"> — {r.note}</span> : null}
                            </span>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                  {panelEdges.length > 40 ? (
                    <p className="field-help">{panelEdges.length - 40} further links are not listed here.</p>
                  ) : null}
                </div>
              </>
            ) : (
              <>
                <div className="panel-head">
                  <h3>No entry selected</h3>
                </div>
                <div className="panel-body">
                  <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-2)' }}>
                    Select a node to read its summary and links. Enter on a focused node re-centres the graph on it; arrow keys
                    move between nodes, and arrow keys on the canvas itself pan.
                  </p>
                  <span className="field-label">Best connected here</span>
                  <ul className="gr-edges">
                    {topConnected.map((n) => (
                      <li key={n.id} className="gr-edge">
                        <span className="rel">{n.deg} link{n.deg === 1 ? '' : 's'}</span>
                        <span className="who">
                          <button type="button" className="gr-pick" onClick={() => selectNode(n.id)}>
                            <TypeGlyph type={n.type} size={10} /> {n.name}
                          </button>
                        </span>
                      </li>
                    ))}
                  </ul>
                  {graph.links.length === 0 ? (
                    <p className="field-help">
                      None of the entries shown are linked to each other yet. Add relations, or tick the derived links option.
                    </p>
                  ) : null}
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* MiniGraph — compact neighbourhood, embedded on entity pages         */
/* ------------------------------------------------------------------ */

const MINI_W = 320
const MINI_H = 200
const MINI_MAX = 26

interface MiniNode {
  id: string
  name: string
  type: EntityType
  x: number
  y: number
  hop: number
}

export function MiniGraph({ rootId, depth = 1, height = 180 }: { rootId: string; depth?: number; height?: number }) {
  const world = useWorld()
  const navigate = useNavigate()
  const index = useMemo(() => {
    if (!world) return null
    try {
      return buildIndex(world)
    } catch {
      return null
    }
  }, [world])
  const hops = clamp(Number.isFinite(depth) ? depth : 1, 1, 3)

  const model = useMemo(() => {
    const nodes: MiniNode[] = []
    const links: { a: number; b: number; hostile: boolean; covert: boolean }[] = []
    if (!world || !index || !world.entities[rootId]) return { nodes, links, extra: 0 }

    /* Breadth-first over the undirected adjacency the index already holds. */
    const seen = new Map<string, number>([[rootId, 0]])
    const skipped = new Set<string>()
    let frontier = [rootId]
    for (let d = 1; d <= hops && frontier.length; d++) {
      const next: string[] = []
      for (const id of frontier) {
        const nb = index.neighbours[id]
        if (!nb) continue
        for (const other of [...nb].sort()) {
          const e = world.entities[other]
          if (!isDrawable(e) || seen.has(other)) continue
          if (seen.size >= MINI_MAX) {
            skipped.add(other)
            continue
          }
          seen.set(other, d)
          next.push(other)
        }
      }
      frontier = next
    }
    const extra = skipped.size

    const rings = new Map<number, string[]>()
    for (const [id, d] of seen) (rings.get(d) ?? rings.set(d, []).get(d)!).push(id)

    const cx = MINI_W / 2
    const cy = MINI_H / 2
    const radii = [0, 58, 88, 110]
    const offset = (hash32(rootId) % 360) * (Math.PI / 180)
    for (const [d, ids] of [...rings.entries()].sort((a, b) => a[0] - b[0])) {
      ids.sort((a, b) => hash32(a) - hash32(b))
      ids.forEach((id, i) => {
        const e = world.entities[id]
        if (!e) return
        const angle = d === 0 ? 0 : offset + (i / ids.length) * Math.PI * 2
        const r = radii[Math.min(d, radii.length - 1)]
        nodes.push({
          id,
          name: e.name,
          type: e.type,
          x: cx + Math.cos(angle) * r * 1.35,
          y: cy + Math.sin(angle) * r * 0.86,
          hop: d,
        })
      })
    }

    const at = new Map<string, number>(nodes.map((n, i): [string, number] => [n.id, i]))
    const done = new Set<string>()
    for (const n of nodes) {
      for (const e of index.out[n.id] ?? []) {
        const b = at.get(e.to)
        const a = at.get(e.from)
        if (a === undefined || b === undefined || a === b) continue
        const key = a < b ? `${a}-${b}` : `${b}-${a}`
        if (done.has(key)) continue
        done.add(key)
        const meta = RELATION_META[e.kind]
        links.push({ a, b, hostile: !!e.hostile || !!meta?.hostile, covert: !!meta?.covert || !!e.secret })
      }
    }
    return { nodes, links, extra }
  }, [world, index, rootId, hops])

  if (!world || !world.entities[rootId]) return null

  if (model.nodes.length <= 1) {
    return <p className="gr-mini-empty">This entry has no links recorded yet.</p>
  }

  return (
    <div className="canvas-panel">
      <svg
        viewBox={`0 0 ${MINI_W} ${MINI_H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ height }}
        role="group"
        aria-label={`Neighbourhood of ${world.entities[rootId]?.name ?? rootId}: ${model.nodes.length - 1} linked entries.`}
      >
        <g>
          {model.links.map((l, i) => {
            const a = model.nodes[l.a]
            const b = model.nodes[l.b]
            return (
              <line
                key={i}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={l.hostile ? 'var(--crimson)' : l.covert ? 'var(--violet)' : 'var(--line-strong)'}
                strokeWidth={0.9}
                strokeDasharray={l.covert ? '3 2' : undefined}
                strokeOpacity={0.7}
              />
            )
          })}
        </g>
        {model.nodes.map((n) => {
          const colour = `var(${SCHEMAS[n.type].accentVar})`
          const r = n.hop === 0 ? 8 : 5
          const short = n.name.length > 18 ? `${n.name.slice(0, 17)}…` : n.name
          if (n.hop === 0) {
            return (
              <g key={n.id}>
                <circle cx={n.x} cy={n.y} r={r} fill={colour} fillOpacity={0.95} stroke="var(--brass-lit)" strokeWidth={1.4} />
                <text className="gr-label" x={n.x} y={Math.max(n.y - r - 5, 11)} textAnchor="middle" style={{ fontSize: 10.5 }}>
                  {short}
                </text>
              </g>
            )
          }
          const path = entityPath({ id: n.id, type: n.type })
          return (
            <a
              key={n.id}
              className="gr-mini-node"
              href={`#${path}`}
              aria-label={`${n.name}, ${SCHEMAS[n.type].label}`}
              onClick={(ev) => {
                ev.preventDefault()
                navigate(path)
              }}
            >
              <circle cx={n.x} cy={n.y} r={10} fill="none" pointerEvents="all" />
              <circle cx={n.x} cy={n.y} r={r} fill={colour} fillOpacity={0.6} stroke={colour} strokeWidth={1} />
              {model.nodes.length <= 14 ? (
                <text className="gr-label" x={n.x} y={Math.min(n.y + r + 9, MINI_H - 3)} textAnchor="middle" style={{ fontSize: 9.5 }}>
                  {short}
                </text>
              ) : null}
            </a>
          )
        })}
      </svg>
      {model.extra > 0 ? (
        <div className="flow-legend">
          <span className="flow-key">{model.extra} further linked entries are not drawn here.</span>
        </div>
      ) : null}
    </div>
  )
}
