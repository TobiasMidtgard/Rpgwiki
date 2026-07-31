/**
 * Data, backup and integrity.
 *
 * Export and import the whole world, take a backup, run the reference check
 * and reset to the shipped seed.
 */

import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { byteSize, formatBytes } from '../core/db'
import { download, exportJson, importJson, worldToMarkdown } from '../core/io'
import { replaceWorld, resetToSeed, saveNow, useStoreStatus, useWorld } from '../core/store'
import { buildIndex } from '../core/relations'
import { SEED_VERSION, buildSeed } from '../world/seed'
import { entityPathById } from '../components/EntityLink'
import { EmptyState, confirmAction, toast } from '../components/ui'

export default function DataPage() {
  const world = useWorld()
  const status = useStoreStatus()
  const fileInput = useRef<HTMLInputElement>(null)
  const [importError, setImportError] = useState<string | null>(null)
  const [importing, setImporting] = useState(false)

  const index = useMemo(() => (world ? buildIndex(world) : null), [world])

  if (!world || !index) return null

  const size = byteSize(world)
  const entityCount = Object.keys(world.entities).length
  const relationCount = Object.keys(world.relations).length
  const revisionCount = Object.values(world.revisions).reduce((n, r) => n + r.length, 0)

  const doImport = async (file: File) => {
    setImporting(true)
    setImportError(null)
    try {
      const text = await file.text()
      const result = importJson(text)
      if (!result.ok || !result.world) {
        setImportError(result.error ?? 'Import failed for an unknown reason.')
        setImporting(false)
        return
      }
      const ok = await confirmAction({
        title: 'Replace the current world?',
        body: (
          <>
            <p>
              The file contains {result.stats?.entities} entries and {result.stats?.relations} links. Importing replaces
              everything currently in this browser.
            </p>
            <p>
              Your current world has {entityCount} entries. Export it first if you want to keep it. This is undoable with
              the undo button until you reload.
            </p>
          </>
        ),
        confirmLabel: 'Replace world',
        danger: true,
      })
      if (ok) {
        replaceWorld(result.world)
        await saveNow()
        toast(`Imported ${result.stats?.entities} entries`, 'ok')
      }
    } catch (err) {
      setImportError(String(err))
    }
    setImporting(false)
  }

  return (
    <div className="main-pad">
      <div className="page-head">
        <div style={{ minWidth: 0 }}>
          <h1>Data, backup and integrity</h1>
          <p className="lede">
            The world lives in this browser's storage and saves automatically. Export regularly if it matters — clearing
            site data will remove it.
          </p>
        </div>
      </div>

      <div className="grid grid-4" style={{ marginBottom: 'var(--sp-4)' }}>
        <div className="stat">
          <div className="stat-value">{entityCount}</div>
          <div className="stat-label">Entries</div>
        </div>
        <div className="stat">
          <div className="stat-value">{relationCount}</div>
          <div className="stat-label">Links</div>
        </div>
        <div className="stat">
          <div className="stat-value">{revisionCount}</div>
          <div className="stat-label">Stored revisions</div>
        </div>
        <div className="stat">
          <div className="stat-value">{formatBytes(size)}</div>
          <div className="stat-label">Stored size</div>
        </div>
      </div>

      <div className="dash-grid">
        <div className="panel">
          <div className="panel-head">
            <h3>Export</h3>
          </div>
          <div className="panel-body">
            <p className="prose" style={{ fontSize: 'var(--fs-sm)', marginBottom: 'var(--sp-3)' }}>
              JSON round-trips losslessly — entries, links, map geometry, marker positions and revision history.
              Markdown is a one-way export for reading outside the app or committing to a repository.
            </p>
            <div className="btn-row">
              <button
                type="button"
                className="btn primary"
                onClick={() => {
                  download(`world-${new Date().toISOString().slice(0, 10)}.json`, exportJson(world))
                  toast('World exported as JSON', 'ok')
                }}
              >
                Export JSON
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  download(`world-${new Date().toISOString().slice(0, 10)}.md`, worldToMarkdown(world), 'text/markdown')
                  toast('World exported as Markdown', 'ok')
                }}
              >
                Export Markdown
              </button>
              <button
                type="button"
                className="btn"
                onClick={async () => {
                  await saveNow()
                  toast('Saved to browser storage', 'ok')
                }}
              >
                Save now ({status.saveState})
              </button>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <h3>Import</h3>
          </div>
          <div className="panel-body">
            <p className="prose" style={{ fontSize: 'var(--fs-sm)', marginBottom: 'var(--sp-3)' }}>
              Load a JSON export produced by this wiki. You will be asked to confirm before anything is replaced.
            </p>
            <input
              ref={fileInput}
              type="file"
              accept="application/json,.json"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) void doImport(file)
                e.target.value = ''
              }}
            />
            <div className="btn-row">
              <button type="button" className="btn" onClick={() => fileInput.current?.click()} disabled={importing}>
                {importing ? 'Reading…' : 'Choose a JSON file'}
              </button>
            </div>
            {importError ? (
              <div className="state error" style={{ marginTop: 'var(--sp-3)', textAlign: 'left' }} role="alert">
                <strong>Import failed</strong>
                <p style={{ margin: '4px 0 0' }}>{importError}</p>
              </div>
            ) : null}
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <h3>Reference check</h3>
            <span className="nav-group-count spacer">{index.broken.length} broken</span>
          </div>
          <div className="panel-body flush">
            {index.broken.length === 0 ? (
              <p className="dim" style={{ padding: 'var(--sp-4)', fontSize: 'var(--fs-sm)', margin: 0 }}>
                Every reference in the world resolves to an entry that exists.
              </p>
            ) : (
              <>
                <p className="dim" style={{ padding: 'var(--sp-3) var(--sp-4) 0', fontSize: 'var(--fs-sm)', margin: 0 }}>
                  These entries point at ids that do not exist. Open the source entry and either create the target or
                  remove the link.
                </p>
                {index.broken.slice(0, 60).map((b, i) => (
                  <div className="row-item" key={`${b.from}-${b.to}-${i}`}>
                    <Link to={entityPathById(b.from)}>{world.entities[b.from]?.name ?? b.from}</Link>
                    <span className="dimmer">{b.where}</span>
                    <span className="mono" style={{ color: 'var(--crimson-lit)', fontSize: 'var(--fs-micro)', marginLeft: 'auto' }}>
                      {b.to}
                    </span>
                  </div>
                ))}
                {index.broken.length > 60 ? (
                  <p className="dimmer" style={{ padding: 'var(--sp-3) var(--sp-4)', fontSize: 'var(--fs-micro)' }}>
                    Showing the first 60 of {index.broken.length}.
                  </p>
                ) : null}
              </>
            )}
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <h3>Orphaned entries</h3>
            <span className="nav-group-count spacer">{index.orphans.length}</span>
          </div>
          <div className="panel-body flush">
            {index.orphans.length === 0 ? (
              <p className="dim" style={{ padding: 'var(--sp-4)', fontSize: 'var(--fs-sm)', margin: 0 }}>
                Every entry is connected to at least one other.
              </p>
            ) : (
              index.orphans.slice(0, 40).map((id) => (
                <Link key={id} to={entityPathById(id)} className="row-item">
                  {world.entities[id]?.name ?? id}
                  <span className="when">no links</span>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <h3>Reset</h3>
          </div>
          <div className="panel-body">
            <p className="prose" style={{ fontSize: 'var(--fs-sm)', marginBottom: 'var(--sp-3)' }}>
              Restore the shipped seed world (version {SEED_VERSION}). Everything you have written in this browser is
              discarded. Export first.
            </p>
            <button
              type="button"
              className="btn danger"
              onClick={async () => {
                const ok = await confirmAction({
                  title: 'Reset to the shipped seed?',
                  body: (
                    <>
                      <p>
                        This discards all {entityCount} entries currently in this browser and reloads the seed world.
                      </p>
                      <p>Export a JSON backup first if there is anything here you want to keep.</p>
                    </>
                  ),
                  confirmLabel: 'Discard and reset',
                  danger: true,
                })
                if (ok) {
                  resetToSeed(buildSeed, SEED_VERSION)
                  await saveNow()
                  toast('World reset to the shipped seed', 'ok')
                }
              }}
            >
              Reset to seed
            </button>
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <h3>Where the data lives</h3>
          </div>
          <div className="panel-body">
            <dl className="kv" style={{ fontSize: 'var(--fs-sm)' }}>
              <dt>Storage</dt>
              <dd>IndexedDB in this browser, with a localStorage fallback.</dd>
              <dt>Saving</dt>
              <dd>Automatic, half a second after each change.</dd>
              <dt>Seed version</dt>
              <dd>{world.meta.seedVersion}</dd>
              <dt>Edited</dt>
              <dd>{world.meta.touched ? 'Yes — seed upgrades will no longer overwrite your work' : 'Not yet'}</dd>
            </dl>
          </div>
        </div>
      </div>

      {entityCount === 0 ? (
        <EmptyState title="The world is empty">
          Import a JSON export or reset to the shipped seed to get started.
        </EmptyState>
      ) : null}
    </div>
  )
}
