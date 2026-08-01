/**
 * Roster dropdowns.
 *
 * One collapsible group per category. Closed, it still says what is inside —
 * the count and a strip of tiles — so a reader scanning a long city page can
 * tell at a glance whether there is anything worth opening. Open, every entry
 * is a card: emblem, name, what kind of thing it is, and the one line the entry
 * already carries as its summary. The whole card is the link.
 *
 * Categories that match nothing are not drawn as empty boxes; they collapse
 * into a single line naming what is missing, because on a page that exists to
 * expose gaps, "no fauna linked yet" is information, and twelve empty
 * accordions are not.
 */

import { Link } from 'react-router-dom'
import { SCHEMAS } from '../core/schema'
import type { Entity } from '../core/types'
import { useWorld } from '../core/store'
import { buildIndex } from '../core/relations'
import { classifierOf, rosterItems, type RosterCategory, type RosterItem } from '../core/roster'
import { setRosterOpen, useUiState } from '../core/uiState'
import { EntityThumb, motifFor } from '../art/thumb'
import { entityPath } from './EntityLink'
import { StatusBadge, TypeGlyph } from './ui'

export function Roster({
  hostId,
  categories,
  scope,
  hideWhenEmpty = false,
}: {
  hostId: string
  categories: RosterCategory[]
  /** Namespaces the remembered open/closed state. */
  scope: string
  /**
   * For sections that carry their own prose as well. There, a roster with
   * nothing in it is noise; where the roster *is* the section, saying so is the
   * point.
   */
  hideWhenEmpty?: boolean
}) {
  const world = useWorld()
  const ui = useUiState()
  if (!world) return null
  const index = buildIndex(world)

  const filled: { cat: RosterCategory; items: RosterItem[] }[] = []
  const empty: RosterCategory[] = []
  for (const cat of categories) {
    const items = rosterItems(world, index, hostId, cat)
    if (items.length) filled.push({ cat, items })
    else empty.push(cat)
  }

  if (!filled.length) {
    if (hideWhenEmpty) return null
    return (
      <p className="dimmer" style={{ fontSize: 'var(--fs-sm)' }}>
        {empty.length === 1
          ? empty[0].empty
          : `Nothing linked here yet — ${empty.map((c) => c.label.toLowerCase()).join(', ')}.`}
      </p>
    )
  }

  return (
    <div className="roster">
      {filled.map(({ cat, items }) => (
        <RosterGroup key={cat.key} cat={cat} items={items} stateKey={`${scope}:${cat.key}`} open={ui.openRosters[`${scope}:${cat.key}`] ?? false} />
      ))}
      {empty.length ? (
        <p className="roster-gap">
          Not linked yet: {empty.map((c) => c.label.toLowerCase()).join(', ')}.
        </p>
      ) : null}
    </div>
  )
}

function RosterGroup({
  cat,
  items,
  stateKey,
  open,
}: {
  cat: RosterCategory
  items: RosterItem[]
  stateKey: string
  open: boolean
}) {
  const inherited = items.filter((i) => i.via).length
  return (
    <details className="roster-group" open={open} onToggle={(e) => setRosterOpen(stateKey, (e.currentTarget as HTMLDetailsElement).open)}>
      <summary className="roster-summary">
        <span className="roster-caret" aria-hidden="true">
          ▸
        </span>
        <span className="roster-label">{cat.label}</span>
        <span className="roster-count">{items.length}</span>
        <span className="roster-peek" aria-hidden="true">
          {items.slice(0, 6).map((i) => (
            <EntityThumb key={i.entity.id} type={i.entity.type} id={i.entity.id} size={20} motif={motifFor(i.entity)} />
          ))}
        </span>
      </summary>
      <div className="roster-grid">
        {items.map((i) => (
          <RosterCard key={i.entity.id} item={i} />
        ))}
      </div>
      {inherited ? (
        <p className="roster-note">
          {inherited} of these {inherited === 1 ? 'is' : 'are'} characteristic of the surrounding region rather than
          recorded in the settlement itself.
        </p>
      ) : null}
    </details>
  )
}

function RosterCard({ item }: { item: RosterItem }) {
  const e: Entity = item.entity
  const s = SCHEMAS[e.type]
  const classifier = classifierOf(e)
  return (
    <Link to={entityPath(e)} className="roster-card" style={{ ['--accent' as string]: `var(${s.accentVar})` }}>
      <span className="roster-thumb">
        <EntityThumb type={e.type} id={e.id} size={54} motif={motifFor(e)} />
      </span>
      <span className="roster-card-body">
        <span className="roster-card-head">
          <span className="roster-name">{e.name}</span>
          {e.status !== 'canon' ? <StatusBadge status={e.status} title={false} /> : null}
        </span>
        <span className="roster-meta">
          <TypeGlyph type={e.type} size={9} /> {s.label}
          {classifier ? <> · {classifier}</> : null}
          {item.via ? <> · via {item.via.name}</> : null}
        </span>
        {e.summary ? <span className="roster-sum">{e.summary}</span> : null}
      </span>
    </Link>
  )
}
