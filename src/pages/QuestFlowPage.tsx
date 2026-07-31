/**
 * Quest branching flow.
 *
 * Two views over the `flow` payload carried on a quest entity:
 *   • `QuestFlowPage`  — the board: a picker over every quest that has a flow,
 *     the selected quest's diagram, and a plain quest list as an alternative
 *     reading of the same set.
 *   • `QuestFlowView`  — the diagram on its own, embedded by the quest page.
 *
 * The payload is user-editable and half-authored by design, so everything is
 * validated before it is indexed and anything unusable degrades into a visible
 * gap rather than a crash.
 */

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { EntityChip, EntityLink } from '../components/EntityLink'
import { EmptyState, StatusBadge, useLocalState } from '../components/ui'
import { buildIndex, entitiesOfType, sourcesOf } from '../core/relations'
import { useWorld } from '../core/store'
import type { Entity } from '../core/types'
import { isTbd } from '../core/types'
import type { QuestEdge, QuestFlow, QuestNode, QuestNodeKind } from '../world/kit'

/* ------------------------------------------------------------------ */
/* Geometry                                                            */
/* ------------------------------------------------------------------ */

const NW = 176 // node slot width
const NH = 76 // node slot height
/** Gaps are sized so an edge label chip always fits inside them. */
const GAP_X = 128
const GAP_Y = 62
const PITCH_Y = NH + GAP_Y
const PAD_X = 36
const PAD_TOP = 72
const PAD_BOTTOM = 56
/** Longest edge label that still fits in a column gap at 11px. */
const EDGE_LABEL_MAX = 17

/** Single-line and two-line text baselines inside a node slot. */
const TEXT_Y1 = 43
const TEXT_Y2 = [36, 50]

/* ------------------------------------------------------------------ */
/* Kinds — silhouette, colour and wording                              */
/* ------------------------------------------------------------------ */

/** `missing` is ours: an edge that points at a beat nobody defined. */
type NodeKind = QuestNodeKind | 'missing'

interface KindStyle {
  label: string
  hint: string
  colour: string
  /** Silhouette drawn in the 176 × 76 slot. */
  path: string
  /** Character budget per label line; length sets the maximum line count. */
  wrap: number[]
  /** Horizontal inset of the edge attachment points. */
  anchorL: number
  anchorR: number
  /** x positions of the doubled left rule, for endings. */
  rules?: number[]
  dashed?: boolean
  fillOpacity?: number
}

const KIND: Record<NodeKind, KindStyle> = {
  start: {
    label: 'Start',
    hint: 'Where the quest opens. One per flow, normally in column 0.',
    colour: 'var(--text-2)',
    path: 'M 12 0 H 148 L 176 38 L 148 76 H 12 A 12 12 0 0 1 0 64 V 12 A 12 12 0 0 1 12 0 Z',
    wrap: [21, 21],
    anchorL: 0,
    anchorR: 0,
  },
  choice: {
    label: 'Choice',
    hint: 'A decision the player makes, with more than one way out.',
    colour: 'var(--amber)',
    path: 'M 88 0 L 176 38 L 88 76 L 0 38 Z',
    wrap: [20, 14],
    anchorL: 0,
    anchorR: 0,
  },
  check: {
    label: 'Check',
    hint: 'A skill or stat check. The roll decides which edge is taken.',
    colour: 'var(--t-mechanic)',
    path: 'M 34 0 H 142 L 176 38 L 142 76 H 34 L 0 38 Z',
    wrap: [22, 22],
    anchorL: 0,
    anchorR: 0,
  },
  combat: {
    label: 'Combat',
    hint: 'A fight. Notched box, rust red.',
    colour: 'var(--t-war)',
    path: 'M 14 0 H 76 L 88 13 L 100 0 H 162 L 176 14 V 62 L 162 76 H 14 L 0 62 V 14 Z',
    wrap: [23, 23],
    anchorL: 0,
    anchorR: 0,
    fillOpacity: 0.2,
  },
  discovery: {
    label: 'Discovery',
    hint: 'Something the player finds out: a name, a place, a piece of evidence.',
    colour: 'var(--t-spell)',
    // A wide circle. Kept oval so two lines of label still fit inside it.
    path: 'M 2 38 A 86 37 0 1 0 174 38 A 86 37 0 1 0 2 38 Z',
    wrap: [22, 22],
    anchorL: 2,
    anchorR: 2,
  },
  success: {
    label: 'Success',
    hint: 'An ending that goes the player’s way. Doubled green left rule.',
    colour: 'var(--verd-lit)',
    path: 'M 0 0 H 176 V 76 H 0 Z',
    wrap: [22, 22],
    anchorL: 0,
    anchorR: 0,
    rules: [5, 10],
  },
  failure: {
    label: 'Failure',
    hint: 'An ending that does not. Doubled crimson left rule.',
    colour: 'var(--crimson-lit)',
    path: 'M 0 0 H 176 V 76 H 0 Z',
    wrap: [22, 22],
    anchorL: 0,
    anchorR: 0,
    rules: [5, 10],
  },
  state: {
    label: 'World state',
    hint: 'A change that outlives the quest: a price, a law, an NPC, a door.',
    colour: 'var(--t-material)',
    path: 'M 18 14 H 176 L 158 62 H 0 Z',
    wrap: [22, 22],
    anchorL: 9,
    anchorR: 9,
  },
  missing: {
    label: 'Undefined',
    hint: 'An edge points at a beat that this flow never defines.',
    colour: 'var(--crimson)',
    path: 'M 0 0 H 176 V 76 H 0 Z',
    wrap: [22, 22],
    anchorL: 0,
    anchorR: 0,
    dashed: true,
    fillOpacity: 0.06,
  },
}

const KIND_ORDER: NodeKind[] = ['start', 'choice', 'check', 'combat', 'discovery', 'success', 'failure', 'state']
const VALID_KINDS = new Set<string>(KIND_ORDER)

/* ------------------------------------------------------------------ */
/* Reading the payload                                                 */
/* ------------------------------------------------------------------ */

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

function readNodes(raw: unknown): QuestNode[] {
  if (!Array.isArray(raw)) return []
  const seen = new Set<string>()
  const out: QuestNode[] = []
  for (const item of raw) {
    if (!isRecord(item)) continue
    const id = typeof item.id === 'string' ? item.id.trim() : ''
    if (!id || seen.has(id)) continue
    seen.add(id)
    const rawKind = typeof item.kind === 'string' ? item.kind : ''
    const kind = (VALID_KINDS.has(rawKind) ? rawKind : 'state') as QuestNodeKind
    const label = typeof item.label === 'string' && item.label.trim() ? item.label.trim() : id
    const col =
      typeof item.col === 'number' && Number.isFinite(item.col) ? Math.max(0, Math.min(400, Math.round(item.col))) : 0
    const detail = typeof item.detail === 'string' && item.detail.trim() ? item.detail.trim() : undefined
    const refs = Array.isArray(item.refs) ? item.refs.filter((r): r is string => typeof r === 'string' && !!r) : undefined
    out.push({ id, kind, label, col, detail, refs })
  }
  return out
}

function readEdges(raw: unknown): QuestEdge[] {
  if (!Array.isArray(raw)) return []
  const out: QuestEdge[] = []
  for (const item of raw) {
    if (!isRecord(item)) continue
    const from = typeof item.from === 'string' ? item.from.trim() : ''
    const to = typeof item.to === 'string' ? item.to.trim() : ''
    if (!from || !to) continue
    const label = typeof item.label === 'string' && item.label.trim() ? item.label.trim() : undefined
    out.push({ from, to, label, bad: item.bad === true, hidden: item.hidden === true })
  }
  return out
}

/** Returns a usable flow, or null when the field is absent or unreadable. */
function parseFlow(raw: unknown): QuestFlow | null {
  if (!isRecord(raw)) return null
  const nodes = readNodes(raw.nodes)
  const edges = readEdges(raw.edges)
  if (!nodes.length && !edges.length) return null
  return { nodes, edges }
}

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

interface LNode {
  id: string
  kind: NodeKind
  label: string
  detail?: string
  refs: string[]
  colIndex: number
  row: number
  x: number
  y: number
  lines: string[]
}

interface LEdge {
  key: string
  from: string
  to: string
  label?: string
  bad: boolean
  hidden: boolean
  d: string
  lx: number
  ly: number
}

interface Layout {
  nodes: LNode[]
  edges: LEdge[]
  cols: number
  w: number
  h: number
  /** Edges dropped because neither endpoint could be resolved. */
  dropped: number
  missing: number
}

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
    const max = budgets[last]
    let s = lines[last]
    while (s.length > max - 1 && s.length > 1) s = s.slice(0, -1)
    lines[last] = `${s.replace(/[\s,;:.]+$/, '')}…`
  }
  return lines
}

function layoutFlow(flow: QuestFlow): Layout {
  const byId = new Map<string, { id: string; kind: NodeKind; label: string; detail?: string; refs: string[]; col: number }>()
  for (const n of flow.nodes) {
    byId.set(n.id, { id: n.id, kind: n.kind, label: n.label, detail: n.detail, refs: n.refs ?? [], col: n.col })
  }

  // Edges may name beats the author has not written yet. Keep the edge and
  // stand in a visible placeholder rather than quietly losing the link.
  let dropped = 0
  let missing = 0
  const usable: QuestEdge[] = []
  for (const e of flow.edges) {
    const hasFrom = byId.has(e.from)
    const hasTo = byId.has(e.to)
    if (!hasFrom && !hasTo) {
      dropped++
      continue
    }
    if (!hasFrom) {
      const col = Math.max(0, (byId.get(e.to)?.col ?? 0) - 1)
      byId.set(e.from, { id: e.from, kind: 'missing', label: e.from, refs: [], col })
      missing++
    }
    if (!hasTo) {
      const col = (byId.get(e.from)?.col ?? 0) + 1
      byId.set(e.to, { id: e.to, kind: 'missing', label: e.to, refs: [], col })
      missing++
    }
    usable.push(e)
  }

  const all = [...byId.values()]
  if (!all.length) {
    return { nodes: [], edges: [], cols: 0, w: 0, h: 0, dropped, missing }
  }

  // Compact the authored column numbers so gaps do not open dead space.
  const colValues = [...new Set(all.map((n) => n.col))].sort((a, b) => a - b)
  const colIndex = new Map<number, number>(colValues.map((c, i) => [c, i]))
  const columns: string[][] = colValues.map(() => [])
  const colOf = new Map<string, number>()
  for (const n of all) {
    const c = colIndex.get(n.col) ?? 0
    colOf.set(n.id, c)
    columns[c].push(n.id)
  }

  // Ordering within a column: barycentre sweeps, so edges cross less often.
  const preds = new Map<string, string[]>()
  const succs = new Map<string, string[]>()
  for (const e of usable) {
    if (!preds.has(e.to)) preds.set(e.to, [])
    if (!succs.has(e.from)) succs.set(e.from, [])
    preds.get(e.to)?.push(e.from)
    succs.get(e.from)?.push(e.to)
  }
  const rowOf = new Map<string, number>()
  const reindex = () => columns.forEach((list) => list.forEach((id, i) => rowOf.set(id, i)))
  reindex()

  for (let pass = 0; pass < 4; pass++) {
    const forward = pass % 2 === 0
    const order = columns.map((_, i) => i)
    const seq = forward ? order.slice(1) : order.slice(0, -1).reverse()
    for (const c of seq) {
      const list = columns[c]
      const keyed = list.map((id, i) => {
        const rel = (forward ? preds.get(id) : succs.get(id)) ?? []
        const rows = rel.filter((r) => colOf.get(r) !== c).map((r) => rowOf.get(r) ?? 0)
        const bary = rows.length ? rows.reduce((a, b) => a + b, 0) / rows.length : (rowOf.get(id) ?? i)
        return { id, bary, i }
      })
      keyed.sort((a, b) => a.bary - b.bary || a.i - b.i)
      columns[c] = keyed.map((k) => k.id)
      columns[c].forEach((id, i) => rowOf.set(id, i))
    }
  }

  const maxRows = columns.reduce((m, l) => Math.max(m, l.length), 1)

  const nodes: LNode[] = []
  columns.forEach((list, c) => {
    // Whole-row offset only, so the row grid — and the edge lanes that ride in
    // the gaps between rows — stay free of node boxes in every column.
    const offset = Math.floor((maxRows - list.length) / 2)
    list.forEach((id, i) => {
      const src = byId.get(id)
      if (!src) return
      const row = offset + i
      nodes.push({
        id,
        kind: src.kind,
        label: src.label,
        detail: src.detail,
        refs: src.refs,
        colIndex: c,
        row,
        x: PAD_X + c * (NW + GAP_X),
        y: PAD_TOP + row * PITCH_Y,
        lines: wrapLabel(src.label, KIND[src.kind].wrap),
      })
    })
  })

  const pos = new Map<string, LNode>(nodes.map((n) => [n.id, n]))
  const w = PAD_X * 2 + columns.length * NW + Math.max(0, columns.length - 1) * GAP_X
  const h = PAD_TOP + maxRows * NH + Math.max(0, maxRows - 1) * GAP_Y + PAD_BOTTOM

  const laneOf = (y: number) => {
    const l = Math.max(0, Math.min(maxRows, Math.round((y - PAD_TOP + GAP_Y / 2) / PITCH_Y)))
    return PAD_TOP + l * PITCH_Y - GAP_Y / 2
  }

  const edges: LEdge[] = []
  usable.forEach((e, i) => {
    const s = pos.get(e.from)
    const t = pos.get(e.to)
    if (!s || !t) return
    const sx = s.x + NW - KIND[s.kind].anchorR
    const sy = s.y + NH / 2
    const tx = t.x + KIND[t.kind].anchorL
    const ty = t.y + NH / 2
    let d: string
    let lx: number
    let ly: number
    if (t.colIndex === s.colIndex + 1) {
      // Neighbouring columns: a plain S-curve, which stays inside the gap.
      const dx = Math.max(28, (tx - sx) * 0.5)
      d = `M ${sx} ${sy} C ${sx + dx} ${sy}, ${tx - dx} ${ty}, ${tx} ${ty}`
      lx = (sx + tx) / 2
      ly = (sy + ty) / 2
    } else {
      // Longer or backward runs ride a lane in the gap between two rows.
      const lane = laneOf((sy + ty) / 2)
      const a = sx + 54
      const b = tx - 54
      d =
        `M ${sx} ${sy} C ${sx + 26} ${sy}, ${a} ${lane}, ${a + 22} ${lane} ` +
        `L ${b - 22} ${lane} C ${b} ${lane}, ${tx - 26} ${ty}, ${tx} ${ty}`
      lx = (a + b) / 2
      ly = lane
    }
    edges.push({ key: `${e.from}->${e.to}#${i}`, from: e.from, to: e.to, label: e.label, bad: !!e.bad, hidden: !!e.hidden, d, lx, ly })
  })

  return { nodes, edges, cols: columns.length, w, h, dropped, missing }
}

/* ------------------------------------------------------------------ */
/* Diagram pieces                                                      */
/* ------------------------------------------------------------------ */

function Silhouette({ kind, width = 28, height = 13 }: { kind: NodeKind; width?: number; height?: number }) {
  const st = KIND[kind]
  return (
    <svg className="qf-swatch" viewBox={`0 0 ${NW} ${NH}`} width={width} height={height} aria-hidden="true" focusable="false">
      <path
        d={st.path}
        fill={st.colour}
        fillOpacity={st.fillOpacity ?? 0.18}
        stroke={st.colour}
        strokeWidth={7}
        strokeDasharray={st.dashed ? '18 12' : undefined}
        strokeLinejoin="round"
      />
      {st.rules?.map((rx) => <rect key={rx} x={rx} y={10} width={5} height={NH - 20} fill={st.colour} />)}
    </svg>
  )
}

function FlowNode({
  n,
  selected,
  dim,
  onSelect,
}: {
  n: LNode
  selected: boolean
  dim: boolean
  onSelect: (id: string, viaKeyboard: boolean) => void
}) {
  const st = KIND[n.kind]
  const ys = n.lines.length > 1 ? TEXT_Y2 : [TEXT_Y1]
  const notes = !!n.detail || n.refs.length > 0
  const cx = NW / 2

  return (
    <g
      className="qf-node"
      transform={`translate(${n.x} ${n.y})`}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      aria-label={`${st.label}: ${n.label}${notes ? '. Has notes' : ''}`}
      opacity={dim ? 0.3 : 1}
      onClick={() => onSelect(n.id, false)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault()
          e.stopPropagation()
          onSelect(n.id, true)
        }
      }}
    >
      <title>{n.detail ? `${st.label}: ${n.label} — ${n.detail}` : `${st.label}: ${n.label}`}</title>
      {/* One ring, shown on selection and on keyboard focus (see .qf-ring). */}
      <rect
        className={selected ? 'qf-ring on' : 'qf-ring'}
        x={-8}
        y={-21}
        width={NW + 16}
        height={NH + 29}
        fill="none"
        stroke="var(--brass)"
        strokeWidth={1.5}
      />
      <path
        d={st.path}
        fill={st.colour}
        fillOpacity={st.fillOpacity ?? 0.15}
        stroke={st.colour}
        strokeWidth={selected ? 2.4 : 1.4}
        strokeDasharray={st.dashed ? '7 5' : undefined}
        strokeLinejoin="round"
      />
      {st.rules?.map((rx) => <rect key={rx} x={rx} y={10} width={2.5} height={NH - 20} fill={st.colour} />)}
      <rect x={0} y={-17} width={8} height={8} fill={st.colour} />
      <text className="qf-cap" x={13} y={-9}>
        {st.label.toUpperCase()}
        {notes ? ' ·' : ''}
      </text>
      <text className="qf-label" x={cx} textAnchor="middle">
        {n.lines.map((line, i) => (
          <tspan key={i} x={cx} y={ys[i]}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  )
}

function FlowEdge({ e, uid, state }: { e: LEdge; uid: string; state: 'normal' | 'lit' | 'dim' }) {
  const colour = e.bad ? 'var(--crimson-lit)' : e.hidden ? 'var(--violet)' : 'var(--brass-dim)'
  const marker = e.bad ? 'bad' : e.hidden ? 'hid' : 'norm'
  // The chip has to sit inside the column gap, so long labels are cut here and
  // read in full from the beat panel instead.
  const label =
    e.label && e.label.length > EDGE_LABEL_MAX ? `${e.label.slice(0, EDGE_LABEL_MAX - 1).trimEnd()}…` : e.label
  const stacked = !!e.hidden && !!label
  const cw = Math.max(e.hidden ? 54 : 0, label ? label.length * 6.1 + 14 : 0)
  const ch = stacked ? 32 : 18

  return (
    <g opacity={state === 'dim' ? 0.16 : 1}>
      <path
        d={e.d}
        fill="none"
        stroke={state === 'lit' ? 'var(--brass-lit)' : colour}
        strokeWidth={state === 'lit' ? 2.2 : 1.5}
        strokeDasharray={e.hidden ? '7 5' : undefined}
        markerEnd={`url(#qfa-${uid}-${state === 'lit' ? 'lit' : marker})`}
      />
      {cw > 0 ? (
        <g>
          <rect
            x={e.lx - cw / 2}
            y={e.ly - ch / 2}
            width={cw}
            height={ch}
            fill="var(--bg-deep)"
            stroke={e.hidden ? 'var(--violet)' : 'var(--line)'}
            strokeDasharray={e.hidden ? '4 3' : undefined}
          />
          {e.hidden ? (
            <text className="qf-tag" x={e.lx} y={stacked ? e.ly - 3 : e.ly + 4} textAnchor="middle">
              hidden
            </text>
          ) : null}
          {label ? (
            <text className="qf-elabel" x={e.lx} y={stacked ? e.ly + 12 : e.ly + 4} textAnchor="middle">
              {label}
            </text>
          ) : null}
        </g>
      ) : null}
    </g>
  )
}

function Legend({ showMissing }: { showMissing: boolean }) {
  const keys: NodeKind[] = showMissing ? [...KIND_ORDER, 'missing'] : KIND_ORDER
  return (
    <>
      <div className="flow-legend">
        {keys.map((k) => (
          <span className="flow-key" key={k}>
            <Silhouette kind={k} />
            {KIND[k].label}
          </span>
        ))}
        <span className="flow-key">
          <svg className="qf-swatch" width={28} height={13} viewBox="0 0 28 13" aria-hidden="true" focusable="false">
            <path d="M 1 11 C 10 11, 18 2, 27 2" fill="none" stroke="var(--brass-dim)" strokeWidth={1.6} />
          </svg>
          Path
        </span>
        <span className="flow-key">
          <svg className="qf-swatch" width={28} height={13} viewBox="0 0 28 13" aria-hidden="true" focusable="false">
            <path d="M 1 11 C 10 11, 18 2, 27 2" fill="none" stroke="var(--crimson-lit)" strokeWidth={1.6} />
          </svg>
          Costly path
        </span>
        <span className="flow-key">
          <svg className="qf-swatch" width={28} height={13} viewBox="0 0 28 13" aria-hidden="true" focusable="false">
            <path d="M 1 11 C 10 11, 18 2, 27 2" fill="none" stroke="var(--violet)" strokeWidth={1.6} strokeDasharray="4 3" />
          </svg>
          Hidden path
        </span>
        <span className="flow-key">
          <span aria-hidden="true" style={{ color: 'var(--text-2)' }}>
            &middot;
          </span>
          Beat carries notes
        </span>
      </div>
      <details className="qf-keys">
        <summary>What the shapes mean</summary>
        <dl className="kv">
          {keys.map((k) => (
            <div key={k} style={{ display: 'contents' }}>
              <dt>
                <Silhouette kind={k} /> {KIND[k].label}
              </dt>
              <dd>{KIND[k].hint}</dd>
            </div>
          ))}
          <dt>Costly path</dt>
          <dd>Drawn in crimson: the discouraged or expensive route out of a beat.</dd>
          <dt>Hidden path</dt>
          <dd>Dashed violet with a &ldquo;hidden&rdquo; tag: a route the player has to earn.</dd>
        </dl>
      </details>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* The diagram                                                         */
/* ------------------------------------------------------------------ */

const MIN_ZOOM = 0.28
const MAX_ZOOM = 2.4

export function QuestFlowView({ quest }: { quest: Entity }) {
  const uid = useId().replace(/:/g, '')
  const stage = useRef<HTMLDivElement>(null)
  const drag = useRef<{ x: number; y: number; vx: number; vy: number; moved: boolean } | null>(null)
  const movedRef = useRef(false)
  const lastFit = useRef('')

  const [size, setSize] = useState({ w: 0, h: 0 })
  const [view, setView] = useState({ k: 1, x: 0, y: 0 })
  const [panning, setPanning] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)

  const raw = quest.fields.flow
  const flow = useMemo(() => parseFlow(raw), [raw])
  const layout = useMemo(() => (flow ? layoutFlow(flow) : null), [flow])

  useEffect(() => {
    setSelected(null)
  }, [quest.id])

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

  /**
   * `fit` shows the whole graph, however small that makes the type. `auto` is
   * the opening view: full size for anything wider than the pane, anchored at
   * the first column, so labels are legible before the reader touches a control.
   */
  const setViewFor = useCallback(
    (intent: 'fit' | 'auto') => {
      if (!layout || !size.w || !size.h || !layout.w || !layout.h) return
      const whole = Math.min((size.w - 16) / layout.w, (size.h - 16) / layout.h)
      const k =
        intent === 'fit' ? Math.max(MIN_ZOOM, Math.min(1.25, whole)) : whole >= 1 ? Math.min(1.15, whole) : 1
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

  // Reset the view whenever the graph or the viewport changes shape.
  const fitKey = `${quest.id}|${layout?.w ?? 0}x${layout?.h ?? 0}|${Math.round(size.w)}x${Math.round(size.h)}`
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

  const onKeyDown = (e: React.KeyboardEvent<SVGSVGElement>) => {
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

  // A click that ends a pan must not also select; a key press always selects.
  const select = useCallback((id: string, viaKeyboard: boolean) => {
    if (!viaKeyboard && movedRef.current) return
    setSelected((prev) => (prev === id ? null : id))
  }, [])

  const nodeById = useMemo(() => new Map((layout?.nodes ?? []).map((n) => [n.id, n])), [layout])
  const neighbours = useMemo(() => {
    const set = new Set<string>()
    if (!layout || !selected) return set
    set.add(selected)
    for (const e of layout.edges) {
      if (e.from === selected) set.add(e.to)
      if (e.to === selected) set.add(e.from)
    }
    return set
  }, [layout, selected])

  const sel = selected ? nodeById.get(selected) : undefined
  const outgoing = layout && sel ? layout.edges.filter((e) => e.from === sel.id) : []
  const incoming = layout && sel ? layout.edges.filter((e) => e.to === sel.id) : []

  if (isTbd(raw)) {
    return (
      <EmptyState title="The branching flow is an open question">
        {raw.q ?? 'This quest is marked as having an undecided flow. Nothing has been mapped yet.'}
      </EmptyState>
    )
  }

  if (!layout || !layout.nodes.length) {
    return (
      <EmptyState title="No branching flow has been mapped for this quest">
        {layout && layout.dropped > 0 ? (
          <>
            The flow payload holds {layout.dropped} link{layout.dropped === 1 ? '' : 's'} but no beats for them to join. Add the
            beats to <span className="mono">fields.flow.nodes</span> and the diagram will draw itself.
          </>
        ) : (
          <>
            A flow is stored on the quest as <span className="mono">fields.flow</span>, with a list of beats and the edges
            between them. Until one is written, the quest reads as a straight line.
          </>
        )}
      </EmptyState>
    )
  }

  const endings = layout.nodes.filter((n) => n.kind === 'success' || n.kind === 'failure').length

  return (
    <div className="panel">
      <div className="panel-head qf-head">
        <h3>Branching flow</h3>
        <span className="dim qf-counts" style={{ fontSize: 'var(--fs-micro)' }}>
          {layout.nodes.length} beats &middot; {layout.edges.length} links &middot; {endings} endings
        </span>
        <span className="spacer" />
        <div className="btn-row">
          <span className="mono dim qf-counts" style={{ fontSize: 'var(--fs-micro)' }} aria-hidden="true">
            {Math.round(view.k * 100)}%
          </span>
          <button type="button" className="btn sm" onClick={() => zoomAt(1 / 1.2, size.w / 2, size.h / 2)} aria-label="Zoom out">
            &minus;
          </button>
          <button type="button" className="btn sm" onClick={() => zoomAt(1.2, size.w / 2, size.h / 2)} aria-label="Zoom in">
            +
          </button>
          <button type="button" className="btn sm" onClick={fit} title="Show the whole flow">
            Fit
          </button>
          <button type="button" className="btn sm" onClick={() => setViewFor('auto')} title="Back to the opening view">
            Reset
          </button>
        </div>
      </div>

      <div
        ref={stage}
        className={`canvas-panel qf-stage${panning ? ' dragging' : ''}`}
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
          aria-label={`Branching flow for ${quest.name}. Arrow keys pan, plus and minus zoom, 0 fits the diagram. Tab moves between beats.`}
          onKeyDown={onKeyDown}
        >
          <defs>
            {[
              { id: 'norm', c: 'var(--brass-dim)' },
              { id: 'bad', c: 'var(--crimson-lit)' },
              { id: 'hid', c: 'var(--violet)' },
              { id: 'lit', c: 'var(--brass-lit)' },
            ].map((m) => (
              <marker
                key={m.id}
                id={`qfa-${uid}-${m.id}`}
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

          <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>
            {Array.from({ length: layout.cols }, (_, c) => (
              <g key={c}>
                {c % 2 === 0 ? (
                  <rect x={PAD_X + c * (NW + GAP_X) - 8} y={0} width={NW + 16} height={layout.h} fill="var(--s1)" opacity={0.55} />
                ) : null}
                <text className="qf-col" x={PAD_X + c * (NW + GAP_X)} y={18}>
                  COLUMN {c + 1}
                </text>
              </g>
            ))}

            {layout.edges.map((e) => (
              <FlowEdge
                key={e.key}
                e={e}
                uid={uid}
                state={!selected ? 'normal' : e.from === selected || e.to === selected ? 'lit' : 'dim'}
              />
            ))}

            {layout.nodes.map((n) => (
              <FlowNode key={n.id} n={n} selected={selected === n.id} dim={!!selected && !neighbours.has(n.id)} onSelect={select} />
            ))}
          </g>
        </svg>
      </div>

      <Legend showMissing={layout.missing > 0} />

      <div className="panel-body qf-detail">
        {sel ? (
          <>
            <div className="btn-row" style={{ marginBottom: 'var(--sp-2)' }}>
              <span className="chip" style={{ color: KIND[sel.kind].colour, borderColor: 'currentColor' }}>
                <Silhouette kind={sel.kind} width={22} height={11} />
                {KIND[sel.kind].label}
              </span>
              <strong style={{ fontFamily: 'var(--ff-display)', fontSize: 'var(--fs-md)' }}>{sel.label}</strong>
              <button type="button" className="btn ghost sm" style={{ marginLeft: 'auto' }} onClick={() => setSelected(null)}>
                Clear
              </button>
            </div>
            <p className="prose" style={{ fontSize: 'var(--fs-sm)' }}>
              {sel.kind === 'missing'
                ? `Nothing in this flow defines a beat with the id "${sel.id}". Either add it to the node list or repoint the edges.`
                : (sel.detail ?? 'No notes have been written for this beat.')}
            </p>
            {sel.refs.length ? (
              <div style={{ marginTop: 'var(--sp-3)' }}>
                <div className="label" style={{ marginBottom: 4 }}>
                  Touches
                </div>
                <div className="btn-row">
                  {sel.refs.map((r) => (
                    <EntityChip key={r} id={r} />
                  ))}
                </div>
              </div>
            ) : null}
            {outgoing.length || incoming.length ? (
              <div className="qf-links">
                {incoming.length ? (
                  <div>
                    <div className="label" style={{ marginBottom: 4 }}>
                      Reached from
                    </div>
                    <div className="btn-row">
                      {incoming.map((e) => (
                        <button key={e.key} type="button" className="btn sm" onClick={() => setSelected(e.from)}>
                          {nodeById.get(e.from)?.label ?? e.from}
                          {e.label ? <span className="dimmer"> &middot; {e.label}</span> : null}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
                {outgoing.length ? (
                  <div>
                    <div className="label" style={{ marginBottom: 4 }}>
                      Leads to
                    </div>
                    <div className="btn-row">
                      {outgoing.map((e) => (
                        <button key={e.key} type="button" className="btn sm" onClick={() => setSelected(e.to)}>
                          {e.label ? <span className="dimmer">{e.label} &rarr; </span> : null}
                          {nodeById.get(e.to)?.label ?? e.to}
                          {e.bad ? <span style={{ color: 'var(--crimson-lit)' }}> costly</span> : null}
                          {e.hidden ? <span style={{ color: 'var(--t-spell)' }}> hidden</span> : null}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </>
        ) : (
          <p className="dim" style={{ fontSize: 'var(--fs-sm)' }}>
            Select a beat to read its notes and the entries it touches. Drag to pan, scroll to zoom, or use Tab and Enter from the
            keyboard.
          </p>
        )}
        {layout.dropped > 0 ? (
          <p className="dim" style={{ fontSize: 'var(--fs-micro)', marginTop: 'var(--sp-3)' }}>
            {layout.dropped} link{layout.dropped === 1 ? '' : 's'} could not be drawn: neither end names a beat in this flow.
          </p>
        ) : null}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Board                                                               */
/* ------------------------------------------------------------------ */

function refList(e: Entity, key: string): string[] {
  const v = e.fields[key]
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string' && !!x) : []
}

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
  if (typeof v === 'number' && Number.isFinite(v)) return <>{v}</>
  return <span className="dimmer">&mdash;</span>
}

function RefCell({ ids }: { ids: string[] }) {
  if (!ids.length) return <span className="dimmer">&mdash;</span>
  return (
    <>
      {ids.slice(0, 2).map((id, i) => (
        <span key={id}>
          {i ? ', ' : null}
          <EntityLink id={id} />
        </span>
      ))}
      {ids.length > 2 ? <span className="dimmer"> +{ids.length - 2}</span> : null}
    </>
  )
}

export default function QuestFlowPage() {
  const world = useWorld()
  const [params, setParams] = useSearchParams()
  const [mode, setMode] = useLocalState<'flow' | 'list'>('questflow.mode', 'flow')

  const quests = useMemo(() => (world ? entitiesOfType(world, 'quest') : []), [world])
  const index = useMemo(() => (world ? buildIndex(world) : null), [world])

  const rows = useMemo(
    () =>
      quests.map((quest) => {
        const flow = parseFlow(quest.fields.flow)
        const nodes = flow?.nodes ?? []
        return {
          quest,
          beats: nodes.length,
          endings: nodes.filter((n) => n.kind === 'success' || n.kind === 'failure').length,
          hidden: (flow?.edges ?? []).filter((e) => e.hidden).length,
        }
      }),
    [quests],
  )
  const withFlow = useMemo(() => rows.filter((r) => r.beats > 0), [rows])

  const wanted = params.get('q') ?? ''
  const current = withFlow.find((r) => r.quest.id === wanted) ?? withFlow[0]

  const selectQuest = useCallback(
    (id: string) => {
      const next = new URLSearchParams(params)
      next.set('q', id)
      setParams(next, { replace: true })
    },
    [params, setParams],
  )

  const giversOf = useCallback(
    (q: Entity) => {
      const ids = new Set(refList(q, 'questGiver'))
      if (index) for (const s of sourcesOf(index, q.id, 'gives_quest')) ids.add(s)
      return [...ids]
    },
    [index],
  )

  return (
    <div className="main-pad">
      <div className="page-head">
        <div>
          <h1>Quest flows</h1>
          <p className="lede">
            Every branching quest, drawn beat by beat. Shape and colour carry the consequence: choices, checks, fights, findings,
            endings and the world-state changes they leave behind.
          </p>
        </div>
        <div style={{ marginLeft: 'auto' }} className="btn-row">
          <div className="mode-toggle" role="group" aria-label="View">
            <button type="button" aria-pressed={mode === 'flow'} onClick={() => setMode('flow')}>
              Flow
            </button>
            <button type="button" aria-pressed={mode === 'list'} onClick={() => setMode('list')}>
              List
            </button>
          </div>
        </div>
      </div>

      <p className="dim" style={{ fontSize: 'var(--fs-sm)', marginBottom: 'var(--sp-4)' }}>
        {quests.length} quest{quests.length === 1 ? '' : 's'} written &middot; {withFlow.length} with a mapped flow
      </p>

      {quests.length === 0 ? (
        <EmptyState title="No quests have been written yet">
          Quests appear here as soon as they exist. A quest gains a diagram once its <span className="mono">flow</span> field
          holds a set of beats.
        </EmptyState>
      ) : mode === 'list' ? (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Quest</th>
                <th scope="col">Type</th>
                <th scope="col">Given by</th>
                <th scope="col">Starts at</th>
                <th scope="col">Stage</th>
                <th scope="col">Status</th>
                <th scope="col">Flow</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.quest.id}>
                  <th scope="row" className="qf-rowhead">
                    <EntityLink id={r.quest.id} />
                  </th>
                  <td>
                    <FieldText e={r.quest} k="questType" />
                  </td>
                  <td>
                    <RefCell ids={giversOf(r.quest)} />
                  </td>
                  <td>
                    <RefCell ids={refList(r.quest, 'startLocation')} />
                  </td>
                  <td>
                    <FieldText e={r.quest} k="devStatus" />
                  </td>
                  <td>
                    <StatusBadge status={r.quest.status} />
                  </td>
                  <td>
                    {r.beats > 0 ? (
                      <button
                        type="button"
                        className="btn sm"
                        onClick={() => {
                          selectQuest(r.quest.id)
                          setMode('flow')
                        }}
                      >
                        {r.beats} beats
                      </button>
                    ) : (
                      <span className="dimmer">Not mapped</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : withFlow.length === 0 || !current ? (
        <EmptyState title="No quest has a branching flow yet">
          {quests.length} quest{quests.length === 1 ? ' is' : 's are'} written, but none carries a{' '}
          <span className="mono">flow</span> payload. Switch to the list to see what exists.
        </EmptyState>
      ) : (
        <div className="qf-board">
          <div className="panel">
            <div className="panel-head">
              <h3>Quests with a flow</h3>
              <span className="spacer" />
              <span className="dim" style={{ fontSize: 'var(--fs-micro)' }}>
                {withFlow.length}
              </span>
            </div>
            <div className="qf-picker">
              {withFlow.map((r) => (
                <button
                  type="button"
                  key={r.quest.id}
                  className="qf-pick"
                  aria-current={r.quest.id === current.quest.id}
                  onClick={() => selectQuest(r.quest.id)}
                >
                  <span className="qf-pick-name">{r.quest.name}</span>
                  <span className="qf-pick-meta">
                    <StatusBadge status={r.quest.status} title={false} />
                    <span>
                      {r.beats} beats &middot; {r.endings} endings
                      {r.hidden ? ` · ${r.hidden} hidden` : ''}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="btn-row" style={{ marginBottom: 'var(--sp-3)' }}>
              <h2 style={{ fontSize: 'var(--fs-lg)' }}>{current.quest.name}</h2>
              <StatusBadge status={current.quest.status} />
              <EntityLink id={current.quest.id} label="Open the quest entry" glyph={false} />
            </div>
            {current.quest.summary ? (
              <p className="prose" style={{ fontSize: 'var(--fs-sm)', marginBottom: 'var(--sp-3)' }}>
                {current.quest.summary}
              </p>
            ) : null}
            <QuestFlowView quest={current.quest} />
          </div>
        </div>
      )}
    </div>
  )
}
