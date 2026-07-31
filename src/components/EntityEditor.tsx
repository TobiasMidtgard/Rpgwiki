/**
 * Structured editing.
 *
 * Forms are generated from the type schema, so every entity type gets a proper
 * form for free. Edits autosave; each one records a revision and is undoable.
 * Fields can be marked TBD with a question instead of being left blank.
 */

import { useEffect, useRef, useState } from 'react'
import { schemaOf } from '../core/schema'
import type { CustomField, Entity, FieldDef, FieldValue, Status, TableRow } from '../core/types'
import { STATUSES, STATUS_META, TBD, isTbd } from '../core/types'
import { patchEntity, setField } from '../core/store'
import { RefPicker } from './RefPicker'
import { toast } from './ui'

/* Debounced text input so typing does not create one undo step per keystroke. */
function useDebouncedField(id: string, key: string, value: FieldValue) {
  const [local, setLocal] = useState<string>(typeof value === 'string' ? value : value == null ? '' : String(value))
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastPushed = useRef(local)

  useEffect(() => {
    const incoming = typeof value === 'string' ? value : value == null ? '' : String(value)
    if (incoming !== lastPushed.current) {
      setLocal(incoming)
      lastPushed.current = incoming
    }
  }, [value])

  const push = (next: string) => {
    setLocal(next)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      lastPushed.current = next
      setField(id, key, next)
    }, 450)
  }

  const flush = () => {
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = null
      lastPushed.current = local
      setField(id, key, local)
    }
  }

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
  }, [])

  return [local, push, flush] as const
}

function TextField({ entity, def }: { entity: Entity; def: FieldDef }) {
  const value = entity.fields[def.key]
  const [local, push, flush] = useDebouncedField(entity.id, def.key, isTbd(value) ? '' : value)
  const long = def.kind === 'longtext'
  const Tag = long ? 'textarea' : 'input'
  return (
    <Tag
      className={long ? 'textarea' : 'input'}
      id={`f-${def.key}`}
      value={local}
      placeholder={def.placeholder ?? (long ? 'Prose. Link with [[entity.id|Label]].' : '')}
      onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => push(e.target.value)}
      onBlur={flush}
      rows={long ? 6 : undefined}
    />
  )
}

function ListField({ entity, def }: { entity: Entity; def: FieldDef }) {
  const raw = entity.fields[def.key]
  const items = Array.isArray(raw) && (raw.length === 0 || typeof raw[0] === 'string') ? (raw as string[]) : []
  const update = (next: string[]) => setField(entity.id, def.key, next)
  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
          <input
            className="input"
            value={item}
            onChange={(e) => update(items.map((x, j) => (j === i ? e.target.value : x)))}
            aria-label={`${def.label} item ${i + 1}`}
          />
          <button type="button" className="btn sm" onClick={() => update(items.filter((_, j) => j !== i))} aria-label={`Remove item ${i + 1}`}>
            ✕
          </button>
        </div>
      ))}
      <button type="button" className="btn sm" onClick={() => update([...items, ''])}>
        + Add item
      </button>
    </div>
  )
}

function TagsField({ entity, def }: { entity: Entity; def: FieldDef }) {
  const raw = entity.fields[def.key]
  const items = Array.isArray(raw) ? (raw as string[]) : []
  const [draft, setDraft] = useState('')
  const update = (next: string[]) => setField(entity.id, def.key, next)
  return (
    <div>
      <div className="ref-tokens">
        {items.map((t, i) => (
          <span className="ref-token" key={`${t}-${i}`}>
            {/^#[0-9a-fA-F]{3,8}$/.test(t) ? <span className="layer-swatch" style={{ background: t }} /> : null}
            {t}
            <button type="button" onClick={() => update(items.filter((_, j) => j !== i))} aria-label={`Remove ${t}`}>
              ✕
            </button>
          </span>
        ))}
      </div>
      <input
        className="input"
        value={draft}
        placeholder="Type and press Enter"
        aria-label={`Add to ${def.label}`}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && draft.trim()) {
            e.preventDefault()
            update([...items, draft.trim()])
            setDraft('')
          }
        }}
      />
    </div>
  )
}

function TableField({ entity, def }: { entity: Entity; def: FieldDef }) {
  const raw = entity.fields[def.key]
  const rows: TableRow[] = Array.isArray(raw) && (raw.length === 0 || typeof raw[0] === 'object') ? (raw as TableRow[]) : []
  const cols = def.columns ?? [{ key: 'value', label: 'Value' }]
  const update = (next: TableRow[]) => setField(entity.id, def.key, next)
  return (
    <div>
      <div style={{ overflowX: 'auto' }}>
        <table className="rowtable">
          <thead>
            <tr>
              {cols.map((c) => (
                <th key={c.key}>{c.label}</th>
              ))}
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                {cols.map((c) => (
                  <td key={c.key}>
                    <input
                      className="input"
                      value={r[c.key] ?? ''}
                      aria-label={`${c.label}, row ${i + 1}`}
                      onChange={(e) => update(rows.map((x, j) => (j === i ? { ...x, [c.key]: e.target.value } : x)))}
                    />
                  </td>
                ))}
                <td>
                  <button type="button" className="btn sm" onClick={() => update(rows.filter((_, j) => j !== i))} aria-label={`Remove row ${i + 1}`}>
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button type="button" className="btn sm" style={{ marginTop: 4 }} onClick={() => update([...rows, Object.fromEntries(cols.map((c) => [c.key, ''])) as TableRow])}>
        + Add row
      </button>
    </div>
  )
}

export function FieldEditor({ entity, def }: { entity: Entity; def: FieldDef }) {
  const value = entity.fields[def.key]
  const tbd = isTbd(value)

  const markTbd = () => {
    const q = window.prompt('What is the open question for this field?', tbd ? (value.q ?? '') : '')
    if (q === null) return
    setField(entity.id, def.key, TBD(q.trim() || undefined))
  }

  return (
    <div className="field">
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <label className="field-label" htmlFor={`f-${def.key}`} style={{ marginBottom: 4 }}>
          {def.label}
        </label>
        <button
          type="button"
          className={`btn sm ghost${tbd ? ' on' : ''}`}
          style={{ marginLeft: 'auto', fontSize: 'var(--fs-micro)' }}
          onClick={() => (tbd ? setField(entity.id, def.key, '') : markTbd())}
          title={tbd ? 'Clear the TBD and enter a value' : 'Record this as an open design question instead of inventing an answer'}
        >
          {tbd ? 'Clear TBD' : 'Mark TBD'}
        </button>
      </div>

      {tbd ? (
        <div>
          <div className="tbd" style={{ marginBottom: 6 }}>
            <span className="tbd-tag">TBD</span>
            <span className="tbd-q">{value.q ?? 'Not yet established.'}</span>
          </div>
          <button type="button" className="btn sm" onClick={markTbd}>
            Edit the question
          </button>
        </div>
      ) : def.kind === 'refs' ? (
        <RefPicker
          id={`f-${def.key}`}
          value={Array.isArray(value) ? (value as string[]) : []}
          onChange={(next) => setField(entity.id, def.key, next)}
          types={def.refTypes}
        />
      ) : def.kind === 'select' ? (
        <select
          className="select"
          id={`f-${def.key}`}
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => setField(entity.id, def.key, e.target.value)}
        >
          <option value="">— not set —</option>
          {(def.options ?? []).map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : def.kind === 'bool' ? (
        <label className="check">
          <input
            type="checkbox"
            id={`f-${def.key}`}
            checked={value === true}
            onChange={(e) => setField(entity.id, def.key, e.target.checked)}
          />
          {def.label}
        </label>
      ) : def.kind === 'number' ? (
        <input
          className="input"
          id={`f-${def.key}`}
          type="number"
          value={typeof value === 'number' ? value : ''}
          onChange={(e) => setField(entity.id, def.key, e.target.value === '' ? null : Number(e.target.value))}
        />
      ) : def.kind === 'list' ? (
        <ListField entity={entity} def={def} />
      ) : def.kind === 'tags' || def.kind === 'multiselect' ? (
        <TagsField entity={entity} def={def} />
      ) : def.kind === 'table' ? (
        <TableField entity={entity} def={def} />
      ) : (
        <TextField entity={entity} def={def} />
      )}

      {def.help ? <div className="field-help">{def.help}</div> : null}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Identity + custom fields                                            */
/* ------------------------------------------------------------------ */

export function IdentityEditor({ entity }: { entity: Entity }) {
  const [name, setName] = useState(entity.name)
  const [summary, setSummary] = useState(entity.summary ?? '')

  useEffect(() => {
    setName(entity.name)
    setSummary(entity.summary ?? '')
  }, [entity.id, entity.name, entity.summary])

  return (
    <div className="panel" style={{ marginBottom: 'var(--sp-4)' }}>
      <div className="panel-head">
        <h3>Identity</h3>
        <span className="mono spacer dimmer" style={{ fontSize: 'var(--fs-micro)' }}>
          {entity.id}
        </span>
      </div>
      <div className="panel-body">
        <div className="field">
          <label className="field-label" htmlFor="ed-name">
            Name
          </label>
          <input
            id="ed-name"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => name.trim() && name !== entity.name && patchEntity(entity.id, { name: name.trim() }, 'Rename')}
          />
          <div className="field-help">The entry id never changes when you rename, so existing links keep working.</div>
        </div>

        <div className="field">
          <label className="field-label" htmlFor="ed-summary">
            One-line summary
          </label>
          <input
            id="ed-summary"
            className="input"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            onBlur={() => summary !== (entity.summary ?? '') && patchEntity(entity.id, { summary: summary.trim() || undefined }, 'Edit summary')}
          />
        </div>

        <div className="grid grid-2">
          <div className="field">
            <label className="field-label" htmlFor="ed-status">
              Status
            </label>
            <select
              id="ed-status"
              className="select"
              value={entity.status}
              onChange={(e) => patchEntity(entity.id, { status: e.target.value as Status }, 'Change status')}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {STATUS_META[s].label}
                </option>
              ))}
            </select>
            <div className="field-help">{STATUS_META[entity.status].hint}</div>
          </div>

          <div className="field">
            <span className="field-label">Name is a working title</span>
            <label className="check">
              <input
                type="checkbox"
                checked={!!entity.workingTitle}
                onChange={(e) => patchEntity(entity.id, { workingTitle: e.target.checked }, 'Set working title')}
              />
              Flag this name as a placeholder
            </label>
          </div>
        </div>

        <div className="field">
          <span className="field-label">Tags</span>
          <TagsList
            items={entity.tags ?? []}
            onChange={(tags) => patchEntity(entity.id, { tags }, 'Edit tags')}
            label="tag"
          />
        </div>

        <div className="field">
          <span className="field-label">Also known as</span>
          <TagsList items={entity.aka ?? []} onChange={(aka) => patchEntity(entity.id, { aka }, 'Edit aliases')} label="alias" />
        </div>
      </div>
    </div>
  )
}

function TagsList({ items, onChange, label }: { items: string[]; onChange: (next: string[]) => void; label: string }) {
  const [draft, setDraft] = useState('')
  return (
    <div>
      <div className="ref-tokens">
        {items.map((t, i) => (
          <span className="ref-token" key={`${t}-${i}`}>
            {t}
            <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} aria-label={`Remove ${label} ${t}`}>
              ✕
            </button>
          </span>
        ))}
      </div>
      <input
        className="input"
        value={draft}
        placeholder={`Add a ${label} and press Enter`}
        aria-label={`Add a ${label}`}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && draft.trim()) {
            e.preventDefault()
            onChange([...items, draft.trim()])
            setDraft('')
          }
        }}
      />
    </div>
  )
}

export function CustomFieldsEditor({ entity }: { entity: Entity }) {
  const custom = entity.custom ?? []
  const schema = schemaOf(entity.type)
  const [label, setLabel] = useState('')
  const [kind, setKind] = useState<CustomField['kind']>('text')
  const [group, setGroup] = useState(schema.groups[0]?.key ?? 'overview')

  const update = (next: CustomField[]) => patchEntity(entity.id, { custom: next }, 'Edit custom fields')

  const add = () => {
    if (!label.trim()) return
    update([...custom, { id: `cf.${Date.now().toString(36)}`, label: label.trim(), kind, value: kind === 'tags' ? [] : '', group }])
    setLabel('')
    toast('Custom field added', 'ok')
  }

  return (
    <div className="panel">
      <div className="panel-head">
        <h3>Custom fields</h3>
      </div>
      <div className="panel-body">
        <p className="dim" style={{ fontSize: 'var(--fs-sm)', marginBottom: 'var(--sp-3)' }}>
          Add a field to this entry alone, without changing the schema for every other {schema.label.toLowerCase()}.
        </p>

        {custom.map((c, i) => (
          <div className="field" key={c.id}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span className="field-label">{c.label}</span>
              <button
                type="button"
                className="btn sm ghost"
                style={{ marginLeft: 'auto' }}
                onClick={() => update(custom.filter((_, j) => j !== i))}
                aria-label={`Remove custom field ${c.label}`}
              >
                Remove
              </button>
            </div>
            {c.kind === 'longtext' ? (
              <textarea
                className="textarea"
                value={String(c.value ?? '')}
                onChange={(e) => update(custom.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)))}
              />
            ) : c.kind === 'tags' ? (
              <TagsList
                items={Array.isArray(c.value) ? (c.value as string[]) : []}
                onChange={(v) => update(custom.map((x, j) => (j === i ? { ...x, value: v } : x)))}
                label="value"
              />
            ) : (
              <input
                className="input"
                type={c.kind === 'number' ? 'number' : 'text'}
                value={String(c.value ?? '')}
                onChange={(e) =>
                  update(custom.map((x, j) => (j === i ? { ...x, value: c.kind === 'number' ? Number(e.target.value) : e.target.value } : x)))
                }
              />
            )}
          </div>
        ))}

        <div style={{ borderTop: '1px solid var(--line)', paddingTop: 'var(--sp-3)', marginTop: 'var(--sp-3)' }}>
          <div className="grid grid-3" style={{ alignItems: 'end' }}>
            <div className="field" style={{ marginBottom: 0 }}>
              <label className="field-label" htmlFor="cf-label">
                Field name
              </label>
              <input id="cf-label" className="input" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="e.g. Voice reference" />
            </div>
            <div className="field" style={{ marginBottom: 0 }}>
              <label className="field-label" htmlFor="cf-kind">
                Kind
              </label>
              <select id="cf-kind" className="select" value={kind} onChange={(e) => setKind(e.target.value as CustomField['kind'])}>
                <option value="text">Short text</option>
                <option value="longtext">Long text</option>
                <option value="number">Number</option>
                <option value="tags">Tags</option>
              </select>
            </div>
            <div className="field" style={{ marginBottom: 0 }}>
              <label className="field-label" htmlFor="cf-group">
                Section
              </label>
              <select id="cf-group" className="select" value={group} onChange={(e) => setGroup(e.target.value)}>
                {schema.groups.map((g) => (
                  <option key={g.key} value={g.key}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button type="button" className="btn" style={{ marginTop: 'var(--sp-3)' }} onClick={add} disabled={!label.trim()}>
            + Add custom field
          </button>
        </div>
      </div>
    </div>
  )
}
