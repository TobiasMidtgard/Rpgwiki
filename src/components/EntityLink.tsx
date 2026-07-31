/**
 * Cross-links. Every reference to an entity anywhere in the wiki goes through
 * here, so links stay consistent and always show what they point at.
 */

import { Link } from 'react-router-dom'
import { SCHEMAS } from '../core/schema'
import type { Entity, EntityType } from '../core/types'
import { useWorld } from '../core/store'
import { TypeGlyph } from './ui'

export function entityPath(e: { id: string; type: EntityType }): string {
  const s = SCHEMAS[e.type]
  return `/${s?.route ?? 'entry'}/${encodeURIComponent(e.id)}`
}

export function entityPathById(id: string, type?: EntityType): string {
  if (type) return entityPath({ id, type })
  const guess = id.split('.')[0] as EntityType
  return entityPath({ id, type: SCHEMAS[guess] ? guess : 'note' })
}

export function EntityLink({
  id,
  label,
  showType,
  className,
  glyph = true,
}: {
  id: string
  label?: string
  showType?: boolean
  className?: string
  glyph?: boolean
}) {
  const world = useWorld()
  const e = world?.entities[id]

  if (!e) {
    return (
      <span className={className} title={`No entry with id ${id}`} style={{ color: 'var(--crimson-lit)' }}>
        <span className="mono" style={{ fontSize: '0.9em' }}>
          ⚠ {label ?? id}
        </span>
      </span>
    )
  }

  const s = SCHEMAS[e.type]
  return (
    <Link
      to={entityPath(e)}
      className={className}
      style={{ color: 'inherit' }}
      title={e.summary ? `${s?.label}: ${e.summary}` : s?.label}
    >
      {glyph ? <TypeGlyph type={e.type} size={10} /> : null}{' '}
      <span style={{ color: 'var(--brass-lit)' }}>{label ?? e.name}</span>
      {e.archived ? <span className="dimmer"> (archived)</span> : null}
      {showType ? <span className="dimmer"> · {s?.label}</span> : null}
    </Link>
  )
}

/** Chip-shaped link used in dense lists and reference fields. */
export function EntityChip({ id, onRemove }: { id: string; onRemove?: () => void }) {
  const world = useWorld()
  const e = world?.entities[id]
  if (!e) {
    return (
      <span className="chip" style={{ color: 'var(--crimson-lit)', borderColor: 'currentColor' }} title={`Broken reference: ${id}`}>
        ⚠ <span className="mono">{id}</span>
        {onRemove ? (
          <button type="button" onClick={onRemove} aria-label={`Remove broken reference ${id}`} style={{ background: 'none', border: 0, color: 'inherit', cursor: 'pointer' }}>
            ✕
          </button>
        ) : null}
      </span>
    )
  }
  const s = SCHEMAS[e.type]
  return (
    <Link to={entityPath(e)} className="chip" style={{ borderLeft: `2px solid var(${s.accentVar})` }} title={e.summary}>
      <TypeGlyph type={e.type} size={9} />
      {e.name}
    </Link>
  )
}

export function useEntity(id: string | undefined): Entity | undefined {
  const world = useWorld()
  return id ? world?.entities[id] : undefined
}
