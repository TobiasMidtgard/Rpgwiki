/**
 * The world map.
 *
 * One SVG scene rendered in two modes from the same geometry: an illustrated
 * parchment chart and a fully coloured biome chart. Layers are independent and
 * individually toggleable; markers can be dragged when the atlas is unlocked.
 *
 * Static geometry (coast, regions, motifs, routes) is memoised because it is
 * expensive and never changes; markers and derived political shapes re-render
 * with the world.
 */

import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import type { MapLayerId, Point, RegionShape, RouteShape, ZoneShape } from '../core/types'
import { WORLD_H, WORLD_W } from '../core/types'
import { useWorld } from '../core/store'
import { buildIndex } from '../core/relations'
import { influences, territories } from '../core/political'
import { BIOME_PAINT, LAND, REGION_ANCHOR, SEA_LABELS, centroid, pointInPolygon, polygonToPath, smoothPath } from '../world/geo'
import { REGION_NAME } from '../world/registry'

export type MapMode = 'paper' | 'biome'

export interface LayerDef {
  id: MapLayerId
  label: string
  group: string
  swatch: string
  hint: string
}

export const MAP_LAYERS: LayerDef[] = [
  { id: 'biomes', label: 'Biomes', group: 'Land', swatch: '#6f7845', hint: 'Region fills coloured by biome' },
  { id: 'relief', label: 'Relief & terrain', group: 'Land', swatch: '#8a8069', hint: 'Hill and dune shading, biome motifs' },
  { id: 'regions', label: 'Region borders', group: 'Land', swatch: '#b8894e', hint: 'Boundaries between regions' },
  { id: 'rivers', label: 'Rivers', group: 'Land', swatch: '#4f8296', hint: 'Rivers and the Long Water' },
  { id: 'political', label: 'Political influence', group: 'Power', swatch: '#9d4f45', hint: 'Each city\'s reach, coloured by who runs it' },
  { id: 'territory', label: 'Faction territory', group: 'Power', swatch: '#a3372f', hint: 'Ground held by each faction' },
  { id: 'conflict', label: 'Wars & danger', group: 'Power', swatch: '#b2453a', hint: 'War fronts, disputed ground, dangerous regions' },
  { id: 'roads', label: 'Roads', group: 'Movement', swatch: '#a89070', hint: 'Overland roads' },
  { id: 'sea', label: 'Sea routes', group: 'Movement', swatch: '#5b7288', hint: 'Coastal and open-water lanes' },
  { id: 'trade', label: 'Trade routes', group: 'Movement', swatch: '#c9962f', hint: 'Where the goods actually move' },
  { id: 'smuggling', label: 'Smuggling routes', group: 'Movement', swatch: '#6b5a86', hint: 'Routes that avoid a toll or a law' },
  { id: 'deposits', label: 'Resource deposits', group: 'Content', swatch: '#7d8b96', hint: 'Worked and unworked material sources' },
  { id: 'quests', label: 'Quest markers', group: 'Content', swatch: '#4f8296', hint: 'Where quest lines begin' },
  { id: 'minor', label: 'Minor settlements & ruins', group: 'Content', swatch: '#91856a', hint: 'Villages, camps, ruins, outposts' },
  { id: 'settlements', label: 'Cities', group: 'Content', swatch: '#c08a4a', hint: 'The thirteen settlements' },
  { id: 'labels', label: 'Labels', group: 'Content', swatch: '#e6e2d9', hint: 'Place names' },
]

/* Stable empty fallbacks so the expensive geometry memos do not thrash while
   the world is still loading. */
/** The water plane. Sized to cover any viewBox the fit logic can produce. */
const SEA = { x: -WORLD_W * 2, y: -WORLD_H * 3, w: WORLD_W * 5, h: WORLD_H * 7 }

/**
 * How much chart is drawn beyond each edge of the stage, as a fraction of the
 * stage. A pan slides the already-rendered SVG with a compositor transform; the
 * overscan is the budget of pre-drawn map available before a repaint is needed.
 */
const OVERSCAN = 0.3

/**
 * Area covered by the sea hatching. The flat sea colour can span the whole
 * plane cheaply, but a tiled pattern cannot: this is bounded to what panning
 * can actually bring on screen.
 */
const HATCH = { x: -WORLD_W * 0.6, y: -WORLD_H * 0.6, w: WORLD_W * 2.2, h: WORLD_H * 2.2 }

const EMPTY_REGIONS: RegionShape[] = []
const EMPTY_ROUTES: RouteShape[] = []
const EMPTY_ZONES: ZoneShape[] = []

export const DEFAULT_LAYERS: MapLayerId[] = [
  'biomes',
  'relief',
  'regions',
  'rivers',
  'roads',
  'trade',
  'conflict',
  'settlements',
  'minor',
  'labels',
]

/* ------------------------------------------------------------------ */
/* Motifs — the illustrated chart's biome symbols                      */
/* ------------------------------------------------------------------ */

function motifPath(kind: string, x: number, y: number, s: number): string {
  switch (kind) {
    case 'forest':
      return `M${x - s},${y} q${s},${-s * 1.5} ${s * 2},0 M${x},${y} l0,${s * 0.5}`
    case 'conifer':
      return `M${x},${y + s * 0.6} L${x},${y - s} M${x - s * 0.7},${y + s * 0.2} L${x},${y - s * 0.4} L${x + s * 0.7},${y + s * 0.2} M${x - s * 0.5},${y - s * 0.2} L${x},${y - s * 0.7} L${x + s * 0.5},${y - s * 0.2}`
    case 'peak':
      return `M${x - s * 1.2},${y + s * 0.5} L${x - s * 0.2},${y - s} L${x + s * 0.5},${y + s * 0.5} M${x + s * 0.1},${y + s * 0.5} L${x + s},${y - s * 0.5} L${x + s * 1.6},${y + s * 0.5}`
    case 'grass':
      return `M${x - s * 0.7},${y} q${s * 0.35},${-s * 0.8} ${s * 0.7},0 M${x + s * 0.1},${y} q${s * 0.3},${-s * 0.6} ${s * 0.6},0`
    case 'dune':
      return `M${x - s},${y} q${s * 0.6},${-s * 0.7} ${s * 1.2},${-s * 0.1} q${s * 0.4},${s * 0.3} ${s * 0.8},${s * 0.1}`
    case 'marsh':
      return `M${x - s},${y} l${s * 2},0 M${x - s * 0.6},${y - s * 0.5} l0,${s * 0.5} M${x},${y - s * 0.8} l0,${s * 0.8} M${x + s * 0.6},${y - s * 0.5} l0,${s * 0.5}`
    case 'karst':
      return `M${x - s},${y + s * 0.4} l${s * 0.5},${-s * 0.9} l${s * 0.5},${s * 0.5} l${s * 0.5},${-s * 0.7} l${s * 0.5},${s * 1.1}`
    case 'olive':
      return `M${x},${y + s * 0.6} l0,${-s * 0.8} M${x - s * 0.6},${y - s * 0.3} a${s * 0.6},${s * 0.45} 0 0 1 ${s * 1.2},0 a${s * 0.6},${s * 0.45} 0 0 1 ${-s * 1.2},0`
    case 'salt':
      return `M${x - s},${y} l${s * 2},0 M${x - s * 0.5},${y - s * 0.5} l0,${s} M${x + s * 0.5},${y - s * 0.5} l0,${s}`
    case 'ash':
      return `M${x - s * 0.8},${y + s * 0.5} l${s * 0.8},${-s} l${s * 0.8},${s} M${x - s * 0.4},${y} l${s * 0.8},0`
    case 'scrub':
      return `M${x},${y + s * 0.5} l0,${-s * 0.7} M${x - s * 0.5},${y - s * 0.1} l${s},0 M${x - s * 0.3},${y - s * 0.5} l${s * 0.6},0`
    default:
      return ''
  }
}

interface Motif {
  d: string
  key: string
}

function buildMotifs(regions: { id: string; polygon: Point[] }[]): Motif[] {
  const out: Motif[] = []
  const step = 46
  for (const region of regions) {
    const paint = BIOME_PAINT[region.id]
    if (!paint || paint.motif === 'none') continue
    let minX = Infinity
    let minY = Infinity
    let maxX = -Infinity
    let maxY = -Infinity
    for (const [x, y] of region.polygon) {
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    }
    let n = 0
    for (let y = Math.floor(minY / step) * step; y < maxY; y += step) {
      for (let x = Math.floor(minX / step) * step; x < maxX; x += step) {
        const jx = x + ((((x * 7 + y * 13) % 23) / 23) * step) / 1.6
        const jy = y + ((((x * 11 + y * 5) % 19) / 19) * step) / 1.6
        if (!pointInPolygon([jx, jy], region.polygon)) continue
        if ((x / step + y / step) % 2 !== 0) continue
        const d = motifPath(paint.motif, jx, jy, 7.5)
        if (d) out.push({ d, key: `${region.id}-${n++}-${x}-${y}` })
      }
    }
  }
  return out
}

/* ------------------------------------------------------------------ */
/* Marker glyphs                                                       */
/* ------------------------------------------------------------------ */

function CityMarker({ selected, dim, ink }: { selected: boolean; dim: boolean; ink: string }) {
  return (
    <g opacity={dim ? 0.32 : 1}>
      <circle r={selected ? 13 : 10} fill={ink} opacity={0.18} />
      <path d="M0,-9 L7.8,4.5 L-7.8,4.5 Z" fill={ink} stroke={selected ? '#f0e2c4' : 'none'} strokeWidth={1.6} />
      <circle r={2.4} cy={-0.6} fill="#0e0f11" opacity={0.85} />
    </g>
  )
}

/* ------------------------------------------------------------------ */

export interface WorldMapProps {
  mode: MapMode
  layers: Set<MapLayerId>
  selectedId?: string
  onSelect?: (id: string | null) => void
  /** Ids to keep at full strength; everything else dims. */
  highlight?: Set<string> | null
  /** Allow dragging markers. */
  editable?: boolean
  onMove?: (id: string, x: number, y: number, committed: boolean) => void
  className?: string
  /** Non-interactive preview mode for the dashboard. */
  preview?: boolean
  initialView?: { x: number; y: number; w: number; h: number }
}

export function WorldMap({
  mode,
  layers,
  selectedId,
  onSelect,
  highlight,
  editable,
  onMove,
  className,
  preview,
  initialView,
}: WorldMapProps) {
  const world = useWorld()
  const uid = useId().replace(/:/g, '')
  const stage = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const [view, setView] = useState(initialView ?? { x: 0, y: 0, w: WORLD_W, h: WORLD_H })
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [dragging, setDragging] = useState(false)
  const pan = useRef<{ x: number; y: number; vx: number; vy: number } | null>(null)
  const markerDrag = useRef<{ id: string; moved: boolean } | null>(null)
  const press = useRef<{ id: string; x: number; y: number } | null>(null)
  const pinch = useRef<{ d: number; w: number } | null>(null)

  const paper = mode === 'paper'
  const ink = paper ? '#3b3222' : '#e6e2d9'
  const inkSoft = paper ? '#6b5c42' : '#b3ada0'

  /* --- static geometry ------------------------------------------- */
  const regions = world?.atlas.regions ?? EMPTY_REGIONS
  const routes = world?.atlas.routes ?? EMPTY_ROUTES
  const zones = world?.atlas.zones ?? EMPTY_ZONES

  const landPath = useMemo(() => polygonToPath(LAND), [])
  const regionPaths = useMemo(() => regions.map((r, i) => ({ ...r, d: polygonToPath(r.polygon), key: `${r.id}-${i}` })), [regions])
  // Motifs are thousands of point-in-polygon tests, so they are keyed on the
  // geometry alone. Toggling the relief layer hides them rather than rebuilding.
  const motifs = useMemo(() => buildMotifs(regions), [regions])
  const routePaths = useMemo(
    () => routes.map((r) => ({ ...r, d: smoothPath(r.path) })),
    [routes],
  )
  const zonePaths = useMemo(() => zones.map((z) => ({ ...z, d: polygonToPath(z.polygon) })), [zones])

  /* --- derived political ------------------------------------------ */
  const index = useMemo(() => (world ? buildIndex(world) : null), [world])
  const terr = useMemo(() => (world && index && layers.has('territory') ? territories(world, index) : []), [world, index, layers])
  const infl = useMemo(() => (world && index && layers.has('political') ? influences(world, index) : []), [world, index, layers])

  /* --- markers ---------------------------------------------------- */
  const markers = useMemo(() => {
    if (!world) return { cities: [], minor: [], deposits: [], quests: [] }
    const cities: { id: string; at: Point; name: string }[] = []
    const minor: { id: string; at: Point; name: string; kind: string }[] = []
    const deposits: { id: string; at: Point; name: string }[] = []
    const quests: { id: string; at: Point; name: string }[] = []
    for (const [id, at] of Object.entries(world.atlas.positions)) {
      const e = world.entities[id]
      if (!e || e.archived) continue
      if (e.type === 'city') cities.push({ id, at, name: e.name })
      else if (e.type === 'site') minor.push({ id, at, name: e.name, kind: String(e.fields.siteType ?? 'Site') })
      else if (e.type === 'deposit') deposits.push({ id, at, name: e.name })
      else if (e.type === 'quest') quests.push({ id, at, name: e.name })
      else if (e.type === 'creature') minor.push({ id, at, name: e.name, kind: 'Creature' })
    }
    return { cities, minor, deposits, quests }
  }, [world])

  const dimmed = useCallback((id: string) => !!highlight && !highlight.has(id), [highlight])

  /* --- interaction ------------------------------------------------ */

  /**
   * The live view, mirrored outside React state.
   *
   * Changing the viewBox repaints the entire chart, which measured about 40ms a
   * frame regardless of CPU speed — it is rasterisation, not script. So a pan
   * does not touch the viewBox at all: the SVG is drawn larger than the stage
   * (see OVERSCAN) and slid with a CSS transform, which the compositor can do
   * without repainting. The viewBox is only rewritten when the gesture ends, or
   * when the slide has used up the overscan and fresh chart has to be drawn.
   */
  const viewRef = useRef(view)
  const commitFrame = useRef<number | null>(null)
  /** Live pan offset in CSS pixels, applied as a transform. */
  const slide = useRef({ x: 0, y: 0 })

  const setSlide = useCallback((x: number, y: number) => {
    slide.current = { x, y }
    const el = svgRef.current
    if (el) el.style.transform = x === 0 && y === 0 ? '' : `translate3d(${x}px, ${y}px, 0)`
  }, [])

  const applyView = useCallback((next: { x: number; y: number; w: number; h: number }, commit: boolean) => {
    const v = clampView(next)
    viewRef.current = v
    if (!commit) return
    if (commitFrame.current !== null) return
    commitFrame.current = requestAnimationFrame(() => {
      commitFrame.current = null
      setView(viewRef.current)
    })
  }, [])

  /**
   * Redraw at the new view *now*, in this task. Handing the slide back to the
   * viewBox is only seamless if the transform is cleared and the viewBox moved
   * in the same paint — scheduled apart, the chart snaps back to where the drag
   * started for a frame. Used mid-drag, where that flash would land on every
   * hand-over and read as the map tearing itself apart.
   */
  const commitViewNow = useCallback((next: { x: number; y: number; w: number; h: number }) => {
    const v = clampView(next)
    viewRef.current = v
    if (commitFrame.current !== null) {
      cancelAnimationFrame(commitFrame.current)
      commitFrame.current = null
    }
    flushSync(() => setView(v))
  }, [])

  // Keep the mirror in step when the view changes through React (fit, resize,
  // selection recentring), and drop any leftover slide now that the viewBox
  // itself has moved. Layout effect so the two never disagree on screen.
  useLayoutEffect(() => {
    viewRef.current = view
    if (slide.current.x !== 0 || slide.current.y !== 0) setSlide(0, 0)
  }, [view, setSlide])

  useEffect(
    () => () => {
      if (commitFrame.current !== null) cancelAnimationFrame(commitFrame.current)
    },
    [],
  )

  const toWorld = useCallback((clientX: number, clientY: number): Point => {
    const rect = stage.current?.getBoundingClientRect()
    if (!rect) return [0, 0]
    const v = viewRef.current
    return [v.x + ((clientX - rect.left) / rect.width) * v.w, v.y + ((clientY - rect.top) / rect.height) * v.h]
  }, [])

  const zoomBy = useCallback(
    (factor: number, anchor?: Point) => {
      const v = viewRef.current
      const nw = Math.max(WORLD_W / 14, Math.min(WORLD_W * 1.25, v.w * factor))
      const nh = nw * (v.h / v.w)
      const ax = anchor ? anchor[0] : v.x + v.w / 2
      const ay = anchor ? anchor[1] : v.y + v.h / 2
      const tx = (ax - v.x) / v.w
      const ty = (ay - v.y) / v.h
      // Zoom changes marker and label scale, so it has to reach state — but
      // coalesced to one commit per frame rather than one per wheel tick.
      applyView({ x: ax - nw * tx, y: ay - nh * ty, w: nw, h: nh }, true)
    },
    [applyView],
  )

  useEffect(() => {
    const el = stage.current
    if (!el || preview) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      zoomBy(e.deltaY > 0 ? 1.14 : 1 / 1.14, toWorld(e.clientX, e.clientY))
      // Zooming mid-drag moves the view out from under the slide; re-anchor the
      // gesture to here so the next move is measured against the new view.
      if (pan.current) pan.current = { x: e.clientX, y: e.clientY, vx: viewRef.current.x, vy: viewRef.current.y }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [zoomBy, toWorld, preview])

  /**
   * Keep the viewBox aspect equal to the element's, so `slice` never crops and
   * screen-to-world conversion stays exact. On first measure the view is fitted
   * to show the whole world.
   */
  useEffect(() => {
    const el = stage.current
    if (!el) return
    let fitted = false
    const apply = (w: number, h: number) => {
      if (w <= 0 || h <= 0) return
      setSize({ w, h })
      const aspect = w / h
      setView((v) => {
        if (!fitted) {
          fitted = true
          const worldAspect = WORLD_W / WORLD_H
          let vw = aspect >= worldAspect ? WORLD_H * aspect * 1.02 : WORLD_W * 1.02
          let vh = vw / aspect
          // Containing the world inside a viewport of a very different shape
          // strands it in a field of empty sea. Past that point, fill the
          // constraining axis instead and let the reader pan across.
          if (vh > WORLD_H * 1.25) {
            vh = WORLD_H * 1.08
            vw = vh * aspect
          } else if (vw > WORLD_W * 1.25) {
            vw = WORLD_W * 1.08
            vh = vw / aspect
          }
          return { x: (WORLD_W - vw) / 2, y: (WORLD_H - vh) / 2, w: vw, h: vh }
        }
        const nh = v.w / aspect
        if (Math.abs(nh - v.h) < 0.5) return v
        return clampView({ ...v, y: v.y + (v.h - nh) / 2, h: nh })
      })
    }
    const ro = new ResizeObserver((entries) => {
      const r = entries[0]?.contentRect
      if (r) apply(r.width, r.height)
    })
    ro.observe(el)
    const rect = el.getBoundingClientRect()
    apply(rect.width, rect.height)
    return () => ro.disconnect()
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    if (preview) return
    const target = (e.target as Element).closest('[data-marker]')
    const id = target?.getAttribute('data-marker') ?? null
    // Selection is resolved on pointer-up rather than with a click handler on
    // the marker: capturing the pointer on the stage (needed for smooth panning
    // and dragging) redirects the subsequent click away from the marker.
    press.current = id ? { id, x: e.clientX, y: e.clientY } : null

    if (id && editable && e.button === 0) {
      markerDrag.current = { id, moved: false }
      ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
      e.preventDefault()
      return
    }
    if (e.button !== 0 && e.button !== 1) return
    pan.current = { x: e.clientX, y: e.clientY, vx: viewRef.current.x, vy: viewRef.current.y }
    setDragging(true)
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (markerDrag.current) {
      const [wx, wy] = toWorld(e.clientX, e.clientY)
      markerDrag.current.moved = true
      onMove?.(markerDrag.current.id, wx, wy, false)
      return
    }
    if (!pan.current) return
    const rect = stage.current?.getBoundingClientRect()
    if (!rect) return

    // The slide has to obey exactly the same limits as the view it stands in
    // for. Sliding freely and clamping only on hand-over lets the chart travel
    // somewhere it cannot stay, then snaps it back — which is what panning at
    // full zoom, where the view can barely move at all, looked like.
    const v = viewRef.current
    const rawX = e.clientX - pan.current.x
    const rawY = e.clientY - pan.current.y
    const target = clampView({
      ...v,
      x: v.x - (rawX / rect.width) * v.w,
      y: v.y - (rawY / rect.height) * v.h,
    })
    const px = ((v.x - target.x) / v.w) * rect.width
    const py = ((v.y - target.y) / v.h) * rect.height

    // Slid far enough that we are about to run off the pre-drawn edge: fold the
    // slide into the view, repaint once, and start sliding again from there.
    const budgetX = rect.width * OVERSCAN * 0.85
    const budgetY = rect.height * OVERSCAN * 0.85
    if (Math.abs(px) > budgetX || Math.abs(py) > budgetY) {
      // Synchronous: the layout effect drops the slide as part of the same
      // commit, so the chart never shows the old viewBox without its transform.
      commitViewNow(target)
      pan.current = { x: e.clientX, y: e.clientY, vx: target.x, vy: target.y }
      return
    }
    setSlide(px, py)
  }

  const endPointer = (e: React.PointerEvent) => {
    const drag = markerDrag.current
    if (drag) {
      if (drag.moved) {
        const [wx, wy] = toWorld(e.clientX, e.clientY)
        onMove?.(drag.id, wx, wy, true)
      }
      markerDrag.current = null
    }
    // A press that did not travel is a selection, whether or not the pointer
    // was captured for panning.
    const p = press.current
    if (p && !drag?.moved && Math.hypot(e.clientX - p.x, e.clientY - p.y) < 6) {
      onSelect?.(p.id)
    }
    if (pan.current) {
      const rect = stage.current?.getBoundingClientRect()
      const v = viewRef.current
      if (rect && (slide.current.x !== 0 || slide.current.y !== 0)) {
        applyView(
          { ...v, x: v.x - (slide.current.x / rect.width) * v.w, y: v.y - (slide.current.y / rect.height) * v.h },
          true,
        )
      }
    } else if (pinch.current) {
      applyView(viewRef.current, true)
    }
    press.current = null
    pan.current = null
    pinch.current = null
    setDragging(false)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY)
      pinch.current = { d, w: viewRef.current.w }
    }
  }
  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinch.current) {
      const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY)
      const factor = pinch.current.d / d
      const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2
      const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2
      const anchor = toWorld(cx, cy)
      const v = viewRef.current
      const nw = Math.max(WORLD_W / 14, Math.min(WORLD_W * 1.25, pinch.current.w * factor))
      const nh = nw * (v.h / v.w)
      const tx = (anchor[0] - v.x) / v.w
      const ty = (anchor[1] - v.y) / v.h
      applyView({ x: anchor[0] - nw * tx, y: anchor[1] - nh * ty, w: nw, h: nh }, true)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const stepPx = e.shiftKey ? 0.24 : 0.08
    const map: Record<string, () => void> = {
      ArrowLeft: () => applyView({ ...viewRef.current, x: viewRef.current.x - viewRef.current.w * stepPx }, true),
      ArrowRight: () => applyView({ ...viewRef.current, x: viewRef.current.x + viewRef.current.w * stepPx }, true),
      ArrowUp: () => applyView({ ...viewRef.current, y: viewRef.current.y - viewRef.current.h * stepPx }, true),
      ArrowDown: () => applyView({ ...viewRef.current, y: viewRef.current.y + viewRef.current.h * stepPx }, true),
      '+': () => zoomBy(1 / 1.25),
      '=': () => zoomBy(1 / 1.25),
      '-': () => zoomBy(1.25),
      '0': () => applyView({ x: 0, y: 0, w: WORLD_W, h: WORLD_H }, true),
    }
    const fn = map[e.key]
    if (fn) {
      e.preventDefault()
      fn()
    }
  }

  /* Keep the selection in view when it changes from outside the map. */
  useEffect(() => {
    if (!selectedId || !world || preview) return
    const at = world.atlas.positions[selectedId]
    if (!at) return
    setView((v) => {
      if (at[0] > v.x + v.w * 0.08 && at[0] < v.x + v.w * 0.92 && at[1] > v.y + v.h * 0.08 && at[1] < v.y + v.h * 0.92) return v
      return clampView({ ...v, x: at[0] - v.w / 2, y: at[1] - v.h / 2 })
    })
  }, [selectedId, world, preview])

  // World units per CSS pixel. Marker glyphs and labels are sized in real
  // screen pixels, so they stay legible at any zoom and at any panel size.
  const px = size.w > 0 ? view.w / size.w : view.w / WORLD_W

  /**
   * The drawn box: the view plus an overscan margin on every side, at exactly
   * the same scale. The element is inset by the same fraction, so what lands
   * over the stage is precisely `view` and everything else is the slide budget.
   */
  const over = preview ? 0 : OVERSCAN
  const vb = {
    x: view.x - view.w * over,
    y: view.y - view.h * over,
    w: view.w * (1 + 2 * over),
    h: view.h * (1 + 2 * over),
  }
  const inset = `${-over * 100}%`
  const span = `${(1 + 2 * over) * 100}%`
  const s = (n: number) => n * px
  /** Show a label only once the view is zoomed in past `maxPx` world-units-per-pixel. */
  const showLabel = (maxPx: number) => px <= maxPx

  /**
   * The coast, biomes, relief, political shading, borders, rivers and routes:
   * over a thousand nodes that depend on the data and the layer switches, and
   * on nothing about the current view. Memoising the subtree means React
   * reuses the exact same elements when the view commits, instead of
   * reconciling the whole map.
   */
  const staticScene = useMemo(
    () => (
      <>
          {/* Sea ------------------------------------------------------ */}
          <rect x={SEA.x} y={SEA.y} width={SEA.w} height={SEA.h} fill={paper ? '#aebfbd' : '#16232c'} />
          {paper ? (
            <rect
              x={HATCH.x}
              y={HATCH.y}
              width={HATCH.w}
              height={HATCH.h}
              fill={`url(#sealines-${uid})`}
              opacity={0.5}
            />
          ) : null}

          {/* Coastal shading. The wide strokes straddle the coast; the land fill
              is painted next and hides the half that falls inland, which avoids
              clipping every frame against the coastline. */}
          <g>
            {[30, 20, 11, 5].map((w, i) => (
              <path
                key={w}
                d={landPath}
                fill="none"
                stroke={paper ? '#8fa39f' : '#20323d'}
                strokeWidth={w}
                opacity={paper ? 0.16 + i * 0.1 : 0.24 + i * 0.13}
              />
            ))}
          </g>

          {/* Land ----------------------------------------------------- */}
          <path d={landPath} fill={paper ? '#e4d8b8' : '#2c3128'} />

          <g>
            {/* Biome fills */}
            {layers.has('biomes')
              ? regionPaths.map((r) => {
                  const p = BIOME_PAINT[r.id]
                  if (!p) return null
                  return <path key={`b-${r.key}`} d={r.d} fill={paper ? p.paper : p.color} opacity={paper ? 0.94 : 0.95} />
                })
              : null}

            {/* Relief motifs */}
            {layers.has('relief') ? (
              <g stroke={paper ? '#7a6642' : '#cdd3c4'} strokeWidth={1.3} fill="none" opacity={paper ? 0.55 : 0.28} strokeLinecap="round">
                {motifs.map((m) => (
                  <path key={m.key} d={m.d} />
                ))}
              </g>
            ) : null}

            {/* Political influence. Circles around cities, so these are the one
                thing here that genuinely spills past the coast. */}
            {layers.has('political') ? (
              <g clipPath={`url(#land-${uid})`}>
                {infl.map((i) => (
                  <circle key={`i-${i.cityId}`} cx={i.at[0]} cy={i.at[1]} r={i.r} fill={i.color} opacity={paper ? 0.17 : 0.22} />
                ))}
              </g>
            ) : null}

            {/* Faction territory */}
            {terr.map((t) => (
              <g key={`t-${t.factionId}`} opacity={paper ? 0.3 : 0.36}>
                {t.hull.length >= 3 ? (
                  <path d={polygonToPath(t.hull)} fill={t.color} opacity={0.36} stroke={t.color} strokeWidth={2.4} strokeDasharray={t.contested ? '10 7' : undefined} />
                ) : null}
                {t.discs.map((d, i) => (
                  <circle key={i} cx={d.at[0]} cy={d.at[1]} r={d.r} fill={t.color} opacity={0.3} />
                ))}
              </g>
            ))}

            {/* Conflict zones */}
            {layers.has('conflict')
              ? zonePaths.map((z) => {
                  const color = z.kind === 'war' ? '#a3372f' : z.kind === 'disputed' ? '#c9962f' : '#8a5a3a'
                  return (
                    <g key={z.id}>
                      <path d={z.d} fill={`url(#hatch-${uid})`} opacity={0.75} />
                      <path d={z.d} fill={color} opacity={paper ? 0.15 : 0.2} stroke={color} strokeWidth={2} strokeDasharray="9 6" />
                    </g>
                  )
                })
              : null}

            {/* Region borders */}
            {layers.has('regions')
              ? regionPaths.map((r) => (
                  <path
                    key={`r-${r.key}`}
                    d={r.d}
                    fill="none"
                    stroke={paper ? '#7d6842' : '#8f9aa4'}
                    strokeWidth={2}
                    strokeDasharray="7 5"
                    opacity={0.85}
                  />
                ))
              : null}

            {/* Rivers */}
            {layers.has('rivers')
              ? routePaths
                  .filter((r) => r.kind === 'river')
                  .map((r) => (
                    <path
                      key={r.id}
                      d={r.d}
                      fill="none"
                      stroke={paper ? '#6d8296' : '#5d93ad'}
                      strokeWidth={(r.weight ?? 1) * 1.7}
                      strokeLinecap="round"
                      opacity={0.9}
                    />
                  ))
              : null}
          </g>

          {/* The inked coastline, over the biome fills. */}
          <path
            d={landPath}
            fill="none"
            stroke={paper ? '#5f5334' : '#0c1116'}
            strokeWidth={paper ? 2.6 : 2.2}
            opacity={paper ? 0.75 : 0.85}
            pointerEvents="none"
          />

          {/* Routes (drawn over the coast so they can reach harbours) --- */}
          {layers.has('sea')
            ? routePaths
                .filter((r) => r.kind === 'sea')
                .map((r) => (
                  <path key={r.id} d={r.d} fill="none" stroke={paper ? '#6b7f92' : '#7fa5bd'} strokeWidth={1.8} strokeDasharray="2 8" strokeLinecap="round" opacity={0.85} />
                ))
            : null}

          {layers.has('roads')
            ? routePaths
                .filter((r) => r.kind === 'road')
                .map((r) => (
                  <g key={r.id}>
                    <path d={r.d} fill="none" stroke={paper ? '#b9a77e' : '#0f1114'} strokeWidth={(r.weight ?? 2) * 1.9} strokeLinecap="round" opacity={0.55} />
                    <path d={r.d} fill="none" stroke={paper ? '#6b5c42' : '#b09a76'} strokeWidth={(r.weight ?? 2) * 0.7} strokeLinecap="round" strokeDasharray="12 7" />
                  </g>
                ))
            : null}

          {layers.has('trade')
            ? routePaths
                .filter((r) => r.kind === 'trade')
                .map((r) => (
                  <path key={r.id} d={r.d} fill="none" stroke="#c9962f" strokeWidth={(r.weight ?? 2) * 1.15} strokeLinecap="round" opacity={0.9} />
                ))
            : null}

          {layers.has('smuggling')
            ? routePaths
                .filter((r) => r.kind === 'smuggling')
                .map((r) => (
                  <path
                    key={r.id}
                    d={r.d}
                    fill="none"
                    stroke="#8f77b8"
                    strokeWidth={(r.weight ?? 1.5) * 1.2}
                    strokeLinecap="round"
                    strokeDasharray="3 7"
                    opacity={0.95}
                  />
                ))
            : null}

      </>
    ),
    [paper, uid, landPath, regionPaths, motifs, layers, infl, terr, zonePaths, routePaths],
  )

  if (!world) return null

  return (
    <div
      ref={stage}
      className={`map-stage${dragging ? ' dragging' : ''}${className ? ` ${className}` : ''}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endPointer}
      onPointerCancel={endPointer}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      style={preview ? { pointerEvents: 'none' } : undefined}
    >
      <svg
        ref={svgRef}
        viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
        style={{ position: 'absolute', left: inset, top: inset, width: span, height: span, willChange: 'transform' }}
        preserveAspectRatio="xMidYMid slice"
        onKeyDown={onKeyDown}
        tabIndex={preview ? -1 : 0}
        role={preview ? 'presentation' : 'application'}
        aria-label={preview ? undefined : 'World map. Arrow keys pan, plus and minus zoom, 0 resets.'}
      >
        {/* Deliberately vast: a tall narrow viewport fits the world by width,
            which makes the visible box several times the world's height. */}
        <defs>
          <filter id={`grain-${uid}`} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="7" result="n" />
            <feColorMatrix in="n" type="saturate" values="0" result="d" />
            <feComponentTransfer in="d" result="t">
              <feFuncA type="linear" slope={paper ? 0.34 : 0.14} />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" in2="t" mode="multiply" />
          </filter>
          <clipPath id={`land-${uid}`}>
            <path d={landPath} />
          </clipPath>
          <pattern id={`hatch-${uid}`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="7" stroke={paper ? '#8a7550' : '#7d8b96'} strokeWidth="1.1" opacity="0.5" />
          </pattern>
          <pattern id={`sealines-${uid}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0.5" x2="40" y2="0.5" stroke="#93a8a6" strokeWidth="0.8" opacity="0.55" />
          </pattern>
          <pattern id={`dots-${uid}`} width="9" height="9" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.1" fill={paper ? '#8a7550' : '#9aa3ad'} opacity="0.55" />
          </pattern>
        </defs>

        {staticScene}

        {/* Deposits -------------------------------------------------- */}
        {layers.has('deposits')
          ? markers.deposits.map((m) => (
              <g
                key={m.id}
                transform={`translate(${m.at[0]},${m.at[1]})`}
                data-marker={m.id}
                style={{ cursor: 'pointer' }}
                opacity={dimmed(m.id) ? 0.28 : 1}
                role={preview ? undefined : 'button'}
                tabIndex={preview ? undefined : 0}
                aria-label={m.name}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onSelect?.(m.id)
                  }
                }}
              >
                <path
                  d={`M0,${-s(7)} L${s(6)},0 L0,${s(7)} L${-s(6)},0 Z`}
                  fill={paper ? '#7a6a52' : '#93a3ad'}
                  stroke={paper ? '#3b3222' : '#0e0f11'}
                  strokeWidth={s(1.2)}
                />
                {showLabel(0.55) ? (
                  <text x={s(10)} y={s(3.5)} fontSize={s(11)} fill={inkSoft} className="node-sub" style={{ fontSize: s(11) }}>
                    {m.name}
                  </text>
                ) : null}
              </g>
            ))
          : null}

        {/* Minor settlements, ruins, creatures ----------------------- */}
        {layers.has('minor')
          ? markers.minor.map((m) => (
              <g
                key={m.id}
                transform={`translate(${m.at[0]},${m.at[1]})`}
                data-marker={m.id}
                style={{ cursor: 'pointer' }}
                opacity={dimmed(m.id) ? 0.28 : 1}
                role={preview ? undefined : 'button'}
                tabIndex={preview ? undefined : 0}
                aria-label={m.name}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onSelect?.(m.id)
                  }
                }}
              >
                {m.kind === 'Ruin' ? (
                  <path d={`M${-s(5)},${s(4)} L${-s(5)},${-s(4)} M0,${s(4)} L0,${-s(6)} M${s(5)},${s(4)} L${s(5)},${-s(2)}`} stroke={paper ? '#5b4f38' : '#a8a294'} strokeWidth={s(1.8)} fill="none" />
                ) : m.kind === 'Creature' ? (
                  <circle r={s(3.4)} fill="none" stroke={paper ? '#4f6b52' : '#6d8f7d'} strokeWidth={s(1.6)} />
                ) : (
                  <rect x={-s(4)} y={-s(4)} width={s(8)} height={s(8)} fill={paper ? '#efe6cc' : '#1b1f23'} stroke={paper ? '#3b3222' : '#a89070'} strokeWidth={s(1.5)} />
                )}
                {showLabel(0.75) ? (
                  <text x={0} y={s(15)} fontSize={s(10.5)} textAnchor="middle" fill={inkSoft} style={{ fontSize: s(10.5) }}>
                    {m.name}
                  </text>
                ) : null}
              </g>
            ))
          : null}

        {/* Quest markers -------------------------------------------- */}
        {layers.has('quests')
          ? markers.quests.map((m) => (
              <g
                key={m.id}
                transform={`translate(${m.at[0]},${m.at[1]})`}
                data-marker={m.id}
                style={{ cursor: 'pointer' }}
                opacity={dimmed(m.id) ? 0.28 : 1}
                role={preview ? undefined : 'button'}
                tabIndex={preview ? undefined : 0}
                aria-label={m.name}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    onSelect?.(m.id)
                  }
                }}
              >
                <circle r={s(7)} fill="#0e0f11" opacity={0.35} />
                <path d={`M${-s(3)},${-s(5)} L${s(4)},0 L${-s(3)},${s(5)} Z`} fill="#5fa3bd" stroke="#0e0f11" strokeWidth={s(1)} />
                {showLabel(0.45) ? (
                  <text x={s(10)} y={s(3.5)} fontSize={s(11)} fill={inkSoft} style={{ fontSize: s(11) }}>
                    {m.name}
                  </text>
                ) : null}
              </g>
            ))
          : null}

        {/* Cities ---------------------------------------------------- */}
        {layers.has('settlements')
          ? markers.cities.map((m) => {
              const sel = m.id === selectedId
              return (
                <g
                  key={m.id}
                  transform={`translate(${m.at[0]},${m.at[1]}) scale(${px})`}
                  data-marker={m.id}
                  style={{ cursor: editable ? 'move' : 'pointer' }}
                  role={preview ? undefined : 'button'}
                  tabIndex={preview ? undefined : 0}
                  aria-label={m.name}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      onSelect?.(m.id)
                    }
                  }}
                >
                  <CityMarker selected={sel} dim={dimmed(m.id)} ink={paper ? '#7d3f2f' : '#c08a4a'} />
                  {layers.has('labels') ? (
                    <text
                      x={0}
                      y={20}
                      textAnchor="middle"
                      fontSize={12.5}
                      fontWeight={600}
                      fill={ink}
                      stroke={paper ? '#ded2b4' : '#0e0f11'}
                      strokeWidth={3.2}
                      paintOrder="stroke"
                      opacity={dimmed(m.id) ? 0.35 : 1}
                      style={{ fontFamily: 'var(--ff-display)', letterSpacing: '0.02em' }}
                    >
                      {m.name}
                    </text>
                  ) : null}
                </g>
              )
            })
          : null}

        {/* Labels ---------------------------------------------------- */}
        {layers.has('labels') ? (
          <g pointerEvents="none">
            {Object.entries(REGION_ANCHOR).map(([id, at]) => (
              <text
                key={id}
                x={at[0]}
                y={at[1]}
                textAnchor="middle"
                fontSize={s(19)}
                fill={paper ? '#7a6642' : '#9aa39a'}
                opacity={0.75}
                letterSpacing={s(2.4)}
                style={{ fontFamily: 'var(--ff-display)', textTransform: 'uppercase', fontSize: s(19) }}
              >
                {REGION_NAME[id] ?? id}
              </text>
            ))}
            {SEA_LABELS.map((l) => (
              <text
                key={l.id}
                x={l.at[0]}
                y={l.at[1]}
                textAnchor="middle"
                fontSize={s(21)}
                fill={paper ? '#6f7f88' : '#5e7f93'}
                opacity={0.8}
                letterSpacing={s(3)}
                transform={l.rotate ? `rotate(${l.rotate} ${l.at[0]} ${l.at[1]})` : undefined}
                style={{ fontFamily: 'var(--ff-display)', fontStyle: 'italic', fontSize: s(21) }}
              >
                {l.name}
              </text>
            ))}
            {zonePaths.map((z) =>
              z.label ? (
                <text
                  key={`zl-${z.id}`}
                  x={centroid(z.polygon)[0]}
                  y={centroid(z.polygon)[1]}
                  textAnchor="middle"
                  fontSize={s(12)}
                  fill={z.kind === 'war' ? '#c8544a' : '#c9962f'}
                  style={{ fontSize: s(12), letterSpacing: '0.08em', textTransform: 'uppercase' }}
                  opacity={0.9}
                >
                  {z.label}
                </text>
              ) : null,
            )}
          </g>
        ) : null}

        {/* Chart furniture ------------------------------------------- */}
        {paper && !preview ? <CompassRose x={2210} y={1420} r={78} /> : null}
        {paper ? (
          <rect
            x={6}
            y={6}
            width={WORLD_W - 12}
            height={WORLD_H - 12}
            fill="none"
            stroke="#8a7550"
            strokeWidth={3}
            opacity={0.55}
            pointerEvents="none"
          />
        ) : null}

      </svg>
    </div>
  )
}

function clampView(v: { x: number; y: number; w: number; h: number }) {
  const w = Math.min(v.w, WORLD_W * 1.3)
  const h = Math.min(v.h, WORLD_H * 1.3)
  const margin = 220
  return {
    w,
    h,
    x: Math.max(-margin, Math.min(WORLD_W - w + margin, v.x)),
    y: Math.max(-margin, Math.min(WORLD_H - h + margin, v.y)),
  }
}

function CompassRose({ x, y, r }: { x: number; y: number; r: number }) {
  const pts: string[] = []
  for (let i = 0; i < 4; i++) {
    const a = (i * Math.PI) / 2 - Math.PI / 2
    const b = a + Math.PI / 4
    pts.push(
      `M${x},${y} L${x + Math.cos(a) * r},${y + Math.sin(a) * r} L${x + Math.cos(b) * r * 0.26},${y + Math.sin(b) * r * 0.26} Z`,
    )
  }
  const minor: string[] = []
  for (let i = 0; i < 4; i++) {
    const a = (i * Math.PI) / 2 + Math.PI / 4
    minor.push(`M${x},${y} L${x + Math.cos(a) * r * 0.62},${y + Math.sin(a) * r * 0.62}`)
  }
  return (
    <g pointerEvents="none" opacity={0.72}>
      <circle cx={x} cy={y} r={r * 1.16} fill="none" stroke="#8a7550" strokeWidth={1.6} />
      <circle cx={x} cy={y} r={r * 1.03} fill="none" stroke="#8a7550" strokeWidth={0.9} />
      {minor.map((d, i) => (
        <path key={`m${i}`} d={d} stroke="#8a7550" strokeWidth={1.2} fill="none" />
      ))}
      {pts.map((d, i) => (
        <path key={i} d={d} fill={i % 2 === 0 ? '#6b5c42' : '#b3a481'} stroke="#4a3f2c" strokeWidth={0.8} />
      ))}
      <text x={x} y={y - r * 1.3} textAnchor="middle" fontSize={20} fill="#5b4f38" style={{ fontFamily: 'var(--ff-display)' }}>
        N
      </text>
      <circle cx={x} cy={y} r={4} fill="#4a3f2c" />
    </g>
  )
}
