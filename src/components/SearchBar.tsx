/**
 * Global quick search.
 *
 * Type-ahead over every entry with the match reason attached to each hit, so
 * it is always clear why something surfaced. Enter opens the top hit; the
 * full search page carries the facet filters.
 */

import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWorld } from '../core/store'
import { buildIndex } from '../core/relations'
import { emptyFilters, search } from '../core/search'
import { SCHEMAS } from '../core/schema'
import { entityPath } from './EntityLink'
import { StatusBadge, TypeGlyph } from './ui'

export function SearchBar() {
  const world = useWorld()
  const nav = useNavigate()
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [cursor, setCursor] = useState(0)
  const wrap = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)

  const hits = useMemo(() => {
    if (!world || q.trim().length < 1) return []
    return search(world, buildIndex(world), { ...emptyFilters(), q }, 8)
  }, [world, q])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const typing = target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)
      if (e.key === '/' && !typing) {
        e.preventDefault()
        input.current?.focus()
      }
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        input.current?.focus()
        input.current?.select()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const go = (path: string) => {
    setOpen(false)
    setQ('')
    nav(path)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setCursor((c) => Math.min(hits.length, c + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setCursor((c) => Math.max(0, c - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (cursor < hits.length && hits[cursor]) go(entityPath(hits[cursor].entity))
      else go(`/search?q=${encodeURIComponent(q)}`)
    } else if (e.key === 'Escape') {
      setOpen(false)
      input.current?.blur()
    }
  }

  return (
    <div className="search-wrap" ref={wrap}>
      <span className="search-icon" aria-hidden="true">
        ⌕
      </span>
      <input
        ref={input}
        className="search-input"
        type="search"
        value={q}
        placeholder="Search the world"
        aria-label="Search all entries"
        aria-expanded={open && hits.length > 0}
        aria-controls="quick-results"
        role="combobox"
        aria-autocomplete="list"
        onChange={(e) => {
          setQ(e.target.value)
          setOpen(true)
          setCursor(0)
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
      />
      {!q ? (
        <kbd className="search-kbd" aria-hidden="true">
          /
        </kbd>
      ) : null}

      {open && q.trim() ? (
        <div
          className="map-panel"
          id="quick-results"
          role="listbox"
          style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 50, maxHeight: '68vh', overflowY: 'auto' }}
        >
          {hits.length === 0 ? (
            <div style={{ padding: 'var(--sp-4)', fontSize: 'var(--fs-sm)', color: 'var(--text-3)' }}>
              Nothing matches “{q}”. Try a shorter term, or open the{' '}
              <button type="button" className="btn ghost sm" onClick={() => go(`/search?q=${encodeURIComponent(q)}`)}>
                full search
              </button>
            </div>
          ) : (
            <>
              {hits.map((h, i) => (
                <a
                  key={h.id}
                  href={entityPath(h.entity)}
                  className={`result${i === cursor ? ' cursor' : ''}`}
                  role="option"
                  aria-selected={i === cursor}
                  onMouseEnter={() => setCursor(i)}
                  onClick={(e) => {
                    e.preventDefault()
                    go(entityPath(h.entity))
                  }}
                >
                  <div className="result-title">
                    <TypeGlyph type={h.entity.type} />
                    <span>{h.entity.name}</span>
                    <span className="dimmer" style={{ fontSize: 'var(--fs-micro)' }}>
                      {SCHEMAS[h.entity.type]?.label}
                    </span>
                    <span style={{ marginLeft: 'auto' }}>
                      <StatusBadge status={h.entity.status} />
                    </span>
                  </div>
                  <div className="reasons">
                    {h.reasons.map((r, ri) => (
                      <span className="reason" key={ri}>
                        <b>{r.label}</b>
                        {r.snippet ? <span>{r.snippet}</span> : null}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
              <button
                type="button"
                className="row-item"
                style={{ width: '100%', background: 'none', border: 0, cursor: 'pointer', textAlign: 'left' }}
                onClick={() => go(`/search?q=${encodeURIComponent(q)}`)}
              >
                All results for “{q}” with filters →
              </button>
            </>
          )}
        </div>
      ) : null}
    </div>
  )
}
