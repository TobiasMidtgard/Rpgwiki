/**
 * Square emblems for roster cards.
 *
 * The banner art is composed for a 6:1 band and turns to mush when cropped to a
 * tile, so tiles get their own drawings: one compact motif per family of entry,
 * seeded from the id so two creatures never look alike and the same creature
 * looks the same everywhere. Settlements borrow the crest already drawn for
 * them, because a city's identity is established art and should not be
 * restated in a second style.
 */

import { useId } from 'react'
import type { EntityType } from '../core/types'
import { ACCENT } from './banner'
import { CityCrest } from './vista'

const S = 64

function rng(seed: string) {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return () => {
    h ^= h << 13
    h ^= h >>> 17
    h ^= h << 5
    h >>>= 0
    return h / 4294967296
  }
}

type Draw = (r: () => number, accent: string) => React.ReactNode

/** Rooflines: a skyline of blocks with a taller feature somewhere in it. */
const built: Draw = (r, a) => {
  const bars = []
  const n = 5
  const feature = Math.floor(r() * n)
  for (let i = 0; i < n; i++) {
    const w = S / n
    const x = i * w
    const h = i === feature ? 30 + r() * 16 : 12 + r() * 16
    bars.push(<rect key={i} x={x + 1.5} y={S - 8 - h} width={w - 3} height={h} fill={a} opacity={0.24 + r() * 0.3} />)
    if (i === feature) bars.push(<rect key={`p${i}`} x={x + w / 2 - 1} y={S - 8 - h - 8} width={2} height={8} fill={a} opacity={0.7} />)
  }
  bars.push(<rect key="ground" x={0} y={S - 8} width={S} height={1.5} fill={a} opacity={0.5} />)
  return bars
}

/** A standing figure inside a seal — people and the faiths they keep. */
const figure: Draw = (r, a) => (
  <>
    <circle cx={S / 2} cy={S / 2} r={24} fill="none" stroke={a} strokeWidth={1.2} opacity={0.35} />
    <circle cx={S / 2} cy={S / 2} r={20} fill="none" stroke={a} strokeWidth={0.8} opacity={0.2} />
    <circle cx={S / 2} cy={26} r={6} fill={a} opacity={0.55} />
    <path d={`M${S / 2 - 10},${S - 16} q${10},${-16} ${20},0 Z`} fill={a} opacity={0.45} />
    {Array.from({ length: 12 }, (_, i) => {
      const ang = (i / 12) * Math.PI * 2 + r() * 0.1
      return (
        <line
          key={i}
          x1={S / 2 + Math.cos(ang) * 26}
          y1={S / 2 + Math.sin(ang) * 26}
          x2={S / 2 + Math.cos(ang) * 29}
          y2={S / 2 + Math.sin(ang) * 29}
          stroke={a}
          strokeWidth={1.2}
          opacity={0.3}
        />
      )
    })}
  </>
)

/** A body with limbs and a spine — enough to read as alive, not as a species. */
const beast: Draw = (r, a) => {
  const cy = 34 + r() * 4
  const legs = []
  for (let i = 0; i < 4; i++) {
    const x = 18 + i * 9
    legs.push(<line key={i} x1={x} y1={cy + 5} x2={x - 2 + r() * 4} y2={cy + 16} stroke={a} strokeWidth={1.6} opacity={0.5} />)
  }
  return (
    <>
      <ellipse cx={S / 2} cy={cy} rx={17} ry={8 + r() * 3} fill={a} opacity={0.4} />
      <circle cx={16} cy={cy - 5} r={5.5} fill={a} opacity={0.55} />
      <path d={`M${16 - 3},${cy - 10} l${-2},${-6}`} stroke={a} strokeWidth={1.4} opacity={0.5} />
      <path d={`M${16 + 2},${cy - 10} l${1},${-7}`} stroke={a} strokeWidth={1.4} opacity={0.5} />
      <path d={`M${S / 2 + 16},${cy - 2} q${10},${-4} ${12},${-14}`} fill="none" stroke={a} strokeWidth={1.6} opacity={0.45} />
      {legs}
    </>
  )
}

/** A stem with leaves — crops, forage, anything that grows where it stands. */
const plant: Draw = (r, a) => {
  const leaves = []
  for (let i = 0; i < 4; i++) {
    const y = 44 - i * 8
    const dir = i % 2 === 0 ? 1 : -1
    const len = 10 + r() * 6
    leaves.push(
      <path
        key={i}
        d={`M${S / 2},${y} q${dir * len * 0.6},${-5} ${dir * len},${-1} q${-dir * len * 0.5},${5} ${-dir * len},${1} Z`}
        fill={a}
        opacity={0.34 + r() * 0.2}
      />,
    )
  }
  return (
    <>
      <path d={`M${S / 2},${S - 10} C${S / 2 - 3},44 ${S / 2 + 3},32 ${S / 2},16`} fill="none" stroke={a} strokeWidth={1.8} opacity={0.55} />
      {leaves}
      <circle cx={S / 2} cy={14} r={3.4} fill={a} opacity={0.6} />
      <line x1={14} y1={S - 10} x2={S - 14} y2={S - 10} stroke={a} strokeWidth={1.2} opacity={0.4} />
    </>
  )
}

/** Faceted crystal over bedding lines — ore, stone, whatever the ground gives. */
const mineral: Draw = (r, a) => {
  const shards = []
  for (let i = 0; i < 3; i++) {
    const x = 16 + i * 14 + r() * 4
    const h = 20 + r() * 20
    shards.push(
      <path key={i} d={`M${x},${S - 14} L${x + 5},${S - 14 - h} L${x + 12},${S - 14 - h + 7} L${x + 15},${S - 14} Z`} fill={a} opacity={0.26 + i * 0.14} />,
    )
    shards.push(<line key={`e${i}`} x1={x + 5} y1={S - 14 - h} x2={x + 8} y2={S - 14} stroke={a} strokeWidth={0.8} opacity={0.4} />)
  }
  return (
    <>
      {shards}
      {[0, 1, 2].map((i) => (
        <line key={`b${i}`} x1={6} y1={S - 12 + i * 4} x2={S - 6} y2={S - 12 + i * 4 + (r() - 0.5) * 3} stroke={a} strokeWidth={1} opacity={0.3 - i * 0.07} />
      ))}
    </>
  )
}

/** A toothed wheel on a shaft. */
const gear: Draw = (r, a) => {
  const cx = S / 2
  const cy = S / 2
  const rad = 17
  const teeth = 9
  const d: string[] = []
  for (let t = 0; t < teeth; t++) {
    const a0 = (t / teeth) * Math.PI * 2
    const a1 = ((t + 0.5) / teeth) * Math.PI * 2
    d.push(`${t === 0 ? 'M' : 'L'}${cx + Math.cos(a0) * rad},${cy + Math.sin(a0) * rad}`)
    d.push(`L${cx + Math.cos(a1) * (rad * 1.24)},${cy + Math.sin(a1) * (rad * 1.24)}`)
  }
  return (
    <>
      <path d={`${d.join('')}Z`} fill="none" stroke={a} strokeWidth={1.8} opacity={0.5} />
      <circle cx={cx} cy={cy} r={6} fill="none" stroke={a} strokeWidth={1.5} opacity={0.5} />
      <line x1={0} y1={cy} x2={S} y2={cy} stroke={a} strokeWidth={0.9} opacity={0.2 + r() * 0.1} />
    </>
  )
}

/** A pennant on a staff. */
const banner: Draw = (r, a) => (
  <>
    <line x1={20} y1={8} x2={20} y2={S - 8} stroke={a} strokeWidth={2} opacity={0.55} />
    <path d={`M20,10 L${48 + r() * 6},14 L${42},26 L${48 + r() * 6},38 L20,34 Z`} fill={a} opacity={0.4} />
    <circle cx={20} cy={7} r={2.6} fill={a} opacity={0.7} />
  </>
)

/** A path that forks — the shape of a quest. */
const fork: Draw = (r, a) => {
  const y = 32
  return (
    <>
      <path d={`M6,${y} C20,${y} 22,${14 + r() * 6} 40,${14 + r() * 6}`} fill="none" stroke={a} strokeWidth={1.8} opacity={0.5} />
      <path d={`M6,${y} C20,${y} 22,${46 - r() * 6} 40,${46 - r() * 6}`} fill="none" stroke={a} strokeWidth={1.4} opacity={0.32} strokeDasharray="4 4" />
      <circle cx={6} cy={y} r={4} fill={a} opacity={0.65} />
      <circle cx={46} cy={16} r={3.2} fill={a} opacity={0.5} />
      <circle cx={46} cy={45} r={3.2} fill="none" stroke={a} strokeWidth={1.3} opacity={0.45} />
    </>
  )
}

/** Nested ward polygons. */
const ward: Draw = (_r, a) => (
  <>
    {[3, 5, 7].map((n, i) => {
      const pts: string[] = []
      for (let k = 0; k <= n; k++) {
        const ang = (k / n) * Math.PI * 2 - Math.PI / 2
        pts.push(`${S / 2 + Math.cos(ang) * (10 + i * 8)},${S / 2 + Math.sin(ang) * (10 + i * 8)}`)
      }
      return <polyline key={n} points={pts.join(' ')} fill="none" stroke={a} strokeWidth={1.3} opacity={0.42 - i * 0.08} />
    })}
  </>
)

/** A small connected lattice. */
const lattice: Draw = (r, a) => {
  const nodes: [number, number][] = Array.from({ length: 7 }, () => [8 + r() * (S - 16), 8 + r() * (S - 16)])
  const lines = []
  for (let i = 0; i < nodes.length; i++)
    for (let j = i + 1; j < nodes.length; j++) {
      const d = Math.hypot(nodes[i][0] - nodes[j][0], nodes[i][1] - nodes[j][1])
      if (d < 26) lines.push(<line key={`${i}-${j}`} x1={nodes[i][0]} y1={nodes[i][1]} x2={nodes[j][0]} y2={nodes[j][1]} stroke={a} strokeWidth={1} opacity={0.35} />)
    }
  return (
    <>
      {lines}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3} fill={a} opacity={0.55} />
      ))}
    </>
  )
}

/** A held object on a stand — the generic "thing you can carry". */
const object: Draw = (r, a) => (
  <>
    <path d={`M${S / 2},12 L${S / 2 + 13},24 L${S / 2 + 9},44 L${S / 2 - 9},44 L${S / 2 - 13},24 Z`} fill={a} opacity={0.34} />
    <path d={`M${S / 2},12 L${S / 2},44`} stroke={a} strokeWidth={1.1} opacity={0.45} />
    <path d={`M${S / 2 - 13},24 L${S / 2 + 13},24`} stroke={a} strokeWidth={1.1} opacity={0.4} />
    <ellipse cx={S / 2} cy={50} rx={12 + r() * 3} ry={3} fill={a} opacity={0.2} />
  </>
)

/** Stacked contour lines — land, and anything without a better emblem. */
const contour: Draw = (r, a) => (
  <>
    {Array.from({ length: 6 }, (_, i) => {
      const y = 12 + i * 8
      const pts = [`M2,${y}`]
      for (let x = 14; x <= S; x += 14) pts.push(`Q${x - 7},${y + (r() - 0.5) * 10} ${x},${y + (r() - 0.5) * 6}`)
      return <path key={i} d={pts.join(' ')} fill="none" stroke={a} strokeWidth={1.2} opacity={0.4 - i * 0.04} />
    })}
  </>
)

/** Stacked billets — material that was made rather than found. */
const ingot: Draw = (r, a) => {
  const rows = []
  for (let i = 0; i < 3; i++) {
    const n = 3 - i
    const w = 15
    for (let k = 0; k < n; k++) {
      const x = S / 2 - (n * w) / 2 + k * w
      const y = 44 - i * 9
      rows.push(
        <path key={`${i}-${k}`} d={`M${x + 2},${y} L${x + w - 2},${y} L${x + w - 4},${y + 8} L${x + 4},${y + 8} Z`} fill={a} opacity={0.28 + i * 0.14 + r() * 0.06} />,
      )
    }
  }
  return (
    <>
      {rows}
      <line x1={10} y1={53} x2={S - 10} y2={53} stroke={a} strokeWidth={1.2} opacity={0.4} />
    </>
  )
}

/** A stoppered jar — preserved, prepared, poured. */
const vessel: Draw = (r, a) => (
  <>
    <rect x={S / 2 - 5} y={12} width={10} height={6} fill={a} opacity={0.5} />
    <path d={`M${S / 2 - 12},22 q0,-4 ${7},-4 L${S / 2 + 5},18 q${7},0 ${7},4 L${S / 2 + 13},44 q0,6 ${-7},6 L${S / 2 - 6},50 q${-7},0 ${-7},-6 Z`} fill={a} opacity={0.3} />
    <path d={`M${S / 2 - 12},${34 + r() * 4} q${12},${-3} ${25},0 L${S / 2 + 13},44 q0,6 ${-7},6 L${S / 2 - 6},50 q${-7},0 ${-7},-6 Z`} fill={a} opacity={0.34} />
    <ellipse cx={S / 2} cy={22} rx={12} ry={3.2} fill="none" stroke={a} strokeWidth={1.2} opacity={0.5} />
  </>
)

export type Motif =
  | 'built'
  | 'figure'
  | 'beast'
  | 'plant'
  | 'mineral'
  | 'ingot'
  | 'vessel'
  | 'gear'
  | 'banner'
  | 'fork'
  | 'ward'
  | 'lattice'
  | 'object'
  | 'contour'

const DRAW: Record<Motif, Draw> = {
  built,
  figure,
  beast,
  plant,
  mineral,
  ingot,
  vessel,
  gear,
  banner,
  fork,
  ward,
  lattice,
  object,
  contour,
}

const BY_TYPE: Partial<Record<EntityType, Motif>> = {
  district: 'built',
  landmark: 'built',
  site: 'built',
  npc: 'figure',
  religion: 'figure',
  creature: 'beast',
  food: 'plant',
  material: 'mineral',
  deposit: 'mineral',
  machine: 'gear',
  recipe: 'gear',
  faction: 'banner',
  war: 'banner',
  quest: 'fork',
  spell: 'ward',
  skill: 'lattice',
  mechanic: 'lattice',
  item: 'object',
  region: 'contour',
  route: 'contour',
  event: 'contour',
  note: 'contour',
}

/**
 * Which emblem an entry earns.
 *
 * Type alone is too coarse where one type covers several kinds of thing:
 * `material` spans timber, ore and cast bronze, and drawing all three as a
 * crystal makes the roster a wall of identical tiles. Where the entry's own
 * schema records a classification, that decides the motif — so the picture
 * agrees with the label under it.
 */
export function motifFor(e: { type: EntityType; fields: Record<string, unknown> }): Motif {
  const str = (k: string) => (typeof e.fields[k] === 'string' ? (e.fields[k] as string) : '')
  const has = (k: string) => Array.isArray(e.fields[k]) && (e.fields[k] as unknown[]).length > 0

  if (e.type === 'material') {
    const origin = str('origin')
    if (origin === 'Biological') return has('sourceCreature') ? 'beast' : 'plant'
    if (origin === 'Natural') return 'mineral'
    return 'ingot'
  }
  if (e.type === 'food') {
    const kind = str('foodType')
    if (kind === 'Livestock') return 'beast'
    if (['Preserved', 'Prepared', 'Drink'].includes(kind)) return 'vessel'
    return 'plant'
  }
  return BY_TYPE[e.type] ?? 'contour'
}

export function EntityThumb({ type, id, size = 56, motif }: { type: EntityType; id: string; size?: number; motif?: Motif }) {
  const uid = useId().replace(/:/g, '')
  if (type === 'city') return <CityCrest id={id} size={size} />

  const accent = ACCENT[type] ?? '#8a8069'
  const draw = DRAW[motif ?? BY_TYPE[type] ?? 'contour']
  const r = rng(`${type}:${id}`)

  return (
    <svg viewBox={`0 0 ${S} ${S}`} width={size} height={size} className="thumb-svg" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`tb-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#181b1f" />
          <stop offset="100%" stopColor="#0e1013" />
        </linearGradient>
      </defs>
      <rect width={S} height={S} fill={`url(#tb-${uid})`} />
      {draw(r, accent)}
      <rect width={S} height={S} fill="none" stroke={accent} strokeWidth={1.5} opacity={0.4} />
    </svg>
  )
}
