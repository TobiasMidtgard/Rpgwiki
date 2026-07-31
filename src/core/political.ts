/**
 * Political geography, derived rather than stored.
 *
 * Faction territory and city influence are computed from `controls` and
 * `contests` relations plus marker positions, so changing who runs a city
 * immediately redraws the political and territory layers of the atlas.
 */

import type { Point } from './types'
import type { WorldState } from './store'
import type { WorldIndex } from './relations'

export interface Territory {
  factionId: string
  name: string
  color: string
  cities: string[]
  discs: { at: Point; r: number }[]
  hull: Point[]
  contested: boolean
}

const WEALTH_RADIUS: Record<string, number> = {
  Destitute: 74,
  Poor: 88,
  Modest: 104,
  Prosperous: 124,
  Rich: 148,
  Opulent: 170,
}

/** Stable colour per faction so the political map does not reshuffle on edit. */
export function factionColor(id: string, override?: string): string {
  if (override) return override
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  const hue = h % 360
  // Muted band only — the atlas must not turn into a pie chart.
  return `hsl(${hue} 34% 46%)`
}

function influenceRadius(world: WorldState, cityId: string): number {
  const city = world.entities[cityId]
  const wealth = typeof city?.fields.wealth === 'string' ? city.fields.wealth : 'Modest'
  return WEALTH_RADIUS[wealth] ?? 104
}

/** Andrew's monotone chain. */
export function convexHull(points: Point[]): Point[] {
  if (points.length < 3) return points
  const pts = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1])
  const cross = (o: Point, a: Point, b: Point) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
  const lower: Point[] = []
  for (const p of pts) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop()
    lower.push(p)
  }
  const upper: Point[] = []
  for (let i = pts.length - 1; i >= 0; i--) {
    const p = pts[i]
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop()
    upper.push(p)
  }
  upper.pop()
  lower.pop()
  return lower.concat(upper)
}

/** Push a hull outwards from its centre so it encloses the settlements. */
export function expandHull(hull: Point[], pad: number): Point[] {
  if (hull.length < 3) return hull
  const cx = hull.reduce((s, p) => s + p[0], 0) / hull.length
  const cy = hull.reduce((s, p) => s + p[1], 0) / hull.length
  return hull.map(([x, y]) => {
    const dx = x - cx
    const dy = y - cy
    const d = Math.hypot(dx, dy) || 1
    return [x + (dx / d) * pad, y + (dy / d) * pad] as Point
  })
}

export function territories(world: WorldState, index: WorldIndex): Territory[] {
  const out: Territory[] = []
  for (const f of Object.values(world.entities)) {
    if (f.type !== 'faction' || f.archived) continue
    const controlled = (index.out[f.id] ?? [])
      .filter((e) => e.kind === 'controls' || e.kind === 'contests')
      .map((e) => e.to)
      .filter((id) => {
        const t = world.entities[id]?.type
        return t === 'city' || t === 'site' || t === 'region'
      })
    const seen = new Set<string>()
    const placed = controlled.filter((id) => {
      if (seen.has(id) || !world.atlas.positions[id]) return false
      seen.add(id)
      return true
    })
    if (!placed.length) continue

    const discs = placed.map((id) => ({
      at: world.atlas.positions[id],
      r: influenceRadius(world, id) * 0.86,
    }))
    const hull = placed.length >= 3 ? expandHull(convexHull(placed.map((id) => world.atlas.positions[id])), 78) : []
    const contested = (index.out[f.id] ?? []).some((e) => e.kind === 'contests')
    out.push({
      factionId: f.id,
      name: f.name,
      color: factionColor(f.id, f.accent),
      cities: placed,
      discs,
      hull,
      contested,
    })
  }
  // Largest first, so small territories stay visible on top.
  return out.sort((a, b) => b.cities.length - a.cities.length)
}

export interface Influence {
  cityId: string
  at: Point
  r: number
  color: string
  factionId?: string
}

export function influences(world: WorldState, index: WorldIndex): Influence[] {
  const out: Influence[] = []
  for (const c of Object.values(world.entities)) {
    if (c.type !== 'city' || c.archived) continue
    const at = world.atlas.positions[c.id]
    if (!at) continue
    const ruler = (index.in[c.id] ?? []).find((e) => e.kind === 'controls')
    const f = ruler ? world.entities[ruler.from] : undefined
    out.push({
      cityId: c.id,
      at,
      r: influenceRadius(world, c.id),
      color: f ? factionColor(f.id, f.accent) : 'hsl(38 30% 50%)',
      factionId: f?.id,
    })
  }
  return out
}
