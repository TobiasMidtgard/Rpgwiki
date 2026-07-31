/**
 * Full search with facets.
 *
 * Filters for entity type, location, faction, status, biome, gameplay role and
 * tags. Every result explains why it matched.
 */

import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { SCHEMAS } from '../core/schema'
import type { EntityType, Status } from '../core/types'
import { STATUSES, STATUS_META } from '../core/types'
import { useWorld } from '../core/store'
import { buildIndex, entitiesOfType } from '../core/relations'
import { emptyFilters, facets, hasActiveFilters, search, type SearchFilters } from '../core/search'
import { entityPath } from '../components/EntityLink'
import { EmptyState, StatusBadge, TypeGlyph, WorkingTitleTag } from '../components/ui'

export default function SearchPage() {
  const world = useWorld()
  const [params, setParams] = useSearchParams()
  const [filters, setFilters] = useState<SearchFilters>(() => ({
    ...emptyFilters(),
    q: params.get('q') ?? '',
    tags: params.get('tag') ? [params.get('tag') as string] : [],
    types: params.get('type') ? [params.get('type') as EntityType] : [],
  }))

  useEffect(() => {
    const next = new URLSearchParams()
    if (filters.q) next.set('q', filters.q)
    if (filters.tags[0]) next.set('tag', filters.tags[0])
    if (filters.types[0]) next.set('type', filters.types[0])
    setParams(next, { replace: true })
  }, [filters.q, filters.tags, filters.types, setParams])

  const index = useMemo(() => (world ? buildIndex(world) : null), [world])
  const f = useMemo(() => (world ? facets(world) : null), [world])
  const hits = useMemo(() => (world && index ? search(world, index, filters, 300) : []), [world, index, filters])

  const cities = useMemo(() => (world ? [...entitiesOfType(world, 'city'), ...entitiesOfType(world, 'region')] : []), [world])
  const factionList = useMemo(() => (world ? entitiesOfType(world, 'faction') : []), [world])

  if (!world || !f) return null

  const set = (patch: Partial<SearchFilters>) => setFilters((prev) => ({ ...prev, ...patch }))
  const toggleType = (t: EntityType) =>
    set({ types: filters.types.includes(t) ? filters.types.filter((x) => x !== t) : [...filters.types, t] })
  const toggleStatus = (s: Status) =>
    set({ statuses: filters.statuses.includes(s) ? filters.statuses.filter((x) => x !== s) : [...filters.statuses, s] })
  const toggleTag = (t: string) => set({ tags: filters.tags.includes(t) ? filters.tags.filter((x) => x !== t) : [...filters.tags, t] })

  const active = hasActiveFilters(filters) || !!filters.q.trim()

  return (
    <div className="main-pad">
      <div className="page-head">
        <div style={{ minWidth: 0, flex: 1 }}>
          <h1>Search</h1>
          <p className="lede">Every entry, filtered by what it is, where it is, who holds it and how finished it is.</p>
        </div>
      </div>

      <div className="panel" style={{ marginBottom: 'var(--sp-4)' }}>
        <div className="panel-body">
          <div className="field">
            <label className="field-label" htmlFor="s-q">
              Search text
            </label>
            <input
              id="s-q"
              className="input"
              type="search"
              value={filters.q}
              onChange={(e) => set({ q: e.target.value })}
              placeholder="Names, aliases, summaries, tags, and the body of every field"
              autoFocus
            />
          </div>

          <div className="field">
            <span className="field-label">Entry type</span>
            <div className="btn-row">
              {f.types.map(([t, n]) => (
                <button
                  key={t}
                  type="button"
                  className={`btn sm${filters.types.includes(t) ? ' on' : ''}`}
                  onClick={() => toggleType(t)}
                  aria-pressed={filters.types.includes(t)}
                >
                  <TypeGlyph type={t} size={10} /> {SCHEMAS[t].label} ({n})
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-3">
            <div className="field">
              <label className="field-label" htmlFor="s-loc">
                Location
              </label>
              <select id="s-loc" className="select" value={filters.location ?? ''} onChange={(e) => set({ location: e.target.value || undefined })}>
                <option value="">Anywhere</option>
                {cities.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label className="field-label" htmlFor="s-fac">
                Faction
              </label>
              <select id="s-fac" className="select" value={filters.faction ?? ''} onChange={(e) => set({ faction: e.target.value || undefined })}>
                <option value="">Any faction</option>
                {factionList.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label className="field-label" htmlFor="s-biome">
                Biome
              </label>
              <select id="s-biome" className="select" value={filters.biome ?? ''} onChange={(e) => set({ biome: e.target.value || undefined })}>
                <option value="">Any biome</option>
                {f.biomes.map(([b, n]) => (
                  <option key={b} value={b}>
                    {b} ({n})
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label className="field-label" htmlFor="s-role">
                Gameplay role
              </label>
              <select id="s-role" className="select" value={filters.role ?? ''} onChange={(e) => set({ role: e.target.value || undefined })}>
                <option value="">Any role</option>
                {f.roles.map(([r, n]) => (
                  <option key={r} value={r}>
                    {r} ({n})
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <span className="field-label">Status</span>
              <div className="btn-row">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`btn sm${filters.statuses.includes(s) ? ' on' : ''}`}
                    onClick={() => toggleStatus(s)}
                    aria-pressed={filters.statuses.includes(s)}
                    title={STATUS_META[s].hint}
                  >
                    {STATUS_META[s].label}
                  </button>
                ))}
              </div>
            </div>
            <div className="field">
              <span className="field-label">Include archived</span>
              <label className="check">
                <input type="checkbox" checked={!!filters.includeArchived} onChange={(e) => set({ includeArchived: e.target.checked })} />
                Show archived entries
              </label>
            </div>
          </div>

          {f.tags.length ? (
            <div className="field" style={{ marginBottom: 0 }}>
              <span className="field-label">Tags</span>
              <div className="btn-row">
                {f.tags.slice(0, 30).map(([t, n]) => (
                  <button
                    key={t}
                    type="button"
                    className={`btn sm${filters.tags.includes(t) ? ' on' : ''}`}
                    onClick={() => toggleTag(t)}
                    aria-pressed={filters.tags.includes(t)}
                  >
                    {t} ({n})
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        {active ? (
          <div style={{ borderTop: '1px solid var(--line)', padding: '8px var(--sp-4)', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <span className="dim" style={{ fontSize: 'var(--fs-sm)' }}>
              {hits.length} result{hits.length === 1 ? '' : 's'}
            </span>
            <button type="button" className="btn sm" style={{ marginLeft: 'auto' }} onClick={() => setFilters(emptyFilters())}>
              Clear all filters
            </button>
          </div>
        ) : null}
      </div>

      {!active ? (
        <EmptyState title="Start typing, or pick a filter">
          Search covers names, aliases, ids, tags, summaries and the body of every field. Results show which of those
          matched.
        </EmptyState>
      ) : hits.length === 0 ? (
        <EmptyState title="Nothing matches">
          No entry satisfies all of those filters at once. Try removing one — filters combine with AND.
        </EmptyState>
      ) : (
        <div className="panel">
          {hits.map((h) => (
            <Link key={h.id} to={entityPath(h.entity)} className="result">
              <div className="result-title">
                <TypeGlyph type={h.entity.type} />
                <span>{h.entity.name}</span>
                {h.entity.workingTitle ? <WorkingTitleTag /> : null}
                <span className="dimmer" style={{ fontSize: 'var(--fs-micro)' }}>
                  {SCHEMAS[h.entity.type].label}
                </span>
                <span style={{ marginLeft: 'auto' }}>
                  <StatusBadge status={h.entity.status} />
                </span>
              </div>
              {h.entity.summary ? (
                <div className="dim" style={{ fontSize: 'var(--fs-sm)', marginTop: 2 }}>
                  {h.entity.summary}
                </div>
              ) : null}
              <div className="reasons">
                {h.reasons.map((r, i) => (
                  <span className="reason" key={i}>
                    <b>{r.label}</b>
                    {r.snippet ? <span>{r.snippet}</span> : null}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
