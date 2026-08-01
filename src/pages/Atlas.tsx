/**
 * The Atlas.
 *
 * Full-bleed world map with mode switching, layer control, filtering and a
 * compact inspector that becomes a bottom sheet on small screens.
 */

import { Fragment, useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { DEFAULT_LAYERS, MAP_LAYERS, WorldMap, type MapMode } from '../components/WorldMap'
import type { EntityType, MapLayerId } from '../core/types'
import { WORLD_H, WORLD_W } from '../core/types'
import { setPosition, setPositionLive, useWorld } from '../core/store'
import { buildIndex, targetsOf } from '../core/relations'
import { setEditing, useUiState } from '../core/uiState'
import { emptyFilters, facets, search } from '../core/search'
import { EntityChip, entityPath } from '../components/EntityLink'
import { StatusBadge, WorkingTitleTag, useLocalState, toast } from '../components/ui'
import { CityVista } from '../art/vista'
import { keyFacts } from '../core/schema'
import { isTbd } from '../core/types'

export default function Atlas() {
  const world = useWorld()
  const ui = useUiState()
  const [mode, setMode] = useLocalState<MapMode>('atlas.mode', 'paper')
  const [layerList, setLayerList] = useLocalState<MapLayerId[]>('atlas.layers', DEFAULT_LAYERS)
  // The layer list would cover most of a phone screen, so it starts closed
  // there and open on anything with room for it.
  const [panelOpen, setPanelOpen] = useLocalState<boolean>(
    'atlas.layerPanel',
    typeof window === 'undefined' || window.innerWidth > 900,
  )
  const [selected, setSelected] = useState<string | null>(null)
  const [q, setQ] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('')

  const layers = useMemo(() => new Set(layerList), [layerList])
  const index = useMemo(() => (world ? buildIndex(world) : null), [world])

  const toggleLayer = (id: MapLayerId) =>
    setLayerList((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]))

  /* Filtering dims the map rather than hiding it, so context survives. */
  const highlight = useMemo(() => {
    if (!world || !index) return null
    if (!q.trim() && !typeFilter) return null
    const hits = search(
      world,
      index,
      { ...emptyFilters(), q, types: typeFilter ? [typeFilter as EntityType] : [] },
      600,
    )
    const set = new Set(hits.map((h) => h.id))
    return set
  }, [world, index, q, typeFilter])

  const onMove = useCallback((id: string, x: number, y: number, committed: boolean) => {
    const cx = Math.max(0, Math.min(WORLD_W, x))
    const cy = Math.max(0, Math.min(WORLD_H, y))
    if (committed) {
      setPosition(id, cx, cy)
      toast('Marker moved', 'ok')
    } else {
      setPositionLive(id, cx, cy)
    }
  }, [])

  if (!world) return null

  const markerTypes = ['city', 'site', 'deposit', 'quest', 'creature']
  const counts = facets(world).types

  return (
    <div className="atlas">
      <WorldMap
        mode={mode}
        layers={layers}
        selectedId={selected ?? undefined}
        onSelect={(id) => setSelected(id)}
        highlight={highlight}
        editable={ui.editing}
        onMove={onMove}
      />

      {/* Top-left: mode, search, filters ------------------------------ */}
      <div className="map-overlay tl" style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 'min(360px, calc(100vw - 24px))' }}>
        <div className="mode-toggle" role="group" aria-label="Map style">
          <button type="button" aria-pressed={mode === 'paper'} onClick={() => setMode('paper')}>
            Illustrated
          </button>
          <button type="button" aria-pressed={mode === 'biome'} onClick={() => setMode('biome')}>
            Biome
          </button>
        </div>

        <div className="map-panel" style={{ padding: 8 }}>
          <label className="sr-only" htmlFor="atlas-q">
            Filter map markers
          </label>
          <input
            id="atlas-q"
            className="input"
            type="search"
            placeholder="Filter markers…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <div className="btn-row" style={{ marginTop: 6 }}>
            <button type="button" className={`btn sm${typeFilter === '' ? ' on' : ''}`} onClick={() => setTypeFilter('')}>
              All
            </button>
            {markerTypes.map((t) => {
              const n = counts.find(([k]) => k === t)?.[1] ?? 0
              if (!n) return null
              return (
                <button
                  key={t}
                  type="button"
                  className={`btn sm${typeFilter === t ? ' on' : ''}`}
                  onClick={() => setTypeFilter(typeFilter === t ? '' : t)}
                  aria-pressed={typeFilter === t}
                >
                  {t === 'city' ? 'Cities' : t === 'site' ? 'Sites' : t === 'deposit' ? 'Deposits' : t === 'quest' ? 'Quests' : 'Creatures'} ({n})
                </button>
              )
            })}
          </div>
          {highlight ? (
            <div className="dim" style={{ fontSize: 'var(--fs-micro)', marginTop: 6 }}>
              {highlight.size} entries match. Everything else is dimmed, not hidden.
            </div>
          ) : null}
        </div>

        {ui.editing ? (
          <div className="map-panel" style={{ padding: '6px 10px', fontSize: 'var(--fs-micro)', color: 'var(--brass-lit)', borderColor: 'var(--brass-dim)' }}>
            Editing: drag any marker to reposition it. Positions save automatically.
          </div>
        ) : null}
      </div>

      {/* Top-right: layers -------------------------------------------- */}
      <div className={`map-overlay tr${selected ? ' shifted' : ''}`}>
        <div className="map-panel" style={{ width: 226 }}>
          <button
            type="button"
            className="nav-group-btn"
            aria-expanded={panelOpen}
            aria-controls="layer-list"
            onClick={() => setPanelOpen(!panelOpen)}
            style={{ padding: '7px 10px' }}
          >
            <span className="caret" aria-hidden="true">
              ▶
            </span>
            Layers
            <span className="nav-group-count">
              {layerList.length}/{MAP_LAYERS.length}
            </span>
          </button>
          {panelOpen ? (
            <div className="layer-list" id="layer-list">
              {groupLayers().map(([group, items]) => (
                <div key={group} style={{ marginBottom: 6 }}>
                  <div className="label" style={{ fontSize: 'var(--fs-micro)', marginBottom: 2 }}>
                    {group}
                  </div>
                  {items.map((l) => (
                    <label className="layer-row" key={l.id} title={l.hint}>
                      <input type="checkbox" checked={layers.has(l.id)} onChange={() => toggleLayer(l.id)} />
                      <span className="layer-swatch" style={{ background: l.swatch }} />
                      <span>{l.label}</span>
                    </label>
                  ))}
                </div>
              ))}
              <div className="btn-row" style={{ marginTop: 4 }}>
                <button type="button" className="btn sm" onClick={() => setLayerList(MAP_LAYERS.map((l) => l.id))}>
                  All
                </button>
                <button type="button" className="btn sm" onClick={() => setLayerList(DEFAULT_LAYERS)}>
                  Reset
                </button>
                <button type="button" className="btn sm" onClick={() => setLayerList(['settlements', 'labels'])}>
                  Bare
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Bottom-left: legend ------------------------------------------ */}
      <div className="map-overlay bl">
        <div className="map-panel">
          <div className="map-legend">
            <span className="legend-item">
              <svg width="14" height="12" aria-hidden="true">
                <path d="M7,1 L13,10 L1,10 Z" fill={mode === 'paper' ? '#7d3f2f' : '#c08a4a'} />
              </svg>
              City
            </span>
            <span className="legend-item">
              <svg width="12" height="12" aria-hidden="true">
                <rect x="2" y="2" width="8" height="8" fill="none" stroke="#a89070" strokeWidth="2" />
              </svg>
              Settlement / ruin
            </span>
            <span className="legend-item">
              <svg width="12" height="12" aria-hidden="true">
                <path d="M6,1 L11,6 L6,11 L1,6 Z" fill="#7d8b96" />
              </svg>
              Deposit
            </span>
            <span className="legend-item">
              <svg width="16" height="8" aria-hidden="true">
                <line x1="0" y1="4" x2="16" y2="4" stroke="#c9962f" strokeWidth="2.4" />
              </svg>
              Trade
            </span>
            <span className="legend-item">
              <svg width="16" height="8" aria-hidden="true">
                <line x1="0" y1="4" x2="16" y2="4" stroke="#8f77b8" strokeWidth="2.4" strokeDasharray="3 3" />
              </svg>
              Smuggling
            </span>
            <span className="legend-item">
              <svg width="16" height="8" aria-hidden="true">
                <line x1="0" y1="4" x2="16" y2="4" stroke="#a3372f" strokeWidth="2.4" strokeDasharray="5 3" />
              </svg>
              Conflict
            </span>
          </div>
          <div className="scale-bar">
            <span>0</span>
            <div className="scale-line" style={{ width: 64 }} />
            <span>200 leagues</span>
          </div>
        </div>
      </div>

      {/* Inspector ----------------------------------------------------- */}
      {selected ? <Inspector id={selected} onClose={() => setSelected(null)} /> : null}

      {!selected && !ui.editing ? (
        <div className="map-overlay br">
          <button type="button" className="btn sm" onClick={() => setEditing(true)}>
            ✎ Unlock marker positions
          </button>
        </div>
      ) : null}
    </div>
  )
}

function groupLayers(): [string, typeof MAP_LAYERS][] {
  const map = new Map<string, typeof MAP_LAYERS>()
  for (const l of MAP_LAYERS) {
    const list = map.get(l.group) ?? []
    list.push(l)
    map.set(l.group, list)
  }
  return [...map.entries()]
}

/* ------------------------------------------------------------------ */
/* Inspector                                                           */
/* ------------------------------------------------------------------ */

function Inspector({ id, onClose }: { id: string; onClose: () => void }) {
  const world = useWorld()
  const index = useMemo(() => (world ? buildIndex(world) : null), [world])
  const e = world?.entities[id]
  if (!e || !world || !index) return null

  const controllers = (index.in[e.id] ?? []).filter((x) => x.kind === 'controls').map((x) => x.from)
  const contesters = (index.in[e.id] ?? []).filter((x) => x.kind === 'contests').map((x) => x.from)
  const palette = Array.isArray(e.fields.palette) ? (e.fields.palette as string[]) : undefined
  const facts = keyFacts(e.type).filter((d) => {
    const v = e.fields[d.key]
    return v != null && v !== '' && !(Array.isArray(v) && v.length === 0)
  })

  const districts = targetsOf(index, e.id, 'contains').filter((x) => world.entities[x]?.type === 'district')

  return (
    <aside
      className="inspector"
      style={{ ['--accent' as string]: `var(--t-${e.type})` }}
      aria-label={`${e.name} inspector`}
    >
      <div className="sheet-grip mobile-only" aria-hidden="true" />
      {e.type === 'city' ? (
        <div className="inspector-art">
          <CityVista id={e.id} palette={palette} />
          <div className="entity-hero-veil" />
        </div>
      ) : null}

      <div className="inspector-body">
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
          <h2 style={{ fontSize: 'var(--fs-lg)' }}>{e.name}</h2>
          <button type="button" className="btn ghost sm" onClick={onClose} style={{ marginLeft: 'auto' }} aria-label="Close inspector">
            ✕
          </button>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', margin: '6px 0 10px' }}>
          <StatusBadge status={e.status} />
          {e.workingTitle ? <WorkingTitleTag /> : null}
        </div>

        {e.summary ? (
          <p className="prose" style={{ fontSize: 'var(--fs-sm)', marginBottom: 12 }}>
            {e.summary}
          </p>
        ) : null}

        <dl className="kv inspector-kv">
          {facts.slice(0, 9).map((d) => {
            const v = e.fields[d.key]
            return (
              <Fragment key={d.key}>
                <dt>{d.label}</dt>
                <dd>
                  {isTbd(v) ? (
                    <span className="tbd">
                      <span className="tbd-tag">TBD</span>
                    </span>
                  ) : Array.isArray(v) ? (
                    <div className="ref-tokens">
                      {(v as string[]).slice(0, 3).map((x) => (typeof x === 'string' && world.entities[x] ? <EntityChip key={x} id={x} /> : null))}
                    </div>
                  ) : (
                    String(v)
                  )}
                </dd>
              </Fragment>
            )
          })}
          {controllers.length ? (
            <Fragment>
              <dt>Controlled by</dt>
              <dd>
                <div className="ref-tokens">
                  {controllers.map((f) => (
                    <EntityChip key={f} id={f} />
                  ))}
                </div>
              </dd>
            </Fragment>
          ) : null}
          {contesters.length ? (
            <Fragment>
              <dt>Contested by</dt>
              <dd>
                <div className="ref-tokens">
                  {contesters.map((f) => (
                    <EntityChip key={f} id={f} />
                  ))}
                </div>
              </dd>
            </Fragment>
          ) : null}
        </dl>

        {districts.length ? (
          <div style={{ marginTop: 12 }}>
            <div className="label" style={{ marginBottom: 4 }}>
              Districts
            </div>
            <div className="ref-tokens">
              {districts.map((d) => (
                <EntityChip key={d} id={d} />
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="inspector-foot">
        <Link to={entityPath(e)} className="btn primary" style={{ flex: 1, textAlign: 'center' }}>
          Open full entry
        </Link>
        <Link to={`/graph?focus=${encodeURIComponent(e.id)}`} className="btn" title="Show this entry's connections">
          ⁂
        </Link>
      </div>
    </aside>
  )
}
