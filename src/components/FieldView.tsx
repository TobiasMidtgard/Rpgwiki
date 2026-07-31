/**
 * Read-mode field rendering.
 *
 * One renderer per field kind, driven by the schema. Unresolved fields render
 * as an explicit TBD with the open question attached rather than disappearing,
 * because a visible gap is more useful to a designer than a tidy blank.
 */

import { Fragment } from 'react'
import type { FieldDef, FieldValue, TableRow } from '../core/types'
import { isTbd } from '../core/types'
import { EntityChip } from './EntityLink'
import { InlineProse } from './InlineProse'

export function isEmptyValue(v: FieldValue): boolean {
  if (v == null) return true
  if (isTbd(v)) return false
  if (typeof v === 'string') return v.trim() === ''
  if (Array.isArray(v)) return v.length === 0
  return false
}

export function TbdView({ q }: { q?: string }) {
  return (
    <span className="tbd">
      <span className="tbd-tag">TBD</span>
      {q ? <span className="tbd-q">{q}</span> : <span className="tbd-q">Not yet established.</span>}
    </span>
  )
}

export function FieldValueView({ def, value }: { def: FieldDef; value: FieldValue }) {
  if (isTbd(value)) return <TbdView q={value.q} />
  if (isEmptyValue(value)) return <span className="dimmer">—</span>

  switch (def.kind) {
    case 'longtext':
      return (
        <div className="prose">
          <InlineProse text={String(value)} />
        </div>
      )

    case 'refs': {
      const ids = value as string[]
      return (
        <div className="ref-tokens">
          {ids.map((id) => (
            <EntityChip key={id} id={id} />
          ))}
        </div>
      )
    }

    case 'list': {
      const items = value as string[]
      return (
        <ul className="list-plain">
          {items.map((x, i) => (
            <li key={i}>
              <InlineProse text={x} />
            </li>
          ))}
        </ul>
      )
    }

    case 'tags': {
      const items = value as string[]
      return (
        <div className="ref-tokens">
          {items.map((x, i) => (
            <span key={i} className="chip">
              {/^#[0-9a-fA-F]{3,8}$/.test(x) ? (
                <>
                  <span className="layer-swatch" style={{ background: x }} />
                  <span className="mono">{x}</span>
                </>
              ) : (
                x
              )}
            </span>
          ))}
        </div>
      )
    }

    case 'table': {
      const rows = value as TableRow[]
      const cols = def.columns ?? [...new Set(rows.flatMap((r) => Object.keys(r)))].map((k) => ({ key: k, label: k }))
      return (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                {cols.map((c) => (
                  <th key={c.key}>{c.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  {cols.map((c) => (
                    <td key={c.key}>
                      <InlineProse text={r[c.key] ?? ''} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }

    case 'bool':
      return <span>{value ? 'Yes' : 'No'}</span>

    case 'multiselect':
      return (
        <div className="ref-tokens">
          {(value as string[]).map((x, i) => (
            <span key={i} className="chip">
              {x}
            </span>
          ))}
        </div>
      )

    default:
      return (
        <span>
          <InlineProse text={String(value)} />
        </span>
      )
  }
}

/** A labelled field row inside a section. */
export function FieldRow({ def, value }: { def: FieldDef; value: FieldValue }) {
  if (isEmptyValue(value)) return null
  const wide = def.kind === 'longtext' || def.kind === 'table'
  if (wide) {
    return (
      <div style={{ marginBottom: 'var(--sp-4)' }}>
        <div className="label" style={{ marginBottom: 5 }}>
          {def.label}
        </div>
        <FieldValueView def={def} value={value} />
      </div>
    )
  }
  return (
    <Fragment>
      <dt>{def.label}</dt>
      <dd>
        <FieldValueView def={def} value={value} />
      </dd>
    </Fragment>
  )
}
