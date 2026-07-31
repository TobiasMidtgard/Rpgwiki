/**
 * Link editing.
 *
 * Relations are typed edges, so they get their own editor rather than being
 * hidden inside a text field. Targets are chosen by name; the kind list is the
 * full vocabulary from the data model.
 */

import { useState } from 'react'
import { RELATION_KINDS, RELATION_META, type RelationKind } from '../core/types'
import { addRelation, removeRelation, updateRelation, useWorld } from '../core/store'
import { RefPicker } from './RefPicker'
import { EntityChip } from './EntityLink'
import { toast } from './ui'

export function RelationEditor({ entityId }: { entityId: string }) {
  const world = useWorld()
  const [kind, setKind] = useState<RelationKind>('related_to')
  const [target, setTarget] = useState<string[]>([])
  const [note, setNote] = useState('')
  const [secret, setSecret] = useState(false)

  if (!world) return null

  const outgoing = Object.values(world.relations).filter((r) => r.from === entityId)
  const incoming = Object.values(world.relations).filter((r) => r.to === entityId)

  const add = () => {
    const to = target[0]
    if (!to) return
    addRelation(entityId, to, kind, { note: note.trim() || undefined, secret })
    setTarget([])
    setNote('')
    setSecret(false)
    toast('Link added', 'ok')
  }

  return (
    <div className="panel">
      <div className="panel-head">
        <h3>Links from this entry</h3>
        <span className="nav-group-count spacer">{outgoing.length}</span>
      </div>
      <div className="panel-body">
        {outgoing.length === 0 ? (
          <p className="dimmer" style={{ fontSize: 'var(--fs-sm)' }}>
            No outgoing links yet.
          </p>
        ) : (
          <div style={{ marginBottom: 'var(--sp-4)' }}>
            {outgoing.map((r) => (
              <div className="row-item" key={r.id} style={{ paddingLeft: 0, paddingRight: 0, gap: 8, flexWrap: 'wrap' }}>
                <select
                  className="select"
                  style={{ width: 190 }}
                  value={r.kind}
                  aria-label="Relationship kind"
                  onChange={(e) => updateRelation(r.id, { kind: e.target.value as RelationKind })}
                >
                  {RELATION_KINDS.map((k) => (
                    <option key={k} value={k}>
                      {RELATION_META[k].label}
                    </option>
                  ))}
                </select>
                <EntityChip id={r.to} />
                <input
                  className="input"
                  style={{ width: 200 }}
                  value={r.note ?? ''}
                  placeholder="note (optional)"
                  aria-label="Link note"
                  onChange={(e) => updateRelation(r.id, { note: e.target.value || undefined })}
                />
                <label className="check" title="Hide this link until secrets are revealed">
                  <input type="checkbox" checked={!!r.secret} onChange={(e) => updateRelation(r.id, { secret: e.target.checked })} />
                  secret
                </label>
                <button
                  type="button"
                  className="btn sm danger"
                  onClick={() => {
                    removeRelation(r.id)
                    toast('Link removed', 'info')
                  }}
                  aria-label="Remove link"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <div style={{ borderTop: '1px solid var(--line)', paddingTop: 'var(--sp-3)' }}>
          <div className="grid grid-2" style={{ alignItems: 'start' }}>
            <div className="field" style={{ marginBottom: 0 }}>
              <label className="field-label" htmlFor="rel-kind">
                Relationship
              </label>
              <select id="rel-kind" className="select" value={kind} onChange={(e) => setKind(e.target.value as RelationKind)}>
                {RELATION_KINDS.map((k) => (
                  <option key={k} value={k}>
                    {RELATION_META[k].label}
                  </option>
                ))}
              </select>
              <div className="field-help">Reads back on the target as “{RELATION_META[kind].inverse}”.</div>
            </div>
            <div className="field" style={{ marginBottom: 0 }}>
              <label className="field-label" htmlFor="rel-target">
                Target entry
              </label>
              <RefPicker id="rel-target" value={target} onChange={setTarget} single />
            </div>
          </div>
          <div className="btn-row" style={{ marginTop: 'var(--sp-3)' }}>
            <input
              className="input"
              style={{ maxWidth: 260 }}
              value={note}
              placeholder="Note (optional)"
              aria-label="Note for the new link"
              onChange={(e) => setNote(e.target.value)}
            />
            <label className="check">
              <input type="checkbox" checked={secret} onChange={(e) => setSecret(e.target.checked)} />
              Secret
            </label>
            <button type="button" className="btn primary" onClick={add} disabled={!target[0]}>
              + Add link
            </button>
          </div>
        </div>

        {incoming.length ? (
          <div style={{ borderTop: '1px solid var(--line)', marginTop: 'var(--sp-4)', paddingTop: 'var(--sp-3)' }}>
            <div className="label" style={{ marginBottom: 6 }}>
              Links pointing here ({incoming.length}) — edit these on the entry that owns them
            </div>
            <div className="ref-tokens">
              {incoming.map((r) => (
                <span className="chip" key={r.id}>
                  <EntityChip id={r.from} /> {RELATION_META[r.kind].label}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
