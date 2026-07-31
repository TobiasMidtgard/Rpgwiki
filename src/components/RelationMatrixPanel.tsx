/**
 * Collapsible wrapper for the faction relationship matrix, so the factions
 * list page can carry it without loading the grid until it is asked for.
 */

import { Suspense, lazy } from 'react'
import { Loading, useLocalState } from './ui'

const RelationMatrix = lazy(() => import('./RelationMatrix').then((m) => ({ default: m.RelationMatrix })))

export function RelationMatrixPanel() {
  const [open, setOpen] = useLocalState('factions.matrix', false)
  return (
    <div className="panel" style={{ marginBottom: 'var(--sp-4)' }}>
      <button
        type="button"
        className="nav-group-btn"
        aria-expanded={open}
        aria-controls="faction-matrix"
        onClick={() => setOpen(!open)}
        style={{ padding: '9px var(--sp-4)' }}
      >
        <span className="caret" aria-hidden="true">
          ▶
        </span>
        Relationship matrix
        <span className="nav-group-count">alliances, rivalries, wars, debts, truces, infiltration</span>
      </button>
      {open ? (
        <div className="panel-body" id="faction-matrix">
          <Suspense fallback={<Loading label="Building the matrix" />}>
            <RelationMatrix />
          </Suspense>
        </div>
      ) : null}
    </div>
  )
}
