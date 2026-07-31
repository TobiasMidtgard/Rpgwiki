/**
 * Seed authoring kit.
 *
 * Content modules under `src/world/` are plain data. They declare entities and
 * relations with these helpers; `seed.ts` assembles them into a `WorldState`.
 */

import type { CustomField, Entity, EntityType, ImageRef, RelationKind, Status, TableRow } from '../core/types'
import { TBD } from '../core/types'

export { TBD }

export interface SeedEntity {
  id: string
  type: EntityType
  name: string
  /** Marks `name` as a placeholder the designer still has to settle. */
  workingTitle?: boolean
  aka?: string[]
  status?: Status
  summary?: string
  tags?: string[]
  fields?: Record<string, unknown>
  custom?: CustomField[]
  images?: ImageRef[]
  accent?: string
  archived?: boolean
}

export interface SeedRelation {
  from: string
  to: string
  kind: RelationKind
  note?: string
  secret?: boolean
}

/** Entity shorthand. */
export function E(e: SeedEntity): SeedEntity {
  return e
}

/** Relation shorthand: `R('city.x', 'controls', 'faction.y')`. */
export function R(from: string, kind: RelationKind, to: string, note?: string, secret?: boolean): SeedRelation {
  return { from, to, kind, ...(note ? { note } : {}), ...(secret ? { secret } : {}) }
}

/** Table row shorthand so column keys stay honest. */
export function row<T extends TableRow>(r: T): T {
  return r
}

export function toEntity(s: SeedEntity, now: number): Entity {
  return {
    id: s.id,
    type: s.type,
    name: s.name,
    workingTitle: s.workingTitle,
    aka: s.aka,
    status: s.status ?? 'draft',
    summary: s.summary,
    tags: s.tags ?? [],
    fields: (s.fields ?? {}) as Entity['fields'],
    custom: s.custom ?? [],
    images: s.images ?? [],
    accent: s.accent,
    archived: s.archived,
    createdAt: now,
    updatedAt: now,
  }
}

/* ------------------------------------------------------------------ */
/* Structured payloads carried on specific entity types                */
/* ------------------------------------------------------------------ */

/** Quest branching graph, stored on `quest.fields.flow`. */
export type QuestNodeKind = 'start' | 'choice' | 'check' | 'combat' | 'discovery' | 'success' | 'failure' | 'state'

export interface QuestNode {
  id: string
  kind: QuestNodeKind
  label: string
  detail?: string
  /** Column in the flow layout; 0 is the start. */
  col: number
  /** Entities this beat touches. */
  refs?: string[]
}

export interface QuestEdge {
  from: string
  to: string
  label?: string
  /** Renders as the discouraged / costly path. */
  bad?: boolean
  /** Hidden route the player has to earn. */
  hidden?: boolean
}

export interface QuestFlow {
  nodes: QuestNode[]
  edges: QuestEdge[]
}

/** Skill tree placement, stored on `skill.fields.node`. */
export interface SkillNode {
  tree: string
  branch: string
  col: number
  row: number
  /** Skill ids that must be taken first. */
  requires?: string[]
}

/** City district map, stored on `city.fields.cityMap`. */
export interface CityMapShape {
  /** District or landmark entity id. */
  id: string
  polygon: [number, number][]
}

export interface CityMap {
  /** Local coordinate space; shapes are drawn inside 0..w, 0..h. */
  w: number
  h: number
  districts: CityMapShape[]
  /** Water, walls and roads drawn under the districts. */
  water?: [number, number][][]
  walls?: [number, number][]
  roads?: [number, number][][]
  landmarks?: { id: string; at: [number, number] }[]
}
