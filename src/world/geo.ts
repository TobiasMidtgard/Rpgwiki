/**
 * World geography.
 *
 * The coastline and the route network are hand-authored. Region borders are
 * generated as Voronoi cells clipped to the landmass, so they tile without
 * gaps or overlaps, then roughened along shared edges with a deterministic
 * hash — neighbouring cells displace identically, so the borders stay seamless
 * while looking drawn rather than computed.
 *
 * Faction territory and political influence are NOT stored here: they are
 * derived from `controls` relations at render time, so editing who runs a city
 * immediately redraws the political map.
 */

import type { Point, RegionShape, RouteShape, ZoneShape } from '../core/types'
import { WORLD_H, WORLD_W } from '../core/types'
import { CITY, REGION } from './registry'

/* ------------------------------------------------------------------ */
/* Geometry helpers                                                    */
/* ------------------------------------------------------------------ */

/** Stable 32-bit hash — the map must look identical on every load. */
function hash(...nums: number[]): number {
  let h = 2166136261
  for (const n of nums) {
    // Quantised to whole units: two cells that computed a shared vertex by
    // different clip orders differ only in the last float digits, and must
    // still hash identically or their common border would tear.
    const v = Math.round(n) | 0
    h ^= v & 0xff
    h = Math.imul(h, 16777619)
    h ^= (v >> 8) & 0xff
    h = Math.imul(h, 16777619)
    h ^= (v >> 16) & 0xff
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** Deterministic value in [-1, 1]. */
const noise = (...nums: number[]) => (hash(...nums) / 0xffffffff) * 2 - 1

export function pointInPolygon(p: Point, poly: Point[]): boolean {
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i]
    const [xj, yj] = poly[j]
    const hit = yi > p[1] !== yj > p[1] && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi
    if (hit) inside = !inside
  }
  return inside
}

export function centroid(poly: Point[]): Point {
  let a = 0
  let cx = 0
  let cy = 0
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const f = poly[j][0] * poly[i][1] - poly[i][0] * poly[j][1]
    a += f
    cx += (poly[j][0] + poly[i][0]) * f
    cy += (poly[j][1] + poly[i][1]) * f
  }
  if (Math.abs(a) < 1e-6) {
    const n = poly.length || 1
    return [poly.reduce((s, p) => s + p[0], 0) / n, poly.reduce((s, p) => s + p[1], 0) / n]
  }
  return [cx / (3 * a), cy / (3 * a)]
}

/** Sutherland–Hodgman clip against the half-plane on `keep`'s side of a bisector. */
function clipHalfPlane(poly: Point[], keep: Point, other: Point): Point[] {
  const mx = (keep[0] + other[0]) / 2
  const my = (keep[1] + other[1]) / 2
  const nx = other[0] - keep[0]
  const ny = other[1] - keep[1]
  // inside when (p - m) · n < 0
  const side = (p: Point) => (p[0] - mx) * nx + (p[1] - my) * ny
  const out: Point[] = []
  for (let i = 0; i < poly.length; i++) {
    const cur = poly[i]
    const nxt = poly[(i + 1) % poly.length]
    const dc = side(cur)
    const dn = side(nxt)
    if (dc <= 0) out.push(cur)
    if ((dc < 0 && dn > 0) || (dc > 0 && dn < 0)) {
      const t = dc / (dc - dn)
      out.push([cur[0] + (nxt[0] - cur[0]) * t, cur[1] + (nxt[1] - cur[1]) * t])
    }
  }
  return out
}

/**
 * Subdivide and displace edges. The displacement is keyed on the edge's
 * endpoints in canonical order, so two cells sharing an edge roughen it the
 * same way and stay perfectly adjacent.
 */
function roughen(poly: Point[], amp: number, steps = 3): Point[] {
  if (poly.length < 3) return poly
  const out: Point[] = []
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i]
    const b = poly[(i + 1) % poly.length]
    out.push(a)
    const dx = b[0] - a[0]
    const dy = b[1] - a[1]
    const len = Math.hypot(dx, dy)
    if (len < 24) continue
    // Canonical direction so both owners of the edge agree.
    const flip = a[0] < b[0] || (a[0] === b[0] && a[1] < b[1])
    const [p, q] = flip ? [a, b] : [b, a]
    const n = Math.min(steps, Math.max(1, Math.round(len / 70)))
    for (let s = 1; s <= n; s++) {
      const t = s / (n + 1)
      const tt = flip ? t : 1 - t
      const jitter = noise(p[0], p[1], q[0], q[1], s) * amp * Math.sin(Math.PI * t)
      out.push([a[0] + dx * tt - (dy / len) * jitter, a[1] + dy * tt + (dx / len) * jitter])
    }
  }
  return out
}

export function polygonToPath(poly: Point[]): string {
  if (!poly.length) return ''
  return `M${poly.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join('L')}Z`
}

/** Catmull–Rom to cubic Bézier, for rivers and roads that should not look plotted. */
export function smoothPath(pts: Point[], closed = false, tension = 0.5): string {
  if (pts.length < 2) return ''
  if (pts.length === 2) return `M${pts[0][0]},${pts[0][1]}L${pts[1][0]},${pts[1][1]}`
  const p = closed ? [pts[pts.length - 1], ...pts, pts[0], pts[1]] : [pts[0], ...pts, pts[pts.length - 1]]
  let d = `M${p[1][0].toFixed(1)},${p[1][1].toFixed(1)}`
  for (let i = 1; i < p.length - 2; i++) {
    const p0 = p[i - 1]
    const p1 = p[i]
    const p2 = p[i + 1]
    const p3 = p[i + 2]
    const c1: Point = [p1[0] + ((p2[0] - p0[0]) / 6) * tension * 2, p1[1] + ((p2[1] - p0[1]) / 6) * tension * 2]
    const c2: Point = [p2[0] - ((p3[0] - p1[0]) / 6) * tension * 2, p2[1] - ((p3[1] - p1[1]) / 6) * tension * 2]
    d += `C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`
  }
  return closed ? `${d}Z` : d
}

/* ------------------------------------------------------------------ */
/* Coastline                                                           */
/* ------------------------------------------------------------------ */

/**
 * The landmass, clockwise from the north-west. The deep notch in the
 * south-west is the Meridian Gulf; the Mediterranean-like coast wraps its
 * northern and western shores.
 */
const LAND_OUTLINE: Point[] = [
  // North coast, west to east
  [70, 140], [200, 82], [380, 112], [560, 70], [740, 106], [920, 62], [1100, 96],
  [1290, 56], [1470, 100], [1650, 66], [1830, 106], [2010, 72], [2180, 116], [2298, 182],
  // East coast, north to south
  [2352, 300], [2308, 422], [2356, 540], [2298, 662], [2344, 780],
  [2286, 880], [2360, 962], [2298, 1060], [2338, 1160], [2258, 1282], [2196, 1402], [2088, 1498],
  // South coast, east to west
  [1930, 1544], [1780, 1500], [1620, 1544], [1460, 1504], [1300, 1548], [1140, 1508], [990, 1544], [862, 1498],
  // Meridian Gulf — east shore running north to the head
  [792, 1428], [742, 1338], [690, 1258], [640, 1180], [560, 1130], [488, 1150],
  // Gulf west shore running back south
  [420, 1212], [370, 1292], [330, 1390], [280, 1470], [210, 1530],
  // West coast, south to north
  [120, 1500], [60, 1380], [96, 1250], [40, 1120], [76, 990], [30, 860],
  [66, 730], [26, 600], [56, 470], [30, 320],
]

export const LAND: Point[] = roughen(LAND_OUTLINE, 13, 3)

/** Frame used to clip cells before the land clip; keeps arithmetic bounded. */
const FRAME: Point[] = [
  [-40, -40],
  [WORLD_W + 40, -40],
  [WORLD_W + 40, WORLD_H + 40],
  [-40, WORLD_H + 40],
]

/* ------------------------------------------------------------------ */
/* Settlements                                                         */
/* ------------------------------------------------------------------ */

/**
 * Siting logic, not a ring: the Gilded Ascent holds the centre where three
 * river valleys meet a pass; the Sky City rides the updraft just north-east of
 * it; the Mediterranean City sits on the warm gulf; the rest follow their
 * resource, their biome or their river.
 */
export const CITY_POS: Record<string, Point> = {
  [CITY.gildedAscent]: [1150, 780],
  [CITY.skyCity]: [1420, 620],
  [CITY.mediterranean]: [430, 1080],
  [CITY.treeCity]: [700, 270],
  [CITY.caveAgrarian]: [790, 600],
  [CITY.siftingCity]: [1780, 1290],
  [CITY.magicCity]: [1700, 300],
  [CITY.arenaCity]: [1080, 1180],
  [CITY.floatingSwamp]: [2090, 980],
  [CITY.blackWeir]: [1830, 830],
  [CITY.orath]: [1560, 1080],
  [CITY.oruvai]: [990, 430],
  [CITY.kethVeyra]: [2010, 500],
}

/* ------------------------------------------------------------------ */
/* Regions                                                             */
/* ------------------------------------------------------------------ */

interface Seed {
  region: string
  at: Point
}

/**
 * Every city is its own region seed, which guarantees a settlement always
 * falls inside the region it is filed under. The remaining seeds fill the
 * wilderness between them.
 */
const SEEDS: Seed[] = [
  { region: REGION.borealCrown, at: [330, 128] },
  { region: REGION.borealCrown, at: [1020, 108] },
  { region: REGION.borealCrown, at: [1620, 118] },
  { region: REGION.borealCrown, at: [2130, 158] },

  { region: REGION.greatwood, at: CITY_POS[CITY.treeCity] },
  { region: REGION.greatwood, at: [560, 400] },
  { region: REGION.greatwood, at: [840, 214] },
  { region: REGION.greatwood, at: [300, 470] },

  { region: REGION.ironback, at: [1210, 420] },
  { region: REGION.ironback, at: [1440, 386] },
  { region: REGION.ironback, at: [1180, 620] },

  { region: REGION.hollowKarst, at: CITY_POS[CITY.caveAgrarian] },
  { region: REGION.hollowKarst, at: CITY_POS[CITY.oruvai] },
  { region: REGION.hollowKarst, at: [560, 700] },
  { region: REGION.hollowKarst, at: [880, 800] },

  { region: REGION.ascentBasin, at: CITY_POS[CITY.gildedAscent] },
  { region: REGION.ascentBasin, at: [1010, 960] },
  { region: REGION.ascentBasin, at: [1320, 880] },

  { region: REGION.anvilShelf, at: CITY_POS[CITY.skyCity] },
  { region: REGION.anvilShelf, at: [1580, 740] },
  { region: REGION.anvilShelf, at: [1540, 540] },

  { region: REGION.aethericScar, at: CITY_POS[CITY.magicCity] },
  { region: REGION.aethericScar, at: [1840, 420] },

  { region: REGION.mistfallCoast, at: CITY_POS[CITY.kethVeyra] },
  { region: REGION.mistfallCoast, at: [2200, 320] },
  { region: REGION.mistfallCoast, at: [2230, 660] },

  { region: REGION.theDrown, at: CITY_POS[CITY.floatingSwamp] },
  { region: REGION.theDrown, at: CITY_POS[CITY.blackWeir] },
  { region: REGION.theDrown, at: [2220, 1090] },
  { region: REGION.theDrown, at: [1960, 880] },

  { region: REGION.ashenSteppe, at: CITY_POS[CITY.arenaCity] },
  { region: REGION.ashenSteppe, at: [880, 1150] },
  { region: REGION.ashenSteppe, at: [1290, 1270] },
  { region: REGION.ashenSteppe, at: [1230, 1030] },

  { region: REGION.cinderWaste, at: CITY_POS[CITY.orath] },
  { region: REGION.cinderWaste, at: [1470, 1330] },
  { region: REGION.cinderWaste, at: [1690, 1160] },

  { region: REGION.whitePans, at: CITY_POS[CITY.siftingCity] },
  { region: REGION.whitePans, at: [1960, 1400] },
  { region: REGION.whitePans, at: [2010, 1200] },

  { region: REGION.meridianCoast, at: CITY_POS[CITY.mediterranean] },
  { region: REGION.meridianCoast, at: [240, 1300] },
  { region: REGION.meridianCoast, at: [660, 1370] },
  { region: REGION.meridianCoast, at: [190, 940] },
  { region: REGION.meridianCoast, at: [640, 1010] },
]

function buildRegionShapes(): RegionShape[] {
  const shapes: RegionShape[] = []
  for (let i = 0; i < SEEDS.length; i++) {
    let cell: Point[] = FRAME
    for (let j = 0; j < SEEDS.length && cell.length; j++) {
      if (i === j) continue
      cell = clipHalfPlane(cell, SEEDS[i].at, SEEDS[j].at)
    }
    if (cell.length < 3) continue
    // Clip the cell to the coastline by half-planes is not possible for a
    // concave shore, so clip the *land* by the cell's half-planes instead.
    let landCell: Point[] = LAND
    for (let j = 0; j < SEEDS.length && landCell.length; j++) {
      if (i === j) continue
      landCell = clipHalfPlane(landCell, SEEDS[i].at, SEEDS[j].at)
    }
    if (landCell.length < 3) continue
    shapes.push({ id: SEEDS[i].region, biome: SEEDS[i].region, polygon: roughen(landCell, 7, 3) })
  }
  return shapes
}

export const REGION_SHAPES: RegionShape[] = buildRegionShapes()

/** Largest cell per region, used to anchor the region label. */
export const REGION_ANCHOR: Record<string, Point> = (() => {
  const best: Record<string, { area: number; at: Point }> = {}
  for (const s of REGION_SHAPES) {
    let a = 0
    for (let i = 0, j = s.polygon.length - 1; i < s.polygon.length; j = i++) {
      a += s.polygon[j][0] * s.polygon[i][1] - s.polygon[i][0] * s.polygon[j][1]
    }
    a = Math.abs(a / 2)
    if (!best[s.id] || a > best[s.id].area) best[s.id] = { area: a, at: centroid(s.polygon) }
  }
  const out: Record<string, Point> = {}
  for (const k of Object.keys(best)) out[k] = best[k].at
  return out
})()

/** Deterministic scatter point inside a region, for auto-placed markers. */
export function placeInRegion(regionId: string, key: string, attempt = 0): Point {
  const cells = REGION_SHAPES.filter((s) => s.id === regionId)
  const anchor = REGION_ANCHOR[regionId] ?? [WORLD_W / 2, WORLD_H / 2]
  if (!cells.length) return anchor
  let seed = 0
  for (let i = 0; i < key.length; i++) seed = (seed * 31 + key.charCodeAt(i)) >>> 0
  const cell = cells[seed % cells.length]
  const c = centroid(cell.polygon)
  for (let k = attempt; k < attempt + 14; k++) {
    const r = 0.28 + 0.5 * Math.abs(noise(seed, k, 1))
    const ang = noise(seed, k, 2) * Math.PI
    const p: Point = [
      c[0] + Math.cos(ang) * r * spread(cell.polygon, 0),
      c[1] + Math.sin(ang) * r * spread(cell.polygon, 1),
    ]
    if (pointInPolygon(p, cell.polygon)) return [Math.round(p[0]), Math.round(p[1])]
  }
  return [Math.round(c[0]), Math.round(c[1])]
}

function spread(poly: Point[], axis: 0 | 1): number {
  let min = Infinity
  let max = -Infinity
  for (const p of poly) {
    if (p[axis] < min) min = p[axis]
    if (p[axis] > max) max = p[axis]
  }
  return (max - min) / 2
}

/* ------------------------------------------------------------------ */
/* Water                                                               */
/* ------------------------------------------------------------------ */

const P = CITY_POS

export const RIVERS: RouteShape[] = [
  {
    id: 'river.north-fork',
    kind: 'river',
    weight: 2,
    path: [[1268, 372], [1236, 470], [1204, 580], [1178, 686], P[CITY.gildedAscent]],
  },
  {
    id: 'river.karst-fork',
    kind: 'river',
    weight: 2,
    path: [[812, 470], [880, 556], [966, 634], [1052, 712], P[CITY.gildedAscent]],
  },
  {
    id: 'river.shelf-fork',
    kind: 'river',
    weight: 1.6,
    path: [[1512, 690], [1416, 738], [1310, 772], [1226, 786], P[CITY.gildedAscent]],
  },
  {
    id: 'river.the-long-water',
    kind: 'river',
    weight: 3.2,
    path: [
      P[CITY.gildedAscent], [1284, 838], [1424, 892], [1566, 918], [1704, 892],
      P[CITY.blackWeir], [1946, 892], P[CITY.floatingSwamp], [2214, 1032], [2320, 1062],
    ],
  },
  {
    id: 'river.ash-run',
    kind: 'river',
    weight: 1.5,
    path: [[1002, 984], [1046, 1088], P[CITY.arenaCity], [1148, 1284], [1206, 1420], [1250, 1536]],
  },
  {
    id: 'river.olive-water',
    kind: 'river',
    weight: 1.4,
    path: [[700, 774], [618, 872], [548, 966], [486, 1046], [470, 1128]],
  },
  {
    id: 'river.cold-race',
    kind: 'river',
    weight: 1.3,
    path: [[1786, 176], [1832, 268], [1888, 372], [1950, 452], P[CITY.kethVeyra]],
  },
]

/* ------------------------------------------------------------------ */
/* Routes                                                              */
/* ------------------------------------------------------------------ */

export const ROADS: RouteShape[] = [
  { id: 'road.ascent-west', kind: 'road', weight: 3, path: [P[CITY.mediterranean], [640, 1000], [880, 880], P[CITY.gildedAscent]] },
  { id: 'road.ascent-lift', kind: 'road', weight: 3, path: [P[CITY.gildedAscent], [1268, 704], P[CITY.skyCity]] },
  { id: 'road.karst-way', kind: 'road', weight: 2, path: [P[CITY.gildedAscent], [990, 688], P[CITY.caveAgrarian]] },
  { id: 'road.upland-way', kind: 'road', weight: 2, path: [P[CITY.caveAgrarian], [878, 512], P[CITY.oruvai]] },
  { id: 'road.forest-march', kind: 'road', weight: 2, path: [P[CITY.oruvai], [854, 344], P[CITY.treeCity]] },
  { id: 'road.south-stair', kind: 'road', weight: 2.4, path: [P[CITY.gildedAscent], [1120, 950], P[CITY.arenaCity]] },
  { id: 'road.steppe-run', kind: 'road', weight: 2, path: [P[CITY.arenaCity], [1290, 1148], P[CITY.orath]] },
  { id: 'road.pan-road', kind: 'road', weight: 1.8, path: [P[CITY.orath], [1690, 1196], P[CITY.siftingCity]] },
  { id: 'road.scar-road', kind: 'road', weight: 1.8, path: [P[CITY.skyCity], [1548, 466], P[CITY.magicCity]] },
  { id: 'road.mistfall-road', kind: 'road', weight: 1.6, path: [P[CITY.magicCity], [1858, 386], P[CITY.kethVeyra]] },
  { id: 'road.weir-road', kind: 'road', weight: 2.6, path: [P[CITY.gildedAscent], [1430, 908], [1690, 896], P[CITY.blackWeir]] },
  { id: 'road.raft-road', kind: 'road', weight: 1.4, path: [P[CITY.blackWeir], [1958, 918], P[CITY.floatingSwamp]] },
]

export const SEA_LANES: RouteShape[] = [
  {
    id: 'sea.southern-reach',
    kind: 'sea',
    weight: 2,
    path: [[300, 1330], [420, 1520], [760, 1576], [1180, 1580], [1600, 1576], [1980, 1566], [2210, 1450], [2330, 1200], [2350, 1050]],
  },
  { id: 'sea.gulf-crossing', kind: 'sea', weight: 1.6, path: [[470, 1160], [380, 1250], [270, 1320], [170, 1300]] },
  { id: 'sea.mistfall-run', kind: 'sea', weight: 1.8, path: [[2340, 480], [2390, 640], [2372, 820], [2390, 980], [2350, 1050]] },
]

export const TRADE_ROUTES: RouteShape[] = [
  {
    id: 'trade.gilded-circuit',
    kind: 'trade',
    weight: 3.4,
    path: [P[CITY.gildedAscent], [1272, 700], P[CITY.skyCity], [1556, 462], P[CITY.magicCity], [1862, 390], P[CITY.kethVeyra]],
  },
  {
    id: 'trade.salt-road',
    kind: 'trade',
    weight: 2.6,
    path: [P[CITY.siftingCity], [1688, 1198], P[CITY.orath], [1294, 1146], P[CITY.arenaCity], [1118, 952], P[CITY.gildedAscent]],
  },
  {
    id: 'trade.green-line',
    kind: 'trade',
    weight: 3,
    path: [P[CITY.mediterranean], [648, 998], [884, 876], P[CITY.gildedAscent]],
  },
  {
    id: 'trade.weir-run',
    kind: 'trade',
    weight: 2.8,
    path: [P[CITY.gildedAscent], [1436, 906], [1692, 894], P[CITY.blackWeir], [1960, 916], P[CITY.floatingSwamp], [2300, 1060]],
  },
  {
    id: 'trade.timber-line',
    kind: 'trade',
    weight: 2,
    path: [P[CITY.treeCity], [858, 348], P[CITY.oruvai], [882, 516], P[CITY.caveAgrarian], [986, 690], P[CITY.gildedAscent]],
  },
]

export const SMUGGLING_ROUTES: RouteShape[] = [
  {
    id: 'smuggle.underbrace',
    kind: 'smuggling',
    weight: 1.8,
    path: [P[CITY.floatingSwamp], [1988, 1078], [1836, 1150], [1690, 1132], P[CITY.orath]],
  },
  {
    id: 'smuggle.root-way',
    kind: 'smuggling',
    weight: 1.6,
    path: [P[CITY.treeCity], [806, 396], [842, 520], P[CITY.caveAgrarian], [912, 736], [1042, 808], P[CITY.gildedAscent]],
  },
  {
    id: 'smuggle.thermal-drop',
    kind: 'smuggling',
    weight: 1.5,
    path: [P[CITY.skyCity], [1520, 742], [1638, 838], P[CITY.blackWeir]],
  },
  {
    id: 'smuggle.dry-crossing',
    kind: 'smuggling',
    weight: 1.4,
    path: [P[CITY.siftingCity], [1610, 1370], [1420, 1400], [1250, 1330], P[CITY.arenaCity]],
  },
]

export const ALL_ROUTES: RouteShape[] = [...RIVERS, ...ROADS, ...SEA_LANES, ...TRADE_ROUTES, ...SMUGGLING_ROUTES]

/* ------------------------------------------------------------------ */
/* Conflict zones                                                      */
/* ------------------------------------------------------------------ */

export const ZONES: ZoneShape[] = [
  {
    id: 'zone.greatwood-front',
    kind: 'war',
    label: 'Greatwood front',
    polygon: roughen([[792, 236], [948, 288], [1010, 402], [946, 512], [812, 512], [742, 400], [744, 300]], 10, 2),
  },
  {
    id: 'zone.weir-throat',
    kind: 'disputed',
    label: 'Contested: the throat',
    polygon: roughen([[1716, 762], [1898, 758], [1972, 860], [1902, 948], [1746, 934], [1682, 850]], 9, 2),
  },
  {
    id: 'zone.scar-core',
    kind: 'danger',
    label: 'Scar core — unsurveyed',
    polygon: roughen([[1614, 214], [1786, 208], [1876, 306], [1832, 420], [1690, 442], [1588, 356]], 12, 2),
  },
  {
    id: 'zone.deep-pans',
    kind: 'danger',
    label: 'Deep pans — no water',
    polygon: roughen([[1830, 1352], [2010, 1330], [2116, 1420], [2044, 1500], [1876, 1494], [1798, 1424]], 11, 2),
  },
  {
    id: 'zone.orath-march',
    kind: 'disputed',
    label: 'Disputed: the dry march',
    polygon: roughen([[1392, 1044], [1548, 990], [1668, 1058], [1636, 1174], [1470, 1198], [1382, 1136]], 10, 2),
  },
  {
    id: 'zone.cinder-raids',
    kind: 'danger',
    label: 'Raided road',
    polygon: roughen([[1218, 1244], [1372, 1226], [1444, 1330], [1358, 1414], [1214, 1396], [1164, 1318]], 9, 2),
  },
]

/* ------------------------------------------------------------------ */
/* Biome palette                                                       */
/* ------------------------------------------------------------------ */

export interface BiomePaint {
  color: string
  paper: string
  motif: string
  label: string
}

export const BIOME_PAINT: Record<string, BiomePaint> = {
  [REGION.borealCrown]: { color: '#3f5a55', paper: '#b7c4b2', motif: 'conifer', label: 'Taiga' },
  [REGION.ironback]: { color: '#5c5a58', paper: '#d0c5b3', motif: 'peak', label: 'Alpine' },
  [REGION.greatwood]: { color: '#3d5a3a', paper: '#b4c69a', motif: 'forest', label: 'Temperate forest' },
  [REGION.hollowKarst]: { color: '#77705c', paper: '#e0d8be', motif: 'karst', label: 'Limestone karst' },
  [REGION.ascentBasin]: { color: '#6f7845', paper: '#d9d9a6', motif: 'grass', label: 'River grassland' },
  [REGION.anvilShelf]: { color: '#6a6a5a', paper: '#cbc6ac', motif: 'scrub', label: 'Windswept highland' },
  [REGION.meridianCoast]: { color: '#7e8b47', paper: '#cfd694', motif: 'olive', label: 'Mediterranean' },
  [REGION.ashenSteppe]: { color: '#8a7d55', paper: '#dfd09e', motif: 'scrub', label: 'Dry steppe' },
  [REGION.cinderWaste]: { color: '#9c7a4d', paper: '#e4c892', motif: 'dune', label: 'Desert' },
  [REGION.whitePans]: { color: '#b6ab8c', paper: '#f1edda', motif: 'salt', label: 'Salt pan' },
  [REGION.theDrown]: { color: '#4a5c48', paper: '#aac4a2', motif: 'marsh', label: 'Delta marsh' },
  [REGION.mistfallCoast]: { color: '#54666b', paper: '#c0cbc3', motif: 'conifer', label: 'Cold coast' },
  [REGION.aethericScar]: { color: '#5a5170', paper: '#d0bfc7', motif: 'ash', label: 'Anomaly' },
  [REGION.meridianGulf]: { color: '#2e4a5a', paper: '#aebfbd', motif: 'none', label: 'Warm sea' },
  [REGION.easternDeep]: { color: '#233b4a', paper: '#a3b5b6', motif: 'none', label: 'Ocean' },
}

/** Sea labels are placed by hand; the water is everything outside `LAND`. */
export const SEA_LABELS: { id: string; at: Point; name: string; rotate?: number }[] = [
  { id: REGION.meridianGulf, at: [300, 1180], name: 'The Meridian Gulf', rotate: -18 },
  { id: REGION.easternDeep, at: [2280, 700], name: 'The Eastern Deep', rotate: 78 },
]
