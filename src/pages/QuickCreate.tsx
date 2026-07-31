/**
 * Quick create.
 *
 * Pick a type, give it a name, and land on the new entry in editing mode.
 * Ids are generated from the name — the user never types one.
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SCHEMAS } from '../core/schema'
import { ENTITY_TYPES, type EntityType, type Status } from '../core/types'
import { createEntity } from '../core/store'
import { setEditing } from '../core/uiState'
import { entityPath } from '../components/EntityLink'
import { Dialog, TypeGlyph, toast } from '../components/ui'

const COMMON: EntityType[] = ['city', 'npc', 'faction', 'quest', 'item', 'material', 'note']

export function QuickCreate({ defaultType, label = '+ New' }: { defaultType?: EntityType; label?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" className="btn sm" onClick={() => setOpen(true)}>
        {label}
      </button>
      {open ? <QuickCreateDialog defaultType={defaultType} onClose={() => setOpen(false)} /> : null}
    </>
  )
}

export function QuickCreateDialog({ defaultType, onClose }: { defaultType?: EntityType; onClose: () => void }) {
  const nav = useNavigate()
  const [type, setType] = useState<EntityType>(defaultType ?? 'npc')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<Status>('draft')
  const [summary, setSummary] = useState('')

  const submit = () => {
    const trimmed = name.trim()
    if (!trimmed) return
    const id = createEntity({ type, name: trimmed, status, summary: summary.trim() || undefined })
    setEditing(true)
    onClose()
    toast(`Created ${trimmed}`, 'ok')
    nav(entityPath({ id, type }))
  }

  return (
    <Dialog
      title="Create a new entry"
      onClose={onClose}
      footer={
        <>
          <button type="button" className="btn" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn primary" onClick={submit} disabled={!name.trim()}>
            Create and edit
          </button>
        </>
      }
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
      >
        <div className="field">
          <span className="field-label">Common types</span>
          <div className="btn-row">
            {COMMON.map((t) => (
              <button
                key={t}
                type="button"
                className={`btn sm${type === t ? ' on' : ''}`}
                onClick={() => setType(t)}
                aria-pressed={type === t}
              >
                <TypeGlyph type={t} /> {SCHEMAS[t].label}
              </button>
            ))}
          </div>
        </div>

        <label className="field" style={{ display: 'block' }}>
          <span className="field-label">Entry type</span>
          <select className="select" value={type} onChange={(e) => setType(e.target.value as EntityType)}>
            {ENTITY_TYPES.map((t) => (
              <option key={t} value={t}>
                {SCHEMAS[t].label} — {SCHEMAS[t].plural}
              </option>
            ))}
          </select>
        </label>

        <label className="field" style={{ display: 'block' }}>
          <span className="field-label">Name</span>
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={`Name of the ${SCHEMAS[type].label.toLowerCase()}`}
            autoFocus
          />
          <div className="field-help">
            The entry id will be <span className="mono">{type}.{name.trim() ? slugPreview(name) : '…'}</span> — generated for you.
          </div>
        </label>

        <label className="field" style={{ display: 'block' }}>
          <span className="field-label">One-line summary (optional)</span>
          <input className="input" value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Shown in cards, search results and the map inspector" />
        </label>

        <label className="field" style={{ display: 'block' }}>
          <span className="field-label">Status</span>
          <select className="select" value={status} onChange={(e) => setStatus(e.target.value as Status)}>
            <option value="draft">Draft — proposed, not confirmed</option>
            <option value="canon">Canon — established</option>
            <option value="alt">Alternative concept</option>
            <option value="review">Needs review</option>
          </select>
        </label>
      </form>
    </Dialog>
  )
}

function slugPreview(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}
