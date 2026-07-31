/**
 * Faction relationship matrix and the per-NPC relationship graph.
 *
 * The matrix is the editing surface for standings between factions: one cell
 * per ordered pair, written straight back to the store through
 * `setRelationKind`, so a change is visible everywhere the relation is read.
 * The graph is a read-only radial view of one NPC's ties, with a plain list
 * underneath so the information is never locked inside a picture.
 */

import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RELATION_META, type EntityType, type RelationKind } from '../core/types'
import { setRelationKind, useWorld, type WorldState } from '../core/store'
import { buildIndex, entitiesOfType } from '../core/relations'
import { SCHEMAS } from '../core/schema'
import { setShowSecrets, useUiState } from '../core/uiState'
import { EntityLink, entityPathById } from './EntityLink'
import { Dialog, EmptyState, ErrorState, Loading, toast } from './ui'

/* ------------------------------------------------------------------ */
/* Vocabulary                                                          */
/* ------------------------------------------------------------------ */

/** The kinds the matrix owns. Setting a cell replaces any of these on the pair. */
const MATRIX_KINDS = [
  'allied_with',
  'truce_with',
  'trades_with',
  'owes_debt_to',
  'rival_of',
  'at_war_with',
  'infiltrates',
  'secretly_cooperates_with',
  'smuggles_with',
] as const

type MatrixKind = (typeof MATRIX_KINDS)[number]

const ALLOWED_KINDS: RelationKind[] = [...MATRIX_KINDS]

const isMatrixKind = (k: string): k is MatrixKind => (MATRIX_KINDS as readonly string[]).includes(k)

interface KindLook {
  glyph: string
  color: string
  /** Reads differently from each end, so the cell shows which way it points. */
  directional?: boolean
}

const LOOK: Record<MatrixKind, KindLook> = {
  allied_with: { glyph: '◆', color: 'var(--verd-lit)' },
  truce_with: { glyph: '◇', color: '#88ab9d' },
  trades_with: { glyph: '⇄', color: '#7f9ab4' },
  owes_debt_to: { glyph: '»', color: 'var(--amber)', directional: true },
  rival_of: { glyph: '≠', color: '#b06a5e' },
  at_war_with: { glyph: '✕', color: 'var(--crimson-lit)' },
  infiltrates: { glyph: '◐', color: '#9a83bd', directional: true },
  secretly_cooperates_with: { glyph: '◑', color: '#7d6ea0' },
  smuggles_with: { glyph: '≈', color: '#9a8358' },
}

const isCovertKind = (k: MatrixKind): boolean => !!RELATION_META[k].covert

const OPEN_KINDS = MATRIX_KINDS.filter((k) => !isCovertKind(k))
const COVERT_KINDS = MATRIX_KINDS.filter((k) => isCovertKind(k))

/* ------------------------------------------------------------------ */
/* Tie index                                                           */
/* ------------------------------------------------------------------ */

interface Tie {
  kind: MatrixKind
  /** `out` — the relation is authored row → column. `in` — the mirror of it. */
  dir: 'out' | 'in'
  covert: boolean
  note?: string
}

const cellKey = (from: string, to: string) => `${from}::${to}`

/**
 * One tie per ordered pair. Relations authored the other way round are
 * mirrored into the opposite cell so a standing shows on both sides of the
 * diagonal, which is how people read a matrix.
 */
function buildTies(world: WorldState | null): Map<string, Tie> {
  const ties = new Map<string, Tie>()
  if (!world || typeof world.relations !== 'object' || world.relations === null) return ties

  const usable = Object.values(world.relations).filter((r) => {
    if (!r || typeof r.from !== 'string' || typeof r.to !== 'string' || typeof r.kind !== 'string') return false
    if (r.from === r.to) return false
    if (!isMatrixKind(r.kind)) return false
    return world.entities[r.from]?.type === 'faction' && world.entities[r.to]?.type === 'faction'
  })

  for (const r of usable) {
    const kind = r.kind as MatrixKind
    ties.set(cellKey(r.from, r.to), { kind, dir: 'out', covert: isCovertKind(kind) || !!r.secret, note: r.note })
  }
  for (const r of usable) {
    const kind = r.kind as MatrixKind
    const key = cellKey(r.to, r.from)
    if (ties.has(key)) continue
    ties.set(key, { kind, dir: 'in', covert: isCovertKind(kind) || !!r.secret, note: r.note })
  }
  return ties
}

/** How the tie reads from the row faction's point of view. */
function tieLabel(t: Tie): string {
  const meta = RELATION_META[t.kind]
  return t.dir === 'out' ? meta.label : meta.inverse
}

/* ------------------------------------------------------------------ */
/* Matrix                                                              */
/* ------------------------------------------------------------------ */

export function RelationMatrix() {
  const world = useWorld()
  const { showSecrets } = useUiState()
  const [filter, setFilter] = useState('')
  const [pick, setPick] = useState<{ from: string; to: string } | null>(null)

  const factions = useMemo(() => (world ? entitiesOfType(world, 'faction') : []), [world])
  const ties = useMemo(() => buildTies(world), [world])

  const query = filter.trim().toLowerCase()
  const shown = useMemo(
    () =>
      query
        ? factions.filter(
            (f) =>
              f.name.toLowerCase().includes(query) ||
              (Array.isArray(f.aka) ? f.aka : []).some((a) => typeof a === 'string' && a.toLowerCase().includes(query)),
          )
        : factions,
    [factions, query],
  )

  const counts = useMemo(() => {
    let total = 0
    let hidden = 0
    for (const t of ties.values()) {
      if (t.dir !== 'out') continue
      total += 1
      if (t.covert) hidden += 1
    }
    return { total, hidden }
  }, [ties])

  if (!world) return <Loading label="Reading the world" />

  if (factions.length < 2) {
    return (
      <EmptyState title="Not enough factions to compare">
        The matrix sets one faction against another. Add at least two faction entries and their alliances, rivalries,
        wars, debts and covert ties can be recorded here.
      </EmptyState>
    )
  }

  const openPicker = (from: string, to: string) => setPick({ from, to })

  const apply = (from: string, to: string, kind: MatrixKind | null) => {
    setRelationKind(from, to, kind, ALLOWED_KINDS)
    const a = world.entities[from]?.name ?? from
    const b = world.entities[to]?.name ?? to
    toast(kind ? `${a} — ${RELATION_META[kind].label.toLowerCase()} — ${b}` : `Cleared: ${a} and ${b}`, 'ok')
    setPick(null)
  }

  return (
    <div className="rm-wrap">
      <div className="btn-row" style={{ marginBottom: 'var(--sp-3)' }}>
        <label className="sr-only" htmlFor="rm-filter">
          Filter factions by name
        </label>
        <input
          id="rm-filter"
          className="input"
          style={{ maxWidth: 220 }}
          value={filter}
          placeholder="Filter factions"
          onChange={(e) => setFilter(e.target.value)}
        />
        <button
          type="button"
          className={`btn sm${showSecrets ? ' on' : ''}`}
          aria-pressed={showSecrets}
          onClick={() => setShowSecrets(!showSecrets)}
        >
          Reveal secrets
        </button>
        <span className="dim" style={{ fontSize: 'var(--fs-micro)', marginLeft: 'auto' }}>
          {counts.total} {counts.total === 1 ? 'standing' : 'standings'} recorded
          {!showSecrets && counts.hidden > 0
            ? ` · ${counts.hidden} covert ${counts.hidden === 1 ? 'tie is' : 'ties are'} hidden`
            : null}
        </span>
      </div>

      {shown.length < 2 ? (
        <EmptyState title="Fewer than two factions match that filter">
          Clear the filter, or widen it, to see the grid again.
        </EmptyState>
      ) : (
        <div className="rm-scroll">
          <table className="matrix">
            <caption className="sr-only">
              Faction relationships. Each row is a faction and each column is the faction with the matching number in the
              row headings. Activate a cell to set or clear the relationship.
            </caption>
            <thead>
              <tr>
                <th className="rm-corner" scope="col">
                  <span className="label">Faction</span>
                </th>
                {shown.map((f, i) => (
                  <th key={f.id} className="rm-col" scope="col" title={f.name}>
                    <span aria-hidden="true">{i + 1}</span>
                    <span className="sr-only">{f.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shown.map((row, ri) => (
                <tr key={row.id}>
                  <th className="row-head" scope="row">
                    <span className="rm-idx" aria-hidden="true">
                      {ri + 1}
                    </span>
                    <EntityLink id={row.id} glyph={false} />
                  </th>
                  {shown.map((col) => {
                    if (col.id === row.id) {
                      return (
                        <td key={col.id}>
                          <div className="matrix-cell self" aria-hidden="true" />
                        </td>
                      )
                    }
                    const tie = ties.get(cellKey(row.id, col.id))
                    return (
                      <td key={col.id}>
                        <MatrixCell
                          rowName={row.name}
                          colName={col.name}
                          tie={tie}
                          reveal={showSecrets}
                          onOpen={() => openPicker(row.id, col.id)}
                        />
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flow-legend rm-legend">
        {MATRIX_KINDS.map((k) => {
          const look = LOOK[k]
          const covert = isCovertKind(k)
          if (covert && !showSecrets) return null
          return (
            <span className="flow-key" key={k}>
              <span className={`rm-glyph${covert ? ' rm-glyph-covert' : ''}`} style={{ color: look.color }} aria-hidden="true">
                {look.glyph}
              </span>
              {RELATION_META[k].label}
              {look.directional ? <span className="dimmer"> (row → column)</span> : null}
            </span>
          )
        })}
        {!showSecrets ? <span className="flow-key dimmer">Covert kinds appear once secrets are revealed.</span> : null}
      </div>

      <p className="dim" style={{ fontSize: 'var(--fs-micro)', marginTop: 6 }}>
        Column numbers match the numbered rows. A cell reads from its row faction to its column faction; a standing set
        one way is shown on both sides of the diagonal.
      </p>

      {pick ? (
        <CellPicker
          world={world}
          from={pick.from}
          to={pick.to}
          tie={ties.get(cellKey(pick.from, pick.to))}
          reveal={showSecrets}
          onApply={apply}
          onClose={() => setPick(null)}
        />
      ) : null}
    </div>
  )
}

function MatrixCell({
  rowName,
  colName,
  tie,
  reveal,
  onOpen,
}: {
  rowName: string
  colName: string
  tie: Tie | undefined
  reveal: boolean
  onOpen: () => void
}) {
  const visible = tie && (!tie.covert || reveal) ? tie : undefined
  const look = visible ? LOOK[visible.kind] : null
  const label = visible ? tieLabel(visible) : null

  const description = visible
    ? `${rowName} — ${label?.toLowerCase()} — ${colName}. Change this relationship.`
    : `${rowName} and ${colName}: no relationship recorded. Set one.`

  const classes = ['matrix-cell']
  if (visible) classes.push('rm-set')
  if (visible?.covert) classes.push('rm-covert')

  return (
    <button
      type="button"
      className={classes.join(' ')}
      style={visible?.covert && look ? { borderColor: look.color } : undefined}
      title={visible ? `${rowName} ${label?.toLowerCase()} ${colName}` : `${rowName} · ${colName} — not set`}
      aria-label={description}
      onClick={onOpen}
    >
      {visible && look ? (
        <>
          <span className="rm-glyph" style={{ color: look.color }} aria-hidden="true">
            {look.glyph}
          </span>
          {look.directional ? (
            <span className="rm-dir" aria-hidden="true">
              {visible.dir === 'out' ? '›' : '‹'}
            </span>
          ) : null}
        </>
      ) : (
        <span aria-hidden="true" className="rm-blank">
          ·
        </span>
      )}
    </button>
  )
}

function CellPicker({
  world,
  from,
  to,
  tie,
  reveal,
  onApply,
  onClose,
}: {
  world: WorldState
  from: string
  to: string
  tie: Tie | undefined
  reveal: boolean
  onApply: (from: string, to: string, kind: MatrixKind | null) => void
  onClose: () => void
}) {
  const fromName = world.entities[from]?.name ?? from
  const toName = world.entities[to]?.name ?? to
  const locked = !!tie && tie.covert && !reveal

  const option = (k: MatrixKind) => {
    const look = LOOK[k]
    // A directional tie authored the other way round is a different statement,
    // so it must not read as the current setting for this cell.
    const current = tie?.kind === k && (!look.directional || tie.dir === 'out')
    return (
      <button
        key={k}
        type="button"
        className={`rm-pick${isCovertKind(k) ? ' rm-pick-covert' : ''}`}
        aria-pressed={current}
        onClick={() => onApply(from, to, k)}
      >
        <span className="rm-glyph" style={{ color: look.color }} aria-hidden="true">
          {look.glyph}
        </span>
        <span>
          {RELATION_META[k].label}
          {look.directional ? <span className="dimmer"> — {fromName} first</span> : null}
        </span>
      </button>
    )
  }

  return (
    <Dialog
      title={`${fromName} → ${toName}`}
      onClose={onClose}
      footer={
        <button type="button" className="btn" onClick={onClose}>
          Close
        </button>
      }
    >
      {locked ? (
        <div>
          <p style={{ fontSize: 'var(--fs-sm)' }}>
            A covert tie is recorded between these two factions and is hidden while secrets are concealed. Reveal secrets
            to read or change it.
          </p>
          <button
            type="button"
            className="btn primary"
            onClick={() => {
              setShowSecrets(true)
              toast('Secrets revealed', 'info')
            }}
          >
            Reveal secrets
          </button>
        </div>
      ) : (
        <div>
          <p style={{ fontSize: 'var(--fs-sm)' }}>
            {tie ? (
              <>
                Currently: <strong>{tieLabel(tie).toLowerCase()}</strong>. Choosing another kind replaces it; one
                standing is held per pair.
              </>
            ) : (
              <>Nothing recorded between these two yet. Pick a standing, or leave it unset.</>
            )}
          </p>
          <div className="rm-picks">
            <button type="button" className="rm-pick" aria-pressed={!tie} onClick={() => onApply(from, to, null)}>
              <span className="rm-glyph dimmer" aria-hidden="true">
                ·
              </span>
              <span>No relationship</span>
            </button>
            {OPEN_KINDS.map(option)}
          </div>

          <div className="label" style={{ margin: '14px 0 6px' }}>
            Covert
          </div>
          {reveal ? (
            <div className="rm-picks">{COVERT_KINDS.map(option)}</div>
          ) : (
            <p className="dim" style={{ fontSize: 'var(--fs-sm)' }}>
              Covert kinds are only offered while secrets are revealed, so a hidden tie is never set by accident. Use the
              reveal secrets control above the grid.
            </p>
          )}

          <p className="dim" style={{ fontSize: 'var(--fs-micro)', marginTop: 12 }}>
            Directional kinds read from {fromName} to {toName}. For the reverse — {toName} first — use the mirrored cell.
          </p>
        </div>
      )}
    </Dialog>
  )
}

/* ------------------------------------------------------------------ */
/* NPC relationship graph                                              */
/* ------------------------------------------------------------------ */

interface NpcTie {
  key: string
  other: string
  name: string
  type: EntityType
  label: string
  dir: 'out' | 'in'
  hostile: boolean
  covert: boolean
  note?: string
}

const clip = (s: string, n: number) => (s.length > n ? `${s.slice(0, Math.max(1, n - 1))}…` : s)

/** Container width in CSS pixels, so the graph is laid out at 1:1 and text stays true size. */
function useContainerWidth(fallback: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(fallback)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => setWidth(Math.round(el.getBoundingClientRect().width) || fallback)
    measure()
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure)
      return () => window.removeEventListener('resize', measure)
    }
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [fallback])
  return { ref, width }
}

export function NpcRelationshipGraph({ npcId, height }: { npcId: string; height?: number }) {
  const world = useWorld()
  const { showSecrets } = useUiState()
  const nav = useNavigate()
  const { ref, width } = useContainerWidth(640)

  const index = useMemo(() => (world ? buildIndex(world) : null), [world])

  const all = useMemo<NpcTie[]>(() => {
    if (!world || !index) return []
    const seen = new Map<string, NpcTie>()
    const add = (otherId: string, kind: string, dir: 'out' | 'in', note?: string, secret?: boolean) => {
      if (typeof otherId !== 'string' || otherId === npcId) return
      const other = world.entities[otherId]
      if (!other) return
      const meta = RELATION_META[kind as RelationKind] ?? RELATION_META.related_to
      const key = `${otherId}|${kind}|${dir}`
      if (seen.has(key)) return
      seen.set(key, {
        key,
        other: otherId,
        name: other.name,
        type: other.type,
        label: dir === 'out' ? meta.label : meta.inverse,
        dir,
        hostile: !!meta.hostile,
        covert: !!meta.covert || !!secret,
        note,
      })
    }
    for (const e of index.out[npcId] ?? []) add(e.to, e.kind, 'out', e.note, e.secret)
    for (const e of index.in[npcId] ?? []) add(e.from, e.kind, 'in', e.note, e.secret)
    return [...seen.values()].sort((a, b) => a.label.localeCompare(b.label) || a.name.localeCompare(b.name))
  }, [world, index, npcId])

  const visible = useMemo(() => all.filter((t) => showSecrets || !t.covert), [all, showSecrets])
  const hiddenCount = all.length - visible.length

  const H = Math.max(260, height ?? 380)
  const W = Math.max(280, Math.min(width, 960))

  const nodes = useMemo(() => {
    const n = visible.length
    if (!n) return []
    const cx = W / 2
    const cy = H / 2
    // Two staggered rings once the circle gets crowded, so labels stay apart.
    const twoRings = n > 8
    const outer = Math.max(92, Math.min(W / 2 - 92, H / 2 - 34))
    return visible.map((t, i) => {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2
      const r = twoRings && i % 2 === 1 ? outer * 0.68 : outer
      return {
        ...t,
        angle,
        r,
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        /** Where the relation label sits: between the hub and the node. */
        labelAt: (28 + Math.max(42, r - 14)) / 2,
        /** Where the direction mark sits, always clear of the label. */
        markAt: Math.max(34, r - 17),
      }
    })
  }, [visible, W, H])

  if (!world) return <Loading label="Reading the world" />

  const npc = world.entities[npcId]
  if (!npc) {
    return <ErrorState title="That entry could not be found">Nothing in the world has the id {npcId}.</ErrorState>
  }

  if (!all.length) {
    return (
      <EmptyState title={`No relationships recorded for ${npc.name}`}>
        Links added on this entry, or pointing at it from elsewhere, are drawn here. Add a link — allegiance, rivalry,
        family, employment — and the graph appears.
      </EmptyState>
    )
  }

  if (!visible.length) {
    return (
      <EmptyState
        title="Every relationship here is covert"
        action={
          <button type="button" className="btn" onClick={() => setShowSecrets(true)}>
            Reveal secrets
          </button>
        }
      >
        {hiddenCount} {hiddenCount === 1 ? 'tie is' : 'ties are'} recorded but hidden while secrets are concealed.
      </EmptyState>
    )
  }

  const cx = W / 2
  const cy = H / 2
  const maxChars = W < 430 ? 10 : 18
  const glyph = SCHEMAS[npc.type]?.glyph ?? '·'

  const edgeColour = (t: NpcTie) => (t.hostile ? 'var(--crimson)' : t.covert ? '#7d6ea0' : 'var(--brass-dim)')

  return (
    <div>
      <div className="canvas-panel rm-graph" ref={ref}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          height={H}
          role="img"
          aria-label={`Relationship graph for ${npc.name}: ${visible.length} ${visible.length === 1 ? 'tie' : 'ties'}`}
        >
          {/* Edges */}
          {nodes.map((t) => {
            const sx = cx + Math.cos(t.angle) * 28
            const sy = cy + Math.sin(t.angle) * 28
            return (
              <line
                key={`e-${t.key}`}
                x1={sx}
                y1={sy}
                x2={t.x}
                y2={t.y}
                stroke={edgeColour(t)}
                strokeWidth={t.hostile ? 1.6 : 1.1}
                strokeDasharray={t.covert ? '4 3' : undefined}
              />
            )
          })}

          {/* Direction marks */}
          {nodes.map((t) => {
            const px = cx + Math.cos(t.angle) * t.markAt
            const py = cy + Math.sin(t.angle) * t.markAt
            const deg = (t.angle * 180) / Math.PI + (t.dir === 'out' ? 0 : 180)
            return (
              <path
                key={`a-${t.key}`}
                d="M-4,-3.2 L4,0 L-4,3.2 Z"
                fill={edgeColour(t)}
                transform={`translate(${px.toFixed(2)},${py.toFixed(2)}) rotate(${deg.toFixed(2)})`}
              />
            )
          })}

          {/* Edge labels */}
          {nodes.map((t) => (
            <text
              key={`l-${t.key}`}
              className="rm-edge-label"
              x={cx + Math.cos(t.angle) * t.labelAt}
              y={cy + Math.sin(t.angle) * t.labelAt + 3}
              textAnchor="middle"
            >
              {clip(t.label, 16)}
            </text>
          ))}

          {/* Nodes */}
          {nodes.map((t) => {
            const c = Math.cos(t.angle)
            const anchor = c > 0.25 ? 'start' : c < -0.25 ? 'end' : 'middle'
            const dx = anchor === 'start' ? 12 : anchor === 'end' ? -12 : 0
            const dy = anchor === 'middle' ? (Math.sin(t.angle) > 0 ? 20 : -14) : 4
            const accent = SCHEMAS[t.type]?.accentVar
            return (
              <g
                key={`n-${t.key}`}
                className="rm-node"
                role="link"
                tabIndex={0}
                aria-label={`${t.label}: ${t.name}. Open entry.`}
                onClick={() => nav(entityPathById(t.other, t.type))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    nav(entityPathById(t.other, t.type))
                  }
                }}
              >
                <circle className="rm-node-ring" cx={t.x} cy={t.y} r={12} fill="none" stroke="transparent" strokeWidth={2} />
                <circle
                  cx={t.x}
                  cy={t.y}
                  r={7}
                  fill={accent ? `var(${accent})` : 'var(--text-3)'}
                  stroke={t.covert ? '#7d6ea0' : 'var(--bg-deep)'}
                  strokeWidth={t.covert ? 1.4 : 1.6}
                  strokeDasharray={t.covert ? '3 2' : undefined}
                />
                <text className="node-label rm-node-label" x={t.x + dx} y={t.y + dy} textAnchor={anchor}>
                  {clip(t.name, maxChars)}
                </text>
              </g>
            )
          })}

          {/* Centre */}
          <circle cx={cx} cy={cy} r={24} fill="var(--s2)" stroke="var(--brass)" strokeWidth={1.4} />
          <text x={cx} y={cy + 5} textAnchor="middle" fontSize={14} fill="var(--brass-lit)" aria-hidden="true">
            {glyph}
          </text>
          <text className="node-label rm-node-label" x={cx} y={cy - 34} textAnchor="middle">
            {clip(npc.name, maxChars + 4)}
          </text>
        </svg>
        <div className="flow-legend">
          <span className="flow-key">
            <span className="rm-swatch" style={{ background: 'var(--brass-dim)' }} aria-hidden="true" />
            Ordinary tie
          </span>
          <span className="flow-key">
            <span className="rm-swatch" style={{ background: 'var(--crimson)' }} aria-hidden="true" />
            Hostile
          </span>
          <span className="flow-key">
            <span className="rm-swatch rm-swatch-covert" aria-hidden="true" />
            Covert
          </span>
          <span className="flow-key dimmer">Arrows point away from {npc.name} on ties this entry owns.</span>
        </div>
      </div>

      <div className="btn-row" style={{ margin: '10px 0 6px' }}>
        <span className="label">Relationships in full</span>
        {hiddenCount > 0 ? (
          <button type="button" className="btn sm" onClick={() => setShowSecrets(true)}>
            Show {hiddenCount} covert {hiddenCount === 1 ? 'tie' : 'ties'}
          </button>
        ) : null}
      </div>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Relationship</th>
              <th scope="col">Entry</th>
              <th scope="col">Note</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((t) => (
              <tr key={t.key}>
                <td style={{ color: t.hostile ? 'var(--crimson-lit)' : undefined, whiteSpace: 'nowrap' }}>
                  {t.label}
                  {t.covert ? <span className="tbd" style={{ marginLeft: 6 }}>covert</span> : null}
                </td>
                <td>
                  <EntityLink id={t.other} showType />
                </td>
                <td className="dim">{t.note ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
