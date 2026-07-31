/**
 * Primary navigation.
 *
 * Twenty-one sections is a lot, so groups collapse and remember their state.
 * Counts come from live data, so a section that is still empty says so.
 */

import { NavLink, useLocation } from 'react-router-dom'
import { SCHEMAS } from '../core/schema'
import type { EntityType } from '../core/types'
import { useWorld } from '../core/store'
import { useLocalState } from './ui'

interface NavEntry {
  to: string
  label: string
  glyph: string
  type?: EntityType
  accentVar?: string
}

interface NavGroupDef {
  key: string
  label: string
  entries: NavEntry[]
}

const t = (type: EntityType, label?: string): NavEntry => ({
  to: `/${SCHEMAS[type].route}`,
  label: label ?? SCHEMAS[type].plural,
  glyph: SCHEMAS[type].glyph,
  type,
  accentVar: SCHEMAS[type].accentVar,
})

export const NAV_GROUPS: NavGroupDef[] = [
  {
    key: 'world',
    label: 'World',
    entries: [
      { to: '/', label: 'Dashboard', glyph: '◱' },
      { to: '/atlas', label: 'Atlas', glyph: '◈', accentVar: '--t-city' },
      t('region'),
      t('city'),
      t('district'),
      t('site'),
    ],
  },
  {
    key: 'people',
    label: 'People & Power',
    entries: [t('faction'), t('npc'), t('religion'), t('war')],
  },
  {
    key: 'play',
    label: 'Play',
    entries: [
      t('quest'),
      { to: '/quests/flow', label: 'Quest flow board', glyph: '⑃', accentVar: '--t-quest' },
      t('mechanic'),
      t('skill'),
      { to: '/skills/tree', label: 'Skill tree viewer', glyph: '⬡', accentVar: '--t-skill' },
    ],
  },
  {
    key: 'things',
    label: 'Things & Making',
    entries: [
      t('item'),
      t('material'),
      t('deposit'),
      t('machine'),
      t('recipe'),
      { to: '/production', label: 'Production chains', glyph: '⇶', accentVar: '--t-machine' },
    ],
  },
  {
    key: 'nature',
    label: 'Nature & Magic',
    entries: [t('creature'), t('spell'), t('food')],
  },
  {
    key: 'record',
    label: 'Record',
    entries: [
      t('event'),
      t('route'),
      { to: '/gallery', label: 'Gallery', glyph: '▤' },
      t('note'),
      { to: '/graph', label: 'Connection graph', glyph: '⁂' },
    ],
  },
  {
    key: 'tools',
    label: 'Tools',
    entries: [
      { to: '/search', label: 'Search & filters', glyph: '⌕' },
      { to: '/data', label: 'Data, backup & import', glyph: '⛁' },
      { to: '/about', label: 'About this wiki', glyph: '✦' },
    ],
  },
]

export function Nav({ open, onNavigate }: { open: boolean; onNavigate?: () => void }) {
  const world = useWorld()
  const [collapsed, setCollapsed] = useLocalState<string[]>('nav.collapsed', [])
  const loc = useLocation()

  const counts: Record<string, number> = {}
  if (world) {
    for (const e of Object.values(world.entities)) {
      if (e.archived) continue
      counts[e.type] = (counts[e.type] ?? 0) + 1
    }
  }

  const toggle = (key: string) =>
    setCollapsed((c) => (c.includes(key) ? c.filter((k) => k !== key) : [...c, key]))

  return (
    <nav className={`nav${open ? ' open' : ''}`} id="nav" aria-label="Sections">
      {NAV_GROUPS.map((g) => {
        const isOpen = !collapsed.includes(g.key)
        const total = g.entries.reduce((n, e) => n + (e.type ? counts[e.type] ?? 0 : 0), 0)
        return (
          <div className="nav-group" key={g.key}>
            <button
              type="button"
              className="nav-group-btn"
              aria-expanded={isOpen}
              aria-controls={`navgrp-${g.key}`}
              onClick={() => toggle(g.key)}
            >
              <span className="caret" aria-hidden="true">
                ▶
              </span>
              {g.label}
              {total > 0 ? <span className="nav-group-count">{total}</span> : null}
            </button>
            {isOpen ? (
              <div className="nav-items" id={`navgrp-${g.key}`}>
                {g.entries.map((e) => {
                  const active = e.to === '/' ? loc.pathname === '/' : loc.pathname.startsWith(e.to)
                  const n = e.type ? counts[e.type] ?? 0 : undefined
                  return (
                    <NavLink
                      key={e.to}
                      to={e.to}
                      className={`nav-item${active ? ' active' : ''}`}
                      onClick={onNavigate}
                      aria-current={active ? 'page' : undefined}
                    >
                      <span className="glyph" aria-hidden="true" style={e.accentVar ? { color: `var(${e.accentVar})` } : undefined}>
                        {e.glyph}
                      </span>
                      <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.label}</span>
                      {n !== undefined ? <span className="n">{n}</span> : null}
                    </NavLink>
                  )
                })}
              </div>
            ) : null}
          </div>
        )
      })}
    </nav>
  )
}
