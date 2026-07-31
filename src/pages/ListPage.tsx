/**
 * Section index.
 *
 * One list page serves every entity type, generated from the schema, with
 * filtering, sorting and a card or table view.
 */

import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { SCHEMAS, keyFacts, typeForRoute } from '../core/schema'
import type { Entity, Status } from '../core/types'
import { STATUSES, STATUS_META, isTbd } from '../core/types'
import { useWorld } from '../core/store'
import { buildIndex } from '../core/relations'
import { roleOf } from '../core/search'
import { entityPath } from '../components/EntityLink'
import { EmptyState, StatusBadge, TypeGlyph, WorkingTitleTag, ago, useLocalState } from '../components/ui'
import { QuickCreate } from './QuickCreate'
import { CityCrest } from '../art/vista'
import { RelationMatrixPanel } from '../components/RelationMatrixPanel'

type Sort = 'name' | 'updated' | 'status' | 'role'

export default function ListPage() {
  const { section } = useParams()
  const world = useWorld()
  const type = section ? typeForRoute(section) : undefined
  const [q, setQ] = useState('')
  const [statusFilter, setStatusFilter] = useState<Status | ''>('')
  const [roleFilter, setRoleFilter] = useState('')
  const [sort, setSort] = useLocalState<Sort>('list.sort', 'name')
  const [view, setView] = useLocalState<'cards' | 'table'>('list.view', 'cards')
  const [showArchived, setShowArchived] = useState(false)

  const index = useMemo(() => (world ? buildIndex(world) : null), [world])

  const all = useMemo(() => {
    if (!world || !type) return []
    return Object.values(world.entities).filter((e) => e.type === type)
  }, [world, type])

  const roles = useMemo(() => {
    const set = new Map<string, number>()
    for (const e of all) {
      const r = roleOf(e)
      if (r) set.set(r, (set.get(r) ?? 0) + 1)
    }
    return [...set.entries()].sort((a, b) => b[1] - a[1])
  }, [all])

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    let list = all.filter((e) => (showArchived ? true : !e.archived))
    if (t) list = list.filter((e) => e.name.toLowerCase().includes(t) || (e.summary ?? '').toLowerCase().includes(t) || (e.tags ?? []).some((x) => x.toLowerCase().includes(t)))
    if (statusFilter) list = list.filter((e) => e.status === statusFilter)
    if (roleFilter) list = list.filter((e) => roleOf(e) === roleFilter)
    const cmp: Record<Sort, (a: Entity, b: Entity) => number> = {
      name: (a, b) => a.name.localeCompare(b.name),
      updated: (a, b) => b.updatedAt - a.updatedAt,
      status: (a, b) => STATUSES.indexOf(a.status) - STATUSES.indexOf(b.status) || a.name.localeCompare(b.name),
      role: (a, b) => (roleOf(a) ?? 'zz').localeCompare(roleOf(b) ?? 'zz') || a.name.localeCompare(b.name),
    }
    return [...list].sort(cmp[sort])
  }, [all, q, statusFilter, roleFilter, sort, showArchived])

  if (!world) return null

  if (!type) {
    return (
      <div className="main-pad">
        <EmptyState title="Unknown section">
          There is no section at <span className="mono">/{section}</span>. <Link to="/">Back to the dashboard</Link>
        </EmptyState>
      </div>
    )
  }

  const schema = SCHEMAS[type]
  const facts = keyFacts(type).slice(0, 4)
  const archivedCount = all.filter((e) => e.archived).length

  return (
    <div className="main-pad">
      <div className="page-head">
        <div style={{ minWidth: 0 }}>
          <h1>
            <TypeGlyph type={type} size={20} /> {schema.plural}
          </h1>
          <p className="lede">{describe(type, all.length)}</p>
        </div>
        <div className="btn-row" style={{ marginLeft: 'auto' }}>
          <QuickCreate defaultType={type} label={`+ New ${schema.label.toLowerCase()}`} />
        </div>
      </div>

      <div className="panel" style={{ marginBottom: 'var(--sp-4)' }}>
        <div className="panel-body" style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ flex: '1 1 220px', minWidth: 0 }}>
            <label className="field-label" htmlFor="list-q">
              Filter
            </label>
            <input id="list-q" className="input" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Filter ${schema.plural.toLowerCase()}`} />
          </div>
          <div>
            <label className="field-label" htmlFor="list-status">
              Status
            </label>
            <select id="list-status" className="select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as Status | '')}>
              <option value="">Any status</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {STATUS_META[s].label} ({all.filter((e) => e.status === s && !e.archived).length})
                </option>
              ))}
            </select>
          </div>
          {roles.length > 1 ? (
            <div>
              <label className="field-label" htmlFor="list-role">
                Kind
              </label>
              <select id="list-role" className="select" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                <option value="">Any kind</option>
                {roles.map(([r, n]) => (
                  <option key={r} value={r}>
                    {r} ({n})
                  </option>
                ))}
              </select>
            </div>
          ) : null}
          <div>
            <label className="field-label" htmlFor="list-sort">
              Sort
            </label>
            <select id="list-sort" className="select" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              <option value="name">Name</option>
              <option value="updated">Recently edited</option>
              <option value="status">Status</option>
              <option value="role">Kind</option>
            </select>
          </div>
          <div className="mode-toggle" role="group" aria-label="View style">
            <button type="button" aria-pressed={view === 'cards'} onClick={() => setView('cards')}>
              Cards
            </button>
            <button type="button" aria-pressed={view === 'table'} onClick={() => setView('table')}>
              Table
            </button>
          </div>
          {archivedCount > 0 ? (
            <label className="check">
              <input type="checkbox" checked={showArchived} onChange={(e) => setShowArchived(e.target.checked)} />
              Show {archivedCount} archived
            </label>
          ) : null}
        </div>
      </div>

      {type === 'faction' ? <RelationMatrixPanel /> : null}

      <p className="dim" style={{ fontSize: 'var(--fs-sm)', marginBottom: 'var(--sp-3)' }}>
        {filtered.length} of {all.filter((e) => !e.archived).length} shown
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          title={all.length === 0 ? `No ${schema.plural.toLowerCase()} yet` : 'Nothing matches those filters'}
          action={
            all.length === 0 ? <QuickCreate defaultType={type} label={`+ Create the first ${schema.label.toLowerCase()}`} /> : undefined
          }
        >
          {all.length === 0
            ? `This section is empty. Entries you create here will link automatically into the rest of the wiki.`
            : 'Try clearing the status or kind filter.'}
        </EmptyState>
      ) : view === 'cards' ? (
        <div className="grid grid-2">
          {filtered.map((e) => (
            <Link key={e.id} to={entityPath(e)} className="card" style={{ ['--accent' as string]: `var(${schema.accentVar})` }}>
              <div style={{ display: 'flex', gap: 'var(--sp-3)' }}>
                {e.type === 'city' ? (
                  <CityCrest id={e.id} palette={Array.isArray(e.fields.palette) ? (e.fields.palette as string[]) : undefined} size={34} />
                ) : null}
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div className="card-title">
                    <span>{e.name}</span>
                    {e.workingTitle ? <WorkingTitleTag /> : null}
                    <span style={{ marginLeft: 'auto' }}>
                      <StatusBadge status={e.status} />
                    </span>
                  </div>
                  {e.summary ? <div className="card-sub">{e.summary}</div> : <div className="card-sub dimmer">No summary yet.</div>}
                  <div className="card-meta">
                    {facts.map((d) => {
                      const v = e.fields[d.key]
                      if (v == null || v === '' || (Array.isArray(v) && !v.length)) return null
                      return (
                        <span className="chip" key={d.key} title={d.label}>
                          {isTbd(v) ? 'TBD' : Array.isArray(v) ? `${v.length} linked` : String(v).slice(0, 34)}
                        </span>
                      )
                    })}
                    {index && (index.neighbours[e.id]?.size ?? 0) === 0 ? (
                      <span className="chip" style={{ color: 'var(--st-review)', borderColor: 'currentColor' }}>
                        orphaned
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                {facts.map((d) => (
                  <th key={d.key}>{d.label}</th>
                ))}
                <th>Status</th>
                <th>Links</th>
                <th>Edited</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr key={e.id}>
                  <td>
                    <Link to={entityPath(e)}>{e.name}</Link>
                    {e.archived ? <span className="dimmer"> (archived)</span> : null}
                  </td>
                  {facts.map((d) => {
                    const v = e.fields[d.key]
                    return (
                      <td key={d.key}>
                        {v == null || v === '' ? '—' : isTbd(v) ? <span className="tbd-tag">TBD</span> : Array.isArray(v) ? `${v.length}` : String(v)}
                      </td>
                    )
                  })}
                  <td>
                    <StatusBadge status={e.status} />
                  </td>
                  <td>{index?.neighbours[e.id]?.size ?? 0}</td>
                  <td className="dimmer">{ago(e.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function describe(type: string, n: number): string {
  const lines: Record<string, string> = {
    city: 'Every settlement in the world, with its biome, government, production, controlling factions and signature mechanic.',
    region: 'The biomes that make up the continent. Every point of land belongs to exactly one region.',
    district: 'Districts and locations inside settlements. These open from the city plans.',
    landmark: 'Named structures worth an entry of their own.',
    site: 'Villages, ruins, camps and outposts in the wilderness between the cities.',
    faction: 'Guilds, governments, orders and syndicates, including the ones operating across several cities.',
    npc: 'Named characters, their allegiances, their secrets and what a player can do about them.',
    quest: 'The quest database. Each entry carries objectives, branches, failure conditions and consequences.',
    item: 'Equipment and objects, with stats, legality, origin and upgrade paths.',
    material: 'Raw and refined materials, where they come from and what they become.',
    deposit: 'Specific worked and unworked sources on the map.',
    machine: 'Interactable production devices, with inputs, outputs, fuel and failure risks.',
    recipe: 'Crafting and production steps connecting materials, machines and finished items.',
    creature: 'The bestiary. Biology first, combat second.',
    spell: 'Spells, enchantments, potions, rituals, wards and curses — all with a cost and a legal status.',
    food: 'Crops, livestock, forage and prepared food, region by region.',
    religion: 'Religions, cultures, philosophies and the traditions that come with them.',
    mechanic: 'Game mechanics as design documents: loop, rules, variables, failure states, edge cases.',
    skill: 'Every skill node across the trees, with prerequisites, ranks and legality.',
    event: 'The timeline.',
    war: 'Wars, disputes, blockades and cold conflicts, and what is at stake in each.',
    route: 'Roads, sea lanes, trade routes and smuggling routes.',
    note: 'Open design questions and developer notes. This is where the unresolved parts of the world live.',
  }
  return `${lines[type] ?? ''} ${n === 0 ? '' : ''}`.trim()
}
