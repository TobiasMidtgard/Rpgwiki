/**
 * City plan.
 *
 * Renders the district polygons authored on `city.fields.cityMap` as a drawn
 * plan on parchment. Districts and landmarks are clickable and open their own
 * entries, which is what makes a city map a navigation surface rather than a
 * picture.
 */

import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { CityMap } from '../world/kit'
import { useWorld } from '../core/store'
import { entityPathById } from './EntityLink'
import { EmptyState } from './ui'

const DISTRICT_TINTS = ['#c9b48b', '#bda87e', '#d2c199', '#b6a374', '#c4b087', '#cbbb95', '#b0a06f', '#d6c7a1']

function tint(id: string, i: number): string {
  let h = 0
  for (let k = 0; k < id.length; k++) h = (h * 31 + id.charCodeAt(k)) >>> 0
  return DISTRICT_TINTS[(h + i) % DISTRICT_TINTS.length]
}

export function isCityMap(v: unknown): v is CityMap {
  if (typeof v !== 'object' || v === null) return false
  const m = v as CityMap
  return typeof m.w === 'number' && typeof m.h === 'number' && Array.isArray(m.districts)
}

export function CityPlan({ cityId, plan }: { cityId: string; plan: unknown }) {
  const world = useWorld()
  const nav = useNavigate()
  const [hover, setHover] = useState<string | null>(null)

  const map = isCityMap(plan) ? plan : null

  const districts = useMemo(() => {
    if (!map || !world) return []
    return map.districts
      .filter((d) => Array.isArray(d.polygon) && d.polygon.length >= 3)
      .map((d, i) => ({
        ...d,
        name: world.entities[d.id]?.name ?? d.id,
        known: !!world.entities[d.id],
        fill: tint(d.id, i),
        centre: centroidOf(d.polygon),
      }))
  }, [map, world])

  if (!map || !districts.length) {
    return (
      <EmptyState title="No district plan yet">
        This settlement has no city map authored. Add a <span className="mono">cityMap</span> value with district
        polygons and the plan will appear here, with every district clickable.
      </EmptyState>
    )
  }

  const landmarks = (map.landmarks ?? []).filter((l) => Array.isArray(l.at) && l.at.length === 2)

  return (
    <div>
      <div className="city-plan">
        <svg viewBox={`0 0 ${map.w} ${map.h}`} role="img" aria-label={`Plan of ${world?.entities[cityId]?.name ?? 'the city'}`}>
          <rect width={map.w} height={map.h} fill="#e3d7bb" />

          {/* Water under everything */}
          {(map.water ?? []).map((poly, i) =>
            Array.isArray(poly) && poly.length >= 3 ? (
              <path key={`w${i}`} d={pathOf(poly)} fill="#a9b2a2" opacity={0.8} />
            ) : null,
          )}

          {/* Districts */}
          {districts.map((d) => {
            const active = hover === d.id
            return (
              <g
                key={d.id}
                className="plan-district"
                onMouseEnter={() => setHover(d.id)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(d.id)}
                onBlur={() => setHover(null)}
                onClick={() => d.known && nav(entityPathById(d.id, 'district'))}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && d.known) {
                    e.preventDefault()
                    nav(entityPathById(d.id, 'district'))
                  }
                }}
                tabIndex={d.known ? 0 : -1}
                role={d.known ? 'link' : undefined}
                aria-label={d.known ? `Open ${d.name}` : undefined}
                style={{ cursor: d.known ? 'pointer' : 'default' }}
              >
                <path d={pathOf(d.polygon)} fill={d.fill} stroke="#6b5c42" strokeWidth={active ? 3.2 : 1.6} opacity={active ? 1 : 0.94} />
                <path d={pathOf(d.polygon)} fill="none" stroke="#3b3222" strokeWidth={0.7} opacity={0.35} />
              </g>
            )
          })}

          {/* Roads */}
          {(map.roads ?? []).map((line, i) =>
            Array.isArray(line) && line.length >= 2 ? (
              <polyline
                key={`r${i}`}
                points={line.map((p) => p.join(',')).join(' ')}
                fill="none"
                stroke="#6b5c42"
                strokeWidth={3}
                strokeLinecap="round"
                opacity={0.55}
              />
            ) : null,
          )}

          {/* Walls */}
          {map.walls && map.walls.length >= 2 ? (
            <polyline
              points={map.walls.map((p) => p.join(',')).join(' ')}
              fill="none"
              stroke="#3b3222"
              strokeWidth={5}
              strokeLinejoin="round"
              opacity={0.8}
            />
          ) : null}

          {/* District labels */}
          {districts.map((d) => (
            <text
              key={`t-${d.id}`}
              x={d.centre[0]}
              y={d.centre[1]}
              textAnchor="middle"
              fontSize={15}
              fill="#3b3222"
              stroke="#e3d7bb"
              strokeWidth={3.4}
              paintOrder="stroke"
              pointerEvents="none"
              style={{ fontFamily: 'var(--ff-display)', letterSpacing: '0.02em' }}
            >
              {d.name}
            </text>
          ))}

          {/* Landmarks */}
          {landmarks.map((l) => {
            const name = world?.entities[l.id]?.name ?? l.id
            const known = !!world?.entities[l.id]
            return (
              <g
                key={l.id}
                transform={`translate(${l.at[0]},${l.at[1]})`}
                onClick={() => known && nav(entityPathById(l.id, 'landmark'))}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && known) {
                    e.preventDefault()
                    nav(entityPathById(l.id, 'landmark'))
                  }
                }}
                tabIndex={known ? 0 : -1}
                role={known ? 'link' : undefined}
                aria-label={known ? `Open ${name}` : undefined}
                style={{ cursor: known ? 'pointer' : 'default' }}
              >
                <circle r={11} fill="#7d3f2f" stroke="#e3d7bb" strokeWidth={2.4} />
                <path d="M0,-5 L4.5,3 L-4.5,3 Z" fill="#e3d7bb" />
                <text
                  y={26}
                  textAnchor="middle"
                  fontSize={13}
                  fill="#5b2f22"
                  stroke="#e3d7bb"
                  strokeWidth={3}
                  paintOrder="stroke"
                  style={{ fontFamily: 'var(--ff-display)' }}
                >
                  {name}
                </text>
              </g>
            )
          })}

          <rect x={4} y={4} width={map.w - 8} height={map.h - 8} fill="none" stroke="#8a7550" strokeWidth={2.5} opacity={0.6} />
        </svg>
      </div>
      <p className="dim" style={{ fontSize: 'var(--fs-micro)', marginTop: 6 }}>
        Districts and landmarks are clickable. {districts.filter((d) => !d.known).length > 0 ? `${districts.filter((d) => !d.known).length} shape(s) reference an entry that does not exist yet.` : null}
      </p>
    </div>
  )
}

function pathOf(poly: [number, number][]): string {
  return `M${poly.map((p) => `${p[0]},${p[1]}`).join('L')}Z`
}

function centroidOf(poly: [number, number][]): [number, number] {
  let a = 0
  let cx = 0
  let cy = 0
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const f = poly[j][0] * poly[i][1] - poly[i][0] * poly[j][1]
    a += f
    cx += (poly[j][0] + poly[i][0]) * f
    cy += (poly[j][1] + poly[i][1]) * f
  }
  if (Math.abs(a) < 1e-6) {
    const n = poly.length || 1
    return [poly.reduce((s, p) => s + p[0], 0) / n, poly.reduce((s, p) => s + p[1], 0) / n]
  }
  return [cx / (3 * a), cy / (3 * a)]
}
