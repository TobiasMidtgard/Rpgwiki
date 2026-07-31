/**
 * Skill trees.
 *
 * One tree at a time, drawn on the col/row grid carried by `skill.fields.node`
 * (see `SkillNode` in the seed kit). Prerequisite links come from two places —
 * `node.requires` and `prerequisite_of` relations — and are folded together so
 * an author can use either. A prerequisite that lives in a different tree is
 * off-screen by definition, so it is drawn as a labelled inbound stub instead
 * of a line to nowhere.
 *
 * The page has two modes. Reading is the default. Planning turns the tree into
 * a build sheet: clicking a node buys a rank, prerequisites are enforced, cost
 * is counted against a budget, and two builds can be held side by side and
 * diffed. Builds are kept in localStorage, not in the world file — they are a
 * reader's scratch pad, not canon.
 *
 * Everything here is authored by hand and half-finished by design, so the
 * payload is validated before it is indexed and anything unusable degrades
 * into a visible gap rather than a crash.
 */

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { EntityLink } from '../components/EntityLink'
import { Dialog, EmptyState, StatusBadge, TypeGlyph, confirmAction, toast, useLocalState } from '../components/ui'
import { buildIndex, entitiesOfType, sourcesOf } from '../core/relations'
import { SCHEMAS } from '../core/schema'
import { useWorld } from '../core/store'
import type { Entity, EntityType, TableRow } from '../core/types'
import { isTbd } from '../core/types'

/* ------------------------------------------------------------------ */
/* Geometry                                                            */
/* ------------------------------------------------------------------ */

const NW = 152
const NH = 64
const GAP_X = 104
const GAP_Y = 44
const PITCH_X = NW + GAP_X
const PITCH_Y = NH + GAP_Y
const PAD_TOP = 58
const PAD_BOTTOM = 42
/** Left margin. Widened when a column-0 node needs room for inbound stubs. */
const PAD_X_PLAIN = 44
const PAD_X_STUB = 112
/** Character budget per name line at 11.5px inside a 136px box. */
const NAME_WRAP = [19, 19]

const MIN_ZOOM = 0.3
const MAX_ZOOM = 2.2

/* ------------------------------------------------------------------ */
/* Colour                                                              */
/* ------------------------------------------------------------------ */

/** Branch colours. Assigned in order within a tree, so they never shuffle. */
const PALETTE = [
  'var(--brass)',
  'var(--t-quest)',
  'var(--verd-lit)',
  'var(--violet)',
  'var(--amber)',
  'var(--steel)',
  'var(--t-food)',
  'var(--t-religion)',
  'var(--t-creature)',
  'var(--t-npc)',
]

/** Stable index from a name, so a foreign tree keeps its colour everywhere. */
function hashIndex(s: string, n: number): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return n > 0 ? h % n : 0
}

const treeColour = (name: string) => PALETTE[hashIndex(name, PALETTE.length)]

/** Legality that changes how a node is drawn: tag plus keyline colour. */
const LEGALITY_TAG: Record<string, { tag: string; colour: string }> = {
  Outlawed: { tag: 'OUTLAWED', colour: 'var(--crimson-lit)' },
  Regulated: { tag: 'REGULATED', colour: 'var(--amber)' },
  'Varies by city': { tag: 'VARIES', colour: 'var(--steel)' },
}

/* ------------------------------------------------------------------ */
/* Reading the data                                                    */
/* ------------------------------------------------------------------ */

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

const str = (v: unknown): string => (typeof v === 'string' ? v.trim() : '')

function numOr(v: unknown, fallback: number): number {
  if (typeof v === 'number' && Number.isFinite(v)) return v
  if (typeof v === 'string' && v.trim()) {
    const n = Number(v)
    if (Number.isFinite(n)) return n
  }
  return fallback
}

function intIn(v: unknown, lo: number, hi: number, fallback: number): number {
  const n = numOr(v, fallback)
  return Math.max(lo, Math.min(hi, Math.round(n)))
}

function strList(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string' && !!x.trim()).map((x) => x.trim()) : []
}

function rowList(v: unknown): TableRow[] {
  if (!Array.isArray(v)) return []
  const out: TableRow[] = []
  for (const r of v) {
    if (!isRecord(r)) continue
    const clean: TableRow = {}
    for (const [k, val] of Object.entries(r)) if (typeof val === 'string') clean[k] = val
    if (Object.keys(clean).length) out.push(clean)
  }
  return out
}

const truthy = (v: unknown): boolean => v === true || v === 'true' || v === 'yes' || v === 1

interface ParsedNode {
  tree: string
  branch: string
  col: number | null
  row: number | null
  requires: string[]
}

function readNode(raw: unknown): ParsedNode | null {
  if (!isRecord(raw)) return null
  const hasCol = raw.col !== undefined && raw.col !== null
  const hasRow = raw.row !== undefined && raw.row !== null
  return {
    tree: str(raw.tree),
    branch: str(raw.branch),
    col: hasCol ? intIn(raw.col, -200, 200, 0) : null,
    row: hasRow ? intIn(raw.row, -200, 200, 0) : null,
    requires: strList(raw.requires),
  }
}

interface Skill {
  e: Entity
  tree: string
  branch: string
  col: number
  row: number
  /** True when the grid position was authored rather than inferred from tier. */
  placed: boolean
  requires: string[]
  skillType: string
  legality: string
  tier: number | null
  cost: number
  maxRank: number
  hybridField: boolean
  haystack: string
}

const UNFILED_TREE = 'Unfiled'
const UNFILED_BRANCH = 'No branch'

function readSkill(e: Entity): Skill {
  const node = readNode(e.fields.node)
  const tierRaw = e.fields.tier
  const tier = typeof tierRaw === 'number' && Number.isFinite(tierRaw) ? tierRaw : null
  const fallbackCol = tier !== null ? Math.max(0, Math.round(tier) - 1) : 0
  const haystack = [
    e.name,
    e.summary ?? '',
    (e.aka ?? []).join(' '),
    e.tags.join(' '),
    str(e.fields.branch),
    str(e.fields.tree),
    str(e.fields.effect),
    str(e.fields.overview),
    node?.branch ?? '',
    node?.tree ?? '',
  ]
    .join(' ')
    .toLowerCase()

  return {
    e,
    tree: node?.tree || str(e.fields.tree) || UNFILED_TREE,
    branch: node?.branch || str(e.fields.branch) || UNFILED_BRANCH,
    col: node?.col ?? fallbackCol,
    row: node?.row ?? 0,
    placed: node?.col !== null && node?.col !== undefined && node?.row !== null && node?.row !== undefined,
    requires: node?.requires ?? [],
    skillType: str(e.fields.skillType),
    legality: str(e.fields.legality),
    tier,
    cost: Math.max(0, Math.min(999, numOr(e.fields.cost, 1))),
    maxRank: intIn(e.fields.maxRank, 1, 12, 1),
    hybridField: truthy(e.fields.hybrid),
    haystack,
  }
}

/** A skill's prerequisites, split by what they actually resolve to. */
interface Reqs {
  /** Live skill entries. These are what the planner gates on. */
  skills: string[]
  /** Entries that exist but are not skills — shown, never gated on. */
  others: string[]
  /** Ids that name nothing at all. */
  broken: string[]
}

const EMPTY_REQS: Reqs = { skills: [], others: [], broken: [] }

/* ------------------------------------------------------------------ */
/* Text                                                                */
/* ------------------------------------------------------------------ */

/** Word wrap with a per-line character budget. Deterministic, no measuring. */
function wrapLabel(text: string, budgets: number[]): string[] {
  const words = text.split(/\s+/).filter(Boolean)
  if (!words.length) return ['']
  const lines: string[] = []
  let i = 0
  for (let l = 0; l < budgets.length && i < words.length; l++) {
    const max = budgets[l]
    let line = ''
    while (i < words.length) {
      const next = line ? `${line} ${words[i]}` : words[i]
      if (next.length > max) {
        if (line) break
        line = `${words[i].slice(0, Math.max(1, max - 1))}…`
        i++
        break
      }
      line = next
      i++
    }
    lines.push(line)
  }
  if (i < words.length && lines.length) {
    const last = lines.length - 1
    let s = lines[last]
    while (s.length > budgets[last] - 1 && s.length > 1) s = s.slice(0, -1)
    lines[last] = `${s.replace(/[\s,;:.]+$/, '')}…`
  }
  return lines
}

function clip(s: string, n: number): string {
  return s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s
}

function fmtNum(n: number): string {
  return Number.isInteger(n) ? String(n) : String(Math.round(n * 100) / 100)
}

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

interface Placed {
  s: Skill
  x: number
  y: number
  lines: string[]
  colKey: number
}

interface LEdge {
  key: string
  from: string
  to: string
  d: string
}

interface Stub {
  key: string
  to: string
  /** Line runs from (x1, y) to (x2, y); the label ends just left of x1. */
  x1: number
  x2: number
  y: number
  label: string
  colour: string
}

/** Stub line length and label budget, sized to stay inside one column gap. */
const STUB_LEN = 32
const STUB_LABEL_MAX = 11

interface TreeLayout {
  nodes: Placed[]
  byId: Map<string, Placed>
  edges: LEdge[]
  stubs: Stub[]
  columns: { x: number; label: string }[]
  branches: { name: string; colour: string; count: number }[]
  colourOf: Map<string, string>
  w: number
  h: number
}

/** Compact authored coordinates, keeping a half-step where the author left a gap. */
function axisMap(values: number[]): Map<number, number> {
  const sorted = [...new Set(values)].sort((a, b) => a - b)
  const m = new Map<number, number>()
  let pos = 0
  sorted.forEach((v, i) => {
    if (i > 0) pos += v - sorted[i - 1] > 1 ? 1.5 : 1
    m.set(v, pos)
  })
  return m
}

function layoutTree(
  tree: string,
  all: Skill[],
  prereqs: Map<string, Reqs>,
  skillById: Map<string, Skill>,
  entityName: (id: string) => string | null,
): TreeLayout {
  const members = all.filter((s) => s.tree === tree)

  const branchNames = [...new Set(members.map((s) => s.branch))].sort((a, b) => a.localeCompare(b))
  const colourOf = new Map<string, string>(branchNames.map((b, i) => [b, PALETTE[i % PALETTE.length]]))
  const branches = branchNames.map((name) => ({
    name,
    colour: colourOf.get(name) ?? PALETTE[0],
    count: members.filter((s) => s.branch === name).length,
  }))

  // Authored positions are honoured first; inferred ones fill the gaps after,
  // so hand-placed nodes never move because of a node nobody placed.
  const order = [...members].sort((a, b) => {
    if (a.placed !== b.placed) return a.placed ? -1 : 1
    if (a.col !== b.col) return a.col - b.col
    if (a.row !== b.row) return a.row - b.row
    return a.e.name.localeCompare(b.e.name)
  })

  const taken = new Set<string>()
  const cells = new Map<string, { col: number; row: number }>()
  for (const s of order) {
    let row = s.row
    while (taken.has(`${s.col}|${row}`)) row++
    taken.add(`${s.col}|${row}`)
    cells.set(s.e.id, { col: s.col, row })
  }

  const colMap = axisMap([...cells.values()].map((c) => c.col))
  const rowMap = axisMap([...cells.values()].map((c) => c.row))

  // Column 0 only needs a wide left margin if something there has an off-tree
  // prerequisite that has to be drawn as a stub.
  const firstCol = Math.min(...[...cells.values()].map((c) => c.col), 0)
  const needsWideLeft = members.some((s) => {
    const cell = cells.get(s.e.id)
    if (!cell || cell.col !== firstCol) return false
    const r = prereqs.get(s.e.id) ?? EMPTY_REQS
    return (
      r.broken.length > 0 ||
      r.others.length > 0 ||
      r.skills.some((p) => (skillById.get(p)?.tree ?? tree) !== tree)
    )
  })
  const padX = needsWideLeft ? PAD_X_STUB : PAD_X_PLAIN

  const nodes: Placed[] = []
  for (const s of members) {
    const cell = cells.get(s.e.id)
    if (!cell) continue
    nodes.push({
      s,
      x: padX + (colMap.get(cell.col) ?? 0) * PITCH_X,
      y: PAD_TOP + (rowMap.get(cell.row) ?? 0) * PITCH_Y,
      lines: wrapLabel(s.e.name, NAME_WRAP),
      colKey: cell.col,
    })
  }
  nodes.sort((a, b) => a.x - b.x || a.y - b.y)

  const byId = new Map(nodes.map((n) => [n.s.e.id, n]))

  // Column captions: a tier number when the column agrees on one, else a count.
  const columns: { x: number; label: string }[] = []
  for (const colValue of [...new Set(nodes.map((n) => n.colKey))].sort((a, b) => a - b)) {
    const inCol = nodes.filter((n) => n.colKey === colValue)
    const tiers = [...new Set(inCol.map((n) => n.s.tier).filter((t): t is number => t !== null))]
    columns.push({
      x: inCol[0]?.x ?? padX,
      label: tiers.length === 1 ? `TIER ${fmtNum(tiers[0])}` : `COLUMN ${columns.length + 1}`,
    })
  }

  const edges: LEdge[] = []
  const stubs: Stub[] = []

  for (const n of nodes) {
    const r = prereqs.get(n.s.e.id) ?? EMPTY_REQS
    const foreign: { label: string; colour: string; key: string }[] = []
    let sameTreeIn = 0

    for (const p of r.skills) {
      const src = byId.get(p)
      if (src) {
        edges.push({ key: `${p}->${n.s.e.id}`, from: p, to: n.s.e.id, d: edgePath(src, n) })
        sameTreeIn++
        continue
      }
      const other = skillById.get(p)
      const otherTree = other?.tree ?? UNFILED_TREE
      foreign.push({ key: p, label: otherTree, colour: treeColour(otherTree) })
    }
    for (const p of r.others) {
      foreign.push({ key: p, label: entityName(p) ?? p, colour: 'var(--text-3)' })
    }
    for (const p of r.broken) {
      foreign.push({ key: p, label: 'missing entry', colour: 'var(--crimson)' })
    }
    if (!foreign.length) continue

    // Stubs stack from the top of the node down, leaving the middle free when a
    // same-tree edge already arrives there.
    const shown = foreign.slice(0, 3)
    const rows = shown.length + (foreign.length > shown.length ? 1 : 0)
    const first = sameTreeIn > 0 ? n.y + 12 : n.y + NH / 2 - ((rows - 1) * 13) / 2
    const labels = [
      ...shown.map((f) => ({ key: f.key, label: clip(f.label, STUB_LABEL_MAX), colour: f.colour })),
      ...(foreign.length > shown.length
        ? [{ key: 'more', label: `+${foreign.length - shown.length} more`, colour: 'var(--text-4)' }]
        : []),
    ]
    labels.forEach((f, i) => {
      stubs.push({
        key: `${n.s.e.id}<-${f.key}`,
        to: n.s.e.id,
        x1: n.x - 4 - STUB_LEN,
        x2: n.x - 4,
        y: first + i * 13,
        label: f.label,
        colour: f.colour,
      })
    })
  }

  const maxX = nodes.reduce((m, n) => Math.max(m, n.x + NW), padX + NW)
  const maxY = nodes.reduce((m, n) => Math.max(m, n.y + NH), PAD_TOP + NH)

  return {
    nodes,
    byId,
    edges,
    stubs,
    columns,
    branches,
    colourOf,
    w: maxX + PAD_X_PLAIN,
    h: maxY + PAD_BOTTOM,
  }
}

/** Prerequisite → dependent. Direction is carried by the arrowhead at the end. */
function edgePath(s: Placed, t: Placed): string {
  const scy = s.y + NH / 2
  const tcy = t.y + NH / 2
  if (t.x > s.x) {
    const sx = s.x + NW
    const dx = Math.max(26, (t.x - sx) * 0.5)
    return `M ${sx} ${scy} C ${sx + dx} ${scy}, ${t.x - dx} ${tcy}, ${t.x} ${tcy}`
  }
  if (t.x === s.x) {
    const cx = s.x + NW / 2
    const down = t.y > s.y
    const sy = down ? s.y + NH : s.y
    const ty = down ? t.y : t.y + NH
    const dy = Math.max(16, Math.abs(ty - sy) * 0.4) * (down ? 1 : -1)
    return `M ${cx} ${sy} C ${cx} ${sy + dy}, ${cx} ${ty - dy}, ${cx} ${ty}`
  }
  // Backwards: bow out to the left so the line does not hide under the nodes.
  const bow = 46
  return `M ${s.x} ${scy} C ${s.x - bow} ${scy}, ${t.x + NW + bow} ${tcy}, ${t.x + NW} ${tcy}`
}

/* ------------------------------------------------------------------ */
/* Build state                                                         */
/* ------------------------------------------------------------------ */

type Slot = 'a' | 'b'
type Ranks = Record<string, number>

interface BuildState {
  a: Ranks
  b: Ranks
  budget: number
  slot: Slot
}

const DEFAULT_BUILD: BuildState = { a: {}, b: {}, budget: 24, slot: 'a' }

function readRanks(v: unknown): Ranks {
  if (!isRecord(v)) return {}
  const out: Ranks = {}
  for (const [k, n] of Object.entries(v)) {
    const r = numOr(n, 0)
    if (k && Number.isFinite(r) && r >= 1) out[k] = Math.min(12, Math.round(r))
  }
  return out
}

/** localStorage is user territory; never trust what comes back out of it. */
function normaliseBuild(raw: unknown): BuildState {
  if (!isRecord(raw)) return DEFAULT_BUILD
  return {
    a: readRanks(raw.a),
    b: readRanks(raw.b),
    budget: intIn(raw.budget, 0, 9999, DEFAULT_BUILD.budget),
    slot: raw.slot === 'b' ? 'b' : 'a',
  }
}

const otherSlot = (s: Slot): Slot => (s === 'a' ? 'b' : 'a')
const slotName = (s: Slot) => (s === 'a' ? 'A' : 'B')

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

function FieldText({ e, k }: { e: Entity; k: string }) {
  const v = e.fields[k]
  if (isTbd(v)) {
    return (
      <span className="tbd-tag" title={v.q ?? 'Undecided'}>
        TBD
      </span>
    )
  }
  if (typeof v === 'string' && v.trim()) return <>{v}</>
  if (typeof v === 'number' && Number.isFinite(v)) return <>{fmtNum(v)}</>
  return <span className="dimmer">&mdash;</span>
}

function RankPips({ max, filled, x, y }: { max: number; filled: number; x: number; y: number }) {
  if (max <= 1) return null
  if (max > 6) {
    return (
      <text className="sk-cap" x={x} y={y + 7} textAnchor="end">
        {filled}/{max}
      </text>
    )
  }
  return (
    <g>
      {Array.from({ length: max }, (_, i) => (
        <rect
          key={i}
          x={x - (max - i) * 10 + 3}
          y={y}
          width={7}
          height={7}
          fill={i < filled ? 'var(--brass-lit)' : 'none'}
          stroke={i < filled ? 'var(--brass-lit)' : 'var(--line-strong)'}
          strokeWidth={1}
        />
      ))}
    </g>
  )
}

interface NodeProps {
  p: Placed
  colour: string
  joint: string | null
  dim: boolean
  selected: boolean
  planning: boolean
  rank: number
  locked: boolean
  hatchId: string
  onSelect: (id: string) => void
  onFocusNode: (p: Placed) => void
}

function SkillNodeShape({ p, colour, joint, dim, selected, planning, rank, locked, hatchId, onSelect, onFocusNode }: NodeProps) {
  const s = p.s
  const legal = LEGALITY_TAG[s.legality]
  const keyline = legal ? legal.colour : colour
  const taken = planning && rank > 0
  const dimmed = planning && locked && rank === 0

  // Two tags is what the box holds. Locked is carried by the hatch instead.
  const tags: { text: string; colour: string }[] = []
  if (joint) tags.push({ text: 'JOINT', colour: 'var(--brass-lit)' })
  if (legal) tags.push({ text: legal.tag, colour: legal.colour })

  const caption = [s.skillType.toUpperCase(), `${fmtNum(s.cost)} SP`].filter(Boolean).join(' · ')

  const aria = [
    s.e.name,
    s.branch,
    s.skillType || 'skill',
    `${fmtNum(s.cost)} skill points`,
    s.maxRank > 1 ? `max rank ${s.maxRank}` : '',
    s.legality ? `legality ${s.legality}` : '',
    joint ? `joint node with ${joint}` : '',
    planning ? (rank > 0 ? `taken at rank ${rank}` : locked ? 'locked, prerequisites not met' : 'available') : '',
  ]
    .filter(Boolean)
    .join(', ')

  return (
    <g
      className="sk-node"
      transform={`translate(${p.x} ${p.y})`}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      aria-label={aria}
      opacity={dim ? 0.24 : 1}
      onClick={() => onSelect(s.e.id)}
      onFocus={() => onFocusNode(p)}
      onKeyDown={(ev) => {
        if (ev.key === 'Enter' || ev.key === ' ' || ev.key === 'Spacebar') {
          ev.preventDefault()
          ev.stopPropagation()
          onSelect(s.e.id)
        }
      }}
    >
      <title>{s.e.summary ? `${s.e.name} — ${s.e.summary}` : s.e.name}</title>
      <rect className="sk-ring" x={-5} y={-5} width={NW + 10} height={NH + 10} fill="none" stroke="var(--brass)" strokeWidth={1.4} />
      {selected ? (
        <rect x={-5} y={-5} width={NW + 10} height={NH + 10} fill="none" stroke="var(--brass-lit)" strokeWidth={1.4} />
      ) : null}

      <rect x={0} y={0} width={NW} height={NH} fill={taken ? 'var(--brass-wash)' : 'var(--s1)'} />
      <rect x={0} y={0} width={NW} height={NH} fill={colour} fillOpacity={0.1} />
      {joint ? (
        // Split fill: the lower-right half carries the other tree's colour.
        <>
          <path d={`M ${NW} 0 L ${NW} ${NH} L 0 ${NH} Z`} fill={treeColour(joint)} fillOpacity={0.18} />
          <path d={`M ${NW} 0 L 0 ${NH}`} stroke={treeColour(joint)} strokeWidth={1} fill="none" />
        </>
      ) : null}
      {dimmed ? <rect x={0} y={0} width={NW} height={NH} fill={`url(#${hatchId})`} /> : null}
      {taken ? <rect x={0} y={0} width={3} height={NH} fill="var(--brass-lit)" /> : null}
      <rect x={0} y={0} width={NW} height={NH} fill="none" stroke={keyline} strokeWidth={selected || taken ? 2 : 1.2} />

      <text className="sk-cap" x={8} y={15} fill={colour} opacity={dimmed ? 0.6 : 1}>
        {clip(caption, 22)}
      </text>
      <RankPips max={s.maxRank} filled={rank} x={NW - 8} y={8} />

      <text className="sk-name" opacity={dimmed ? 0.65 : 1}>
        {p.lines.map((line, i) => (
          <tspan key={i} x={8} y={p.lines.length > 1 ? 33 + i * 14 : 40}>
            {line}
          </tspan>
        ))}
      </text>

      {tags.slice(0, 2).map((t, i) => (
        <g key={t.text} transform={`translate(${8 + i * 56} ${NH - 17})`}>
          <rect x={0} y={0} width={52} height={13} fill="var(--bg-deep)" stroke={t.colour} strokeWidth={0.9} />
          <text className="sk-tag" x={26} y={9.5} textAnchor="middle" fill={t.colour}>
            {t.text}
          </text>
        </g>
      ))}
    </g>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function SkillTreePage() {
  const world = useWorld()
  const uid = useId().replace(/:/g, '')
  const hatchId = `sk-hatch-${uid}`

  const stage = useRef<HTMLDivElement>(null)
  const drag = useRef<{ x: number; y: number; vx: number; vy: number; moved: boolean } | null>(null)
  const movedRef = useRef(false)
  const lastFit = useRef('')

  const [size, setSize] = useState({ w: 0, h: 0 })
  const [view, setView] = useState({ k: 1, x: 0, y: 0 })
  const [panning, setPanning] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const [compareOpen, setCompareOpen] = useState(false)

  const [treeWanted, setTreeWanted] = useLocalState<string>('skilltree.tree', '')
  const [planning, setPlanning] = useLocalState<boolean>('skilltree.planning', false)
  const [rawBuild, setRawBuild] = useLocalState<BuildState>('skilltree.build', DEFAULT_BUILD)

  const [query, setQuery] = useState('')
  const [fBranch, setFBranch] = useState('')
  const [fType, setFType] = useState('')
  const [fLegal, setFLegal] = useState('')
  const [fHybrid, setFHybrid] = useState<'' | 'yes' | 'no'>('')

  /* ---- data ---- */

  const index = useMemo(() => (world ? buildIndex(world) : null), [world])

  const skills = useMemo(() => (world ? entitiesOfType(world, 'skill').map(readSkill) : []), [world])
  const skillById = useMemo(() => new Map(skills.map((s) => [s.e.id, s])), [skills])

  const entityName = useCallback((id: string) => world?.entities[id]?.name ?? null, [world])

  /** node.requires and prerequisite_of relations, folded together per skill. */
  const prereqs = useMemo(() => {
    const map = new Map<string, Reqs>()
    if (!world) return map
    for (const s of skills) {
      const ids = new Set(s.requires)
      if (index) for (const src of sourcesOf(index, s.e.id, 'prerequisite_of')) ids.add(src)
      const r: Reqs = { skills: [], others: [], broken: [] }
      for (const id of ids) {
        if (id === s.e.id) continue
        if (skillById.has(id)) r.skills.push(id)
        else if (world.entities[id]) r.others.push(id)
        else r.broken.push(id)
      }
      map.set(s.e.id, r)
    }
    return map
  }, [world, index, skills, skillById])

  const dependents = useMemo(() => {
    const map = new Map<string, string[]>()
    for (const [id, r] of prereqs) for (const p of r.skills) map.set(p, [...(map.get(p) ?? []), id])
    return map
  }, [prereqs])

  /** A node is joint when it is flagged, or when its prerequisites cross trees. */
  const jointTree = useMemo(() => {
    const map = new Map<string, string | null>()
    for (const s of skills) {
      const r = prereqs.get(s.e.id) ?? EMPTY_REQS
      const foreign = [...new Set(r.skills.map((p) => skillById.get(p)?.tree).filter((t): t is string => !!t && t !== s.tree))]
      map.set(s.e.id, foreign[0] ?? (s.hybridField ? `${s.tree} (declared hybrid)` : null))
    }
    return map
  }, [skills, prereqs, skillById])

  const trees = useMemo(() => {
    const counts = new Map<string, number>()
    for (const s of skills) counts.set(s.tree, (counts.get(s.tree) ?? 0) + 1)
    return [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => (a.name === UNFILED_TREE ? 1 : b.name === UNFILED_TREE ? -1 : a.name.localeCompare(b.name)))
  }, [skills])

  const tree = trees.find((t) => t.name === treeWanted)?.name ?? trees[0]?.name ?? ''

  const layout = useMemo(
    () => (tree ? layoutTree(tree, skills, prereqs, skillById, entityName) : null),
    [tree, skills, prereqs, skillById, entityName],
  )

  /* ---- filters ---- */

  const typeOptions = useMemo(() => [...new Set(skills.map((s) => s.skillType).filter(Boolean))].sort(), [skills])
  const legalOptions = useMemo(() => [...new Set(skills.map((s) => s.legality).filter(Boolean))].sort(), [skills])

  const filtersOn = !!(query.trim() || fBranch || fType || fLegal || fHybrid)

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    const set = new Set<string>()
    for (const n of layout?.nodes ?? []) {
      const s = n.s
      if (q && !s.haystack.includes(q)) continue
      if (fBranch && s.branch !== fBranch) continue
      if (fType && s.skillType !== fType) continue
      if (fLegal && s.legality !== fLegal) continue
      if (fHybrid) {
        const isJoint = !!jointTree.get(s.e.id)
        if (fHybrid === 'yes' && !isJoint) continue
        if (fHybrid === 'no' && isJoint) continue
      }
      set.add(s.e.id)
    }
    return set
  }, [layout, query, fBranch, fType, fLegal, fHybrid, jointTree])

  const clearFilters = useCallback(() => {
    setQuery('')
    setFBranch('')
    setFType('')
    setFLegal('')
    setFHybrid('')
  }, [])

  /* ---- build ---- */

  const build = useMemo(() => normaliseBuild(rawBuild), [rawBuild])
  const ranks = build.slot === 'a' ? build.a : build.b

  const updateBuild = useCallback(
    (fn: (b: BuildState) => BuildState) => {
      setRawBuild((prev) => fn(normaliseBuild(prev)))
    },
    [setRawBuild],
  )

  const unlockedIn = useCallback(
    (r: Ranks, id: string) => {
      const req = prereqs.get(id) ?? EMPTY_REQS
      return req.skills.every((p) => (r[p] ?? 0) >= 1)
    },
    [prereqs],
  )

  /** Drops anything whose prerequisites no longer hold, until the set is valid. */
  const prune = useCallback(
    (r: Ranks): { next: Ranks; dropped: string[] } => {
      const next: Ranks = { ...r }
      const dropped: string[] = []
      let changed = true
      while (changed) {
        changed = false
        for (const id of Object.keys(next)) {
          if (!unlockedIn(next, id)) {
            delete next[id]
            dropped.push(id)
            changed = true
          }
        }
      }
      return { next, dropped }
    },
    [unlockedIn],
  )

  const costOf = useCallback(
    (r: Ranks) =>
      Object.entries(r).reduce((sum, [id, rank]) => {
        const s = skillById.get(id)
        return s ? sum + s.cost * rank : sum
      }, 0),
    [skillById],
  )

  const spent = costOf(ranks)
  const over = spent > build.budget

  /** Writes the ranks of whichever build is being edited. */
  const setRanks = useCallback(
    (next: Ranks) => {
      updateBuild((b) => (b.slot === 'a' ? { ...b, a: next } : { ...b, b: next }))
    },
    [updateBuild],
  )

  const addRank = useCallback(
    (id: string) => {
      const s = skillById.get(id)
      if (!s) return
      const rank = ranks[id] ?? 0
      if (rank === 0 && !unlockedIn(ranks, id)) return
      if (rank >= s.maxRank) return
      setRanks({ ...ranks, [id]: rank + 1 })
    },
    [ranks, skillById, unlockedIn, setRanks],
  )

  /** Steps a skill down, then reports whatever the prune took with it. */
  const stepDown = useCallback(
    (id: string, all: boolean) => {
      const rank = ranks[id] ?? 0
      if (rank === 0) return
      const stepped: Ranks = { ...ranks }
      if (!all && rank > 1) stepped[id] = rank - 1
      else delete stepped[id]
      const { next, dropped } = prune(stepped)
      setRanks(next)
      if (dropped.length) {
        const names = dropped.map((d) => skillById.get(d)?.e.name ?? d)
        toast(
          `Also dropped ${names.slice(0, 3).join(', ')}${dropped.length > 3 ? ` and ${dropped.length - 3} more` : ''}`,
          'info',
        )
      }
    },
    [ranks, prune, setRanks, skillById],
  )

  const dropRank = useCallback((id: string) => stepDown(id, false), [stepDown])
  const dropSkill = useCallback((id: string) => stepDown(id, true), [stepDown])

  const resetBuild = useCallback(async () => {
    const ok = await confirmAction({
      title: `Clear build ${slotName(build.slot)}?`,
      body: `Every skill in build ${slotName(build.slot)} will be removed. The other build is untouched.`,
      confirmLabel: 'Clear it',
      danger: true,
    })
    if (!ok) return
    updateBuild((b) => (b.slot === 'a' ? { ...b, a: {} } : { ...b, b: {} }))
    toast(`Build ${slotName(build.slot)} cleared`, 'ok')
  }, [build.slot, updateBuild])

  const copyToOther = useCallback(() => {
    updateBuild((b) => (b.slot === 'a' ? { ...b, b: { ...b.a } } : { ...b, a: { ...b.b } }))
    toast(`Build ${slotName(build.slot)} copied into ${slotName(otherSlot(build.slot))}`, 'ok')
  }, [build.slot, updateBuild])

  /* ---- stage: size, zoom, pan ---- */

  useEffect(() => {
    const el = stage.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect()
      setSize({ w: r.width, h: r.height })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const setViewFor = useCallback(
    (intent: 'fit' | 'auto') => {
      if (!layout || !size.w || !size.h || !layout.w || !layout.h) return
      const whole = Math.min((size.w - 16) / layout.w, (size.h - 16) / layout.h)
      const k = intent === 'fit' ? Math.max(MIN_ZOOM, Math.min(1.2, whole)) : whole >= 1 ? Math.min(1.1, whole) : 1
      setView({
        k,
        x: layout.w * k <= size.w ? (size.w - layout.w * k) / 2 : 12,
        y: layout.h * k <= size.h ? (size.h - layout.h * k) / 2 : 12,
      })
    },
    [layout, size.w, size.h],
  )
  const fit = useCallback(() => setViewFor('fit'), [setViewFor])

  const fitKey = `${tree}|${layout?.w ?? 0}x${layout?.h ?? 0}|${Math.round(size.w)}x${Math.round(size.h)}`
  useEffect(() => {
    if (!size.w || !size.h || lastFit.current === fitKey) return
    lastFit.current = fitKey
    setViewFor('auto')
  }, [fitKey, setViewFor, size.w, size.h])

  // Switching tree drops the selection, and drops a branch filter that names a
  // branch the new tree does not have — otherwise the whole tree reads as dim.
  useEffect(() => {
    setSelected(null)
    setFBranch((prev) => (prev && !skills.some((s) => s.tree === tree && s.branch === prev) ? '' : prev))
  }, [tree, skills])

  const zoomAt = useCallback((factor: number, cx: number, cy: number) => {
    setView((v) => {
      const k = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, v.k * factor))
      const f = k / v.k
      return { k, x: cx - (cx - v.x) * f, y: cy - (cy - v.y) * f }
    })
  }, [])

  useEffect(() => {
    const el = stage.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const r = el.getBoundingClientRect()
      zoomAt(e.deltaY > 0 ? 1 / 1.12 : 1.12, e.clientX - r.left, e.clientY - r.top)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [zoomAt])

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

  const onStageKeyDown = (e: React.KeyboardEvent<SVGSVGElement>) => {
    const step = e.shiftKey ? 140 : 48
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

  /** Keeps a keyboard-focused node inside the viewport without jumping. */
  const onFocusNode = useCallback(
    (p: Placed) => {
      if (!size.w || !size.h) return
      setView((v) => {
        const m = 26
        const x0 = p.x * v.k + v.x
        const y0 = p.y * v.k + v.y
        const x1 = (p.x + NW) * v.k + v.x
        const y1 = (p.y + NH) * v.k + v.y
        let nx = v.x
        let ny = v.y
        if (x0 < m) nx += m - x0
        else if (x1 > size.w - m) nx -= x1 - (size.w - m)
        if (y0 < m) ny += m - y0
        else if (y1 > size.h - m) ny -= y1 - (size.h - m)
        return nx === v.x && ny === v.y ? v : { ...v, x: nx, y: ny }
      })
    },
    [size.w, size.h],
  )

  const onSelect = useCallback(
    (id: string) => {
      if (movedRef.current) return
      setSelected(id)
      if (planning) addRank(id)
    },
    [planning, addRank],
  )

  /* ---- selection detail ---- */

  const sel = selected ? skillById.get(selected) : undefined
  const selReqs = sel ? (prereqs.get(sel.e.id) ?? EMPTY_REQS) : EMPTY_REQS
  const selDeps = sel ? (dependents.get(sel.e.id) ?? []) : []
  const selJoint = sel ? (jointTree.get(sel.e.id) ?? null) : null
  const selRank = sel ? (ranks[sel.e.id] ?? 0) : 0
  const selMissing = sel ? selReqs.skills.filter((p) => (ranks[p] ?? 0) < 1) : []
  const selLocked = selMissing.length > 0

  const usedBy = useMemo(() => {
    if (!world || !index || !sel) return []
    const byType = new Map<EntityType, Set<string>>()
    for (const e of index.in[sel.e.id] ?? []) {
      if (e.kind === 'prerequisite_of') continue
      const src = world.entities[e.from]
      if (!src || src.id === sel.e.id) continue
      const set = byType.get(src.type) ?? new Set<string>()
      set.add(src.id)
      byType.set(src.type, set)
    }
    const order: EntityType[] = ['quest', 'item', 'mechanic', 'faction', 'machine']
    return [...byType.entries()]
      .map(([type, ids]) => ({
        type,
        ids: [...ids].sort((a, b) => (world.entities[a]?.name ?? a).localeCompare(world.entities[b]?.name ?? b)),
      }))
      .sort((a, b) => {
        const ai = order.indexOf(a.type)
        const bi = order.indexOf(b.type)
        return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi) || a.type.localeCompare(b.type)
      })
  }, [world, index, sel])

  const rankTable = sel ? rowList(sel.e.fields.rankTable) : []
  const rankColumns = SCHEMAS.skill.fields.find((f) => f.key === 'rankTable')?.columns ?? []
  const unlockReqs = sel ? strList(sel.e.fields.unlockRequirements) : []

  /* ---- comparison ---- */

  const comparison = useMemo(() => {
    const ids = [...new Set([...Object.keys(build.a), ...Object.keys(build.b)])].filter((id) => skillById.has(id))
    const rows = ids
      .map((id) => {
        const s = skillById.get(id)
        const ra = build.a[id] ?? 0
        const rb = build.b[id] ?? 0
        return {
          id,
          name: s?.e.name ?? id,
          tree: s?.tree ?? UNFILED_TREE,
          cost: s?.cost ?? 0,
          ra,
          rb,
          where: ra && rb ? 'both' : ra ? 'a' : 'b',
        }
      })
      .sort((x, y) => x.tree.localeCompare(y.tree) || x.name.localeCompare(y.name))
    return { rows, costA: costOf(build.a), costB: costOf(build.b) }
  }, [build.a, build.b, skillById, costOf])

  /* ---- render ---- */

  if (!world) {
    return (
      <div className="main-pad">
        <EmptyState title="The world has not finished opening">Give it a moment, then reload if nothing appears.</EmptyState>
      </div>
    )
  }

  const shown = matches.size
  const total = layout?.nodes.length ?? 0

  return (
    <div className="main-pad">
      <div className="page-head">
        <div>
          <h1>Skill trees</h1>
          <p className="lede">
            Every skill on its authored grid, with the prerequisites that gate it. Colour carries the branch, a split fill marks a
            joint node that draws on two trees, and a crimson keyline marks a skill that is illegal to train.
          </p>
        </div>
        <div style={{ marginLeft: 'auto' }} className="btn-row">
          <div className="mode-toggle" role="group" aria-label="Mode">
            <button type="button" aria-pressed={!planning} onClick={() => setPlanning(false)}>
              Reading
            </button>
            <button type="button" aria-pressed={planning} onClick={() => setPlanning(true)}>
              Planning
            </button>
          </div>
        </div>
      </div>

      {skills.length === 0 ? (
        <EmptyState title="No skills have been written yet">
          A skill appears here as soon as one exists. Its place on the grid is stored on the entry as{' '}
          <span className="mono">fields.node</span> — a tree, a branch, a column, a row and the ids it requires.
        </EmptyState>
      ) : (
        <>
          <p className="dim" style={{ fontSize: 'var(--fs-sm)', marginBottom: 'var(--sp-3)' }}>
            {skills.length} skill{skills.length === 1 ? '' : 's'} across {trees.length} tree{trees.length === 1 ? '' : 's'}
            {filtersOn ? ` · ${shown} of ${total} match in this tree` : ''}
          </p>

          <div className="tabs" role="tablist" aria-label="Skill trees">
            {trees.map((t) => (
              <button
                key={t.name}
                type="button"
                role="tab"
                id={`sk-tab-${uid}-${t.name.replace(/\W+/g, '-')}`}
                className="tab"
                aria-selected={t.name === tree}
                aria-controls={`sk-panel-${uid}`}
                onClick={() => setTreeWanted(t.name)}
              >
                {t.name} <span className="dimmer">{t.count}</span>
              </button>
            ))}
          </div>

          <div className="sk-controls">
            <label className="sk-control">
              <span className="field-label">Search</span>
              <input
                className="input"
                type="search"
                value={query}
                placeholder="Name, effect or tag"
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <label className="sk-control">
              <span className="field-label">Branch</span>
              <select className="select" value={fBranch} onChange={(e) => setFBranch(e.target.value)}>
                <option value="">All branches</option>
                {(layout?.branches ?? []).map((b) => (
                  <option key={b.name} value={b.name}>
                    {b.name} ({b.count})
                  </option>
                ))}
              </select>
            </label>
            <label className="sk-control">
              <span className="field-label">Type</span>
              <select className="select" value={fType} onChange={(e) => setFType(e.target.value)}>
                <option value="">All types</option>
                {typeOptions.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label className="sk-control">
              <span className="field-label">Legality</span>
              <select className="select" value={fLegal} onChange={(e) => setFLegal(e.target.value)}>
                <option value="">Any legality</option>
                {legalOptions.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label className="sk-control">
              <span className="field-label">Joint nodes</span>
              <select
                className="select"
                value={fHybrid}
                onChange={(e) => setFHybrid(e.target.value === 'yes' ? 'yes' : e.target.value === 'no' ? 'no' : '')}
              >
                <option value="">Show all</option>
                <option value="yes">Joint only</option>
                <option value="no">Single-tree only</option>
              </select>
            </label>
            <button type="button" className="btn sm" onClick={clearFilters} disabled={!filtersOn}>
              Clear filters
            </button>
          </div>

          {planning ? (
            <div className="sk-planbar">
              <div className="mode-toggle" role="group" aria-label="Which build you are editing">
                <button type="button" aria-pressed={build.slot === 'a'} onClick={() => updateBuild((b) => ({ ...b, slot: 'a' }))}>
                  Build A
                </button>
                <button type="button" aria-pressed={build.slot === 'b'} onClick={() => updateBuild((b) => ({ ...b, slot: 'b' }))}>
                  Build B
                </button>
              </div>
              <label className="sk-control sk-budget">
                <span className="field-label">Budget</span>
                <input
                  className="input"
                  type="number"
                  min={0}
                  max={9999}
                  value={build.budget}
                  aria-label="Skill point budget"
                  onChange={(e) => {
                    const n = intIn(e.target.value, 0, 9999, 0)
                    updateBuild((b) => ({ ...b, budget: n }))
                  }}
                />
              </label>
              <p className="sk-spend">
                <strong style={{ color: over ? 'var(--crimson-lit)' : 'var(--brass-lit)' }}>{fmtNum(spent)}</strong> of{' '}
                {build.budget} points spent
                <span className="dimmer">
                  {' '}
                  · {Object.keys(ranks).filter((id) => skillById.has(id)).length} skills
                  {over ? ` · ${fmtNum(spent - build.budget)} over budget` : ` · ${fmtNum(build.budget - spent)} left`}
                </span>
              </p>
              <span className="spacer" />
              <div className="btn-row">
                <button type="button" className="btn sm" onClick={copyToOther}>
                  Copy {slotName(build.slot)} into {slotName(otherSlot(build.slot))}
                </button>
                <button type="button" className="btn sm" onClick={() => setCompareOpen(true)}>
                  Compare A and B
                </button>
                <button type="button" className="btn sm danger" onClick={() => void resetBuild()}>
                  Reset {slotName(build.slot)}
                </button>
              </div>
            </div>
          ) : null}

          <div className="sk-board">
            <div
              className="panel"
              role="tabpanel"
              id={`sk-panel-${uid}`}
              aria-labelledby={`sk-tab-${uid}-${tree.replace(/\W+/g, '-')}`}
            >
              <div className="panel-head">
                <h3>{tree}</h3>
                <span className="dim" style={{ fontSize: 'var(--fs-micro)' }}>
                  {total} skill{total === 1 ? '' : 's'} · {layout?.edges.length ?? 0} link
                  {(layout?.edges.length ?? 0) === 1 ? '' : 's'}
                  {layout?.stubs.length ? ` · ${layout.stubs.length} inbound from elsewhere` : ''}
                </span>
                <span className="spacer" />
                <div className="btn-row">
                  <span className="mono dim" style={{ fontSize: 'var(--fs-micro)' }} aria-hidden="true">
                    {Math.round(view.k * 100)}%
                  </span>
                  <button
                    type="button"
                    className="btn sm"
                    onClick={() => zoomAt(1 / 1.2, size.w / 2, size.h / 2)}
                    aria-label="Zoom out"
                  >
                    &minus;
                  </button>
                  <button type="button" className="btn sm" onClick={() => zoomAt(1.2, size.w / 2, size.h / 2)} aria-label="Zoom in">
                    +
                  </button>
                  <button type="button" className="btn sm" onClick={fit} title="Show the whole tree">
                    Fit
                  </button>
                  <button type="button" className="btn sm" onClick={() => setViewFor('auto')} title="Back to full size">
                    100%
                  </button>
                </div>
              </div>

              <div
                ref={stage}
                className={`canvas-panel sk-stage${panning ? ' dragging' : ''}`}
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
                  aria-label={`${tree} skill tree. Arrow keys pan, plus and minus zoom, 0 fits the tree. Tab moves between skills, Enter selects.`}
                  onKeyDown={onStageKeyDown}
                >
                  <defs>
                    <marker
                      id={`ska-${uid}`}
                      viewBox="0 0 10 10"
                      refX={9}
                      refY={5}
                      markerWidth={7}
                      markerHeight={7}
                      markerUnits="userSpaceOnUse"
                      orient="auto"
                    >
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--brass-dim)" />
                    </marker>
                    <marker
                      id={`ska-${uid}-lit`}
                      viewBox="0 0 10 10"
                      refX={9}
                      refY={5}
                      markerWidth={7}
                      markerHeight={7}
                      markerUnits="userSpaceOnUse"
                      orient="auto"
                    >
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--brass-lit)" />
                    </marker>
                    <pattern id={hatchId} width={6} height={6} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                      <rect width={6} height={6} fill="var(--bg-deep)" fillOpacity={0.45} />
                      <line x1={0} y1={0} x2={0} y2={6} stroke="var(--line-strong)" strokeWidth={1.6} />
                    </pattern>
                  </defs>

                  <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>
                    {(layout?.columns ?? []).map((c, i) => (
                      <g key={`${c.label}-${i}`}>
                        {i % 2 === 0 ? (
                          <rect x={c.x - 16} y={0} width={NW + 32} height={layout?.h ?? 0} fill="var(--s1)" opacity={0.5} />
                        ) : null}
                        <text className="sk-col" x={c.x} y={22}>
                          {c.label}
                        </text>
                      </g>
                    ))}

                    {(layout?.edges ?? []).map((e) => {
                      const lit = !!selected && (e.from === selected || e.to === selected)
                      const faded = (!!selected && !lit) || (filtersOn && !(matches.has(e.from) && matches.has(e.to)))
                      return (
                        <path
                          key={e.key}
                          d={e.d}
                          fill="none"
                          stroke={lit ? 'var(--brass-lit)' : 'var(--brass-dim)'}
                          strokeWidth={lit ? 2 : 1.3}
                          opacity={faded ? 0.18 : 1}
                          markerEnd={`url(#ska-${uid}${lit ? '-lit' : ''})`}
                        />
                      )
                    })}

                    {(layout?.stubs ?? []).map((s) => {
                      const faded = (!!selected && s.to !== selected) || (filtersOn && !matches.has(s.to))
                      return (
                        <g key={s.key} opacity={faded ? 0.2 : 1}>
                          <path
                            d={`M ${s.x1} ${s.y} L ${s.x2} ${s.y}`}
                            fill="none"
                            stroke={s.colour}
                            strokeWidth={1.3}
                            strokeDasharray="5 4"
                            markerEnd={`url(#ska-${uid})`}
                          />
                          <text className="sk-stub" x={s.x1 - 5} y={s.y + 3.5} textAnchor="end" fill={s.colour}>
                            {s.label}
                          </text>
                        </g>
                      )
                    })}

                    {(layout?.nodes ?? []).map((p) => {
                      const id = p.s.e.id
                      const rank = ranks[id] ?? 0
                      return (
                        <SkillNodeShape
                          key={id}
                          p={p}
                          colour={layout?.colourOf.get(p.s.branch) ?? PALETTE[0]}
                          joint={jointTree.get(id) ?? null}
                          dim={filtersOn && !matches.has(id)}
                          selected={selected === id}
                          planning={planning}
                          rank={rank}
                          locked={!unlockedIn(ranks, id)}
                          hatchId={hatchId}
                          onSelect={onSelect}
                          onFocusNode={onFocusNode}
                        />
                      )
                    })}
                  </g>
                </svg>
              </div>

              <div className="flow-legend">
                {(layout?.branches ?? []).map((b) => (
                  <button
                    key={b.name}
                    type="button"
                    className="sk-key"
                    aria-pressed={fBranch === b.name}
                    onClick={() => setFBranch(fBranch === b.name ? '' : b.name)}
                    title={`Show only the ${b.name} branch`}
                  >
                    <span className="sk-swatch" style={{ background: b.colour }} aria-hidden="true" />
                    {b.name} <span className="dimmer">{b.count}</span>
                  </button>
                ))}
                <span className="flow-key">
                  <span className="sk-swatch split" aria-hidden="true" /> Joint node
                </span>
                <span className="flow-key">
                  <span className="sk-swatch" style={{ borderColor: 'var(--crimson-lit)', background: 'none' }} aria-hidden="true" />{' '}
                  Outlawed
                </span>
                <span className="flow-key">
                  <span className="sk-swatch" style={{ borderColor: 'var(--amber)', background: 'none' }} aria-hidden="true" />{' '}
                  Regulated
                </span>
                <span className="flow-key">
                  <svg width={26} height={10} viewBox="0 0 26 10" aria-hidden="true" focusable="false">
                    <path d="M 1 5 L 24 5" stroke="var(--brass-dim)" strokeWidth={1.4} strokeDasharray="5 4" fill="none" />
                  </svg>
                  Prerequisite in another tree
                </span>
                {planning ? (
                  <span className="flow-key">
                    <span className="sk-swatch hatch" aria-hidden="true" /> Locked
                  </span>
                ) : null}
              </div>

              <p className="sk-hint">
                Drag to pan, scroll to zoom, or use Tab and Enter from the keyboard. An arrow runs from a prerequisite to the skill
                it unlocks; every prerequisite listed must be taken.
                {planning ? ' In planning mode, selecting a skill also buys a rank of it.' : ''}
              </p>
            </div>

            <aside className="panel sk-side" aria-label="Skill detail">
              {sel ? (
                <div className="panel-body">
                  <div className="btn-row" style={{ marginBottom: 'var(--sp-2)' }}>
                    <strong style={{ fontFamily: 'var(--ff-display)', fontSize: 'var(--fs-md)' }}>{sel.e.name}</strong>
                    <StatusBadge status={sel.e.status} />
                    <button
                      type="button"
                      className="btn ghost sm"
                      style={{ marginLeft: 'auto' }}
                      onClick={() => setSelected(null)}
                    >
                      Clear
                    </button>
                  </div>

                  <div className="btn-row" style={{ marginBottom: 'var(--sp-3)' }}>
                    <span className="chip" style={{ borderColor: layout?.colourOf.get(sel.branch) ?? 'var(--line-strong)' }}>
                      {sel.branch}
                    </span>
                    <span className="chip">{sel.tree}</span>
                    {selJoint ? (
                      <span className="chip" style={{ color: 'var(--brass-lit)', borderColor: 'currentColor' }}>
                        Joint node
                      </span>
                    ) : null}
                    {LEGALITY_TAG[sel.legality] ? (
                      <span className="chip" style={{ color: LEGALITY_TAG[sel.legality].colour, borderColor: 'currentColor' }}>
                        {sel.legality}
                      </span>
                    ) : null}
                  </div>

                  {sel.e.summary ? (
                    <p className="prose" style={{ fontSize: 'var(--fs-sm)' }}>
                      {sel.e.summary}
                    </p>
                  ) : null}

                  <dl className="kv" style={{ marginTop: 'var(--sp-3)' }}>
                    <dt>Type</dt>
                    <dd>
                      <FieldText e={sel.e} k="skillType" />
                    </dd>
                    <dt>Tier</dt>
                    <dd>{sel.tier !== null ? fmtNum(sel.tier) : <span className="dimmer">&mdash;</span>}</dd>
                    <dt>Cost</dt>
                    <dd>
                      {fmtNum(sel.cost)} point{sel.cost === 1 ? '' : 's'} per rank
                    </dd>
                    <dt>Max rank</dt>
                    <dd>{sel.maxRank}</dd>
                    <dt>Legality</dt>
                    <dd>
                      <FieldText e={sel.e} k="legality" />
                    </dd>
                  </dl>

                  {planning ? (
                    <div className="sk-plan-box">
                      <div className="label">Build {slotName(build.slot)}</div>
                      {selLocked && selRank === 0 ? (
                        <p className="sk-locked">
                          Locked. Take{' '}
                          {selMissing.map((id, i) => (
                            <span key={id}>
                              {i ? ', ' : ''}
                              <EntityLink id={id} glyph={false} />
                              {skillById.get(id)?.tree && skillById.get(id)?.tree !== sel.tree ? (
                                <span className="dimmer"> ({skillById.get(id)?.tree})</span>
                              ) : null}
                            </span>
                          ))}{' '}
                          first.
                        </p>
                      ) : (
                        <p className="dim" style={{ fontSize: 'var(--fs-sm)' }}>
                          {selRank > 0 ? `Taken at rank ${selRank} of ${sel.maxRank}.` : 'Available. Prerequisites are met.'}
                        </p>
                      )}
                      <div className="btn-row" style={{ marginTop: 'var(--sp-2)' }}>
                        <button
                          type="button"
                          className="btn sm"
                          onClick={() => addRank(sel.e.id)}
                          disabled={(selLocked && selRank === 0) || selRank >= sel.maxRank}
                        >
                          {selRank === 0 ? 'Take skill' : 'Add rank'}
                        </button>
                        <button type="button" className="btn sm" onClick={() => dropRank(sel.e.id)} disabled={selRank === 0}>
                          Remove rank
                        </button>
                        <button type="button" className="btn sm" onClick={() => dropSkill(sel.e.id)} disabled={selRank === 0}>
                          Remove skill
                        </button>
                      </div>
                    </div>
                  ) : null}

                  {typeof sel.e.fields.effect === 'string' || isTbd(sel.e.fields.effect) ? (
                    <>
                      <div className="label" style={{ marginTop: 'var(--sp-3)' }}>
                        Effect
                      </div>
                      <p className="prose" style={{ fontSize: 'var(--fs-sm)' }}>
                        <FieldText e={sel.e} k="effect" />
                      </p>
                    </>
                  ) : null}

                  {unlockReqs.length ? (
                    <>
                      <div className="label" style={{ marginTop: 'var(--sp-3)' }}>
                        Unlock requirements
                      </div>
                      <ul className="list-plain">
                        {unlockReqs.map((r, i) => (
                          <li key={`${r}-${i}`}>{r}</li>
                        ))}
                      </ul>
                    </>
                  ) : null}

                  {rankTable.length ? (
                    <>
                      <div className="label" style={{ marginTop: 'var(--sp-3)' }}>
                        Rank progression
                      </div>
                      <div className="table-wrap">
                        <table className="table">
                          <thead>
                            <tr>
                              {rankColumns.map((c) => (
                                <th key={c.key}>{c.label}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {rankTable.map((r, i) => (
                              <tr key={i}>
                                {rankColumns.map((c) => (
                                  <td key={c.key}>{r[c.key] ?? ''}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) : null}

                  <div className="label" style={{ marginTop: 'var(--sp-3)' }}>
                    Requires
                  </div>
                  {selReqs.skills.length || selReqs.others.length || selReqs.broken.length ? (
                    <ul className="list-plain">
                      {selReqs.skills.map((id) => {
                        const other = skillById.get(id)
                        return (
                          <li key={id}>
                            <EntityLink id={id} />
                            {other && other.tree !== sel.tree ? <span className="dimmer"> · {other.tree} tree</span> : null}
                            {planning ? (
                              <span className="dimmer"> · {(ranks[id] ?? 0) > 0 ? 'taken' : 'not taken'}</span>
                            ) : null}
                          </li>
                        )
                      })}
                      {selReqs.others.map((id) => (
                        <li key={id}>
                          <EntityLink id={id} showType />
                        </li>
                      ))}
                      {selReqs.broken.map((id) => (
                        <li key={id} style={{ color: 'var(--crimson-lit)' }}>
                          <span className="mono">{id}</span> names no entry
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="dim" style={{ fontSize: 'var(--fs-sm)' }}>
                      Nothing. This is an entry point into the tree.
                    </p>
                  )}

                  {selDeps.length ? (
                    <>
                      <div className="label" style={{ marginTop: 'var(--sp-3)' }}>
                        Unlocks
                      </div>
                      <ul className="list-plain">
                        {selDeps.map((id) => (
                          <li key={id}>
                            <EntityLink id={id} />
                            {skillById.get(id)?.tree !== sel.tree ? (
                              <span className="dimmer"> · {skillById.get(id)?.tree} tree</span>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}

                  <div className="label" style={{ marginTop: 'var(--sp-3)' }}>
                    Used by
                  </div>
                  {usedBy.length ? (
                    usedBy.map((g) => (
                      <div key={g.type} className="sk-uses">
                        <div className="sk-uses-head">
                          <TypeGlyph type={g.type} size={10} /> {SCHEMAS[g.type]?.plural ?? g.type}{' '}
                          <span className="dimmer">{g.ids.length}</span>
                        </div>
                        <ul className="list-plain">
                          {g.ids.map((id) => (
                            <li key={id}>
                              <EntityLink id={id} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                  ) : (
                    <p className="dim" style={{ fontSize: 'var(--fs-sm)' }}>
                      Nothing references this skill yet. Quests, items, mechanics, factions and machines that name it will be
                      listed here.
                    </p>
                  )}

                  <div className="btn-row" style={{ marginTop: 'var(--sp-4)' }}>
                    <EntityLink id={sel.e.id} label="Open the full entry" className="btn sm" glyph={false} />
                  </div>
                </div>
              ) : (
                <div className="panel-body">
                  <p className="dim" style={{ fontSize: 'var(--fs-sm)' }}>
                    Select a skill to read its effect, its prerequisites and everything in the world that uses it.
                    {planning ? ' Selecting a skill in planning mode also buys a rank of it.' : ''}
                  </p>
                  {planning ? (
                    <>
                      <div className="label" style={{ marginTop: 'var(--sp-4)' }}>
                        Build {slotName(build.slot)}
                      </div>
                      {Object.keys(ranks).filter((id) => skillById.has(id)).length ? (
                        <ul className="list-plain">
                          {Object.entries(ranks)
                            .filter(([id]) => skillById.has(id))
                            .sort((x, y) => (skillById.get(x[0])?.e.name ?? '').localeCompare(skillById.get(y[0])?.e.name ?? ''))
                            .map(([id, rank]) => {
                              const s = skillById.get(id)
                              return (
                                <li key={id}>
                                  <button type="button" className="sk-buildrow" onClick={() => setSelected(id)}>
                                    <span>{s?.e.name ?? id}</span>
                                    <span className="dimmer">
                                      {(s?.maxRank ?? 1) > 1 ? `rank ${rank} · ` : ''}
                                      {fmtNum((s?.cost ?? 0) * rank)} SP
                                    </span>
                                  </button>
                                </li>
                              )
                            })}
                        </ul>
                      ) : (
                        <p className="dim" style={{ fontSize: 'var(--fs-sm)' }}>
                          Build {slotName(build.slot)} is empty. Select a skill with no prerequisites to start.
                        </p>
                      )}
                    </>
                  ) : null}
                </div>
              )}
            </aside>
          </div>
        </>
      )}

      {compareOpen ? (
        <Dialog title="Build A against build B" onClose={() => setCompareOpen(false)} wide>
          <p className="dim" style={{ fontSize: 'var(--fs-sm)', marginBottom: 'var(--sp-3)' }}>
            Build A costs <strong>{fmtNum(comparison.costA)}</strong> points, build B costs{' '}
            <strong>{fmtNum(comparison.costB)}</strong>, against a budget of {build.budget}.{' '}
            {comparison.rows.filter((r) => r.where === 'both').length} skill
            {comparison.rows.filter((r) => r.where === 'both').length === 1 ? '' : 's'} appear in both.
          </p>
          {comparison.rows.length ? (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Skill</th>
                    <th>Tree</th>
                    <th>In</th>
                    <th>A</th>
                    <th>B</th>
                    <th>Cost each</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.rows.map((r) => (
                    <tr key={r.id}>
                      <td>
                        <EntityLink id={r.id} />
                      </td>
                      <td className="dim">{r.tree}</td>
                      <td>
                        {r.where === 'both' ? (
                          <span className="chip tight">Both</span>
                        ) : r.where === 'a' ? (
                          <span className="chip tight" style={{ color: 'var(--brass-lit)', borderColor: 'currentColor' }}>
                            A only
                          </span>
                        ) : (
                          <span className="chip tight" style={{ color: 'var(--t-quest)', borderColor: 'currentColor' }}>
                            B only
                          </span>
                        )}
                      </td>
                      <td>{r.ra || <span className="dimmer">&mdash;</span>}</td>
                      <td>{r.rb || <span className="dimmer">&mdash;</span>}</td>
                      <td>{fmtNum(r.cost)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState title="Neither build holds a skill yet">
              Take a few skills in planning mode, copy them into the other build, then change one and compare.
            </EmptyState>
          )}
        </Dialog>
      ) : null}
    </div>
  )
}
