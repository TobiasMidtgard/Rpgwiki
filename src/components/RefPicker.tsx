/**
 * Reference picker.
 *
 * Links are chosen by searching entry names, never by typing an id. Anything
 * that cannot be found can be created inline without leaving the form.
 */

import { useEffect, useMemo, useRef, useState } from 'react'
import { SCHEMAS } from '../core/schema'
import type { EntityType } from '../core/types'
import { createEntity, useWorld } from '../core/store'
import { quickFind } from '../core/search'
import { EntityChip } from './EntityLink'
import { TypeGlyph, toast } from './ui'

export function RefPicker({
  value,
  onChange,
  types,
  placeholder = 'Search entries to link…',
  single,
  id,
}: {
  value: string[]
  onChange: (next: string[]) => void
  types?: EntityType[]
  placeholder?: string
  single?: boolean
  id?: string
}) {
  const world = useWorld()
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [cursor, setCursor] = useState(0)
  const wrap = useRef<HTMLDivElement>(null)

  const options = useMemo(() => {
    if (!world) return []
    return quickFind(world, q, types, 14).filter((e) => !value.includes(e.id))
  }, [world, q, types, value])

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  const add = (entryId: string) => {
    onChange(single ? [entryId] : [...value, entryId])
    setQ('')
    setCursor(0)
    if (single) setOpen(false)
  }

  const remove = (entryId: string) => onChange(value.filter((v) => v !== entryId))

  const createInline = () => {
    const name = q.trim()
    if (!name) return
    const type = types?.[0] ?? 'note'
    const newId = createEntity({ type, name, status: 'draft', summary: 'Created inline while linking. Needs filling in.' })
    add(newId)
    toast(`Created ${name} as a draft ${SCHEMAS[type].label.toLowerCase()}`, 'ok')
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
      setCursor((c) => Math.min(options.length - 1, c + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setCursor((c) => Math.max(0, c - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (options[cursor]) add(options[cursor].id)
      else if (q.trim()) createInline()
    } else if (e.key === 'Escape') {
      setOpen(false)
    } else if (e.key === 'Backspace' && !q && value.length) {
      onChange(value.slice(0, -1))
    }
  }

  const typeHint = types?.length ? types.map((t) => SCHEMAS[t].plural).join(', ') : 'any entry'

  return (
    <div className="ref-picker" ref={wrap}>
      {value.length ? (
        <div className="ref-tokens">
          {value.map((v) => (
            <span className="ref-token" key={v}>
              <EntityChip id={v} />
              <button type="button" onClick={() => remove(v)} aria-label={`Remove link to ${world?.entities[v]?.name ?? v}`}>
                ✕
              </button>
            </span>
          ))}
        </div>
      ) : null}
      {single && value.length >= 1 ? null : (
        <input
          id={id}
          className="input"
          value={q}
          placeholder={placeholder}
          onChange={(e) => {
            setQ(e.target.value)
            setOpen(true)
            setCursor(0)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          aria-label={`Link to ${typeHint}`}
        />
      )}
      {open && (options.length > 0 || q.trim()) ? (
        <div className="ref-menu" role="listbox">
          {options.map((o, i) => (
            <button
              key={o.id}
              type="button"
              className={`ref-option${i === cursor ? ' cursor' : ''}`}
              role="option"
              aria-selected={i === cursor}
              onMouseEnter={() => setCursor(i)}
              onClick={() => add(o.id)}
            >
              <TypeGlyph type={o.type} size={10} />
              <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' }}>{o.name}</span>
              <span className="t">{SCHEMAS[o.type].label}</span>
            </button>
          ))}
          {q.trim() && !options.some((o) => o.name.toLowerCase() === q.trim().toLowerCase()) ? (
            <button type="button" className="ref-option" onClick={createInline} style={{ borderTop: '1px solid var(--line)' }}>
              <span style={{ color: 'var(--brass-lit)' }}>+ Create “{q.trim()}”</span>
              <span className="t">{SCHEMAS[types?.[0] ?? 'note'].label}</span>
            </button>
          ) : null}
          {!options.length && !q.trim() ? (
            <div style={{ padding: '8px 10px', fontSize: 'var(--fs-micro)', color: 'var(--text-4)' }}>
              No {typeHint} to link yet.
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
