/**
 * The entry page.
 *
 * One template drives every entity type, generated from the schema: hero,
 * key-facts strip, tabbed sections, automatic backlinks, and type-specific
 * blocks (a city's district plan, a quest's branching flow, a material's
 * production chain) injected into the right section.
 */

import { Suspense, lazy, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { keyFacts, schemaOf } from '../core/schema'
import type { Entity, EntityType, FieldDef } from '../core/types'
import { RELATION_META } from '../core/types'
import {
  archiveEntity,
  deleteEntityForever,
  duplicateEntity,
  restoreEntity,
  revertToRevision,
  useWorld,
} from '../core/store'
import { buildIndex, sourcesOf, targetsOf } from '../core/relations'
import { setEditing, setShowSecrets, useUiState } from '../core/uiState'
import { entityToMarkdown, download } from '../core/io'
import { CityVista } from '../art/vista'
import { TypeBanner } from '../art/banner'
import { Backlinks } from '../components/Backlinks'
import { CityPlan } from '../components/CityPlan'
import { EntityChip, entityPath } from '../components/EntityLink'
import { FieldRow, FieldValueView, isEmptyValue } from '../components/FieldView'
import { CustomFieldsEditor, FieldEditor, IdentityEditor } from '../components/EntityEditor'
import { Dialog, EmptyState, Loading, StatusBadge, TypeGlyph, WorkingTitleTag, ago, confirmAction, toast } from '../components/ui'
import { RelationEditor } from '../components/RelationEditor'

const QuestFlowView = lazy(() => import('./QuestFlowPage').then((m) => ({ default: m.QuestFlowView })))
const MiniChain = lazy(() => import('./ProductionPage').then((m) => ({ default: m.MiniChain })))
const MiniGraph = lazy(() => import('./GraphPage').then((m) => ({ default: m.MiniGraph })))
const NpcRelationshipGraph = lazy(() =>
  import('../components/RelationMatrix').then((m) => ({ default: m.NpcRelationshipGraph })),
)

export default function EntityPage() {
  const { section, id } = useParams()
  const world = useWorld()
  const nav = useNavigate()
  const ui = useUiState()
  const [tab, setTab] = useState<string | null>(null)
  const [showRevisions, setShowRevisions] = useState(false)

  const decoded = id ? decodeURIComponent(id) : ''
  const entity = world?.entities[decoded]
  const index = useMemo(() => (world ? buildIndex(world) : null), [world])

  if (!world) return null

  if (!entity) {
    return (
      <div className="main-pad">
        <EmptyState title="No such entry">
          Nothing in this world has the id <span className="mono">{decoded}</span>. It may have been deleted, or a link
          somewhere points at an id that was never created.
          <br />
          <Link to={`/${section ?? ''}`}>Back to the list</Link>
        </EmptyState>
      </div>
    )
  }

  const schema = schemaOf(entity.type)
  const expectedRoute = schema.route
  if (section && section !== expectedRoute) {
    nav(entityPath(entity), { replace: true })
    return null
  }

  const tabs = schema.tabs ?? []
  const activeTab = tab ?? tabs[0]?.key ?? null
  const groups = schema.groups.filter((g) => (tabs.length ? (g.tab ?? tabs[0].key) === activeTab : true))
  const facts = keyFacts(entity.type).filter((d) => !isEmptyValue(entity.fields[d.key]))
  const palette = Array.isArray(entity.fields.palette) ? (entity.fields.palette as string[]) : undefined
  const revisions = world.revisions[entity.id] ?? []

  const exportMd = () => {
    download(`${entity.id}.md`, entityToMarkdown(entity, world), 'text/markdown')
    toast('Markdown exported', 'ok')
  }

  const onArchive = async () => {
    if (entity.archived) {
      restoreEntity(entity.id)
      toast(`${entity.name} restored`, 'ok')
      return
    }
    const ok = await confirmAction({
      title: `Archive ${entity.name}?`,
      body: (
        <>
          <p>
            Archiving hides the entry from lists, search and the map, but keeps it and all its links intact. You can
            restore it at any time.
          </p>
        </>
      ),
      confirmLabel: 'Archive',
    })
    if (ok) {
      archiveEntity(entity.id)
      toast(`${entity.name} archived`, 'ok')
    }
  }

  const onDelete = async () => {
    const inbound = index?.in[entity.id]?.length ?? 0
    const ok = await confirmAction({
      title: `Delete ${entity.name} permanently?`,
      body: (
        <>
          <p>
            This removes the entry and every relation touching it. {inbound > 0 ? `${inbound} other entries link here and will lose those links.` : 'Nothing links here.'}
          </p>
          <p>Archiving is usually the better option. This can be undone with the undo button, but not after a reload.</p>
        </>
      ),
      confirmLabel: 'Delete permanently',
      danger: true,
    })
    if (ok) {
      deleteEntityForever(entity.id)
      toast(`${entity.name} deleted`, 'err')
      nav(`/${schema.route}`)
    }
  }

  return (
    <article>
      <header className="entity-header">
        <div className="entity-hero">
          {entity.type === 'city' ? (
            <CityVista id={entity.id} palette={palette} title={`${entity.name} — generated vista`} />
          ) : (
            <TypeBanner type={entity.type} id={entity.id} height={300} />
          )}
          <div className="entity-hero-veil" />
          <div className="entity-hero-text">
            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 4 }}>
                <span className="chip" style={{ color: `var(${schema.accentVar})`, borderColor: 'currentColor' }}>
                  <TypeGlyph type={entity.type} size={10} /> {schema.label}
                </span>
                <StatusBadge status={entity.status} />
                {entity.workingTitle ? <WorkingTitleTag /> : null}
                {entity.archived ? <span className="chip" style={{ color: 'var(--text-4)' }}>Archived</span> : null}
              </div>
              <h1>{entity.name}</h1>
              {typeof entity.fields.epithet === 'string' && entity.fields.epithet ? (
                <div className="epithet">{entity.fields.epithet}</div>
              ) : null}
              {entity.aka?.length ? <div className="dim" style={{ fontSize: 'var(--fs-sm)' }}>Also: {entity.aka.join(' · ')}</div> : null}
            </div>
          </div>
        </div>

        <div className="entity-bar">
          {entity.summary ? (
            <p className="dim" style={{ margin: 0, fontSize: 'var(--fs-sm)', flex: 1, minWidth: 200 }}>
              {entity.summary}
            </p>
          ) : (
            <span className="dimmer" style={{ flex: 1, fontSize: 'var(--fs-sm)' }}>
              No summary yet.
            </span>
          )}
          <div className="btn-row">
            {entity.tags?.map((t) => (
              <Link key={t} to={`/search?tag=${encodeURIComponent(t)}`} className="chip">
                {t}
              </Link>
            ))}
          </div>
          <div className="btn-row" style={{ marginLeft: 'auto' }}>
            <button
              type="button"
              className={`btn sm${ui.editing ? ' on' : ''}`}
              onClick={() => setEditing(!ui.editing)}
              aria-pressed={ui.editing}
            >
              {ui.editing ? 'Done editing' : 'Edit'}
            </button>
            <button type="button" className="btn sm" onClick={() => setShowRevisions(true)} title="Revision history">
              History ({revisions.length})
            </button>
            <button
              type="button"
              className="btn sm"
              onClick={() => {
                const newId = duplicateEntity(entity.id)
                if (newId) {
                  toast(`Duplicated as ${world.entities[newId]?.name ?? newId}`, 'ok')
                  nav(entityPath({ id: newId, type: entity.type }))
                }
              }}
            >
              Duplicate
            </button>
            <button type="button" className="btn sm" onClick={exportMd}>
              Export .md
            </button>
            <button type="button" className="btn sm" onClick={onArchive}>
              {entity.archived ? 'Restore' : 'Archive'}
            </button>
            {ui.editing ? (
              <button type="button" className="btn sm danger" onClick={onDelete}>
                Delete
              </button>
            ) : null}
          </div>
        </div>

        {facts.length ? (
          <div className="facts-strip">
            {facts.slice(0, 8).map((d) => (
              <div className="fact" key={d.key}>
                <div className="fact-label">{d.label}</div>
                <div className="fact-value">
                  <FieldValueView def={d} value={entity.fields[d.key]} />
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {tabs.length ? (
          <div className="tabs" role="tablist" aria-label="Sections">
            {tabs.map((t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                className="tab"
                aria-selected={activeTab === t.key}
                onClick={() => setTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
        ) : null}
      </header>

      {ui.editing ? (
        <div className="edit-banner">
          <span>Editing. Changes save automatically and every change is undoable.</span>
          <label className="check" style={{ marginLeft: 'auto', color: 'inherit' }}>
            <input type="checkbox" checked={ui.showSecrets} onChange={(e) => setShowSecrets(e.target.checked)} />
            Reveal secrets
          </label>
        </div>
      ) : null}

      <div className="main-pad">
        <div className="entity-layout">
          <div style={{ minWidth: 0 }}>
            {ui.editing ? <IdentityEditor entity={entity} /> : null}

            {groups.map((g) => {
              const defs = schema.fields.filter((f) => f.group === g.key)
              const custom = (entity.custom ?? []).filter((c) => (c.group ?? schema.groups[0].key) === g.key)
              const auto = <AutoSection entity={entity} group={g.key} />
              const hasContent =
                ui.editing || custom.length > 0 || auto !== null || defs.some((d) => !isEmptyValue(entity.fields[d.key]))
              if (!hasContent) return null
              return (
                <section className="section" key={g.key} id={`s-${g.key}`}>
                  <div className="section-head">
                    <h2>{g.label}</h2>
                    <span className="rule" />
                  </div>

                  {ui.editing ? (
                    defs.map((d) => <FieldEditor key={d.key} entity={entity} def={d} />)
                  ) : (
                    <FieldGroupView entity={entity} defs={defs} />
                  )}

                  {custom.length ? (
                    <dl className="kv" style={{ marginTop: 'var(--sp-3)' }}>
                      {custom.map((c) => (
                        <FieldRow
                          key={c.id}
                          def={{ key: c.id, label: c.label, kind: c.kind === 'longtext' ? 'longtext' : c.kind === 'tags' ? 'tags' : 'text', group: g.key }}
                          value={c.value}
                        />
                      ))}
                    </dl>
                  ) : null}

                  {auto}
                </section>
              )
            })}

            {ui.editing ? (
              <>
                <section className="section">
                  <div className="section-head">
                    <h2>Links</h2>
                    <span className="rule" />
                  </div>
                  <RelationEditor entityId={entity.id} />
                </section>
                <section className="section">
                  <div className="section-head">
                    <h2>Extend this entry</h2>
                    <span className="rule" />
                  </div>
                  <CustomFieldsEditor entity={entity} />
                </section>
              </>
            ) : null}
          </div>

          <aside className="entity-aside">
            {tabs.length === 0 && groups.length > 3 ? (
              <div className="panel">
                <div className="panel-head">
                  <h3>On this page</h3>
                </div>
                <div className="panel-body toc">
                  {groups.map((g) => (
                    <a key={g.key} href={`#s-${g.key}`}>
                      {g.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}

            <Backlinks id={entity.id} />

            {entity.type !== 'note' ? (
              <div className="panel">
                <div className="panel-head">
                  <h3>Connections</h3>
                </div>
                <div className="panel-body flush">
                  <Suspense fallback={<Loading label="Drawing connections" />}>
                    <MiniGraph rootId={entity.id} depth={1} height={210} />
                  </Suspense>
                  <Link to={`/graph?focus=${encodeURIComponent(entity.id)}`} className="row-item">
                    Open in the connection graph →
                  </Link>
                </div>
              </div>
            ) : null}

            <div className="panel">
              <div className="panel-head">
                <h3>Record</h3>
              </div>
              <div className="panel-body" style={{ fontSize: 'var(--fs-sm)' }}>
                <dl className="kv" style={{ gridTemplateColumns: '84px 1fr' }}>
                  <dt>Id</dt>
                  <dd className="mono" style={{ fontSize: 'var(--fs-micro)', overflowWrap: 'anywhere' }}>
                    {entity.id}
                  </dd>
                  <dt>Type</dt>
                  <dd>{schema.label}</dd>
                  <dt>Status</dt>
                  <dd>
                    <StatusBadge status={entity.status} />
                  </dd>
                  <dt>Edited</dt>
                  <dd>{ago(entity.updatedAt)}</dd>
                  <dt>Revisions</dt>
                  <dd>{revisions.length}</dd>
                </dl>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {showRevisions ? (
        <Dialog title={`Revision history — ${entity.name}`} onClose={() => setShowRevisions(false)}>
          {revisions.length === 0 ? (
            <p className="dim">No revisions recorded yet. Editing a field stores the previous version here.</p>
          ) : (
            <div>
              {revisions.map((r) => (
                <div className="row-item" key={r.at}>
                  <span>{r.label}</span>
                  <span className="when">{ago(r.at)}</span>
                  <button
                    type="button"
                    className="btn sm"
                    onClick={async () => {
                      const ok = await confirmAction({
                        title: 'Revert to this revision?',
                        body: <p>The current version is stored as a new revision first, so this is reversible.</p>,
                        confirmLabel: 'Revert',
                      })
                      if (ok) {
                        revertToRevision(entity.id, r.at)
                        toast('Reverted', 'ok')
                        setShowRevisions(false)
                      }
                    }}
                  >
                    Revert
                  </button>
                </div>
              ))}
            </div>
          )}
        </Dialog>
      ) : null}
    </article>
  )
}

/* ------------------------------------------------------------------ */

function FieldGroupView({ entity, defs }: { entity: Entity; defs: FieldDef[] }) {
  const wide = defs.filter((d) => d.kind === 'longtext' || d.kind === 'table')
  const narrow = defs.filter((d) => d.kind !== 'longtext' && d.kind !== 'table')
  const hasNarrow = narrow.some((d) => !isEmptyValue(entity.fields[d.key]))
  return (
    <>
      {wide.map((d) => (
        <FieldRow key={d.key} def={d} value={entity.fields[d.key]} />
      ))}
      {hasNarrow ? (
        <dl className="kv">
          {narrow.map((d) => (
            <FieldRow key={d.key} def={d} value={entity.fields[d.key]} />
          ))}
        </dl>
      ) : null}
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Relation-driven blocks                                              */
/* ------------------------------------------------------------------ */

function RelatedList({ ids, empty }: { ids: string[]; empty: string }) {
  if (!ids.length) return <p className="dimmer" style={{ fontSize: 'var(--fs-sm)' }}>{empty}</p>
  return (
    <div className="ref-tokens">
      {ids.map((id) => (
        <EntityChip key={id} id={id} />
      ))}
    </div>
  )
}

/**
 * Injects computed content into the section it belongs in. Everything here is
 * derived from relations, so it stays correct when links change.
 */
function AutoSection({ entity, group }: { entity: Entity; group: string }): React.ReactElement | null {
  const world = useWorld()
  const index = useMemo(() => (world ? buildIndex(world) : null), [world])
  if (!world || !index) return null

  const contained = (type: EntityType) => targetsOf(index, entity.id, 'contains').filter((id) => world.entities[id]?.type === type)
  const inboundOfType = (type: EntityType) =>
    [...new Set((index.in[entity.id] ?? []).map((e) => e.from))].filter((id) => world.entities[id]?.type === type)

  const key = `${entity.type}:${group}`

  switch (key) {
    case 'city:citymap':
      return (
        <>
          <CityPlan cityId={entity.id} plan={entity.fields.cityMap} />
          <div style={{ marginTop: 'var(--sp-3)' }}>
            <div className="label" style={{ marginBottom: 4 }}>
              District entries
            </div>
            <RelatedList ids={contained('district')} empty="No districts linked to this city yet." />
          </div>
        </>
      )

    case 'city:landmark':
      return <RelatedList ids={contained('landmark')} empty="No landmark entry linked yet." />

    case 'city:factions':
      return (
        <RelatedList
          ids={[...new Set([...sourcesOf(index, entity.id, 'controls'), ...sourcesOf(index, entity.id, 'contests'), ...inboundOfType('faction')])]}
          empty="No factions are linked to this city yet."
        />
      )

    case 'city:npcs':
    case 'faction:people':
      return <RelatedList ids={inboundOfType('npc')} empty="No NPCs are linked here yet." />

    case 'city:quests':
    case 'faction:quests':
    case 'npc:quests':
      return <RelatedList ids={inboundOfType('quest')} empty="No quests are linked here yet." />

    case 'city:creatures':
      return <RelatedList ids={inboundOfType('creature')} empty="No creatures are linked to this city yet." />

    case 'city:mechanics':
      return <RelatedList ids={inboundOfType('mechanic')} empty="No mechanic entry is linked yet." />

    case 'city:services':
      return <RelatedList ids={inboundOfType('item')} empty="No items are linked to this city yet." />

    case 'faction:territory':
      return (
        <>
          <div className="label" style={{ marginBottom: 4 }}>
            Controls
          </div>
          <RelatedList ids={targetsOf(index, entity.id, 'controls')} empty="This faction holds no ground on the map." />
          <div className="label" style={{ margin: '10px 0 4px' }}>
            Contests
          </div>
          <RelatedList ids={targetsOf(index, entity.id, 'contests')} empty="Nothing contested." />
        </>
      )

    case 'faction:relations': {
      const hostile: Record<string, string[]> = {}
      for (const e of [...(index.out[entity.id] ?? []), ...(index.in[entity.id] ?? [])]) {
        const other = e.from === entity.id ? e.to : e.from
        if (world.entities[other]?.type !== 'faction') continue
        const label = RELATION_META[e.kind]?.label ?? e.kind
        ;(hostile[label] ??= []).push(other)
      }
      const entries = Object.entries(hostile)
      if (!entries.length) return <p className="dimmer" style={{ fontSize: 'var(--fs-sm)' }}>No standing with other factions recorded.</p>
      return (
        <>
          {entries.map(([label, ids]) => (
            <div key={label} style={{ marginBottom: 8 }}>
              <div className="label" style={{ marginBottom: 4 }}>
                {label}
              </div>
              <RelatedList ids={[...new Set(ids)]} empty="" />
            </div>
          ))}
          <Link to="/factions" className="btn sm" style={{ marginTop: 6 }}>
            Open the relationship matrix
          </Link>
        </>
      )
    }

    case 'npc:relationships':
      return (
        <Suspense fallback={<Loading label="Drawing relationships" />}>
          <NpcRelationshipGraph npcId={entity.id} />
        </Suspense>
      )

    case 'quest:branches':
      return (
        <Suspense fallback={<Loading label="Laying out the flow" />}>
          <QuestFlowView quest={entity} />
        </Suspense>
      )

    case 'quest:followup':
      return <RelatedList ids={targetsOf(index, entity.id, 'follows')} empty="No follow-up quests linked." />

    case 'material:use':
    case 'machine:links':
    case 'item:craft':
      return (
        <Suspense fallback={<Loading label="Tracing the chain" />}>
          <MiniChain id={entity.id} height={200} />
        </Suspense>
      )

    case 'region:use':
      return <RelatedList ids={inboundOfType('deposit')} empty="No deposits recorded in this region." />

    case 'skill:effect':
      return null

    case 'city:gallery':
    case 'region:dev':
      return entity.images?.length ? <Gallery entity={entity} /> : null

    default:
      return null
  }
}

function Gallery({ entity }: { entity: Entity }) {
  const palette = Array.isArray(entity.fields.palette) ? (entity.fields.palette as string[]) : undefined
  return (
    <div className="gallery">
      {(entity.images ?? []).map((img) => (
        <figure className="gallery-tile" key={img.id} style={{ margin: 0 }}>
          <div className="gallery-art">
            {img.src === 'gen:vista' ? (
              <CityVista id={entity.id} palette={palette} />
            ) : (
              <img src={img.src} alt={img.caption ?? entity.name} loading="lazy" />
            )}
          </div>
          <figcaption className="gallery-cap">
            {img.caption ?? entity.name}
            {img.credit ? <div className="dimmer" style={{ fontSize: 'var(--fs-micro)' }}>{img.credit}</div> : null}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
