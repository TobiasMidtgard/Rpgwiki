/**
 * World store.
 *
 * A single immutable state object behind `useSyncExternalStore`. Every
 * mutation goes through `commit`, which snapshots for undo, records a
 * revision and schedules a debounced write to IndexedDB.
 */

import { useSyncExternalStore } from 'react'
import { idbGet, idbSet } from './db'
import type { Entity, EntityType, Point, Relation, RelationKind, RegionShape, RouteShape, ZoneShape } from './types'

export interface AtlasData {
  regions: RegionShape[]
  routes: RouteShape[]
  zones: ZoneShape[]
  /** Map positions by entity id. Dragging a marker writes here. */
  positions: Record<string, Point>
}

export interface Revision {
  at: number
  label: string
  snapshot: Entity
}

export interface WorldState {
  entities: Record<string, Entity>
  relations: Record<string, Relation>
  atlas: AtlasData
  revisions: Record<string, Revision[]>
  meta: {
    seedVersion: number
    createdAt: number
    updatedAt: number
    /** True once the user has changed anything, so seed upgrades stop clobbering. */
    touched: boolean
  }
}

export type SaveState = 'idle' | 'saving' | 'saved' | 'error'

const STORAGE_KEY = 'world'
const MAX_UNDO = 60
const MAX_REVISIONS = 25

/* ------------------------------------------------------------------ */

let state: WorldState | null = null
let undoStack: { label: string; state: WorldState }[] = []
let redoStack: { label: string; state: WorldState }[] = []
let saveState: SaveState = 'idle'
let loaded = false
let saveTimer: ReturnType<typeof setTimeout> | null = null
let lastAction = ''

const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())

function subscribe(l: () => void) {
  listeners.add(l)
  return () => {
    listeners.delete(l)
  }
}

/* ------------------------------------------------------------------ */
/* Load / save                                                         */
/* ------------------------------------------------------------------ */

export function emptyWorld(): WorldState {
  const now = Date.now()
  return {
    entities: {},
    relations: {},
    atlas: { regions: [], routes: [], zones: [], positions: {} },
    revisions: {},
    meta: { seedVersion: 0, createdAt: now, updatedAt: now, touched: false },
  }
}

/**
 * Reads persisted state, falling back to the seed. If a newer seed ships and
 * the user has never edited anything, the seed is adopted; otherwise their
 * work wins and the seed version is simply recorded.
 *
 * `seed` is a loader rather than a value because the seed is the largest asset
 * in the project and most visits never need it — a returning reader's world
 * comes straight back out of IndexedDB.
 */
export async function loadWorld(seed: () => Promise<WorldState>, seedVersion: number): Promise<void> {
  const stored = await idbGet<WorldState>(STORAGE_KEY)
  if (!stored || !stored.entities || Object.keys(stored.entities).length === 0) {
    state = await seed()
    state.meta.seedVersion = seedVersion
    loaded = true
    emit()
    void flush()
    return
  }
  if (!stored.meta.touched && stored.meta.seedVersion !== seedVersion) {
    state = await seed()
    state.meta.seedVersion = seedVersion
  } else {
    state = migrate(stored, seedVersion)
  }
  loaded = true
  emit()
}

function migrate(s: WorldState, seedVersion: number): WorldState {
  return {
    ...s,
    entities: s.entities ?? {},
    relations: s.relations ?? {},
    revisions: s.revisions ?? {},
    atlas: {
      regions: s.atlas?.regions ?? [],
      routes: s.atlas?.routes ?? [],
      zones: s.atlas?.zones ?? [],
      positions: s.atlas?.positions ?? {},
    },
    meta: { ...s.meta, seedVersion },
  }
}

async function flush() {
  if (!state) return
  saveState = 'saving'
  emit()
  try {
    await idbSet(STORAGE_KEY, state)
    saveState = 'saved'
  } catch {
    saveState = 'error'
  }
  emit()
}

function scheduleSave() {
  if (saveTimer) clearTimeout(saveTimer)
  saveTimer = setTimeout(() => {
    saveTimer = null
    void flush()
  }, 500)
}

export function saveNow() {
  if (saveTimer) clearTimeout(saveTimer)
  saveTimer = null
  return flush()
}

/* ------------------------------------------------------------------ */
/* Commit                                                              */
/* ------------------------------------------------------------------ */

function commit(label: string, fn: (draft: WorldState) => WorldState | void) {
  if (!state) return
  const prev = state
  const draft: WorldState = {
    ...prev,
    entities: { ...prev.entities },
    relations: { ...prev.relations },
    revisions: { ...prev.revisions },
    atlas: {
      regions: prev.atlas.regions,
      routes: prev.atlas.routes,
      zones: prev.atlas.zones,
      positions: { ...prev.atlas.positions },
    },
    meta: { ...prev.meta, updatedAt: Date.now(), touched: true },
  }
  const next = fn(draft) ?? draft
  undoStack.push({ label, state: prev })
  if (undoStack.length > MAX_UNDO) undoStack.shift()
  redoStack = []
  lastAction = label
  state = next
  emit()
  scheduleSave()
}

/** Mutation that must not enter the undo stack (map pan, seed adoption). */
function quiet(fn: (draft: WorldState) => WorldState | void) {
  if (!state) return
  const draft: WorldState = { ...state, atlas: { ...state.atlas, positions: { ...state.atlas.positions } } }
  state = fn(draft) ?? draft
  emit()
  scheduleSave()
}

export function undo() {
  const top = undoStack.pop()
  if (!top || !state) return
  redoStack.push({ label: top.label, state })
  state = top.state
  lastAction = `Undid: ${top.label}`
  emit()
  scheduleSave()
}

export function redo() {
  const top = redoStack.pop()
  if (!top || !state) return
  undoStack.push({ label: top.label, state })
  state = top.state
  lastAction = `Redid: ${top.label}`
  emit()
  scheduleSave()
}

export const canUndo = () => undoStack.length > 0
export const canRedo = () => redoStack.length > 0
export const undoLabel = () => undoStack[undoStack.length - 1]?.label ?? ''
export const redoLabel = () => redoStack[redoStack.length - 1]?.label ?? ''

/* ------------------------------------------------------------------ */
/* Ids                                                                 */
/* ------------------------------------------------------------------ */

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

/** Human-readable, collision-free entity id. The user never types these. */
export function makeId(type: EntityType, name: string, taken: Record<string, unknown>): string {
  const base = `${type}.${slugify(name) || 'untitled'}`
  if (!(base in taken)) return base
  let i = 2
  while (`${base}-${i}` in taken) i++
  return `${base}-${i}`
}

let relCounter = 0
export function makeRelId(): string {
  relCounter += 1
  return `rel.${Date.now().toString(36)}.${relCounter.toString(36)}`
}

/* ------------------------------------------------------------------ */
/* Entity actions                                                      */
/* ------------------------------------------------------------------ */

function recordRevision(draft: WorldState, id: string, label: string) {
  const e = draft.entities[id]
  if (!e) return
  const list = draft.revisions[id] ? [...draft.revisions[id]] : []
  list.unshift({ at: Date.now(), label, snapshot: e })
  draft.revisions[id] = list.slice(0, MAX_REVISIONS)
}

export function createEntity(input: Partial<Entity> & { type: EntityType; name: string }): string {
  if (!state) return ''
  const id = input.id && !(input.id in state.entities) ? input.id : makeId(input.type, input.name, state.entities)
  const now = Date.now()
  commit(`Create ${input.name}`, (d) => {
    d.entities[id] = {
      id,
      type: input.type,
      name: input.name,
      status: input.status ?? 'draft',
      tags: input.tags ?? [],
      fields: input.fields ?? {},
      summary: input.summary,
      aka: input.aka,
      workingTitle: input.workingTitle,
      custom: input.custom ?? [],
      images: input.images ?? [],
      accent: input.accent,
      createdAt: now,
      updatedAt: now,
    }
  })
  return id
}

export function patchEntity(id: string, patch: Partial<Entity>, label = 'Edit') {
  commit(`${label}: ${state?.entities[id]?.name ?? id}`, (d) => {
    const e = d.entities[id]
    if (!e) return
    recordRevision(d, id, label)
    d.entities[id] = { ...e, ...patch, updatedAt: Date.now() }
  })
}

export function setField(id: string, key: string, value: unknown) {
  commit(`Edit ${state?.entities[id]?.name ?? id}`, (d) => {
    const e = d.entities[id]
    if (!e) return
    recordRevision(d, id, `Field: ${key}`)
    d.entities[id] = {
      ...e,
      fields: { ...e.fields, [key]: value as never },
      updatedAt: Date.now(),
    }
  })
}

export function archiveEntity(id: string) {
  patchEntity(id, { archived: true }, 'Archive')
}

export function restoreEntity(id: string) {
  patchEntity(id, { archived: false }, 'Restore')
}

export function deleteEntityForever(id: string) {
  commit(`Delete ${state?.entities[id]?.name ?? id}`, (d) => {
    delete d.entities[id]
    delete d.revisions[id]
    delete d.atlas.positions[id]
    for (const r of Object.values(d.relations)) {
      if (r.from === id || r.to === id) delete d.relations[r.id]
    }
  })
}

export function duplicateEntity(id: string): string {
  if (!state) return ''
  const src = state.entities[id]
  if (!src) return ''
  const name = `${src.name} (copy)`
  const newId = makeId(src.type, name, state.entities)
  const now = Date.now()
  commit(`Duplicate ${src.name}`, (d) => {
    d.entities[newId] = {
      ...structuredClone(src),
      id: newId,
      name,
      status: 'draft',
      createdAt: now,
      updatedAt: now,
    }
    // Copy outgoing relations so the duplicate is not born orphaned.
    for (const r of Object.values(d.relations)) {
      if (r.from === id) {
        const rid = makeRelId()
        d.relations[rid] = { ...r, id: rid, from: newId }
      }
    }
    const pos = d.atlas.positions[id]
    if (pos) d.atlas.positions[newId] = [pos[0] + 40, pos[1] + 40]
  })
  return newId
}

export function revertToRevision(id: string, at: number) {
  commit(`Revert ${state?.entities[id]?.name ?? id}`, (d) => {
    const rev = d.revisions[id]?.find((r) => r.at === at)
    if (!rev) return
    recordRevision(d, id, 'Before revert')
    d.entities[id] = { ...rev.snapshot, updatedAt: Date.now() }
  })
}

/* ------------------------------------------------------------------ */
/* Relation actions                                                    */
/* ------------------------------------------------------------------ */

export function addRelation(from: string, to: string, kind: RelationKind, opts: { note?: string; secret?: boolean } = {}) {
  if (!state) return
  const dup = Object.values(state.relations).find((r) => r.from === from && r.to === to && r.kind === kind)
  if (dup) return
  const id = makeRelId()
  commit('Link entries', (d) => {
    d.relations[id] = { id, from, to, kind, ...opts }
  })
}

export function removeRelation(id: string) {
  commit('Unlink entries', (d) => {
    delete d.relations[id]
  })
}

export function updateRelation(id: string, patch: Partial<Relation>) {
  commit('Update link', (d) => {
    const r = d.relations[id]
    if (r) d.relations[id] = { ...r, ...patch }
  })
}

/** Replaces every relation of `kind` leaving `from` — used by the matrix editor. */
export function setRelationKind(from: string, to: string, kind: RelationKind | null, allowed: RelationKind[]) {
  commit('Set relationship', (d) => {
    for (const r of Object.values(d.relations)) {
      if (r.from === from && r.to === to && allowed.includes(r.kind)) delete d.relations[r.id]
      if (r.from === to && r.to === from && allowed.includes(r.kind)) delete d.relations[r.id]
    }
    if (kind) {
      const id = makeRelId()
      d.relations[id] = { id, from, to, kind }
    }
  })
}

/* ------------------------------------------------------------------ */
/* Atlas actions                                                       */
/* ------------------------------------------------------------------ */

export function setPosition(id: string, x: number, y: number) {
  commit('Move marker', (d) => {
    d.atlas.positions[id] = [Math.round(x), Math.round(y)]
  })
}

/** Live drag feedback — no undo entry per pointer move. */
export function setPositionLive(id: string, x: number, y: number) {
  quiet((d) => {
    d.atlas.positions[id] = [Math.round(x), Math.round(y)]
  })
}

/* ------------------------------------------------------------------ */
/* Bulk                                                                */
/* ------------------------------------------------------------------ */

export function replaceWorld(next: WorldState, label = 'Import world') {
  commit(label, () => next)
}

export async function resetToSeed(seed: () => Promise<WorldState>, seedVersion: number) {
  const next = await seed()
  next.meta.seedVersion = seedVersion
  commit('Reset to seed', () => next)
}

/* ------------------------------------------------------------------ */
/* Hooks                                                               */
/* ------------------------------------------------------------------ */

const getSnapshot = () => state
export function useWorld(): WorldState | null {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

const getStatus = () => `${saveState}|${loaded}|${undoStack.length}|${redoStack.length}|${lastAction}`
export function useStoreStatus() {
  useSyncExternalStore(subscribe, getStatus, getStatus)
  return { saveState, loaded, canUndo: canUndo(), canRedo: canRedo(), undoLabel: undoLabel(), redoLabel: redoLabel(), lastAction }
}

export const getWorld = () => state
