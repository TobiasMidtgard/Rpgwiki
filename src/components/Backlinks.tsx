/**
 * Automatic backlinks.
 *
 * Every inbound edge — explicit relation, reference field or inline mention —
 * is grouped under a readable heading ("Found in", "Required for", "Referenced
 * by") so an entry always shows what depends on it.
 */

import { Link } from 'react-router-dom'
import { SCHEMAS } from '../core/schema'
import { RELATION_META } from '../core/types'
import { useWorld } from '../core/store'
import { backlinkGroups, buildIndex, type Edge } from '../core/relations'
import { useUiState } from '../core/uiState'
import { entityPath } from './EntityLink'
import { TypeGlyph } from './ui'

export function Backlinks({ id }: { id: string }) {
  const world = useWorld()
  const ui = useUiState()
  if (!world) return null
  const index = buildIndex(world)
  const groups = backlinkGroups(index, id).filter((g) => g.edges.length > 0)
  const visible = groups
    .map((g) => ({ ...g, edges: g.edges.filter((e) => ui.showSecrets || !e.secret) }))
    .filter((g) => g.edges.length > 0)

  const hiddenCount = groups.reduce((n, g) => n + g.edges.filter((e) => e.secret).length, 0)

  if (!visible.length) {
    return (
      <div className="panel">
        <div className="panel-head">
          <h3>Referenced by</h3>
        </div>
        <div className="panel-body">
          <p className="dim" style={{ fontSize: 'var(--fs-sm)' }}>
            Nothing links here yet. This entry is orphaned — connecting it to a place, a faction or a quest will make it
            reachable from elsewhere in the wiki.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="panel">
      <div className="panel-head">
        <h3>Referenced by</h3>
        <span className="nav-group-count spacer">{visible.reduce((n, g) => n + g.edges.length, 0)}</span>
      </div>
      <div className="panel-body" style={{ paddingTop: 6, paddingBottom: 8 }}>
        {visible.map((g) => (
          <div className="backlink-group" key={g.group}>
            <h4>{g.group}</h4>
            {g.edges.map((e, i) => (
              <BacklinkRow key={`${e.from}-${e.kind}-${i}`} edge={e} />
            ))}
          </div>
        ))}
        {hiddenCount > 0 && !ui.showSecrets ? (
          <p className="dimmer" style={{ fontSize: 'var(--fs-micro)', marginTop: 8 }}>
            {hiddenCount} hidden link{hiddenCount === 1 ? '' : 's'} withheld. Turn on “reveal secrets” to include them.
          </p>
        ) : null}
      </div>
    </div>
  )
}

function BacklinkRow({ edge }: { edge: Edge }) {
  const world = useWorld()
  const e = world?.entities[edge.from]
  if (!e) return null
  const s = SCHEMAS[e.type]
  const why = edge.origin === 'relation' ? RELATION_META[edge.kind].label : edge.origin === 'inline' ? 'Mentioned in text' : edge.label
  return (
    <Link to={entityPath(e)} className="backlink" style={{ ['--accent' as string]: `var(${s.accentVar})` }} title={`${s.label} — ${why}`}>
      <span className="glyph" aria-hidden="true">
        <TypeGlyph type={e.type} size={10} />
      </span>
      <span style={{ minWidth: 0 }}>{e.name}</span>
      <span className="dimmer" style={{ marginLeft: 'auto', fontSize: 'var(--fs-micro)', whiteSpace: 'nowrap' }}>
        {why}
        {edge.secret ? ' · secret' : ''}
      </span>
    </Link>
  )
}
