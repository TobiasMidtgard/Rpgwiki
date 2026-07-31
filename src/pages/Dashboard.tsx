/**
 * Project dashboard.
 *
 * Everything here is computed from live data: what has been edited, what is
 * flagged, what is unresolved, what is disconnected and what is broken. It is
 * a work queue, not a decoration.
 */

import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { SCHEMAS } from '../core/schema'
import type { Entity } from '../core/types'
import { STATUSES, STATUS_META, isTbd } from '../core/types'
import { useWorld } from '../core/store'
import { buildIndex } from '../core/relations'
import { DEFAULT_LAYERS, WorldMap } from '../components/WorldMap'
import { entityPath, entityPathById } from '../components/EntityLink'
import { StatusBadge, TypeGlyph, ago } from '../components/ui'
import { QuickCreate } from './QuickCreate'

export default function Dashboard() {
  const world = useWorld()
  const index = useMemo(() => (world ? buildIndex(world) : null), [world])

  const data = useMemo(() => {
    if (!world || !index) return null
    const all = Object.values(world.entities).filter((e) => !e.archived)

    const byStatus: Record<string, number> = {}
    for (const e of all) byStatus[e.status] = (byStatus[e.status] ?? 0) + 1

    const recent = [...all].sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 8)
    const review = all.filter((e) => e.status === 'review').slice(0, 10)

    // Open design questions: note entries plus every TBD field anywhere.
    const questions: { id: string; name: string; question: string; where: string }[] = []
    for (const e of all) {
      if (e.type === 'note' && e.fields.noteKind === 'Design question' && e.fields.resolution !== 'Decided') {
        questions.push({ id: e.id, name: e.name, question: typeof e.fields.body === 'string' ? e.fields.body : '', where: 'Design note' })
      }
      const schema = SCHEMAS[e.type]
      for (const def of schema?.fields ?? []) {
        const v = e.fields[def.key]
        if (isTbd(v)) questions.push({ id: e.id, name: e.name, question: v.q ?? 'Not yet established.', where: def.label })
      }
    }

    const wars = all.filter((e) => e.type === 'war')
    const activeWars = wars.filter((e) => e.fields.state === 'Active' || e.fields.state === 'Brewing')

    const factionConflicts = Object.values(world.relations)
      .filter((r) => ['at_war_with', 'rival_of', 'contests', 'infiltrates'].includes(r.kind))
      .filter((r) => world.entities[r.from] && world.entities[r.to])
      .slice(0, 12)

    const questLines = all
      .filter((e) => e.type === 'quest')
      .filter((e) => e.fields.devStatus && e.fields.devStatus !== 'Playable')
      .slice(0, 10)

    const orphans = index.orphans.map((id) => world.entities[id]).filter(Boolean).slice(0, 12)

    const broken = index.broken.slice(0, 12)

    const tbdCount = questions.filter((q) => q.where !== 'Design note').length

    return {
      all,
      byStatus,
      recent,
      review,
      questions: questions.slice(0, 12),
      questionCount: questions.length,
      tbdCount,
      activeWars,
      factionConflicts,
      questLines,
      orphans,
      orphanCount: index.orphans.length,
      broken,
      brokenCount: index.broken.length,
      relationCount: Object.keys(world.relations).length,
    }
  }, [world, index])

  if (!world || !data) return null

  const typeCounts = Object.keys(SCHEMAS)
    .map((t) => ({ type: t as keyof typeof SCHEMAS, n: data.all.filter((e) => e.type === t).length }))
    .filter((x) => x.n > 0)
    .sort((a, b) => b.n - a.n)

  return (
    <div className="main-pad">
      <div className="page-head">
        <div style={{ minWidth: 0 }}>
          <h1>Project dashboard</h1>
          <p className="lede">
            {data.all.length} entries and {data.relationCount} links. Canon is what the brief established; everything
            else is a proposal, and the open questions below are the ones that still need a decision.
          </p>
        </div>
        <div className="btn-row" style={{ marginLeft: 'auto' }}>
          <QuickCreate />
          <Link to="/atlas" className="btn primary">
            Open the atlas
          </Link>
        </div>
      </div>

      {/* Map preview -------------------------------------------------- */}
      <div className="panel" style={{ marginBottom: 'var(--sp-4)' }}>
        <div className="panel-head">
          <h3>World map</h3>
          <Link to="/atlas" className="spacer btn sm">
            Explore →
          </Link>
        </div>
        <Link to="/atlas" style={{ display: 'block', height: 300, position: 'relative' }} aria-label="Open the interactive atlas">
          <WorldMap mode="paper" layers={new Set(DEFAULT_LAYERS)} preview />
        </Link>
      </div>

      {/* Stats -------------------------------------------------------- */}
      <div className="grid grid-4" style={{ marginBottom: 'var(--sp-4)' }}>
        {STATUSES.map((s) => (
          <div className="stat" key={s} style={{ ['--accent' as string]: `var(--st-${s})` }}>
            <div className="stat-value">{data.byStatus[s] ?? 0}</div>
            <div className="stat-label" title={STATUS_META[s].hint}>
              {STATUS_META[s].label}
            </div>
          </div>
        ))}
        <div className="stat" style={{ ['--accent' as string]: 'var(--st-review)' }}>
          <div className="stat-value">{data.tbdCount}</div>
          <div className="stat-label">Fields marked TBD</div>
        </div>
        <div className="stat" style={{ ['--accent' as string]: 'var(--crimson)' }}>
          <div className="stat-value">{data.brokenCount}</div>
          <div className="stat-label">Broken references</div>
        </div>
        <div className="stat" style={{ ['--accent' as string]: 'var(--steel)' }}>
          <div className="stat-value">{data.orphanCount}</div>
          <div className="stat-label">Orphaned entries</div>
        </div>
        <div className="stat">
          <div className="stat-value">{data.relationCount}</div>
          <div className="stat-label">Links between entries</div>
        </div>
      </div>

      <div className="dash-grid">
        <Panel title="Recently edited" count={data.recent.length}>
          {data.recent.map((e) => (
            <EntityRow key={e.id} e={e} when={ago(e.updatedAt)} />
          ))}
        </Panel>

        <Panel
          title="Needs review"
          count={data.review.length}
          empty="Nothing is flagged for review. Set an entry's status to “Needs review” to queue it here."
        >
          {data.review.map((e) => (
            <EntityRow key={e.id} e={e} when={ago(e.updatedAt)} />
          ))}
        </Panel>

        <Panel
          title="Open design questions"
          count={data.questionCount}
          footer={<Link to="/notes">All design notes →</Link>}
          empty="No open questions. Mark a field TBD to record one."
        >
          {data.questions.map((q, i) => (
            <Link key={`${q.id}-${i}`} to={entityPathById(q.id)} className="row-item">
              <span className="tbd-tag" style={{ flex: 'none' }}>
                {q.where === 'Design note' ? 'NOTE' : 'TBD'}
              </span>
              <span style={{ minWidth: 0 }}>
                <strong style={{ color: 'var(--text)' }}>{q.name}</strong>
                <span className="dim"> — {q.question.slice(0, 110)}</span>
              </span>
            </Link>
          ))}
        </Panel>

        <Panel
          title="Wars and political events"
          count={data.activeWars.length}
          footer={<Link to="/conflicts">All conflicts →</Link>}
          empty="No active conflicts recorded yet."
        >
          {data.activeWars.map((e) => (
            <Link key={e.id} to={entityPath(e)} className="row-item">
              <TypeGlyph type="war" />
              <span style={{ minWidth: 0 }}>{e.name}</span>
              <span className="when">{String(e.fields.state ?? '')}</span>
            </Link>
          ))}
        </Panel>

        <Panel
          title="Active faction conflicts"
          count={data.factionConflicts.length}
          empty="No hostile links between factions yet."
        >
          {data.factionConflicts.map((r) => (
            <div className="row-item" key={r.id}>
              <Link to={entityPathById(r.from)}>{world.entities[r.from]?.name}</Link>
              <span className="dimmer" style={{ color: 'var(--crimson-lit)' }}>
                {r.kind.replace(/_/g, ' ')}
              </span>
              <Link to={entityPathById(r.to)}>{world.entities[r.to]?.name}</Link>
            </div>
          ))}
        </Panel>

        <Panel
          title="Quest lines in development"
          count={data.questLines.length}
          footer={<Link to="/quests/flow">Quest flow board →</Link>}
          empty="No quests are in progress."
        >
          {data.questLines.map((e) => (
            <Link key={e.id} to={entityPath(e)} className="row-item">
              <TypeGlyph type="quest" />
              <span style={{ minWidth: 0 }}>{e.name}</span>
              <span className="when">{String(e.fields.devStatus ?? '')}</span>
            </Link>
          ))}
        </Panel>

        <Panel
          title="Orphaned entries"
          count={data.orphanCount}
          empty="Every entry is connected to something."
        >
          {data.orphans.map((e) => (
            <EntityRow key={e.id} e={e} when="no links" />
          ))}
        </Panel>

        <Panel
          title="Broken references"
          count={data.brokenCount}
          footer={<Link to="/data">Reference check →</Link>}
          empty="Every reference resolves."
        >
          {data.broken.map((b, i) => (
            <div className="row-item" key={`${b.from}-${b.to}-${i}`}>
              <Link to={entityPathById(b.from)} style={{ minWidth: 0 }}>
                {world.entities[b.from]?.name ?? b.from}
              </Link>
              <span className="dimmer">{b.where} →</span>
              <span className="mono" style={{ color: 'var(--crimson-lit)', fontSize: 'var(--fs-micro)' }}>
                {b.to}
              </span>
            </div>
          ))}
        </Panel>

        <Panel title="World statistics" count={typeCounts.length}>
          {typeCounts.map(({ type, n }) => (
            <Link key={type} to={`/${SCHEMAS[type].route}`} className="row-item">
              <TypeGlyph type={type} />
              <span style={{ minWidth: 0 }}>{SCHEMAS[type].plural}</span>
              <span className="when">{n}</span>
            </Link>
          ))}
        </Panel>

        <Panel title="Quick create" count={0}>
          <div style={{ padding: 'var(--sp-3) var(--sp-4)', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {(['city', 'npc', 'faction', 'quest', 'item', 'material', 'machine', 'creature', 'skill', 'mechanic', 'event', 'note'] as const).map(
              (t) => (
                <QuickCreate key={t} defaultType={t} label={`+ ${SCHEMAS[t].label}`} />
              ),
            )}
          </div>
        </Panel>
      </div>
    </div>
  )
}

function Panel({
  title,
  count,
  children,
  footer,
  empty,
}: {
  title: string
  count: number
  children?: React.ReactNode
  footer?: React.ReactNode
  empty?: string
}) {
  const hasChildren = Array.isArray(children) ? children.length > 0 : !!children
  return (
    <div className="panel">
      <div className="panel-head">
        <h3>{title}</h3>
        {count > 0 ? <span className="nav-group-count spacer">{count}</span> : null}
      </div>
      <div className="panel-body flush">
        {hasChildren ? (
          children
        ) : (
          <p className="dim" style={{ padding: 'var(--sp-4)', fontSize: 'var(--fs-sm)', margin: 0 }}>
            {empty ?? 'Nothing here yet.'}
          </p>
        )}
      </div>
      {footer ? (
        <div style={{ borderTop: '1px solid var(--line)', padding: '6px var(--sp-4)', fontSize: 'var(--fs-sm)' }}>{footer}</div>
      ) : null}
    </div>
  )
}

function EntityRow({ e, when }: { e: Entity; when: string }) {
  return (
    <Link to={entityPath(e)} className="row-item">
      <TypeGlyph type={e.type} />
      <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.name}</span>
      <StatusBadge status={e.status} title={false} />
      <span className="when">{when}</span>
    </Link>
  )
}
